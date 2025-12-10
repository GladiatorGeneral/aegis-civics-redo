import { NextRequest, NextResponse } from 'next/server';

// Lightweight orchestration route intended for Vercel Serverless Functions.
// Delegates heavy lifting to external AI agents and vector DB endpoints.
export async function POST(req: NextRequest) {
  const { billText } = await req.json();

  if (!billText || typeof billText !== 'string') {
    return NextResponse.json({ error: 'billText is required' }, { status: 400 });
  }

  const predictorUrl = process.env.LEGISLATIVE_PREDICTOR_URL;
  const vectorUrl = process.env.NEON_VECTOR_SEARCH_URL;
  const authToken = process.env.API_AUTH_TOKEN;

  if (!predictorUrl || !vectorUrl) {
    return NextResponse.json({ error: 'Service endpoints not configured' }, { status: 500 });
  }

  try {
    const [predictionRes, vectorRes] = await Promise.all([
      fetch(`${predictorUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : ''
        },
        body: JSON.stringify({ text: billText })
      }),
      fetch(vectorUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : ''
        },
        body: JSON.stringify({ query: billText, topK: 5 })
      })
    ]);

    const prediction = await predictionRes.json();
    const similar = await vectorRes.json();

    return NextResponse.json({ prediction, similar });
  } catch (err) {
    console.error('analyze-bill error', err);
    return NextResponse.json({ error: 'Upstream call failed' }, { status: 502 });
  }
}
