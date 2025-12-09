/**
 * AI Core React Hooks
 * Custom hooks for integrating AI functionality with React components
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  QuantumNetwork, 
  QuantumState, 
  createQuantumNetwork,
  UseQuantumNetworkOptions,
  UseQuantumNetworkResult
} from '../quantum-networks/core';
import { QuantumVotePredictor, BillTensor, VotePrediction } from '../legislative-predictor/QuantumVotePredictor';
import { CivicIntelligenceEngine } from '../civic-intelligence/CivicIntelligenceEngine';

/**
 * Hook for quantum network operations
 */
export function useQuantumNetwork<T = unknown>(
  options: UseQuantumNetworkOptions
): UseQuantumNetworkResult<T> {
  const [network, setNetwork] = useState<QuantumNetwork | null>(null);
  const [quantumState, setQuantumState] = useState<QuantumState<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const qn = createQuantumNetwork({
        layers: options.layers || 8,
        entanglement: options.entanglement,
        superposition: options.superposition || 'multi_state'
      });
      setNetwork(qn);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create quantum network'));
      setIsLoading(false);
    }
  }, [options.entanglement, options.layers, options.superposition]);

  return { network, quantumState, isLoading, error };
}

/**
 * Hook for vote predictions
 */
export interface UseVotePredictorResult {
  predictor: QuantumVotePredictor | null;
  prediction: VotePrediction | null;
  isLoading: boolean;
  error: Error | null;
  predict: (bill: BillTensor) => Promise<VotePrediction | null>;
}

export function useVotePredictor(): UseVotePredictorResult {
  const [predictor, setPredictor] = useState<QuantumVotePredictor | null>(null);
  const [prediction, setPrediction] = useState<VotePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const p = new QuantumVotePredictor();
      setPredictor(p);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create predictor'));
    }
  }, []);

  const predict = useCallback(async (bill: BillTensor): Promise<VotePrediction | null> => {
    if (!predictor) {
      setError(new Error('Predictor not initialized'));
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await predictor.predictVoteOutcome(bill);
      setPrediction(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Prediction failed');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [predictor]);

  return { predictor, prediction, isLoading, error, predict };
}

/**
 * Hook for civic intelligence
 */
export interface UseCivicIntelligenceResult {
  engine: CivicIntelligenceEngine | null;
  evaluateConstitutionality: (action: string, context: string[]) => {
    score: number;
    violations: string[];
    alignments: string[];
  } | null;
}

export function useCivicIntelligence(): UseCivicIntelligenceResult {
  const [engine, setEngine] = useState<CivicIntelligenceEngine | null>(null);

  useEffect(() => {
    const e = new CivicIntelligenceEngine();
    setEngine(e);
  }, []);

  const evaluateConstitutionality = useCallback((action: string, context: string[]) => {
    if (!engine) return null;
    return engine.evaluateConstitutionality(action, context);
  }, [engine]);

  return { engine, evaluateConstitutionality };
}

/**
 * Hook for real-time legislative updates
 */
export interface UseLegislativeUpdatesOptions {
  topics?: string[];
  chambers?: Array<'house' | 'senate' | 'joint'>;
  pollInterval?: number;
}

export interface LegislativeUpdate {
  id: string;
  type: string;
  title: string;
  timestamp: number;
  chamber?: string;
}

export function useLegislativeUpdates(
  options: UseLegislativeUpdatesOptions = {}
): {
  updates: LegislativeUpdate[];
  isConnected: boolean;
  error: Error | null;
} {
  const [updates, setUpdates] = useState<LegislativeUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In production, this would connect to a real WebSocket
    // For now, simulate with mock data
    setIsConnected(true);

    const mockUpdates: LegislativeUpdate[] = [
      { id: '1', type: 'bill_update', title: 'H.R. 1234 passed committee', timestamp: Date.now(), chamber: 'house' },
      { id: '2', type: 'vote_result', title: 'S. 567 floor vote scheduled', timestamp: Date.now(), chamber: 'senate' },
    ];

    setUpdates(mockUpdates);

    // Cleanup
    return () => {
      setIsConnected(false);
    };
  }, [options.topics, options.chambers, options.pollInterval]);

  return { updates, isConnected, error };
}
