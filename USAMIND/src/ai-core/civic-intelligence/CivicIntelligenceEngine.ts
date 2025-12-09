/**
 * CIVIC INTELLIGENCE CORE
 * Constitutional AI with ethical governance principles
 * Ensures all AI operations align with democratic values
 */

export interface ConstitutionalRule {
  id: string;
  article: string;
  section: string;
  clause: string;
  description: string;
  keywords: string[];
  weight: number;
}

export interface CivicDecision {
  action: string;
  constitutionalBasis: string[];
  ethicalScore: number;
  democraticAlignment: number;
  transparencyLevel: 'full' | 'partial' | 'classified';
  explanation: string;
}

export interface CitizenFeedback {
  id: string;
  topic: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  intensity: number;
  timestamp: Date;
  region: string;
}

export class CivicIntelligenceEngine {
  private constitutionalRules: ConstitutionalRule[] = [];
  private ethicalGuidelines: Map<string, number> = new Map();
  private citizenFeedback: CitizenFeedback[] = [];

  constructor() {
    this.initializeConstitution();
    this.initializeEthics();
  }

  /**
   * Initialize constitutional rules database
   */
  private initializeConstitution(): void {
    this.constitutionalRules = [
      {
        id: '1a-speech',
        article: 'Amendment I',
        section: 'Bill of Rights',
        clause: 'Free Speech',
        description: 'Congress shall make no law abridging freedom of speech',
        keywords: ['speech', 'expression', 'press', 'assembly', 'petition'],
        weight: 1.0
      },
      {
        id: '1a-religion',
        article: 'Amendment I',
        section: 'Bill of Rights',
        clause: 'Religious Freedom',
        description: 'Congress shall make no law respecting an establishment of religion',
        keywords: ['religion', 'worship', 'faith', 'church', 'state'],
        weight: 1.0
      },
      {
        id: '4a-search',
        article: 'Amendment IV',
        section: 'Bill of Rights',
        clause: 'Search and Seizure',
        description: 'Protection against unreasonable searches and seizures',
        keywords: ['search', 'seizure', 'warrant', 'privacy', 'probable cause'],
        weight: 1.0
      },
      {
        id: '14a-equal',
        article: 'Amendment XIV',
        section: 'Reconstruction',
        clause: 'Equal Protection',
        description: 'No state shall deny equal protection of the laws',
        keywords: ['equal', 'protection', 'discrimination', 'rights', 'due process'],
        weight: 1.0
      },
      {
        id: 'art1-commerce',
        article: 'Article I',
        section: 'Section 8',
        clause: 'Commerce Clause',
        description: 'Congress shall regulate commerce among the states',
        keywords: ['commerce', 'trade', 'interstate', 'regulation', 'economic'],
        weight: 0.9
      }
    ];
  }

  /**
   * Initialize ethical guidelines
   */
  private initializeEthics(): void {
    this.ethicalGuidelines.set('transparency', 0.95);
    this.ethicalGuidelines.set('accountability', 0.95);
    this.ethicalGuidelines.set('fairness', 0.90);
    this.ethicalGuidelines.set('privacy', 0.85);
    this.ethicalGuidelines.set('accessibility', 0.90);
    this.ethicalGuidelines.set('democratic_participation', 0.95);
  }

  /**
   * Evaluate action against constitutional principles
   */
  evaluateConstitutionality(
    action: string,
    context: string[]
  ): { score: number; violations: string[]; alignments: string[] } {
    const violations: string[] = [];
    const alignments: string[] = [];
    let totalScore = 0;
    let ruleCount = 0;

    for (const rule of this.constitutionalRules) {
      const relevance = this.calculateRelevance(action, context, rule.keywords);
      
      if (relevance > 0.3) {
        ruleCount++;
        const alignment = this.assessAlignment(action, rule);
        totalScore += alignment * rule.weight;

        if (alignment >= 0.7) {
          alignments.push(`${rule.article}: ${rule.clause}`);
        } else if (alignment < 0.5) {
          violations.push(`Potential ${rule.article} concern: ${rule.description}`);
        }
      }
    }

    return {
      score: ruleCount > 0 ? totalScore / ruleCount : 0.5,
      violations,
      alignments
    };
  }

  /**
   * Calculate relevance of action to constitutional keywords
   */
  private calculateRelevance(
    action: string,
    context: string[],
    keywords: string[]
  ): number {
    const allText = [action, ...context].join(' ').toLowerCase();
    let matches = 0;

    for (const keyword of keywords) {
      if (allText.includes(keyword.toLowerCase())) {
        matches++;
      }
    }

    return matches / keywords.length;
  }

  /**
   * Assess alignment with constitutional rule
   */
  private assessAlignment(action: string, rule: ConstitutionalRule): number {
    // Simplified alignment assessment
    // In production, this would use NLP and legal analysis
    const actionLower = action.toLowerCase();
    
    // Check for protective language
    const protectiveTerms = ['protect', 'ensure', 'safeguard', 'preserve', 'uphold'];
    const restrictiveTerms = ['restrict', 'limit', 'prohibit', 'ban', 'prevent'];
    
    let protectiveScore = 0;
    let restrictiveScore = 0;

    for (const term of protectiveTerms) {
      if (actionLower.includes(term)) protectiveScore++;
    }
    for (const term of restrictiveTerms) {
      if (actionLower.includes(term)) restrictiveScore++;
    }

    // Base alignment
    let alignment = 0.7;
    alignment += protectiveScore * 0.05;
    alignment -= restrictiveScore * 0.08;

    return Math.max(0, Math.min(1, alignment));
  }

