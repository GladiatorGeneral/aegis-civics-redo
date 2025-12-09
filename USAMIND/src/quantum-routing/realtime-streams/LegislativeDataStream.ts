/**
 * REAL-TIME LEGISLATIVE DATA STREAM
 * WebSocket + Server-Sent Events
 * Edge caching for low latency
 * AI-driven data prioritization
 */

import { EdgeCache } from '../edge-cache/EdgeCache';
import { DataPrioritizer, Priority, DataType } from './DataPrioritizer';

export interface LegislativeData {
  id: string;
  type: DataType;
  title: string;
  summary: string;
  timestamp: number;
  source: string;
  chamber?: 'house' | 'senate' | 'joint';
  billId?: string;
  metadata?: Record<string, unknown>;
}

export interface Subscriber {
  topic: string;
  callback: DataCallback;
  filters?: SubscriberFilters;
}

export interface SubscriberFilters {
  types?: DataType[];
  chambers?: Array<'house' | 'senate' | 'joint'>;
  minPriority?: Priority;
  keywords?: string[];
}

export type DataCallback = (data: LegislativeData) => void;

export interface StreamConfig {
  wsUrl: string;
  reconnectInterval: number;
  maxReconnectAttempts: number;
  edgeCacheTTL: number;
}

export class LegislativeDataStream {
  private ws: WebSocket | null = null;
  private edgeCache: EdgeCache<LegislativeData>;
  private prioritizer: DataPrioritizer;
  private subscribers: Map<string, Subscriber> = new Map();
  private config: StreamConfig;
  private reconnectAttempts: number = 0;
  private isConnected: boolean = false;
  private messageQueue: LegislativeData[] = [];

  constructor(config?: Partial<StreamConfig>) {
    this.config = {
      wsUrl: 'wss://congressional-stream.usamind.ai/quantum',
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      edgeCacheTTL: 5000,
      ...config
    };

    this.edgeCache = new EdgeCache({ 
      defaultTTL: this.config.edgeCacheTTL,
      maxSize: 1000
    });
    this.prioritizer = new DataPrioritizer();
  }

  /**
   * Initialize WebSocket connection
   */
  connect(): void {
    if (typeof WebSocket === 'undefined') {
      console.warn('WebSocket not available in this environment');
      return;
    }

    try {
      this.ws = new WebSocket(this.config.wsUrl);
      this.initializeConnection();
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      this.scheduleReconnect();
    }
  }

