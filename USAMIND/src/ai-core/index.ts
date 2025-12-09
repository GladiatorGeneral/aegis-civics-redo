/**
 * AI Core Module Exports
 * Central export point for all AI components
 */

// Quantum Networks
export { 
  createQuantumNetwork, 
  QuantumNetwork,
  createQuantumNetworkOptions
} from './quantum-networks/core';
export type { 
  QuantumConfig, 
  QuantumState, 
  EntangledPair,
  UseQuantumNetworkOptions,
  UseQuantumNetworkResult
} from './quantum-networks/core';

// React Hooks
export {
  useQuantumNetwork,
  useVotePredictor,
  useCivicIntelligence,
  useLegislativeUpdates
} from './hooks';
export type {
  UseVotePredictorResult,
  UseCivicIntelligenceResult,
  UseLegislativeUpdatesOptions,
  LegislativeUpdate
} from './hooks';

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
