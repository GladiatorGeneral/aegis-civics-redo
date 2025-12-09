'use client';

/**
 * Intelligence Suite Page
 * AI-powered civic analysis tools
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TOOLS = [
  {
    id: 'bill-analyzer',
    title: 'AI Bill Analyzer',
    description: 'Deep analysis of any legislation with plain-language summaries, impact assessments, and constitutional considerations.',
    icon: '📜',
    status: 'active',
    features: ['Plain language summaries', 'Section-by-section breakdown', 'Impact predictions', 'Similar bill comparisons']
  },
  {
    id: 'vote-predictor',
    title: 'Vote Predictor',
    description: 'Machine learning model predicts voting outcomes based on historical patterns, sponsor data, and current political climate.',
    icon: '🎯',
    status: 'active',
    features: ['94% accuracy rate', 'Member-by-member predictions', 'Confidence scores', 'Factor analysis']
  },
  {
    id: 'sentiment-tracker',
    title: 'Public Sentiment Tracker',
    description: 'Real-time analysis of public opinion on key issues using social media, news, and polling data.',
    icon: '📊',
    status: 'active',
    features: ['Real-time updates', 'Regional breakdown', 'Trend analysis', 'Media coverage correlation']
  },
  {
    id: 'constitutional-checker',
    title: 'Constitutional Checker',
    description: 'AI analysis of proposed legislation for potential constitutional issues and legal challenges.',
    icon: '⚖️',
    status: 'beta',
    features: ['Amendment relevance', 'Court precedent matching', 'Legal challenge likelihood', 'Expert annotations']
  },
  {
    id: 'budget-impact',
    title: 'Budget Impact Calculator',
    description: 'Estimates fiscal impact of legislation including costs, savings, and economic effects.',
    icon: '💰',
    status: 'beta',
    features: ['10-year projections', 'CBO comparison', 'State-by-state impact', 'Job creation estimates']
  },
  {
    id: 'lobbying-tracker',
    title: 'Lobbying Influence Tracker',
    description: 'Track lobbying activity, campaign contributions, and their correlation with voting patterns.',
    icon: '🔍',
    status: 'coming',
    features: ['Donor mapping', 'Industry influence scores', 'Conflict of interest alerts', 'Historical patterns']
  }
];

function ToolCard({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400' },
    beta: { label: 'Beta', color: 'bg-yellow-500/20 text-yellow-400' },
    coming: { label: 'Coming Soon', color: 'bg-purple-500/20 text-purple-400' }
  };
  
  const status = statusConfig[tool.status as keyof typeof statusConfig];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-all group ${
        tool.status === 'coming' ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {tool.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
              {tool.title}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs ${status.color}`}>
              {status.label}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-4">{tool.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {tool.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-white/40">
                <span className="text-purple-400">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
      {tool.status !== 'coming' && (
        <button className="mt-4 w-full py-2 bg-purple-500/10 text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-500/20 transition-colors">
          Launch Tool →
        </button>
      )}
    </motion.div>
  );
}

export default function IntelligenceSuitePage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400">🔍</span>
              <span className="text-purple-400 text-sm font-medium">Intelligence Suite</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Civic Analysis
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Advanced tools that use machine learning to help you understand legislation, predict outcomes, and track influence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Bills Analyzed', value: '50K+', icon: '📋' },
              { label: 'Predictions Made', value: '125K', icon: '🎯' },
              { label: 'Accuracy Rate', value: '94%', icon: '✅' },
              { label: 'Active Users', value: '250K', icon: '👥' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* API Access */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-purple-400 text-sm font-medium">For Developers</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                  Intelligence Suite API
                </h2>
                <p className="text-white/60 mb-6">
                  Integrate our AI analysis tools into your own applications. RESTful API with comprehensive documentation and SDKs for popular languages.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    View Documentation
                  </button>
                  <button className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all">
                    Get API Key
                  </button>
                </div>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm">
                <div className="text-purple-400">// Example API Call</div>
                <div className="text-white/60 mt-2">
                  <span className="text-cyan-400">const</span> analysis = <span className="text-cyan-400">await</span> fetch(
                </div>
                <div className="text-emerald-400 ml-4">&apos;/api/v1/bills/HR2847/analyze&apos;</div>
                <div className="text-white/60">);</div>
                <div className="text-white/40 mt-2">// Returns: summary, impact, predictions...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/60 mb-8">
            Create a free account to access our Intelligence Suite tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Create Free Account
            </Link>
            <Link
              href="/congressional-tracker"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Browse Bills First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
