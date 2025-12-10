import asyncio
import uuid
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

import httpx

from services.embedding_service import EmbeddingService
from core.vector_client import VectorDBClient


class AgentType(Enum):
    LEGISLATIVE_PREDICTOR = "legislative_predictor"
    CONSTITUTIONAL_AI = "constitutional_ai"
    CIVIC_SENTIMENT = "civic_sentiment"
    AR_VISUAL = "ar_visual"
    ACTION_OPTIMIZER = "action_optimizer"
    ORCHESTRATOR = "orchestrator"


class MessageType(Enum):
    QUERY = "query"
    RESPONSE = "response"
    ERROR = "error"
    BROADCAST = "broadcast"
    TASK = "task"
    RESULT = "result"


@dataclass
class AgentMessage:
    message_id: str
    sender: AgentType
    recipients: List[AgentType]
    message_type: MessageType
    content: Dict[str, Any]
    context: Optional[Dict[str, Any]] = None
    correlation_id: Optional[str] = None
    timestamp: Optional[str] = None
    priority: int = 1

    def __post_init__(self) -> None:
        if self.timestamp is None:
            self.timestamp = datetime.utcnow().isoformat()

    def to_dict(self) -> Dict[str, Any]:
        return {
            **asdict(self),
            "sender": self.sender.value,
            "recipients": [r.value for r in self.recipients],
            "message_type": self.message_type.value,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AgentMessage":
        return cls(
            message_id=data["message_id"],
            sender=AgentType(data["sender"]),
            recipients=[AgentType(r) for r in data["recipients"]],
            message_type=MessageType(data["message_type"]),
            content=data["content"],
            context=data.get("context"),
            correlation_id=data.get("correlation_id"),
            timestamp=data.get("timestamp"),
            priority=data.get("priority", 1),
        )


class AgentCommunicationProtocol:
    """Protocol handler for inter-agent messaging."""

    def __init__(self, agent_id: AgentType, vector_db: Optional[VectorDBClient] = None):
        self.agent_id = agent_id
        self.vector_db = vector_db
        self.message_handlers: Dict[MessageType, Any] = {}
        self.response_callbacks: Dict[str, asyncio.Future] = {}

        self.register_handler(MessageType.QUERY, self.handle_query)
        self.register_handler(MessageType.TASK, self.handle_task)

    def register_handler(self, message_type: MessageType, handler: Any) -> None:
        self.message_handlers[message_type] = handler

    async def send_message(self, message: AgentMessage, response_timeout: int = 30) -> Optional[AgentMessage]:
        if message.message_type in [MessageType.QUERY, MessageType.TASK]:
            response_future: asyncio.Future = asyncio.Future()
            self.response_callbacks[message.message_id] = response_future
            await self._deliver_message(message)
            try:
                return await asyncio.wait_for(response_future, timeout=response_timeout)
            except asyncio.TimeoutError:
                self.response_callbacks.pop(message.message_id, None)
                return None

        await self._deliver_message(message)
        return None

    async def _deliver_message(self, message: AgentMessage) -> None:
        if len(message.recipients) == 1:
            await self._http_deliver(message.recipients[0], message)
        else:
            await self._broker_deliver(message)

    async def _http_deliver(self, recipient: AgentType, message: AgentMessage) -> Optional[AgentMessage]:
        agent_urls = {
            AgentType.LEGISLATIVE_PREDICTOR: "http://legislative-predictor:8001/agent/message",
            AgentType.CONSTITUTIONAL_AI: "http://constitutional-ai:8002/agent/message",
        }
        url = agent_urls.get(recipient)
        if not url:
            return None

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=message.to_dict())
            if response.status_code == 200:
                return AgentMessage.from_dict(response.json())
        return None

    async def _broker_deliver(self, message: AgentMessage) -> None:
        # Broker integration can be added later (Redis, RabbitMQ, etc.).
        return None

    async def handle_incoming_message(self, raw_message: Dict[str, Any]) -> AgentMessage:
        message = AgentMessage.from_dict(raw_message)

        if message.message_type == MessageType.RESPONSE and message.correlation_id in self.response_callbacks:
            future = self.response_callbacks.pop(message.correlation_id)
            future.set_result(message)
            return message

        handler = self.message_handlers.get(message.message_type)
        if handler:
            response = await handler(message)
            return response

        return AgentMessage(
            message_id=str(uuid.uuid4()),
            sender=self.agent_id,
            recipients=[message.sender],
            message_type=MessageType.RESPONSE,
            content={"status": "received", "agent": self.agent_id.value},
            correlation_id=message.message_id,
        )

    async def handle_query(self, message: AgentMessage) -> AgentMessage:
        query = message.content.get("query", "")
        embedding_service = EmbeddingService()
        query_embedding = await embedding_service.generate_embedding(query, model_type="general")

        context = {}
        if self.vector_db:
            try:
                context = await self.vector_db.retrieve_for_rag(query_embedding, collections=["legislative", "constitutional"])
            except Exception as exc:  # noqa: BLE001
                context = {"error": str(exc)}

        analysis = self._analyze_locally(query, context)

        return AgentMessage(
            message_id=str(uuid.uuid4()),
            sender=self.agent_id,
            recipients=[message.sender],
            message_type=MessageType.RESPONSE,
            content={"query": query, "analysis": analysis, "context_used": list(context.keys())},
            correlation_id=message.message_id,
        )

    async def handle_task(self, message: AgentMessage) -> AgentMessage:
        task = message.content.get("task")
        parameters = message.content.get("parameters", {})
        result: Dict[str, Any] = {"status": "unknown_task"}

        if task == "analyze_bill_constitutionality":
            result = await self._constitutional_analysis_task(parameters)
        elif task == "predict_vote_outcome":
            result = await self._vote_prediction_task(parameters)

        return AgentMessage(
            message_id=str(uuid.uuid4()),
            sender=self.agent_id,
            recipients=[message.sender],
            message_type=MessageType.RESULT,
            content={"task": task, "result": result},
            correlation_id=message.message_id,
        )

    def _analyze_locally(self, query: str, context: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "summary": query[:500],
            "notes": "Local analysis placeholder until model integration is wired.",
            "context_keys": list(context.keys()),
        }

    async def _constitutional_analysis_task(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        bill_text = parameters.get("bill_text", "")
        return {
            "summary": f"Constitutionality check requested for text length {len(bill_text)} characters.",
            "issues": parameters.get("issues", []),
        }

    async def _vote_prediction_task(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        bill_title = parameters.get("bill_title", "")
        chamber = parameters.get("chamber", "unknown")
        return {
            "prediction": "undetermined",
            "bill": bill_title,
            "chamber": chamber,
            "confidence": 0.0,
        }
