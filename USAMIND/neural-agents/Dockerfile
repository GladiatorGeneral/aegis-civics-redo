FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

RUN apt-get update && apt-get install -y \
    python3.11 \
    python3-pip \
    git \
    curl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /mnt/ai_models/usamind_cache && chmod 777 /mnt/ai_models

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 \
    --index-url https://download.pytorch.org/whl/cu121

COPY . .

RUN useradd -m -u 1000 usamind && chown -R usamind:usamind /app
USER usamind

ENV HF_HOME=/mnt/ai_models/usamind_cache
ENV TRANSFORMERS_CACHE=/mnt/ai_models/usamind_cache
ENV PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:512

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health', timeout=2)"

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
