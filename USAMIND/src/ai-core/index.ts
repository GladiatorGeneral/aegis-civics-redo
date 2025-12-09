/**
 * AI Core Module Exports
 * Central export point for all AI components
 */

// Quantum Networks
export { 
  createQuantumNetwork, 
  QuantumNetwork, 
  useQuantumNetwork 
} from './quantum-networks/core';
export type { 
  QuantumConfig, 
  QuantumState, 
  EntangledPair 
} from './quantum-networks/core';

export { LegislativeTensor } from './quantum-networks/legislative-tensor';
export type { 
  LegislativeTensorConfig, 
  SenatorPattern, 
  BillPattern 
} from './quantum-networks/legislative-tensor';

// Legislative Predictor
export { 
  QuantumVotePredictor, 
  useLegislativeAI 
} from './legislative-predictor/QuantumVotePredictor';
export type { 
  BillTensor, 
  VotePrediction, 
  Influencer, 
  Timeline, 
  ConstitutionalScore 
} from './legislative-predictor/QuantumVotePredictor';

// Civic Intelligence
export { CivicIntelligenceEngine } from './civic-intelligence/CivicIntelligenceEngine';
export type { 
  ConstitutionalRule, 
  CivicDecision, 
  CitizenFeedback 
} from './civic-intelligence/CivicIntelligenceEngine';
