/**
 * P2P UPDATES - Citizen-to-Citizen Data Sharing
 * Distributed network for civic data propagation
 */

export interface PeerNode {
  id: string;
  address: string;
  port: number;
  publicKey: string;
  lastSeen: Date;
  reputation: number;
  capabilities: PeerCapability[];
}

export type PeerCapability = 
  | 'full_node'
  | 'light_node'
  | 'validator'
  | 'relay'
  | 'archive';

export interface P2PMessage {
  id: string;
  type: MessageType;
  sender: string;
  timestamp: number;
  payload: unknown;
  signature: string;
  ttl: number;
}

export type MessageType =
  | 'bill_update'
  | 'vote_result'
  | 'amendment'
  | 'alert'
  | 'peer_discovery'
  | 'sync_request'
  | 'sync_response';

export interface SyncState {
  lastBlockIndex: number;
  lastBlockHash: string;
  syncedAt: Date;
  isSyncing: boolean;
}

export class P2PNetwork {
  private peers: Map<string, PeerNode> = new Map();
  private messageHistory: Map<string, P2PMessage> = new Map();
  private messageHandlers: Map<MessageType, Array<(msg: P2PMessage) => void>> = new Map();
  private syncState: SyncState;
  private nodeId: string;
  private maxPeers: number = 50;
  private messageRetention: number = 3600000; // 1 hour

  constructor(nodeId: string) {
    this.nodeId = nodeId;
    this.syncState = {
      lastBlockIndex: 0,
      lastBlockHash: '',
      syncedAt: new Date(),
      isSyncing: false
    };

    // Initialize message handlers
    this.initializeHandlers();
  }

  /**
   * Initialize default message handlers
   */
  private initializeHandlers(): void {
    const messageTypes: MessageType[] = [
      'bill_update',
      'vote_result',
      'amendment',
      'alert',
      'peer_discovery',
      'sync_request',
      'sync_response'
    ];

    messageTypes.forEach(type => {
      this.messageHandlers.set(type, []);
    });
  }

