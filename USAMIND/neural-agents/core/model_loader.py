import os
from dataclasses import dataclass
from typing import Optional, Dict, Tuple

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from huggingface_hub import login


@dataclass
class ModelConfig:
    """Centralized configuration for all neural agents."""

    model_id: str = "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"
    device_map: str = "auto"
    torch_dtype: torch.dtype = torch.float16
    max_memory: Optional[Dict[int, str]] = None
    use_quantization: bool = True
    cache_dir: str = "/mnt/ai_models/usamind_cache"
    trust_remote_code: bool = True


class DeepSeekLoader:
    """Efficient DeepSeek model loader with quantization and warmup."""

    def __init__(self, config: ModelConfig):
        self.config = config
        self._setup_environment()

    def _setup_environment(self) -> None:
        """Configure token login, cache directory, and multi-GPU memory hints."""
        if self.config.cache_dir:
            os.makedirs(self.config.cache_dir, exist_ok=True)

        token = os.getenv("HF_TOKEN")
        if token:
            login(token=token)

        if torch.cuda.device_count() > 1 and self.config.max_memory is None:
            self.config.max_memory = {i: "20GB" for i in range(torch.cuda.device_count())}
            self.config.max_memory[0] = "23GB"

    def load_quantized_model(self):
        """Load model with 8-bit quantization for constrained VRAM."""
        bnb_config = BitsAndBytesConfig(
            load_in_8bit=True,
            llm_int8_enable_fp32_cpu_offload=True,
            llm_int8_threshold=6.0,
            llm_int8_skip_modules=["lm_head"],
            llm_int8_has_fp16_weight=False,
        )

        model = AutoModelForCausalLM.from_pretrained(
            self.config.model_id,
            quantization_config=bnb_config,
            device_map=self.config.device_map,
            trust_remote_code=self.config.trust_remote_code,
            cache_dir=self.config.cache_dir,
            use_safetensors=True,
            low_cpu_mem_usage=True,
            max_memory=self.config.max_memory,
        )
        return model

    def load_fp16_model(self):
        """Load model in FP16 for maximum quality on ample VRAM."""
        model = AutoModelForCausalLM.from_pretrained(
            self.config.model_id,
            torch_dtype=self.config.torch_dtype,
            device_map=self.config.device_map,
            trust_remote_code=self.config.trust_remote_code,
            cache_dir=self.config.cache_dir,
            use_safetensors=True,
            low_cpu_mem_usage=True,
            max_memory=self.config.max_memory,
        )
        return model

    def load_model_and_tokenizer(self) -> Tuple[AutoModelForCausalLM, AutoTokenizer]:
        """Load tokenizer and model with a VRAM-aware strategy and warmup."""
        try:
            tokenizer = AutoTokenizer.from_pretrained(
                self.config.model_id,
                trust_remote_code=self.config.trust_remote_code,
                cache_dir=self.config.cache_dir,
            )

            if tokenizer.pad_token is None:
                tokenizer.pad_token = tokenizer.eos_token

            available_vram = (
                torch.cuda.get_device_properties(0).total_memory if torch.cuda.is_available() else 0
            )
            use_quant = self.config.use_quantization and available_vram < 32 * 1024**3
            model = self.load_quantized_model() if use_quant else self.load_fp16_model()

            self._warmup_model(model, tokenizer)
            return model, tokenizer

        except Exception as exc:  # noqa: BLE001
            print(f"Failed to load model {self.config.model_id}: {exc}")
            self.config.model_id = "deepseek-ai/deepseek-llm-7b-chat"
            return self.load_model_and_tokenizer()

    def _resolve_device(self, model) -> torch.device:
        """Find a device to send warmup tensors to."""
        if hasattr(model, "device"):
            return model.device  # type: ignore[return-value]
        try:
            return next(model.parameters()).device
        except StopIteration:
            return torch.device("cpu")

    def _warmup_model(self, model, tokenizer) -> None:
        """Run a short generation to compile kernels and verify load."""
        device = self._resolve_device(model)
        warmup_prompt = "Warmup inference for USAMind."
        inputs = tokenizer(warmup_prompt, return_tensors="pt").to(device)

        with torch.no_grad():
            _ = model.generate(
                **inputs,
                max_new_tokens=10,
                do_sample=False,
                pad_token_id=tokenizer.pad_token_id,
                eos_token_id=tokenizer.eos_token_id,
            )

        print("Model warmed up and ready.")
