# USAMind Task List and Next Steps

Here’s a focused next-step plan with required APIs/services to stand up the neural agents and wire them into the app.

## Immediate Setup (Infra)
- Spin up data plane: pgvector PostgreSQL, Redis, GPU-enabled runner (NVIDIA container toolkit).
- Seed pgvector schema: apply `infrastructure/vector-db/schema.sql`.
- Configure secrets: `HF_TOKEN`, `VECTOR_DB_PASSWORD`, optional `OPENAI_API_KEY`/`COHERE_API_KEY` (for embeddings fallback), `GRAFANA_PASSWORD`.
- Build images: `docker-compose.full.yml` (vector-db, redis, agents, orchestrator, monitoring).

## Model & Agents
- Decide model SKUs: default `deepseek-ai/DeepSeek-R1-Distill-Qwen-7B` (quantized) and `deepseek-ai/deepseek-llm-7b-chat` fallback; optionally `deepseek-coder-33b-instruct` for constitutional agent if GPU budget allows.
- Validate GPU memory path: confirm quantized vs fp16 load; set `MODEL_ID` env per service.
- Add agent entrypoints: implement `legislative_predictor:app` and `constitutional_ai:app` FastAPI apps that:
  - Load model via `core/model_loader.py`.
  - Expose `/agent/message` to use `AgentCommunicationProtocol`.
  - Expose `/health` for health checks.

## Orchestrator
- Wire agent URLs: ensure `AGENT_URLS` env matches service names/ports.
- Start orchestrator (`uvicorn orchestrator.main:app`); add `/vector/context` endpoint to fetch chat context via `VectorDBClient.get_conversation_context`.
- Add synthesis model/use existing agents for `_synthesize_analyses` (currently placeholder).

## Vector DB & Embeddings
- Run pgvector and connect `VectorDBClient` (env `VECTOR_DB_URL`).
- Choose embedding sources:
  - Local: `sentence-transformers` (legal/general/multilingual) — no API needed.
  - External (optional): OpenAI embeddings (`text-embedding-3-large` or dim-reduced), Cohere (`embed-english-v3.0`).
- Backfill embeddings: ingest seed legislative/constitutional texts; store via `store_legislative_artifact`.
- Add ingestion jobs for civic chat to `civic_conversations` with embeddings.

## Caching & Broker
- Decide cache: keep in-process LRU for now; plan Redis-backed cache for generation outputs and message queue if you expand multi-recipient messaging.
- If using broker for fan-out: integrate Redis/RabbitMQ in `AgentCommunicationProtocol._broker_deliver`.

## Monitoring
- Expose Prometheus metrics endpoints on agents/orchestrator; confirm `prometheus.yml` scrape targets.
- Add basic Grafana dashboards (placeholders under `monitoring/dashboards/`).

## Front-End Integration
- Replace placeholders in `src/chat/ai_integration.ts`:
  - Use real orchestrator URL (env/config).
  - Wire `broadcastToRoom` to your socket/pubsub.
- Add a feature flag/toggle in UI to show AI responses; handle loading/error states.

## Security & Ops
- Store HF token and API keys in secrets manager, not in code.
- Set resource limits in compose/k8s; pin torch/transformers versions as in `requirements.txt`.
- Add rate limiting on orchestrator endpoints; validate input sizes (truncate long prompts).

## API/Key Checklist
- Required: `HF_TOKEN` (model pulls).
- Optional but recommended: `OPENAI_API_KEY` or `COHERE_API_KEY` (cloud embeddings fallback).
- DB: `VECTOR_DB_PASSWORD` for pgvector.
- Monitoring: `GRAFANA_PASSWORD`.

## Execution Order (lean path)
1) Bring up pgvector + Redis (`docker-compose.full.yml` with just vector-db/redis).
2) Apply schema; verify `VectorDBClient` connects.
3) Implement agent FastAPI apps + expose `/agent/message` and `/health`.
4) Launch agents with GPU; validate warmup/generate.
5) Launch orchestrator; add `/vector/context` endpoint.
6) Wire chat bridge to orchestrator URL; test a trigger end-to-end.
7) Add Prometheus/Grafana; verify metrics.
8) Backfill embeddings and run a sample workflow.