  /**
   * Connect to a peer
   */
  async connectPeer(address: string, port: number): Promise<PeerNode | null> {
    if (this.peers.size >= this.maxPeers) {
      console.warn('Maximum peer limit reached');
      return null;
    }

    try {
      // In production, this would establish WebSocket/WebRTC connection
      const peer: PeerNode = {
        id: `peer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        address,
        port,
        publicKey: '', // Would be exchanged during handshake
        lastSeen: new Date(),
        reputation: 0.5,
        capabilities: ['light_node']
      };

      this.peers.set(peer.id, peer);
      
      // Request peer discovery from new peer
      await this.requestPeerDiscovery(peer.id);
      
      return peer;
    } catch (error) {
      console.error('Failed to connect to peer:', error);
      return null;
    }
  }

  /**
   * Disconnect from a peer
   */
  disconnectPeer(peerId: string): void {
    this.peers.delete(peerId);
  }

  /**
   * Broadcast message to all peers
   */
  async broadcast(message: Omit<P2PMessage, 'id' | 'timestamp' | 'signature'>): Promise<void> {
    const fullMessage: P2PMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: Date.now(),
      signature: await this.signMessage(message)
    };

    // Store in history
    this.messageHistory.set(fullMessage.id, fullMessage);

    // Send to all peers
    const sendPromises = Array.from(this.peers.values()).map(peer =>
      this.sendToPeer(peer.id, fullMessage)
    );

    await Promise.allSettled(sendPromises);
  }

  /**
   * Send message to specific peer
   */
  async sendToPeer(peerId: string, message: P2PMessage): Promise<boolean> {
    const peer = this.peers.get(peerId);
    if (!peer) return false;

    try {
      // In production, this would send via WebSocket/WebRTC
      console.log(`Sending message ${message.id} to peer ${peerId}`);
      peer.lastSeen = new Date();
      return true;
    } catch (error) {
      console.error(`Failed to send to peer ${peerId}:`, error);
      this.handlePeerFailure(peerId);
      return false;
    }
  }

  /**
   * Handle incoming message
   */
  async handleMessage(message: P2PMessage): Promise<void> {
    // Check if already processed
    if (this.messageHistory.has(message.id)) {
      return;
    }

    // Verify message signature
    const isValid = await this.verifyMessage(message);
    if (!isValid) {
      console.warn('Invalid message signature');
      return;
    }

    // Check TTL
    if (message.ttl <= 0) {
      return;
    }

    // Store in history
    this.messageHistory.set(message.id, message);

    // Call registered handlers
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach(handler => handler(message));

    // Relay to other peers (decrement TTL)
    if (message.ttl > 1) {
      await this.relayMessage({
        ...message,
        ttl: message.ttl - 1
      });
    }
  }

  /**
   * Register message handler
   */
  onMessage(type: MessageType, handler: (msg: P2PMessage) => void): void {
    const handlers = this.messageHandlers.get(type) || [];
    handlers.push(handler);
    this.messageHandlers.set(type, handlers);
  }

  /**
   * Request peer discovery
   */
  private async requestPeerDiscovery(peerId: string): Promise<void> {
    await this.sendToPeer(peerId, {
      id: this.generateMessageId(),
      type: 'peer_discovery',
      sender: this.nodeId,
      timestamp: Date.now(),
      payload: { requestingPeers: true },
      signature: '',
      ttl: 1
    });
  }

  /**
   * Relay message to other peers
   */
  private async relayMessage(message: P2PMessage): Promise<void> {
    const otherPeers = Array.from(this.peers.values())
      .filter(p => p.id !== message.sender);

    await Promise.allSettled(
      otherPeers.map(peer => this.sendToPeer(peer.id, message))
    );
  }

  /**
   * Handle peer failure
   */
  private handlePeerFailure(peerId: string): void {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    peer.reputation -= 0.1;
    
    if (peer.reputation < 0.2) {
      this.disconnectPeer(peerId);
    }
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sign message (placeholder for actual crypto)
   */
  private async signMessage(message: unknown): Promise<string> {
    // In production, use actual cryptographic signing
    const data = JSON.stringify(message);
    return Buffer.from(data).toString('base64').substring(0, 32);
  }

  /**
   * Verify message signature
   */
  private async verifyMessage(message: P2PMessage): Promise<boolean> {
    // In production, verify cryptographic signature
    return message.signature.length > 0;
  }

  /**
   * Request sync from peers
   */
  async requestSync(): Promise<void> {
    this.syncState.isSyncing = true;

    await this.broadcast({
      type: 'sync_request',
      sender: this.nodeId,
      payload: {
        lastBlockIndex: this.syncState.lastBlockIndex,
        lastBlockHash: this.syncState.lastBlockHash
      },
      ttl: 3
    });
  }

  /**
   * Get network statistics
   */
  getStats(): {
    connectedPeers: number;
    messageCount: number;
    syncState: SyncState;
    averageReputation: number;
  } {
    const peers = Array.from(this.peers.values());
    const avgReputation = peers.length > 0
      ? peers.reduce((sum, p) => sum + p.reputation, 0) / peers.length
      : 0;

    return {
      connectedPeers: this.peers.size,
      messageCount: this.messageHistory.size,
      syncState: this.syncState,
      averageReputation: avgReputation
    };
  }

  /**
   * Get connected peers
   */
  getPeers(): PeerNode[] {
    return Array.from(this.peers.values());
  }

  /**
   * Cleanup old messages
   */
  cleanup(): void {
    const cutoff = Date.now() - this.messageRetention;
    
    for (const [id, msg] of this.messageHistory) {
      if (msg.timestamp < cutoff) {
        this.messageHistory.delete(id);
      }
    }
  }
}
