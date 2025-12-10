-- PostgreSQL with pgvector extension schema for USAMind

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE legislative_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    embedding vector(1536),
    artifact_type VARCHAR(50) NOT NULL CHECK (artifact_type IN ('bill', 'amendment', 'resolution', 'hearing', 'testimony')),
    title VARCHAR(500) NOT NULL,
    congress SMALLINT NOT NULL,
    session SMALLINT NOT NULL,
    bill_number VARCHAR(20),
    sponsors JSONB,
    status VARCHAR(100),
    introduction_date DATE,
    last_action_date DATE,
    constitutionality_score FLOAT CHECK (constitutionality_score >= 0 AND constitutionality_score <= 1),
    constitutional_issues TEXT[],
    ai_summary TEXT,
    key_topics TEXT[],
    sentiment_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_embedding CHECK (vector_dims(embedding) = 1536)
);

CREATE INDEX idx_legislative_embedding_hnsw ON legislative_artifacts
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE TABLE civic_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    embedding vector(768),
    room_id UUID NOT NULL,
    user_id UUID NOT NULL,
    conversation_type VARCHAR(50) CHECK (conversation_type IN ('chat', 'forum', 'comment', 'testimony')),
    parent_id UUID REFERENCES civic_conversations(id),
    thread_id UUID,
    depth INTEGER DEFAULT 0,
    topic_tags TEXT[],
    jurisdiction_level VARCHAR(50),
    sentiment_score FLOAT,
    toxicity_score FLOAT,
    is_moderated BOOLEAN DEFAULT FALSE,
    moderation_reason VARCHAR(200),
    upvotes INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    shared_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_civic_embedding_hnsw ON civic_conversations
USING hnsw (embedding vector_cosine_ops);

CREATE TABLE constitutional_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clause_text TEXT NOT NULL,
    embedding vector(1024),
    article VARCHAR(20),
    section VARCHAR(20),
    clause_number VARCHAR(10),
    amendment_number INTEGER,
    interpretation_summary TEXT,
    key_precedents JSONB,
    historical_context TEXT,
    modern_interpretation TEXT,
    related_bills UUID[],
    relevance_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    last_cited TIMESTAMP
);

CREATE TABLE citizen_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    interest_embedding vector(1536),
    zip_code_prefix VARCHAR(5),
    age_group VARCHAR(20),
    education_level VARCHAR(50),
    total_actions INTEGER DEFAULT 0,
    action_types JSONB,
    engagement_score FLOAT DEFAULT 0,
    primary_interests TEXT[],
    secondary_interests TEXT[],
    data_sharing_level VARCHAR(20) DEFAULT 'aggregated',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP
);

CREATE OR REPLACE FUNCTION semantic_search_legislation(
    query_embedding vector(1536),
    similarity_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10,
    filter_congress INT DEFAULT NULL,
    filter_status VARCHAR DEFAULT NULL,
    filter_topic_tags TEXT[] DEFAULT NULL
) RETURNS TABLE (
    id UUID,
    title VARCHAR,
    content TEXT,
    similarity FLOAT,
    congress INT,
    status VARCHAR,
    constitutional_score FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        la.id,
        la.title,
        substring(la.content from 1 for 500) as excerpt,
        1 - (la.embedding <=> query_embedding) as similarity,
        la.congress,
        la.status,
        la.constitutionality_score
    FROM legislative_artifacts la
    WHERE 1 - (la.embedding <=> query_embedding) > similarity_threshold
        AND (filter_congress IS NULL OR la.congress = filter_congress)
        AND (filter_status IS NULL OR la.status = filter_status)
        AND (filter_topic_tags IS NULL OR la.key_topics && filter_topic_tags)
    ORDER BY la.embedding <=> query_embedding
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION retrieve_for_rag(
    query_text TEXT,
    query_embedding vector(1536),
    collection_type VARCHAR,
    top_k INT DEFAULT 5
) RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    CASE collection_type
        WHEN 'legislative' THEN
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', id,
                    'title', title,
                    'content', substring(content from 1 for 2000),
                    'similarity', 1 - (embedding <=> query_embedding),
                    'type', 'legislation'
                )
            ) INTO result
            FROM legislative_artifacts
            ORDER BY embedding <=> query_embedding
            LIMIT top_k;
        WHEN 'constitutional' THEN
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', id,
                    'clause', clause_text,
                    'article', article,
                    'section', section,
                    'similarity', 1 - (embedding <=> query_embedding),
                    'type', 'constitutional'
                )
            ) INTO result
            FROM constitutional_knowledge
            ORDER BY embedding <=> query_embedding
            LIMIT top_k;
        WHEN 'civic' THEN
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', id,
                    'content', substring(content from 1 for 1000),
                    'topic_tags', topic_tags,
                    'similarity', 1 - (embedding <=> query_embedding),
                    'type', 'civic_discourse'
                )
            ) INTO result
            FROM civic_conversations
            WHERE toxicity_score < 0.3
            ORDER BY embedding <=> query_embedding
            LIMIT top_k;
        ELSE
            result := '[]'::jsonb;
    END CASE;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_legislative_updated_at
    BEFORE UPDATE ON legislative_artifacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE MATERIALIZED VIEW legislative_summary AS
SELECT
    congress,
    session,
    COUNT(*) as total_bills,
    COUNT(*) FILTER (WHERE status = 'passed') as passed_bills,
    AVG(constitutionality_score) as avg_constitutionality,
    ARRAY_AGG(DISTINCT unnest(key_topics)) as all_topics,
    MAX(last_action_date) as most_recent_action
FROM legislative_artifacts
WHERE artifact_type = 'bill'
GROUP BY congress, session
ORDER BY congress DESC, session DESC;

CREATE OR REPLACE FUNCTION refresh_materialized_views() RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY legislative_summary;
END;
$$ LANGUAGE plpgsql;
