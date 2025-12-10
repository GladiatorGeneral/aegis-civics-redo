import { NextRequest, NextResponse } from 'next/server';

// Routes chat messages to an external realtime provider (e.g., Pusher/Ably/Supabase Realtime).
export async function POST(req: NextRequest) {
  const { channel, event, payload } = await req.json();

  if (!channel || !event) {
    return NextResponse.json({ error: 'channel and event are required' }, { status: 400 });
  }

  const realtimeUrl = process.env.REALTIME_PUBLISH_URL;
  const realtimeKey = process.env.REALTIME_PUBLISH_KEY;

  if (!realtimeUrl || !realtimeKey) {
    return NextResponse.json({ error: 'Realtime service not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(realtimeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${realtimeKey}`
      },
      body: JSON.stringify({ channel, event, payload })
    });

    const data = await res.json();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('send-message error', err);
    return NextResponse.json({ error: 'Realtime publish failed' }, { status: 502 });
  }
}
