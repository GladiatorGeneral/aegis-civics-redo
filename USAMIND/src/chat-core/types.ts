export type RoomVisibility = 'public' | 'private';

export interface CivicUser {
  id: string;
  username: string;
  publicKey?: string;
}

export interface CivicRoom {
  id: string;
  name: string;
  topic?: string;
  visibility: RoomVisibility;
  isGroup: boolean;
}

export interface ChatEnvelope<T = unknown> {
  type:
    | 'JOIN_ROOM'
    | 'LEAVE_ROOM'
    | 'CHAT_MESSAGE'
    | 'CREATE_ROOM'
    | 'MESSAGE_RECEIVED'
    | 'AI_INSIGHT'
    | 'SYSTEM';
  roomId?: string;
  payload?: T;
}

export interface EncryptedPayload {
  ciphertext: string; // base64
  iv: string; // base64
  senderId: string;
  timestamp: number;
}

export interface StoredMessage extends EncryptedPayload {
  id: string;
  roomId: string;
}

export interface RoomKeyMaterial {
  roomId: string;
  encryptedRoomKey: string; // encrypted with recipient public key (base64)
}

export interface CivicChatConfig {
  wsUrl: string;
  token?: string;
}
