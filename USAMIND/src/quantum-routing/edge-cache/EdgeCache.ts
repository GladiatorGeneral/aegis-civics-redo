/**
 * EDGE CACHE SYSTEM
 * CDN-like caching for civic data
 * Low-latency data delivery
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  priority: number;
  hits: number;
  lastAccessed: number;
}

export interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  cleanupInterval: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  avgLatency: number;
}

export class EdgeCache<T = unknown> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private config: CacheConfig;
  private stats = {
    hits: 0,
    misses: 0,
    totalLatency: 0,
    operations: 0
  };
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<CacheConfig>) {
    this.config = {
      maxSize: 10000,
      defaultTTL: 60000, // 1 minute
      cleanupInterval: 30000, // 30 seconds
      ...config
    };

    this.startCleanup();
  }

  /**
   * Get item from cache
   */
  async get(key: string): Promise<T | null> {
    const startTime = Date.now();
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.recordLatency(startTime);
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.recordLatency(startTime);
      return null;
    }

    // Update access stats
    entry.hits++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    this.recordLatency(startTime);

    return entry.data;
  }

  /**
   * Set item in cache
   */
  async set(key: string, data: T, priority: number = 1, ttl?: number): Promise<void> {
    // Evict if at capacity
    if (this.cache.size >= this.config.maxSize) {
      await this.evict();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL,
      priority,
      hits: 0,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Delete item from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Evict least valuable entries
   */
  private async evict(): Promise<void> {
    // Calculate eviction score (lower = more likely to evict)
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      entry,
      score: this.calculateScore(entry)
    }));

    // Sort by score ascending
    entries.sort((a, b) => a.score - b.score);

    // Evict bottom 10%
    const evictCount = Math.ceil(this.config.maxSize * 0.1);
    for (let i = 0; i < evictCount && i < entries.length; i++) {
      this.cache.delete(entries[i].key);
    }
  }

  /**
   * Calculate cache entry value score
   */
  private calculateScore(entry: CacheEntry<T>): number {
    const ageWeight = 0.3;
    const hitsWeight = 0.4;
    const priorityWeight = 0.2;
    const recencyWeight = 0.1;

    const age = Date.now() - entry.timestamp;
    const maxAge = entry.ttl;
    const ageScore = 1 - (age / maxAge);

    const hitsScore = Math.min(1, entry.hits / 100);
    const priorityScore = entry.priority;
    
    const recency = Date.now() - entry.lastAccessed;
    const recencyScore = 1 - Math.min(1, recency / 60000);

    return (
      ageScore * ageWeight +
      hitsScore * hitsWeight +
      priorityScore * priorityWeight +
      recencyScore * recencyWeight
    );
  }

  /**
   * Start cleanup interval
   */
  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Record operation latency
   */
  private recordLatency(startTime: number): void {
    this.stats.totalLatency += Date.now() - startTime;
    this.stats.operations++;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate: total > 0 ? this.stats.hits / total : 0,
      avgLatency: this.stats.operations > 0 
        ? this.stats.totalLatency / this.stats.operations 
        : 0
    };
  }

  /**
   * Get all keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Stop cleanup timer
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
}
