import os
from typing import Dict, List

import httpx
import backoff
from sentence_transformers import SentenceTransformer


class EmbeddingService:
    """Generate embeddings using local sentence transformers or API providers."""

    def __init__(self):
        self.models: Dict[str, SentenceTransformer] = {
            "legal": SentenceTransformer("nlpaueb/legal-bert-base-uncased"),
            "general": SentenceTransformer("all-mpnet-base-v2"),
            "multilingual": SentenceTransformer("paraphrase-multilingual-mpnet-base-v2"),
        }

        self.api_config = {
            "openai": {
                "url": "https://api.openai.com/v1/embeddings",
                "model": "text-embedding-3-large",
                "dims": 3072,
            },
            "cohere": {
                "url": "https://api.cohere.ai/v1/embed",
                "model": "embed-english-v3.0",
                "dims": 1024,
            },
        }

    @backoff.on_exception(backoff.expo, httpx.RequestError, max_tries=3)
    async def generate_embedding(
        self,
        text: str,
        model_type: str = "general",
        use_api: bool = False,
        api_provider: str = "openai",
    ) -> List[float]:
        if use_api:
            return await self._generate_api_embedding(text, api_provider)
        return self._generate_local_embedding(text, model_type)

    def _generate_local_embedding(self, text: str, model_type: str) -> List[float]:
        model = self.models.get(model_type, self.models["general"])
        truncated = text[:10000]
        embedding = model.encode(truncated, convert_to_numpy=True)
        return embedding.tolist()

    async def _generate_api_embedding(self, text: str, provider: str) -> List[float]:
        config = self.api_config[provider]
        api_key = os.getenv(f"{provider.upper()}_API_KEY")
        if not api_key:
            raise RuntimeError(f"{provider} API key is not set.")

        payload: Dict[str, object] = {"input": text[:8192], "model": config["model"]}
        if provider == "openai":
            payload["dimensions"] = 1536

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(config["url"], json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()

        if provider == "openai":
            return data["data"][0]["embedding"]
        return data["embeddings"][0]

    async def batch_embed_documents(self, documents: List[str], model_type: str = "general") -> List[List[float]]:
        if model_type in self.models:
            model = self.models[model_type]
            batch_size = 32
            embeddings: List[List[float]] = []
            for i in range(0, len(documents), batch_size):
                batch = documents[i : i + batch_size]
                batch_embeddings = model.encode(batch, convert_to_numpy=True)
                embeddings.extend(batch_embeddings.tolist())
            return embeddings

        import asyncio

        tasks = [self.generate_embedding(doc, use_api=True) for doc in documents]
        return await asyncio.gather(*tasks)
