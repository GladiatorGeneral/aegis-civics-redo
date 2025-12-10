import hashlib
import json
import re
from collections import OrderedDict
from concurrent.futures import ThreadPoolExecutor
from threading import Lock
from typing import Any, Dict, Optional

import torch
from transformers import TextStreamer


class DeepSeekInferenceEngine:
    """Inference engine with simple caching and prompt specializations."""

    def __init__(self, model, tokenizer, cache_size: int = 1000):
        self.model = model
        self.tokenizer = tokenizer
        self.cache_lock = Lock()
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.cache_size = cache_size
        self.response_cache: OrderedDict[str, str] = OrderedDict()

        self.prompt_templates = {
            "legislative": self._create_legislative_prompt,
            "constitutional": self._create_constitutional_prompt,
            "sentiment": self._create_sentiment_prompt,
        }

    def _get_cached_response(self, prompt_hash: str) -> Optional[str]:
        with self.cache_lock:
            if prompt_hash in self.response_cache:
                self.response_cache.move_to_end(prompt_hash)
                return self.response_cache[prompt_hash]
            return None

    def _set_cached_response(self, prompt_hash: str, response: str) -> None:
        with self.cache_lock:
            self.response_cache[prompt_hash] = response
            self.response_cache.move_to_end(prompt_hash)
            while len(self.response_cache) > self.cache_size:
                self.response_cache.popitem(last=False)

    def _resolve_device(self):
        if hasattr(self.model, "device"):
            return self.model.device  # type: ignore[return-value]
        try:
            return next(self.model.parameters()).device
        except StopIteration:
            return torch.device("cpu")

    def generate(
        self,
        prompt: str,
        agent_type: str = "legislative",
        max_tokens: int = 1024,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> Dict[str, Any]:
        template_func = self.prompt_templates.get(agent_type, self.prompt_templates["legislative"])
        full_prompt = template_func(prompt)

        prompt_hash = hashlib.md5(f"{full_prompt}_{temperature}".encode()).hexdigest()
        cached = self._get_cached_response(prompt_hash)
        if cached:
            return {"text": cached, "cached": True, "agent": agent_type}

        inputs = self.tokenizer(
            full_prompt,
            return_tensors="pt",
            truncation=True,
            max_length=8192,
        ).to(self._resolve_device())

        generation_config = {
            "max_new_tokens": max_tokens,
            "temperature": temperature,
            "top_p": 0.9,
            "top_k": 50,
            "do_sample": True,
            "repetition_penalty": 1.1,
            "pad_token_id": self.tokenizer.pad_token_id,
            "eos_token_id": self.tokenizer.eos_token_id,
        }

        if stream:
            generation_config["streamer"] = TextStreamer(self.tokenizer, skip_prompt=True)

        with torch.no_grad():
            outputs = self.model.generate(**inputs, **generation_config)

        full_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = self._extract_assistant_response(full_response)
        structured = self._parse_to_structured(response, agent_type)
        self._set_cached_response(prompt_hash, response)

        return {
            "text": response,
            "structured": structured,
            "cached": False,
            "agent": agent_type,
            "prompt_hash": prompt_hash,
        }

    def _create_legislative_prompt(self, query: str) -> str:
        return (
            "You are USAMind Legislative Predictor, an AI specialized in U.S. legislative analysis.\n\n"
            "CONTEXT:\n"
            "- You have access to the full U.S. Code and historical bill data\n"
            "- Current Congress: 118th (2023-2024)\n"
            "- Analyze constitutionality, political viability, and public impact\n\n"
            f"QUERY: {query}\n\n"
            "Respond in this EXACT JSON format:\n"
            "{\n"
            "  \"analysis\": \"detailed analysis here\",\n"
            "  \"probability_of_passage\": 0.85,\n"
            "  \"key_amendments_expected\": [\"amendment1\", \"amendment2\"],\n"
            "  \"timeline_estimate\": \"6-9 months\",\n"
            "  \"constitutional_concerns\": [\"concern1\", \"concern2\"],\n"
            "  \"recommended_actions\": [\"action1\", \"action2\"],\n"
            "  \"confidence_score\": 0.92\n"
            "}\n\n"
            "ANALYSIS:"
        )

    def _create_constitutional_prompt(self, query: str) -> str:
        return (
            "You are USAMind Constitutional AI, an expert in U.S. Constitutional law.\n\n"
            "CONSTITUTIONAL FRAMEWORK:\n"
            "- Cite specific Articles, Sections, and Amendments\n"
            "- Reference relevant Supreme Court precedents\n"
            "- Consider historical context and modern interpretations\n\n"
            f"QUERY: {query}\n\n"
            "Respond in this EXACT JSON format:\n"
            "{\n"
            "  \"constitutional_basis\": [\"Article I, Section 8\", \"14th Amendment\"],\n"
            "  \"precedent_cases\": [\"Case Name (Year)\", \"Case Name (Year)\"],\n"
            "  \"alignment_score\": 0.88,\n"
            "  \"potential_challenges\": [\"challenge1\", \"challenge2\"],\n"
            "  \"interpretation_notes\": \"detailed notes here\",\n"
            "  \"recommended_language\": \"suggested constitutional language\"\n"
            "}\n\n"
            "ANALYSIS:"
        )

    def _create_sentiment_prompt(self, query: str) -> str:
        return (
            "You are USAMind Civic Sentiment AI. Analyze public discourse and attitudes.\n\n"
            f"QUERY: {query}\n\n"
            "Return JSON with sentiment, confidence, and notable concerns."
        )

    def _extract_assistant_response(self, full_text: str) -> str:
        markers = ["ANALYSIS:", "ASSISTANT:", "RESPONSE:"]
        for marker in markers:
            if marker in full_text:
                return full_text.split(marker, 1)[1].strip()
        return full_text

    def _parse_to_structured(self, response: str, agent_type: str) -> Dict[str, Any]:
        try:
            json_match = re.search(r"\{.*\}", response, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
        except json.JSONDecodeError:
            pass

        return {
            "raw_response": response,
            "agent": agent_type,
            "parsed_successfully": False,
        }
