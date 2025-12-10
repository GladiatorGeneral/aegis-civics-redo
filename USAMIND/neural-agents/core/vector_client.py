import json
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

import asyncpg


@dataclass
class VectorDBConfig:
    host: str = "localhost"
    port: int = 5432
    database: str = "usamind"
    user: str = "vector"
    password: str = "password"
    pool_size: int = 20


class VectorDBClient:
    """Client for vector database operations using pgvector."""

    def __init__(self, config: VectorDBConfig):
        self.config = config
        self.pool: Optional[asyncpg.pool.Pool] = None

    async def connect(self) -> None:
        self.pool = await asyncpg.create_pool(
            host=self.config.host,
            port=self.config.port,
            database=self.config.database,
            user=self.config.user,
            password=self.config.password,
            min_size=5,
            max_size=self.config.pool_size,
        )

    async def close(self) -> None:
        if self.pool:
            await self.pool.close()
            self.pool = None

    async def store_legislative_artifact(self, artifact: Dict[str, Any], embedding: List[float]) -> None:
        if not self.pool:
            raise RuntimeError("VectorDBClient is not connected.")

        async with self.pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO legislative_artifacts 
                (content, embedding, artifact_type, title, congress, session, 
                 bill_number, sponsors, status, introduction_date, key_topics)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                """,
                artifact["content"],
                embedding,
                artifact.get("type", "bill"),
                artifact["title"],
                artifact.get("congress", 118),
                artifact.get("session", 2),
                artifact.get("bill_number"),
                json.dumps(artifact.get("sponsors", [])),
                artifact.get("status", "introduced"),
                artifact.get("introduction_date"),
                artifact.get("topics", []),
            )

    async def semantic_search(
        self,
        query_embedding: List[float],
        collection: str = "legislative",
        filters: Optional[Dict[str, Any]] = None,
        limit: int = 10,
    ) -> List[Dict[str, Any]]:
        if not self.pool:
            raise RuntimeError("VectorDBClient is not connected.")

        if collection != "legislative":
            raise NotImplementedError("Only legislative search is implemented in this stub.")

        filter_conditions: List[str] = []
        params: List[Any] = [query_embedding]
        placeholder_index = 2

        if filters:
            if "congress" in filters:
                filter_conditions.append(f"congress = ${placeholder_index}")
                params.append(filters["congress"])
                placeholder_index += 1
            if "status" in filters:
                filter_conditions.append(f"status = ${placeholder_index}")
                params.append(filters["status"])
                placeholder_index += 1

        where_clause = f"WHERE {' AND '.join(filter_conditions)}" if filter_conditions else ""
        params.append(limit)
        limit_placeholder = f"${placeholder_index}"

        query = f"""
            SELECT id, title, content, constitutionality_score, 1 - (embedding <=> $1) AS similarity
            FROM legislative_artifacts
            {where_clause}
            ORDER BY embedding <=> $1
            LIMIT {limit_placeholder}
        """

        async with self.pool.acquire() as conn:
            results = await conn.fetch(query, *params)

        return [
            {
                "id": r["id"],
                "title": r["title"],
                "content": r["content"][:500],
                "similarity": float(r["similarity"]),
                "constitutionality": float(r["constitutionality_score"]) if r["constitutionality_score"] else None,
            }
            for r in results
        ]

    async def retrieve_for_rag(
        self, query_embedding: List[float], collections: Optional[List[str]] = None
    ) -> Dict[str, List[Dict[str, Any]]]:
        if not self.pool:
            raise RuntimeError("VectorDBClient is not connected.")

        if collections is None:
            collections = ["legislative", "constitutional", "civic"]

        context: Dict[str, List[Dict[str, Any]]] = {}

        if "legislative" in collections:
            context["legislation"] = await self.semantic_search(
                query_embedding, collection="legislative", filters={"status": "passed"}, limit=3
            )

        if "constitutional" in collections:
            async with self.pool.acquire() as conn:
                results = await conn.fetch(
                    """
                    SELECT clause_text, article, section, 1 - (embedding <=> $1) AS similarity
                    FROM constitutional_knowledge
                    ORDER BY embedding <=> $1
                    LIMIT 2
                    """,
                    query_embedding,
                )
                context["constitutional"] = [
                    {
                        "clause": r["clause_text"],
                        "reference": f"Art. {r['article']}, Sec. {r['section']}",
                        "similarity": float(r["similarity"]),
                    }
                    for r in results
                ]

        return context

    async def update_constitutionality_score(self, artifact_id: str, score: float, issues: List[str]) -> None:
        if not self.pool:
            raise RuntimeError("VectorDBClient is not connected.")

        async with self.pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE legislative_artifacts
                SET constitutionality_score = $2,
                    constitutional_issues = $3,
                    updated_at = NOW()
                WHERE id = $1
                """,
                artifact_id,
                score,
                issues,
            )

    async def get_conversation_context(self, room_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        if not self.pool:
            raise RuntimeError("VectorDBClient is not connected.")

        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT content, user_id, created_at, sentiment_score
                FROM civic_conversations
                WHERE room_id = $1
                ORDER BY created_at DESC
                LIMIT $2
                """,
                room_id,
                limit,
            )

        return [
            {
                "content": r["content"],
                "user": r["user_id"],
                "time": r["created_at"],
                "sentiment": r["sentiment_score"],
            }
            for r in reversed(results)
        ]