  /**
   * Generate civic decision with full transparency
   */
  async generateCivicDecision(
    proposal: string,
    context: Record<string, unknown>
  ): Promise<CivicDecision> {
    const constitutionalAnalysis = this.evaluateConstitutionality(
      proposal,
      Object.keys(context)
    );

    const ethicalScore = this.calculateEthicalScore(proposal);
    const democraticAlignment = await this.assessDemocraticAlignment(proposal);

    return {
      action: proposal,
      constitutionalBasis: constitutionalAnalysis.alignments,
      ethicalScore,
      democraticAlignment,
      transparencyLevel: 'full',
      explanation: this.generateExplanation(
        constitutionalAnalysis,
        ethicalScore,
        democraticAlignment
      )
    };
  }

  /**
   * Calculate ethical score for proposal
   */
  private calculateEthicalScore(proposal: string): number {
    let score = 0;
    let count = 0;

    for (const [principle, weight] of this.ethicalGuidelines) {
      const alignment = this.assessEthicalPrinciple(proposal, principle);
      score += alignment * weight;
      count++;
    }

    return count > 0 ? score / count : 0.5;
  }

  /**
   * Assess alignment with ethical principle
   */
  private assessEthicalPrinciple(proposal: string, principle: string): number {
    // Simplified ethical assessment
    const proposalLower = proposal.toLowerCase();
    
    const principleKeywords: Record<string, string[]> = {
      transparency: ['open', 'public', 'disclose', 'report', 'audit'],
      accountability: ['responsible', 'accountable', 'oversight', 'review'],
      fairness: ['equal', 'fair', 'unbiased', 'impartial', 'equitable'],
      privacy: ['private', 'confidential', 'secure', 'protect data'],
      accessibility: ['accessible', 'inclusive', 'available', 'easy'],
      democratic_participation: ['vote', 'participate', 'citizen', 'public input']
    };

    const keywords = principleKeywords[principle] || [];
    let matches = 0;

    for (const keyword of keywords) {
      if (proposalLower.includes(keyword)) matches++;
    }

    return 0.5 + (matches / keywords.length) * 0.5;
  }

  /**
   * Assess democratic alignment
   */
  private async assessDemocraticAlignment(proposal: string): Promise<number> {
    // Analyze citizen feedback alignment
    const recentFeedback = this.citizenFeedback.filter(f => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return f.timestamp > thirtyDaysAgo;
    });

    if (recentFeedback.length === 0) {
      return 0.5; // Neutral without feedback
    }

    // Calculate sentiment alignment
    const positiveCount = recentFeedback.filter(f => f.sentiment === 'positive').length;
    const negativeCount = recentFeedback.filter(f => f.sentiment === 'negative').length;
    
    return positiveCount / (positiveCount + negativeCount + 1);
  }

  /**
   * Generate human-readable explanation
   */
  private generateExplanation(
    constitutional: { score: number; violations: string[]; alignments: string[] },
    ethical: number,
    democratic: number
  ): string {
    let explanation = '';

    // Constitutional assessment
    if (constitutional.alignments.length > 0) {
      explanation += `This action aligns with: ${constitutional.alignments.join(', ')}. `;
    }
    if (constitutional.violations.length > 0) {
      explanation += `Constitutional concerns: ${constitutional.violations.join('; ')}. `;
    }

    // Ethical assessment
    if (ethical >= 0.8) {
      explanation += 'This action meets high ethical standards. ';
    } else if (ethical >= 0.6) {
      explanation += 'This action meets basic ethical requirements with room for improvement. ';
    } else {
      explanation += 'This action requires ethical review before proceeding. ';
    }

    // Democratic assessment
    if (democratic >= 0.7) {
      explanation += 'Strong public support indicated.';
    } else if (democratic >= 0.4) {
      explanation += 'Mixed public sentiment on this matter.';
    } else {
      explanation += 'Limited public support - consider additional outreach.';
    }

    return explanation;
  }

  /**
   * Add citizen feedback for democratic alignment
   */
  addCitizenFeedback(feedback: CitizenFeedback): void {
    this.citizenFeedback.push(feedback);
  }

  /**
   * Get aggregated citizen sentiment
   */
  getAggregatedSentiment(topic: string): {
    positive: number;
    negative: number;
    neutral: number;
    total: number;
  } {
    const relevant = this.citizenFeedback.filter(f =>
      f.topic.toLowerCase().includes(topic.toLowerCase())
    );

    return {
      positive: relevant.filter(f => f.sentiment === 'positive').length,
      negative: relevant.filter(f => f.sentiment === 'negative').length,
      neutral: relevant.filter(f => f.sentiment === 'neutral').length,
      total: relevant.length
    };
  }
}
