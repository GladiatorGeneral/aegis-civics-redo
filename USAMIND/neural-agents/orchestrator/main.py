import asyncio
import os
import uuid
from datetime import datetime
from typing import Any, Dict, List

from fastapi import BackgroundTasks, FastAPI, HTTPException

from core.agent_protocol import AgentCommunicationProtocol, AgentMessage, AgentType, MessageType
from core.vector_client import VectorDBClient, VectorDBConfig
from services.embedding_service import EmbeddingService

app = FastAPI(title="USAMind Neural Orchestrator")


# Initialize vector DB client lazily to allow optional use without a DB
VECTOR_DB_URL = os.getenv("VECTOR_DB_URL", "")
vector_db_client = None
if VECTOR_DB_URL:
    # Basic parser for postgres URLs
    import re

    match = re.match(r"postgresql://(?P<user>.+?):(?P<pw>.+?)@(?P<host>[^:]+):(?P<port>\d+)/(?P<db>.+)", VECTOR_DB_URL)
    if match:
        cfg = VectorDBConfig(
            host=match.group("host"),
            port=int(match.group("port")),
            database=match.group("db"),
            user=match.group("user"),
            password=match.group("pw"),
        )
        vector_db_client = VectorDBClient(cfg)


class NeuralOrchestrator:
    """Central orchestrator for multi-agent workflows."""

    def __init__(self):
        self.agents = {
            "legislative": AgentCommunicationProtocol(AgentType.LEGISLATIVE_PREDICTOR, vector_db_client),
            "constitutional": AgentCommunicationProtocol(AgentType.CONSTITUTIONAL_AI, vector_db_client),
            "sentiment": AgentCommunicationProtocol(AgentType.CIVIC_SENTIMENT, vector_db_client),
        }

        self.workflows = {
            "full_bill_analysis": self.full_bill_analysis_workflow,
            "civic_issue_research": self.civic_issue_research_workflow,
            "constitutional_challenge": self.constitutional_challenge_workflow,
        }

    async def full_bill_analysis_workflow(self, bill_text: str, bill_metadata: Dict[str, Any]) -> Dict[str, Any]:
        workflow_id = str(uuid.uuid4())
        print(f"Starting full bill analysis workflow: {workflow_id}")

        constitutional_task = asyncio.create_task(
            self._query_agent(
                AgentType.CONSTITUTIONAL_AI,
                {"query": f"Analyze constitutionality of bill: {bill_text[:2000]}", "bill_metadata": bill_metadata},
            )
        )

        legislative_task = asyncio.create_task(
            self._query_agent(
                AgentType.LEGISLATIVE_PREDICTOR,
                {"query": f"Predict outcome and analyze bill: {bill_text[:2000]}", "bill_metadata": bill_metadata},
            )
        )

        topics = await self._extract_topics(bill_text)
        sentiment_task = asyncio.create_task(
            self._query_agent(
                AgentType.CIVIC_SENTIMENT,
                {"query": f"Analyze public sentiment on topics: {topics}", "topics": topics},
            )
        )

        constitutional_result, legislative_result, sentiment_result = await asyncio.gather(
            constitutional_task, legislative_task, sentiment_task
        )

        synthesis = await self._synthesize_analyses(constitutional_result, legislative_result, sentiment_result)
        action_recommendations = await self._generate_actions(synthesis)

        return {
            "workflow_id": workflow_id,
            "constitutional_analysis": constitutional_result,
            "legislative_prediction": legislative_result,
            "public_sentiment": sentiment_result,
            "synthesis": synthesis,
            "action_recommendations": action_recommendations,
            "timestamp": datetime.utcnow().isoformat(),
        }

    async def civic_issue_research_workflow(self, issue_text: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        research = await self._query_agent(
            AgentType.LEGISLATIVE_PREDICTOR,
            {"query": f"Research civic issue: {issue_text[:1500]}", "metadata": metadata},
        )
        sentiment = await self._query_agent(
            AgentType.CIVIC_SENTIMENT,
            {"query": f"Public sentiment on: {issue_text[:500]}", "metadata": metadata},
        )
        synthesis = await self._synthesize_analyses(research, sentiment)
        return {"research": research, "sentiment": sentiment, "synthesis": synthesis}

    async def constitutional_challenge_workflow(self, claim_text: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        constitutional = await self._query_agent(
            AgentType.CONSTITUTIONAL_AI,
            {"query": f"Evaluate constitutional claim: {claim_text[:1500]}", "metadata": metadata},
        )
        return {"analysis": constitutional}

    async def _query_agent(self, agent_type: AgentType, query: Dict[str, Any]) -> Dict[str, Any]:
        message = AgentMessage(
            message_id=str(uuid.uuid4()),
            sender=AgentType.ORCHESTRATOR,
            recipients=[agent_type],
            message_type=MessageType.QUERY,
            content=query,
        )

        key = agent_type.value.split("_")[0]
        agent = self.agents.get(key)
        if agent:
            response = await agent.send_message(message)
            return response.content if response else {"error": "No response"}
        return {"error": f"Agent {agent_type.value} not available"}

    async def _extract_topics(self, text: str) -> List[str]:
        embedding_service = EmbeddingService()
        embedding = await embedding_service.generate_embedding(text)

        topics: List[str] = []
        if vector_db_client:
            try:
                similar = await vector_db_client.semantic_search(embedding, collection="legislative", limit=5)
                for doc in similar:
                    meta = doc.get("metadata", {})
                    if meta and "key_topics" in meta:
                        topics.extend(meta["key_topics"])
            except Exception:
                pass
        return topics[:5]

    async def _synthesize_analyses(self, *analyses: Dict[str, Any]) -> Dict[str, Any]:
        summary = " | ".join([str(a.get("analysis", a)) for a in analyses])
        return {"summary": summary, "viability_score": 0, "key_points": [], "actions": []}

    async def _generate_actions(self, synthesis: Dict[str, Any]) -> List[Dict[str, Any]]:
        actions: List[Dict[str, Any]] = []
        if synthesis.get("viability_score", 0) > 60:
            actions.append(
                {
                    "type": "contact_representatives",
                    "priority": "high",
                    "description": "Contact sponsors and committee members",
                    "targets": ["senate_committee", "house_committee"],
                }
            )
        return actions


orchestrator = NeuralOrchestrator()


@app.post("/orchestrate/workflow/{workflow_name}")
async def execute_workflow(workflow_name: str, parameters: Dict[str, Any], background_tasks: BackgroundTasks):
    if workflow_name not in orchestrator.workflows:
        raise HTTPException(status_code=404, detail="Workflow not found")

    workflow_func = orchestrator.workflows[workflow_name]
    workflow_id = str(uuid.uuid4())
    background_tasks.add_task(workflow_func, **parameters)

    return {
        "workflow_id": workflow_id,
        "status": "started",
        "workflow": workflow_name,
        "message": f"Workflow {workflow_name} started with ID {workflow_id}",
    }


@app.post("/orchestrate/custom")
async def custom_orchestration(request: Dict[str, Any]):
    agents_needed = request.get("agents", [])
    tasks = request.get("tasks", [])

    available_agents = list(orchestrator.agents.keys())
    for agent in agents_needed:
        if agent not in available_agents:
            raise HTTPException(status_code=400, detail=f"Agent {agent} not available")

    if request.get("parallel", False):
        coro_tasks = [orchestrator._query_agent(AgentType(a + "_predictor") if a == "legislative" else AgentType(a + "_ai") if a == "constitutional" else AgentType.CIVIC_SENTIMENT, t) for a, t in zip(agents_needed, tasks)]
        results = await asyncio.gather(*coro_tasks)
    else:
        results = []
        for agent, task in zip(agents_needed, tasks):
            agent_type = AgentType(agent + "_predictor") if agent == "legislative" else AgentType(agent + "_ai") if agent == "constitutional" else AgentType.CIVIC_SENTIMENT
            result = await orchestrator._query_agent(agent_type, task)
            results.append(result)
            if task.get("break_on_failure", False) and "error" in result:
                break

    synthesis = await orchestrator._synthesize_analyses(*results)
    return {"task_results": results, "synthesis": synthesis, "agents_used": agents_needed}


@app.get("/orchestrate/status/{workflow_id}")
async def get_workflow_status(workflow_id: str):
    return {"workflow_id": workflow_id, "status": "running", "progress": 75}
