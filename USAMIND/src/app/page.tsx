'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Neural Glass Panel Component
const NeuralGlassPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: 'blue' | 'purple' | 'cyan' | 'green';
}> = ({ children, className = '', glow = 'cyan' }) => {
  const glowColors = {
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(139, 92, 246, 0.3)',
    cyan: 'rgba(6, 182, 212, 0.3)',
    green: 'rgba(34, 197, 94, 0.3)',
  };

  return (
    <motion.div
      className={`relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden ${className}`}
      style={{
        boxShadow: `0 0 40px ${glowColors[glow]}, inset 0 0 60px rgba(255,255,255,0.02)`,
      }}
      whileHover={{ scale: 1.01, boxShadow: `0 0 60px ${glowColors[glow]}` }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  glow?: 'blue' | 'purple' | 'cyan' | 'green';
}> = ({ label, value, change, icon, glow = 'cyan' }) => (
  <NeuralGlassPanel glow={glow} className="p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl">{icon}</span>
      {change && (
        <span className={`text-sm px-2 py-1 rounded-full ${
          change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {change}
        </span>
      )}
    </div>
    <h3 className="text-white/60 text-sm mb-1">{label}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </NeuralGlassPanel>
);

// Bill Card Component
const BillCard: React.FC<{
  bill: {
    id: string;
    title: string;
    status: string;
    chamber: string;
    prediction: number;
    lastAction: string;
  };
}> = ({ bill }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-cyan-400 font-mono text-sm">{bill.id}</span>
      <span className={`px-2 py-1 rounded-full text-xs ${
        bill.chamber === 'Senate' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
      }`}>
        {bill.chamber}
      </span>
    </div>
    <h4 className="text-white font-medium mb-2 line-clamp-2">{bill.title}</h4>
    <div className="flex items-center justify-between">
      <span className="text-white/40 text-sm">{bill.status}</span>
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Pass:</span>
        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ width: `${bill.prediction}%` }}
          />
        </div>
        <span className="text-cyan-400 text-sm font-mono">{bill.prediction}%</span>
      </div>
    </div>
  </motion.div>
);

// Main Page Component
export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [neuralActivity, setNeuralActivity] = useState(94.7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setNeuralActivity(prev => Math.min(99.9, Math.max(90, prev + (Math.random() - 0.5) * 2)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mockBills = [
    { id: 'H.R. 1234', title: 'National AI Transparency Act', status: 'In Committee', chamber: 'House', prediction: 73, lastAction: '2 hours ago' },
    { id: 'S. 567', title: 'Digital Privacy Protection Act', status: 'Floor Vote', chamber: 'Senate', prediction: 89, lastAction: '30 min ago' },
    { id: 'H.R. 890', title: 'Clean Energy Infrastructure Bill', status: 'Amendment Phase', chamber: 'House', prediction: 62, lastAction: '1 hour ago' },
    { id: 'S. 234', title: 'Cybersecurity Enhancement Act', status: 'Conference', chamber: 'Senate', prediction: 81, lastAction: '45 min ago' },
  ];

  return (
    <div className="min-h-screen p-8 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
              animate={{ boxShadow: ['0 0 20px rgba(6,182,212,0.5)', '0 0 40px rgba(6,182,212,0.3)', '0 0 20px rgba(6,182,212,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🧠</span>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                USA<span className="text-cyan-400">Mind</span>
              </h1>
              <p className="text-white/40 text-sm">Neural Civic Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <NeuralGlassPanel className="px-4 py-2" glow="green">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm">Neural Network Active</span>
                <span className="text-cyan-400 font-mono">{neuralActivity.toFixed(1)}%</span>
              </div>
            </NeuralGlassPanel>
            <div className="text-right">
              <p className="text-white font-mono">{currentTime.toLocaleTimeString()}</p>
              <p className="text-white/40 text-sm">{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="📜" label="Active Bills" value="2,847" change="+12" glow="cyan" />
        <StatCard icon="🗳️" label="Votes Today" value="23" change="+5" glow="purple" />
        <StatCard icon="👥" label="Active Representatives" value="531" glow="blue" />
        <StatCard icon="⚡" label="AI Predictions" value="94.7%" change="+0.3%" glow="green" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bills Tracker */}
        <div className="lg:col-span-2">
          <NeuralGlassPanel className="p-6" glow="cyan">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>📊</span> Live Legislative Tracker
              </h2>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-white/60 text-sm">Live Updates</span>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatePresence>
                {mockBills.map((bill, index) => (
                  <motion.div
                    key={bill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BillCard bill={bill} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </NeuralGlassPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <NeuralGlassPanel className="p-6" glow="purple">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🤖</span> AI Insights
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white/80 text-sm">
                  <span className="text-purple-400 font-semibold">High Probability:</span> Digital Privacy Protection Act likely to pass with bipartisan support.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white/80 text-sm">
                  <span className="text-cyan-400 font-semibold">Trending:</span> Climate legislation seeing increased activity across both chambers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white/80 text-sm">
                  <span className="text-green-400 font-semibold">Alert:</span> 3 bills approaching critical vote threshold this week.
                </p>
              </div>
            </div>
          </NeuralGlassPanel>

          {/* Network Status */}
          <NeuralGlassPanel className="p-6" glow="green">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🌐</span> Civic Mesh Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Nodes Online</span>
                <span className="text-green-400 font-mono">847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Data Latency</span>
                <span className="text-cyan-400 font-mono">85ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Blockchain Blocks</span>
                <span className="text-purple-400 font-mono">1,247,893</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Verification Rate</span>
                <span className="text-green-400 font-mono">99.97%</span>
              </div>
            </div>
          </NeuralGlassPanel>

          {/* Quick Actions */}
          <NeuralGlassPanel className="p-6" glow="blue">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>⚡</span> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Search Bills', 'My Reps', 'Vote History', 'Alerts'].map((action) => (
                <motion.button
                  key={action}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </NeuralGlassPanel>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-white/30 text-sm">
          USAMind Neural Civic Intelligence Platform • Powered by Quantum AI • © 2025
        </p>
      </footer>
    </div>
  );
}
