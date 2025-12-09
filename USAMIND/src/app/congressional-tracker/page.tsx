'use client';

/**
 * Congressional Tracker Page
 * Track bills, votes, and congressional activity
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Bill {
  id: string;
  number: string;
  title: string;
  summary: string;
  sponsor: string;
  party: 'D' | 'R' | 'I';
  status: 'introduced' | 'committee' | 'passed_house' | 'passed_senate' | 'signed' | 'vetoed';
  introduced: string;
  category: string;
  aiPrediction: number;
}

const SAMPLE_BILLS: Bill[] = [
  {
    id: '1',
    number: 'H.R. 2847',
    title: 'Clean Energy Investment Act',
    summary: 'Provides tax incentives for renewable energy development and establishes a national clean energy standard.',
    sponsor: 'Rep. Maria Santos',
    party: 'D',
    status: 'committee',
    introduced: '2025-11-15',
    category: 'Energy',
    aiPrediction: 67
  },
  {
    id: '2',
    number: 'S. 1283',
    title: 'Infrastructure Modernization Act',
    summary: 'Allocates $500B for roads, bridges, and broadband infrastructure over 10 years.',
    sponsor: 'Sen. James Mitchell',
    party: 'R',
    status: 'passed_senate',
    introduced: '2025-09-20',
    category: 'Infrastructure',
    aiPrediction: 82
  },
  {
    id: '3',
    number: 'H.R. 3156',
    title: 'Healthcare Price Transparency Act',
    summary: 'Requires hospitals and insurers to publicly disclose pricing for all procedures.',
    sponsor: 'Rep. David Chen',
    party: 'D',
    status: 'passed_house',
    introduced: '2025-10-05',
    category: 'Healthcare',
    aiPrediction: 54
  },
  {
    id: '4',
    number: 'S. 892',
    title: 'AI Governance Framework Act',
    summary: 'Establishes federal guidelines and oversight for artificial intelligence development.',
    sponsor: 'Sen. Sarah Williams',
    party: 'D',
    status: 'introduced',
    introduced: '2025-12-01',
    category: 'Technology',
    aiPrediction: 45
  },
  {
    id: '5',
    number: 'H.R. 4521',
    title: 'Small Business Relief Act',
    summary: 'Provides additional PPP-style loans and grants for businesses with under 50 employees.',
    sponsor: 'Rep. Michael Brown',
    party: 'R',
    status: 'committee',
    introduced: '2025-11-28',
    category: 'Economy',
    aiPrediction: 71
  }
];

const STATUS_CONFIG = {
  introduced: { label: 'Introduced', color: 'bg-blue-500/20 text-blue-400', step: 1 },
  committee: { label: 'In Committee', color: 'bg-yellow-500/20 text-yellow-400', step: 2 },
  passed_house: { label: 'Passed House', color: 'bg-purple-500/20 text-purple-400', step: 3 },
  passed_senate: { label: 'Passed Senate', color: 'bg-cyan-500/20 text-cyan-400', step: 4 },
  signed: { label: 'Signed into Law', color: 'bg-emerald-500/20 text-emerald-400', step: 5 },
  vetoed: { label: 'Vetoed', color: 'bg-red-500/20 text-red-400', step: 0 }
};

function BillCard({ bill, index }: { bill: Bill; index: number }) {
  const status = STATUS_CONFIG[bill.status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 font-mono text-sm">{bill.number}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${status.color}`}>
              {status.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {bill.title}
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs text-white/40 mb-1">AI Prediction</div>
          <div className={`text-2xl font-bold ${
            bill.aiPrediction >= 70 ? 'text-emerald-400' : 
            bill.aiPrediction >= 50 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {bill.aiPrediction}%
          </div>
        </div>
      </div>
      
      <p className="text-white/60 text-sm mb-4">{bill.summary}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            bill.party === 'D' ? 'bg-blue-500' : 
            bill.party === 'R' ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {bill.party}
          </div>
          <span className="text-white/60 text-sm">{bill.sponsor}</span>
        </div>
        <span className="text-white/40 text-xs">{bill.category}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40">Legislative Progress</span>
          <span className="text-xs text-white/60">{status.step}/5 steps</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full ${
                step <= status.step ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CongressionalTrackerPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBills = SAMPLE_BILLS.filter(bill => {
    if (filter !== 'all' && bill.category.toLowerCase() !== filter) return false;
    if (searchQuery && !bill.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categories = ['all', ...new Set(SAMPLE_BILLS.map(b => b.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400">🏛️</span>
              <span className="text-purple-400 text-sm font-medium">Congressional Tracker</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Track Congressional Activity
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Monitor bills, votes, and legislative progress with AI-powered predictions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Bills', value: '2,847', icon: '📋' },
              { label: 'Passed This Session', value: '156', icon: '✅' },
              { label: 'In Committee', value: '1,234', icon: '👥' },
              { label: 'AI Predictions', value: '94%', subtext: 'accuracy', icon: '🤖' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    filter === cat
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-800/50 text-white/60 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Bills' : cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search bills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bills Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBills.map((bill, index) => (
              <BillCard key={bill.id} bill={bill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want More Detailed Analysis?
          </h2>
          <p className="text-white/60 mb-8">
            Access our Intelligence Suite for deep legislative analysis and custom alerts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/intelligence-suite"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Intelligence Suite →
            </Link>
            <Link
              href="/legislative-monitoring"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Set Up Alerts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
