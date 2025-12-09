'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { NeuralBackground } from '@/holographic-ui/components';
import { CivicChatClient, mapEnvelopeToDisplay } from '@/chat-core/client/CivicChatClient';
import { encryptMessage, importAesKey } from '@/chat-core/crypto';
import { ChatEnvelope, EncryptedPayload } from '@/chat-core/types';

export default function ChatPage() {
  const [roomId, setRoomId] = useState('civic-general');
  const [token, setToken] = useState('demo-user');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<EncryptedPayload[]>([]);
  const [client, setClient] = useState<CivicChatClient | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connected'>('disconnected');

  const wsUrl = useMemo(() => 'ws://localhost:8787', []);

  const connect = async () => {
    const chat = new CivicChatClient({ wsUrl, token });
    chat.connect();
    chat.onMessage((envelope: ChatEnvelope) => {
      const mapped = mapEnvelopeToDisplay(envelope);
      if (mapped) {
        setMessages((prev) => [...prev, mapped]);
      }
    });
    chat.joinRoom(roomId);
    setClient(chat);
    setStatus('connected');
  };

  const send = async () => {
    if (!client) return;
    // For demo, derive a temporary key from the token (not secure; replace with real room key management)
    const rawKey = new TextEncoder().encode(token.padEnd(32, '0')).slice(0, 32);
    const key = await importAesKey(rawKey);
    const payload = await encryptMessage(message, key);
    payload.senderId = token;
    client.sendChat(roomId, payload);
    setMessage('');
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      <NeuralBackground intensity="medium" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Neural Civic Connect</h1>
            <p className="text-gray-300">Secure chat prototype with room-based messaging.</p>
          </div>
          <Link href="/civics-learning" className="text-cyan-300 hover:text-cyan-100 underline">
            Back to Civics Learning
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-3 glass-morphism p-4 rounded-lg border border-white/10">
            <label className="text-sm text-gray-300">Room ID</label>
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
            <label className="text-sm text-gray-300">User Token</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
            <button
              onClick={connect}
              className="w-full py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
            >
              {status === 'connected' ? 'Connected' : 'Connect'}
            </button>
            <p className="text-xs text-gray-400">WebSocket: {wsUrl}</p>
          </div>

          <div className="md:col-span-2 space-y-4 glass-morphism p-4 rounded-lg border border-white/10">
            <div className="flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded bg-white/10 border border-white/20"
                placeholder="Type a message..."
              />
              <button
                onClick={send}
                disabled={!message}
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold disabled:opacity-50"
              >
                Send
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.length === 0 && (
                <p className="text-gray-400 text-sm">No messages yet.</p>
              )}
              {messages.map((m, idx) => (
                <div key={`${m.timestamp}-${idx}`} className="bg-white/5 p-3 rounded">
                  <div className="text-xs text-gray-400">{new Date(m.timestamp).toLocaleTimeString()} • {m.senderId || 'unknown'}</div>
                  <div className="text-sm text-gray-200 break-all">Encrypted payload: {m.ciphertext.slice(0, 24)}...</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-morphism p-4 rounded-lg border border-white/10 text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-white">How to run the server</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Start a Node server that wraps `CivicChatServer` (see `src/chat-core/server/CivicChatServer.ts`).</li>
            <li>Expose it at <code>ws://localhost:8787</code> or update the URL above.</li>
            <li>Use matching tokens for demo key derivation; replace with real key exchange for production.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
