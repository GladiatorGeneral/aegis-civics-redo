/**
 * DATA PRIORITIZER
 * AI-driven data prioritization for real-time streams
 */

export type DataType = 
  | 'emergency_alert'
  | 'vote_result'
  | 'bill_update'
  | 'amendment'
  | 'committee_action'
  | 'floor_action'
  | 'general_update';

export interface PrioritizableData {
  type: DataType;
  timestamp: number;
  urgency?: number;
  relevance?: number;
  viewerCount?: number;
  keywords?: string[];
}

export type Priority = number; // 0-1 scale

export interface PriorityConfig {
  typeWeights: Record<DataType, number>;
  urgencyWeight: number;
  relevanceWeight: number;
  viewerWeight: number;
  recencyDecay: number;
}

export class DataPrioritizer {
  private config: PriorityConfig;
  private thresholds: Map<string, number> = new Map();
  private userPreferences: Map<string, string[]> = new Map();

  constructor(config?: Partial<PriorityConfig>) {
    this.config = {
      typeWeights: {
        emergency_alert: 1.0,
        vote_result: 0.9,
        bill_update: 0.7,
        amendment: 0.6,
        committee_action: 0.5,
        floor_action: 0.8,
        general_update: 0.3
      },
      urgencyWeight: 0.3,
      relevanceWeight: 0.25,
      viewerWeight: 0.15,
      recencyDecay: 0.001,
      ...config
    };

    // Set default thresholds
    this.thresholds.set('emergency', 0.9);
    this.thresholds.set('high', 0.7);
    this.thresholds.set('medium', 0.4);
    this.thresholds.set('low', 0.0);
  }

  /**
   * Calculate priority for data item
   */
  async calculatePriority(data: PrioritizableData): Promise<Priority> {
    let priority = 0;

    // Type-based priority
    const typeWeight = this.config.typeWeights[data.type] || 0.5;
    priority += typeWeight * 0.3;

    // Urgency factor
    if (data.urgency !== undefined) {
      priority += data.urgency * this.config.urgencyWeight;
    }

    // Relevance factor
    if (data.relevance !== undefined) {
      priority += data.relevance * this.config.relevanceWeight;
    }

    // Viewer interest factor
    if (data.viewerCount !== undefined) {
      const normalizedViewers = Math.min(1, data.viewerCount / 100000);
      priority += normalizedViewers * this.config.viewerWeight;
    }

    // Recency decay
    const age = Date.now() - data.timestamp;
    const decayFactor = Math.exp(-this.config.recencyDecay * age / 1000);
    priority *= decayFactor;

    // Keyword boost
    if (data.keywords && data.keywords.length > 0) {
      const keywordBoost = this.calculateKeywordBoost(data.keywords);
      priority += keywordBoost * 0.1;
    }

    return Math.min(1, Math.max(0, priority));
  }

  /**
   * Calculate keyword relevance boost
   */
  private calculateKeywordBoost(keywords: string[]): number {
    const highPriorityKeywords = [
      'emergency', 'urgent', 'breaking', 'critical',
      'vote', 'passed', 'failed', 'veto',
      'supreme court', 'constitutional', 'amendment'
    ];

    let boost = 0;
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      if (highPriorityKeywords.some(hp => lowerKeyword.includes(hp))) {
        boost += 0.2;
      }
    }

    return Math.min(1, boost);
  }

  /**
   * Get threshold for topic
   */
  getThreshold(topic: string): number {
    // Check user preferences
    const userKeywords = this.userPreferences.get(topic);
    if (userKeywords && userKeywords.length > 0) {
      // Lower threshold for topics user cares about
      return 0.2;
    }

    // Return default threshold based on topic type
    if (topic.includes('emergency') || topic.includes('alert')) {
      return this.thresholds.get('emergency') || 0.9;
    }
    if (topic.includes('vote') || topic.includes('bill')) {
      return this.thresholds.get('high') || 0.7;
    }
    return this.thresholds.get('medium') || 0.4;
  }

  /**
   * Set user preferences for personalized prioritization
   */
  setUserPreferences(userId: string, topics: string[]): void {
    this.userPreferences.set(userId, topics);
  }

  /**
   * Get user preferences
   */
  getUserPreferences(userId: string): string[] {
    return this.userPreferences.get(userId) || [];
  }

  /**
   * Batch prioritize multiple items
   */
  async batchPrioritize(items: PrioritizableData[]): Promise<Array<{
    data: PrioritizableData;
    priority: Priority;
  }>> {
    const results = await Promise.all(
      items.map(async (data) => ({
        data,
        priority: await this.calculatePriority(data)
      }))
    );

    // Sort by priority descending
    return results.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Filter items by minimum priority
   */
  async filterByPriority(
    items: PrioritizableData[],
    minPriority: Priority
  ): Promise<PrioritizableData[]> {
    const prioritized = await this.batchPrioritize(items);
    return prioritized
      .filter(item => item.priority >= minPriority)
      .map(item => item.data);
  }

  /**
   * Get priority level label
   */
  getPriorityLevel(priority: Priority): 'emergency' | 'high' | 'medium' | 'low' {
    if (priority >= 0.9) return 'emergency';
    if (priority >= 0.7) return 'high';
    if (priority >= 0.4) return 'medium';
    return 'low';
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<PriorityConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Set custom threshold
   */
  setThreshold(level: string, value: number): void {
    this.thresholds.set(level, Math.min(1, Math.max(0, value)));
  }
}