  /**
   * Initialize connection handlers
   */
  private initializeConnection(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('Legislative stream connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.flushMessageQueue();
    };

    this.ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data) as LegislativeData;
        await this.handleIncomingData(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('Legislative stream disconnected');
      this.isConnected = false;
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  /**
   * Handle incoming data
   */
  private async handleIncomingData(data: LegislativeData): Promise<void> {
    // Calculate priority
    const priority = await this.prioritizer.calculatePriority({
      type: data.type,
      timestamp: data.timestamp,
      urgency: this.extractUrgency(data),
      relevance: this.calculateRelevance(data)
    });

    // Cache at edge for fast retrieval
    await this.edgeCache.set(data.id, data, priority);

    // Notify subscribers based on priority and filters
    this.notifySubscribers(data, priority);
  }

  /**
   * Extract urgency from data
   */
  private extractUrgency(data: LegislativeData): number {
    if (data.type === 'emergency_alert') return 1.0;
    if (data.type === 'vote_result') return 0.8;
    if (data.type === 'floor_action') return 0.7;
    return 0.5;
  }

  /**
   * Calculate data relevance
   */
  private calculateRelevance(data: LegislativeData): number {
    // Base relevance
    let relevance = 0.5;

    // Boost for recent data
    const age = Date.now() - data.timestamp;
    if (age < 60000) relevance += 0.2; // < 1 minute
    else if (age < 300000) relevance += 0.1; // < 5 minutes

    // Boost for important chambers
    if (data.chamber === 'joint') relevance += 0.1;

    return Math.min(1, relevance);
  }

  /**
   * Subscribe to data stream
   */
  subscribe(
    topic: string,
    callback: DataCallback,
    filters?: SubscriberFilters
  ): string {
    const id = this.generateSubscriptionId();
    this.subscribers.set(id, { topic, callback, filters });
    return id;
  }

  /**
   * Unsubscribe from data stream
   */
  unsubscribe(subscriptionId: string): void {
    this.subscribers.delete(subscriptionId);
  }

  /**
   * Notify relevant subscribers
   */
  private notifySubscribers(data: LegislativeData, priority: Priority): void {
    this.subscribers.forEach((subscriber) => {
      if (this.shouldNotify(subscriber, data, priority)) {
        subscriber.callback(data);
      }
    });
  }

  /**
   * Determine if subscriber should receive data
   */
  private shouldNotify(
    subscriber: Subscriber,
    data: LegislativeData,
    priority: Priority
  ): boolean {
    const { filters } = subscriber;
    
    if (!filters) {
      // No filters, check topic threshold
      return priority >= this.prioritizer.getThreshold(subscriber.topic);
    }

    // Check type filter
    if (filters.types && !filters.types.includes(data.type)) {
      return false;
    }

    // Check chamber filter
    if (filters.chambers && data.chamber && !filters.chambers.includes(data.chamber)) {
      return false;
    }

    // Check minimum priority
    if (filters.minPriority !== undefined && priority < filters.minPriority) {
      return false;
    }

    // Check keyword filter
    if (filters.keywords && filters.keywords.length > 0) {
      const content = `${data.title} ${data.summary}`.toLowerCase();
      const hasKeyword = filters.keywords.some(k => 
        content.includes(k.toLowerCase())
      );
      if (!hasKeyword) return false;
    }

    return true;
  }

  /**
   * Get cached data by ID
   */
  async getCached(id: string): Promise<LegislativeData | null> {
    return await this.edgeCache.get(id);
  }

  /**
   * Get recent data from cache
   */
  getRecentData(): LegislativeData[] {
    const keys = this.edgeCache.keys();
    const results: LegislativeData[] = [];

    for (const key of keys) {
      // Synchronous check - cache.get is async but we can check existence
      if (this.edgeCache.has(key)) {
        // In real implementation, would batch these
        results.push({ 
          id: key, 
          type: 'general_update',
          title: '',
          summary: '',
          timestamp: Date.now(),
          source: ''
        });
      }
    }

    return results;
  }

  /**
   * Schedule reconnection
   */
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * Flush queued messages
   */
  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const data = this.messageQueue.shift();
      if (data) {
        this.handleIncomingData(data);
      }
    }
  }

  /**
   * Generate unique subscription ID
   */
  private generateSubscriptionId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Disconnect from stream
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }

  /**
   * Check connection status
   */
  get connected(): boolean {
    return this.isConnected;
  }

  /**
   * Get subscriber count
   */
  get subscriberCount(): number {
    return this.subscribers.size;
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.edgeCache.getStats();
  }
}

/**
 * React hook for civic mesh data
 */
export function useCivicMeshData() {
  // Placeholder hook - would be implemented with React state
  return {
    bills: [],
    votes: [],
    updates: []
  };
}

// Additive real-time stream variant reflecting the Phase 8 outline.
type WebSocketCtor = new (url: string) => WebSocket;

function resolveWebSocket(): WebSocketCtor | null {
  // Browser global only; if unavailable, stay disconnected without requiring a module.
  if (typeof WebSocket !== 'undefined') {
    return WebSocket as unknown as WebSocketCtor;
  }
  return null;
}

export class LegislativeDataStreamRealtime {
  private ws: WebSocket | null = null;
  private edgeCache: EdgeCache<LegislativeData>;
  private prioritizer: DataPrioritizer;
  private subscribers: Map<string, Subscriber> = new Map();
  private wsCtor: WebSocketCtor | null;
  private url: string;

  constructor(url = 'wss://congressional-stream.usamind.ai/quantum') {
    this.url = url;
    this.wsCtor = resolveWebSocket();
    this.edgeCache = new EdgeCache({ defaultTTL: 5000, maxSize: 1000 });
    this.prioritizer = new DataPrioritizer();
    this.initializeConnection();
  }

  private initializeConnection(): void {
    if (!this.wsCtor) {
      console.warn('WebSocket unavailable; stream inactive');
      return;
    }

    this.ws = new this.wsCtor(this.url);

    this.ws.addEventListener?.('message', async (event: MessageEvent) => {
      const parsed = JSON.parse((event as any).data?.toString?.() ?? 'null') as LegislativeData;
      const priority = await this.prioritizer.calculatePriority({
        type: parsed.type,
        timestamp: parsed.timestamp,
        urgency: 0.5,
        relevance: 0.5
      });

      await this.edgeCache.set(parsed.id, parsed, priority);
      this.notifySubscribers(parsed, priority);
    });
  }

  subscribe(topic: string, callback: DataCallback): string {
    const id = `rt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.subscribers.set(id, { topic, callback });
    return id;
  }

  private notifySubscribers(data: LegislativeData, priority: Priority): void {
    this.subscribers.forEach((subscriber) => {
      if (priority >= this.prioritizer.getThreshold(subscriber.topic)) {
        subscriber.callback(data);
      }
    });
  }
}
