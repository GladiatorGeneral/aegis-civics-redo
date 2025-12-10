'use client';

/**
 * NEURAL CONGRESSIONAL TRACKER
 * Real-time legislation monitoring
 * AI-powered insights
 * Predictive analytics dashboard
 */

import React, { useState, useEffect } from 'react';
import { 
  NeuralGlassPanel, 
  NeuralBackground, 
  NeuralButton,
  NeuralProgress 
} from '@/holographic-ui/components';

// Types
interface BillPrediction {
  id: string;
  bill: string;
  probability: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface VoteEvent {
  id: string;
  bill: string;
  outcome: 'passed' | 'failed';
  time: string;
  tally: Record<string, number>;
}

interface BillScan {
  id: string;
  title: string;
  constitutionality: number;
  alerts?: string[];
}

// Mock data for demonstration
const mockPredictions: BillPrediction[] = [
  { id: '1', bill: 'H.R. 1234 - Infrastructure Act', probability: 0.78, confidence: 0.92, trend: 'up' },
  { id: '2', bill: 'S. 567 - Healthcare Reform', probability: 0.45, confidence: 0.85, trend: 'down' },
  { id: '3', bill: 'H.R. 890 - Education Funding', probability: 0.62, confidence: 0.88, trend: 'stable' },
  { id: '4', bill: 'S. 123 - Climate Action', probability: 0.55, confidence: 0.79, trend: 'up' },
];

const mockVotes: VoteEvent[] = [
  { id: '1', bill: 'H.R. 456 - Tax Reform', outcome: 'passed', time: '2:34 PM', tally: { Republican: 198, Democrat: 45, Independent: 2 } },
  { id: '2', bill: 'S. 789 - Defense Auth', outcome: 'passed', time: '1:15 PM', tally: { Republican: 45, Democrat: 48, Independent: 2 } },
  { id: '3', bill: 'H.R. 321 - Privacy Act', outcome: 'failed', time: '11:45 AM', tally: { Republican: 120, Democrat: 100, Independent: 1 } },
];

const mockBillScans: BillScan[] = [
  { id: '1', title: 'H.R. 1234 - Infrastructure Act', constitutionality: 0.94 },
  { id: '2', title: 'S. 567 - Healthcare Reform', constitutionality: 0.72, alerts: ['Commerce Clause concerns'] },
  { id: '3', title: 'H.R. 890 - Education Funding', constitutionality: 0.88 },
  { id: '4', title: 'S. 123 - Climate Action', constitutionality: 0.65, alerts: ['10th Amendment review needed', 'Spending clause analysis'] },
];

export default function NeuralCongressionalTracker() {
  const [predictions, setPredictions] = useState<BillPrediction[]>(mockPredictions);
  const [votes, setVotes] = useState<VoteEvent[]>(mockVotes);
  const [billScans, setBillScans] = useState<BillScan[]>(mockBillScans);
  const [isLoading, setIsLoading] = useState(true);
  const [aiMessage, setAiMessage] = useState('');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAiMessage(
        '"Based on my neural analysis of 2.4M legislative patterns, ' +
        'I detect emerging trends in environmental policy. ' +
        'Would you like me to prepare a civic action plan?"'
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions((prev: BillPrediction[]) => prev.map((p: BillPrediction) => ({
        ...p,
        probability: Math.max(0.1, Math.min(0.99, p.probability + (Math.random() - 0.5) * 0.02)),
        confidence: Math.max(0.7, Math.min(0.99, p.confidence + (Math.random() - 0.5) * 0.01))
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getPartyColor = (party: string) => {
    switch (party.toLowerCase()) {
      case 'republican': return 'text-red-400';
      case 'democrat': return 'text-blue-400';
      case 'independent': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="neural-container min-h-screen p-6">
      {/* Neural Network Background */}
      <NeuralBackground intensity="quantum" />

      {/* AI Teacher Header */}
      <header className="ai-teacher-header text-center py-12 relative z-10">
        <h1 className="neural-gradient text-4xl md:text-5xl font-extrabold mb-4">
          <span className="quantum-flash inline-block mx-4">⚡</span>
          NEURAL CONGRESSIONAL INTELLIGENCE
          <span className="quantum-flash inline-block mx-4">⚡</span>
        </h1>
        <p className="ai-voice-text text-lg text-cyan-400 italic max-w-3xl mx-auto border-l-4 border-green-400 pl-4">
          &quot;Hello, citizen. I am your AI civic instructor. Let me analyze today&apos;s legislative landscape...&quot;
        </p>
      </header>

      {/* Real-time Dashboard Grid */}
      <div className="quantum-grid grid grid-cols-1 lg:grid-cols-3 gap-6 my-8 relative z-10">
        
        {/* Bill Prediction Panel */}
        <NeuralGlassPanel intensity="high" className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            AI PREDICTION ENGINE
          </h3>
          <div className="space-y-4">
            {predictions.map((prediction: BillPrediction) => (
              <div key={prediction.id} className="prediction-cell">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300 truncate flex-1 mr-2">
                    {prediction.bill}
                  </span>
                  <span className="text-lg">{getTrendIcon(prediction.trend)}</span>
                </div>
                <NeuralProgress 
                  value={prediction.probability * 100}
                  variant={prediction.probability > 0.6 ? 'success' : prediction.probability > 0.4 ? 'warning' : 'danger'}
                  animated
                />
                <div className="text-xs text-cyan-400 mt-1">
                  AI Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </NeuralGlassPanel>

        {/* Real-time Vote Stream */}
        <NeuralGlassPanel intensity="medium" className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📡</span>
            LIVE VOTE STREAM
          </h3>
          <div className="space-y-4">
            {votes.map((vote) => (
              <div key={vote.id} className="vote-event bg-black/30 rounded-lg p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
                    vote.outcome === 'passed' 
                      ? 'bg-green-500/30 text-green-400' 
                      : 'bg-red-500/30 text-red-400'
                  }`}>
                    {vote.outcome === 'passed' ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{vote.bill}</div>
                    <div className="text-xs text-gray-400">{vote.time}</div>
                  </div>
                </div>
                <div className="flex gap-4 text-xs">
                  {Object.entries(vote.tally).map(([party, count]: [string, number]) => (
                    <span key={party} className={getPartyColor(party)}>
                      {party}: {count}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </NeuralGlassPanel>

        {/* Constitutional Compliance Checker */}
        <NeuralGlassPanel intensity="low" className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📜</span>
            CONSTITUTIONAL AI SCAN
          </h3>
          <div className="space-y-4">
            {billScans.map((bill: BillScan) => (
              <div key={bill.id} className="scan-result">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300 truncate flex-1 mr-2">
                    {bill.title}
                  </span>
                  <span className={`text-sm font-bold ${
                    bill.constitutionality > 0.8 ? 'text-green-400' :
                    bill.constitutionality > 0.6 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {(bill.constitutionality * 100).toFixed(0)}%
                  </span>
                </div>
                <NeuralProgress 
                  value={bill.constitutionality * 100}
                  variant={bill.constitutionality > 0.8 ? 'success' : bill.constitutionality > 0.6 ? 'warning' : 'danger'}
                  showValue={false}
                />
                {bill.alerts?.map((alert: string, i: number) => (
                  <div key={i} className="text-xs text-yellow-400 mt-1">
                    ⚠️ {alert}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </NeuralGlassPanel>
      </div>

      {/* AI Analysis Section */}
      <div className="ai-analysis-panel relative z-10 mt-8">
        <NeuralGlassPanel intensity="quantum" className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* AI Avatar */}
            <div className="neural-avatar w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30">
              🤖
            </div>
            
            {/* AI Message */}
            <div className="flex-1">
              <p className="text-lg text-cyan-300 italic leading-relaxed">
                {isLoading ? (
                  <span className="animate-pulse">Analyzing legislative patterns...</span>
                ) : (
                  aiMessage
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            <NeuralButton variant="primary" icon={<span>🧠</span>}>
              Generate AI Action Plan
            </NeuralButton>
            <NeuralButton variant="secondary" icon={<span>📊</span>}>
              View Neural Network Analysis
            </NeuralButton>
            <NeuralButton variant="tertiary" icon={<span>👥</span>}>
              Contact Your Representative
            </NeuralButton>
          </div>
        </NeuralGlassPanel>
      </div>

      {/* Network Status Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500 relative z-10">
        <div className="flex justify-center gap-8 flex-wrap">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Neural Network: Active
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            Edge Nodes: 142 Online
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Civic Mesh: 2.4M Connected
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Latency: &lt;85ms
          </span>
        </div>
      </footer>
    </div>
  );
}

// Additive showcase component mirroring the Phase 6 narrative without replacing the current default export.
export function NeuralCongressionalTrackerV2() {
  const [predictions] = useState<BillPrediction[]>(mockPredictions);
  const [votes] = useState<VoteEvent[]>(mockVotes);
  const [billScans] = useState<BillScan[]>(mockBillScans);

  return (
    <div className="neural-container">
      <NeuralBackground intensity="quantum" />

      <div className="ai-teacher-header">
        <h1 className="neural-gradient">
          <span className="quantum-flash">⚡</span>
          NEURAL CONGRESSIONAL INTELLIGENCE
          <span className="quantum-flash">⚡</span>
        </h1>
        <p className="ai-voice-text">
          &quot;Hello, citizen. I am your AI civic instructor. Let me analyze today&apos;s legislative landscape...&quot;
        </p>
      </div>

      <div className="quantum-grid">
        <NeuralGlassPanel intensity="high">
          <h3>
            <i className="fas fa-brain-circuit" /> AI PREDICTION ENGINE
          </h3>
          <div className="prediction-matrix">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="prediction-cell">
                <div className="probability-bar">
                  <div
                    className="probability-fill"
                    style={{ width: `${prediction.probability * 100}%` }}
                  />
                </div>
                <div className="prediction-details">
                  <span className="bill-title">{prediction.bill}</span>
                  <span className="confidence">
                    AI Confidence: {(prediction.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </NeuralGlassPanel>

        <NeuralGlassPanel intensity="medium">
          <h3>
            <i className="fas fa-broadcast-tower" /> LIVE VOTE STREAM
          </h3>
          <div className="vote-stream">
            {votes.map((vote) => (
              <div key={vote.id} className="vote-event">
                <div className={`vote-indicator ${vote.outcome}`}>
                  {vote.outcome === 'passed' ? '✓' : '✗'}
                </div>
                <div className="vote-info">
                  <strong>{vote.bill}</strong>
                  <span>{vote.time}</span>
                </div>
                <div className="vote-breakdown">
                  {Object.entries(vote.tally).map(([party, count]) => (
                    <span key={party} className={`party-${party.toLowerCase()}`}>
                      {party}: {count}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </NeuralGlassPanel>

        <NeuralGlassPanel intensity="low">
          <h3>
            <i className="fas fa-scroll" /> CONSTITUTIONAL AI SCAN
          </h3>
          <div className="constitution-scan">
            {billScans.map((bill) => (
              <div key={bill.id} className="scan-result">
                <div className="scan-meter">
                  <div
                    className="scan-fill"
                    style={{ width: `${bill.constitutionality * 100}%` }}
                  />
                </div>
                <div className="scan-details">
                  <span>{bill.title}</span>
                  <span className="scan-percent">{(bill.constitutionality * 100).toFixed(0)}%</span>
                </div>
                {bill.alerts?.map((alert, i) => (
                  <div key={i} className="constitution-alert">
                    ⚠️ {alert}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </NeuralGlassPanel>
      </div>

      <div className="ai-analysis-panel">
        <div className="ai-teacher-avatar">
          <div className="neural-avatar">
            <i className="fas fa-robot" />
          </div>
          <div className="ai-message">
            <p>
              &quot;Based on my neural analysis of 2.4M legislative patterns, I detect emerging trends in
              environmental policy. Would you like me to prepare a civic action plan?&quot;
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="neural-button primary">
            <i className="fas fa-brain" /> Generate AI Action Plan
          </button>
          <button className="neural-button secondary">
            <i className="fas fa-chart-network" /> View Neural Network Analysis
          </button>
          <button className="neural-button tertiary">
            <i className="fas fa-users" /> Contact Your Neural Representative
          </button>
        </div>
      </div>
    </div>
  );
}
