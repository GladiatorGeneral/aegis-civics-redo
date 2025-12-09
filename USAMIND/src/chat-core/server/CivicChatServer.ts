// server-only
import { WebSocketServer, WebSocket } from 'ws';
import { ChatEnvelope, EncryptedPayload } from '../types';

interface AuthResult {
  userId: string | null;
}

export class CivicChatServer {
  private wss: WebSocketServer;
  private activeConnections = new Map<string, WebSocket>();
  private userRooms = new Map<string, Set<string>>();

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });
    this.bind();
  }

  private bind() {
    this.wss.on('connection', (socket, request) => {
      const auth = this.authenticate(request);
      if (!auth.userId) {
        socket.close();
        return;
      }

      this.activeConnections.set(auth.userId, socket);

      socket.on('message', (data) => {
        try {
          const envelope = JSON.parse(data.toString()) as ChatEnvelope<EncryptedPayload>;
          this.handleEnvelope(auth.userId!, envelope);
        } catch (err) {
          console.error('Failed to parse message', err);
        }
      });

      socket.on('close', () => {
        this.activeConnections.delete(auth.userId!);
        this.userRooms.delete(auth.userId!);
      });
    });
  }

  private authenticate(request: any): AuthResult {
    // TODO: wire to real auth/token validation
    const url = new URL(request.url ?? '', 'http://localhost');
    const token = url.searchParams.get('token');
    return { userId: token ?? null };
  }

  private handleEnvelope(senderId: string, envelope: ChatEnvelope<EncryptedPayload>) {
    const { type, roomId, payload } = envelope;

    switch (type) {
      case 'JOIN_ROOM':
        this.joinRoom(senderId, roomId!);
        break;
      case 'LEAVE_ROOM':
        this.leaveRoom(senderId, roomId!);
        break;
      case 'CHAT_MESSAGE':
        this.broadcast(roomId!, envelope, senderId);
        break;
      case 'CREATE_ROOM':
        // placeholder for room creation persistence
        break;
      default:
        break;
    }
  }

  private joinRoom(userId: string, roomId: string) {
    const rooms = this.userRooms.get(userId) ?? new Set<string>();
    rooms.add(roomId);
    this.userRooms.set(userId, rooms);
  }

  private leaveRoom(userId: string, roomId: string) {
    const rooms = this.userRooms.get(userId);
    if (!rooms) return;
    rooms.delete(roomId);
  }

  private broadcast(roomId: string, envelope: ChatEnvelope, excludeUserId?: string) {
    this.userRooms.forEach((rooms, uid) => {
      if (rooms.has(roomId) && uid !== excludeUserId) {
        const socket = this.activeConnections.get(uid);
        socket?.send(JSON.stringify({ type: 'MESSAGE_RECEIVED', payload: envelope.payload }));
      }
    });
  }
}
