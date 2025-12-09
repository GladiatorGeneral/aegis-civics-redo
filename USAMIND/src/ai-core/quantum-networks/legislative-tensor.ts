/**
 * LEGISLATIVE TENSOR
 * Neural network layer for processing legislative data patterns
 * Stores 30 years of historical voting patterns
 */

export interface LegislativeTensorConfig {
  historicalVotes: string;
  senatorPatterns: string;
  billCorrelations: string;
}

export interface SenatorPattern {
  id: string;
  name: string;
  party: 'D' | 'R' | 'I';
  state: string;
  votingVector: number[];
  predictability: number;
  keyIssues: string[];
}

export interface BillPattern {
  id: string;
  category: string;
  sponsors: string[];
  cosponsors: string[];
  textEmbedding: number[];
  historicalSimilarity: number[];
}

export class LegislativeTensor {
  private config: LegislativeTensorConfig;
  private senatorPatterns: Map<string, SenatorPattern> = new Map();
  private billPatterns: Map<string, BillPattern> = new Map();
  private correlationMatrix: number[][] = [];

  constructor(config: LegislativeTensorConfig) {
    this.config = config;
    this.initializePatterns();
  }

  /**
   * Initialize patterns from historical data
   */
  private initializePatterns(): void {
    // In production, this would load from a database
    // Simulating pattern initialization
    this.correlationMatrix = this.generateCorrelationMatrix(100, 100);
  }

  /**
   * Generate correlation matrix for bill-senator relationships
   */
  private generateCorrelationMatrix(rows: number, cols: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        // Simulate correlation values between -1 and 1
        matrix[i][j] = (Math.random() * 2) - 1;
      }
    }
    return matrix;
  }

  /**
   * Add senator pattern to tensor
   */
  addSenatorPattern(pattern: SenatorPattern): void {
    this.senatorPatterns.set(pattern.id, pattern);
  }

  /**
   * Add bill pattern to tensor
   */
  addBillPattern(pattern: BillPattern): void {
    this.billPatterns.set(pattern.id, pattern);
  }

  /**
   * Calculate similarity between two bills
   */
  calculateBillSimilarity(billA: string, billB: string): number {
    const patternA = this.billPatterns.get(billA);
    const patternB = this.billPatterns.get(billB);

    if (!patternA || !patternB) return 0;

    // Cosine similarity of text embeddings
    return this.cosineSimilarity(
      patternA.textEmbedding,
      patternB.textEmbedding
    );
  }

  /**
   * Predict senator vote based on patterns
   */
  predictSenatorVote(
    senatorId: string,
    billEmbedding: number[]
  ): { vote: 'yea' | 'nay' | 'abstain'; confidence: number } {
    const senator = this.senatorPatterns.get(senatorId);
    
    if (!senator) {
      return { vote: 'abstain', confidence: 0 };
    }

    // Calculate alignment between senator voting vector and bill
    const alignment = this.cosineSimilarity(senator.votingVector, billEmbedding);
    
    if (alignment > 0.3) {
      return { 
        vote: 'yea', 
        confidence: Math.min(0.95, senator.predictability * (0.5 + alignment / 2))
      };
    } else if (alignment < -0.3) {
      return { 
        vote: 'nay', 
        confidence: Math.min(0.95, senator.predictability * (0.5 - alignment / 2))
      };
    }
    
    return { 
      vote: 'abstain', 
      confidence: 0.3 
    };
  }

  /**
   * Get cross-dimensional correlations
   */
  getCrossDimensionalCorrelations(
    dimensions: string[]
  ): Map<string, number[]> {
    const correlations = new Map<string, number[]>();
    
    dimensions.forEach((dim, idx) => {
      if (idx < this.correlationMatrix.length) {
        correlations.set(dim, this.correlationMatrix[idx]);
      }
    });
    
    return correlations;
  }

  /**
   * Cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    if (normA === 0 || normB === 0) return 0;
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Export tensor for model training
   */
  exportForTraining(): {
    senators: SenatorPattern[];
    bills: BillPattern[];
    correlations: number[][];
  } {
    return {
      senators: Array.from(this.senatorPatterns.values()),
      bills: Array.from(this.billPatterns.values()),
      correlations: this.correlationMatrix
    };
  }
}
