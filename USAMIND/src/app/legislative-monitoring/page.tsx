'use client';

/**
 * Legislative Monitoring Page
 * Real-time legislative tracking and alerts
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Alert {
  id: string;
  type: 'bill' | 'vote' | 'committee' | 'keyword';
  name: string;
  description: string;
  frequency: 'instant' | 'daily' | 'weekly';
  active: boolean;
}

const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'keyword',
    name: 'Climate Change',
    description: 'Any bill mentioning climate change, global warming, or carbon emissions',
    frequency: 'instant',
    active: true
  },
  {
    id: '2',
    type: 'bill',
    name: 'H.R. 2847 Updates',
    description: 'Track all updates to the Clean Energy Investment Act',
    frequency: 'instant',
    active: true
  },
  {
    id: '3',
    type: 'committee',
    name: 'House Energy Committee',
    description: 'All hearings and votes in the House Energy and Commerce Committee',
    frequency: 'daily',
    active: true
  },
  {
    id: '4',
    type: 'vote',
    name: 'Healthcare Votes',
    description: 'Floor votes on any healthcare-related legislation',
    frequency: 'instant',
    active: false
  }
];

const ALERT_TYPES = [
  { id: 'keyword', label: 'Keyword Alert', icon: '🔤', description: 'Get notified when specific terms appear in new legislation' },
  { id: 'bill', label: 'Bill Tracker', icon: '📜', description: 'Follow a specific bill through the legislative process' },
  { id: 'committee', label: 'Committee Watch', icon: '👥', description: 'Monitor activity in specific congressional committees' },
  { id: 'vote', label: 'Vote Alert', icon: '🗳️', description: 'Get notified when votes happen on issues you care about' },
  { id: 'rep', label: 'Representative Activity', icon: '🏛️', description: 'Track all actions by your representatives' },
  { id: 'topic', label: 'Topic Feed', icon: '📊', description: 'Curated updates on broad policy areas' }
];

function AlertCard({ alert, index }: { alert: Alert; index: number }) {
  const [isActive, setIsActive] = useState(alert.active);
  
  const typeIcons = {
    bill: '📜',
    vote: '🗳️',
    committee: '👥',
    keyword: '🔤'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-slate-900/80 backdrop-blur-xl rounded-xl border p-4 transition-all ${
        isActive ? 'border-cyan-500/30' : 'border-white/10 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-xl">
            {typeIcons[alert.type]}
          </div>
          <div>
            <h4 className="text-white font-medium">{alert.name}</h4>
            <p className="text-white/50 text-xs">{alert.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            alert.frequency === 'instant' ? 'bg-cyan-500/20 text-cyan-400' :
            alert.frequency === 'daily' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {alert.frequency}
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-12 h-6 rounded-full transition-colors ${
              isActive ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              isActive ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function LegislativeMonitoringPage() {
  const [showNewAlert, setShowNewAlert] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <span className="text-cyan-400">📊</span>
              <span className="text-cyan-400 text-sm font-medium">Legislative Monitoring</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Never Miss What Matters
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Set up custom alerts to track legislation, votes, and congressional activity in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert Types */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">Create New Alert</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ALERT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setShowNewAlert(true)}
                className="p-4 bg-slate-900/50 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{type.icon}</div>
                <h3 className="text-white text-sm font-medium mb-1">{type.label}</h3>
                <p className="text-white/40 text-xs">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Alerts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Your Alerts</h2>
            <span className="text-white/40 text-sm">{SAMPLE_ALERTS.filter(a => a.active).length} active</span>
          </div>
          <div className="space-y-4">
            {SAMPLE_ALERTS.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Alert Activity</h2>
          <div className="bg-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="text-cyan-400 font-medium">Climate Change</span> keyword found in new bill H.R. 3892
                </p>
                <p className="text-white/40 text-xs">2 minutes ago</p>
              </div>
              <Link href="/congressional-tracker" className="text-cyan-400 text-sm hover:underline">
                View →
              </Link>
            </div>
            <div className="p-4 border-b border-white/10 flex items-center gap-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="text-cyan-400 font-medium">H.R. 2847</span> moved to House floor vote
                </p>
                <p className="text-white/40 text-xs">1 hour ago</p>
              </div>
              <Link href="/congressional-tracker" className="text-cyan-400 text-sm hover:underline">
                View →
              </Link>
            </div>
            <div className="p-4 border-b border-white/10 flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="text-cyan-400 font-medium">House Energy Committee</span> scheduled hearing on Dec 15
                </p>
                <p className="text-white/40 text-xs">3 hours ago</p>
              </div>
              <Link href="/congressional-tracker" className="text-cyan-400 text-sm hover:underline">
                View →
              </Link>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              <div className="flex-1">
                <p className="text-white text-sm">
                  <span className="text-cyan-400 font-medium">Climate Change</span> keyword found in amendment to S. 1283
                </p>
                <p className="text-white/40 text-xs">Yesterday</p>
              </div>
              <Link href="/congressional-tracker" className="text-cyan-400 text-sm hover:underline">
                View →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📧</span>
                <h3 className="text-white font-medium">Email Notifications</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Receive alerts directly in your inbox</p>
              <button className="w-full py-2 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-500/20 transition-colors">
                Configure →
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📱</span>
                <h3 className="text-white font-medium">Push Notifications</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Get instant alerts on your devices</p>
              <button className="w-full py-2 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-500/20 transition-colors">
                Enable →
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📰</span>
                <h3 className="text-white font-medium">Daily Digest</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Summary of all activity each morning</p>
              <button className="w-full py-2 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-500/20 transition-colors">
                Subscribe →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want Deeper Analysis?
          </h2>
          <p className="text-white/60 mb-8">
            Use our Intelligence Suite for AI-powered bill analysis and vote predictions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/intelligence-suite"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Intelligence Suite →
            </Link>
            <Link
              href="/congressional-tracker"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Browse Bills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
