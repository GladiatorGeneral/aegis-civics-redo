import { CivicChatConfig, ChatEnvelope, EncryptedPayload, StoredMessage } from '../types';

export class CivicChatClient {
  private socket: WebSocket | null = null;
  private config: CivicChatConfig;
  private listeners: Array<(envelope: ChatEnvelope) => void> = [];

  constructor(config: CivicChatConfig) {
    this.config = config;
  }

  connect() {
    if (typeof WebSocket === 'undefined') {
      console.warn('WebSocket not available in this environment');
      return;
    }

    const url = new URL(this.config.wsUrl);
    if (this.config.token) {
      url.searchParams.set('token', this.config.token);
    }

    this.socket = new WebSocket(url.toString());
    this.socket.onmessage = (event) => {
      try {
        const envelope = JSON.parse(event.data) as ChatEnvelope;
        this.listeners.forEach((cb) => cb(envelope));
      } catch (err) {
        console.error('Failed to parse message', err);
      }
    };

    this.socket.onopen = () => {
      console.info('[CivicChat] connected');
    };

    this.socket.onerror = (err) => {
      console.error('[CivicChat] socket error', err);
    };
  }

  onMessage(callback: (envelope: ChatEnvelope) => void) {
    this.listeners.push(callback);
  }

  joinRoom(roomId: string) {
    this.send({ type: 'JOIN_ROOM', roomId });
  }

  leaveRoom(roomId: string) {
    this.send({ type: 'LEAVE_ROOM', roomId });
  }

  sendChat(roomId: string, payload: EncryptedPayload) {
    this.send({ type: 'CHAT_MESSAGE', roomId, payload });
  }

  createRoom(name: string, topic?: string) {
    this.send({ type: 'CREATE_ROOM', payload: { name, topic } });
  }

  private send(envelope: ChatEnvelope) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('[CivicChat] socket not ready');
      return;
    }
    this.socket.send(JSON.stringify(envelope));
  }
}

export function mapEnvelopeToDisplay(envelope: ChatEnvelope): StoredMessage | null {
  if (envelope.type === 'MESSAGE_RECEIVED' && envelope.payload) {
    return envelope.payload as StoredMessage;
  }
  return null;
}
