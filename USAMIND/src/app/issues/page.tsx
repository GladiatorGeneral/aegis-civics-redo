'use client';

/**
 * National Issues & Solutions Page
 * Comprehensive analysis of America's major challenges with evidence-based solutions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  NATIONAL_ISSUES, 
  ISSUE_CATEGORIES, 
  getIssuesByCategory,
  type NationalIssue,
  type Solution 
} from '@/config/navigation';

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800/50 rounded-xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{solution.icon}</div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {solution.title}
          </h4>
          <p className="text-white/70 text-sm mb-3">{solution.description}</p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-3">
            <p className="text-emerald-400 text-xs font-medium">📊 Evidence</p>
            <p className="text-white/80 text-sm">{solution.evidence}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 text-xs font-semibold">Impact:</span>
            <span className="text-white/70 text-sm">{solution.impact}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IssueSection({ issue, isExpanded, onToggle }: { 
  issue: NationalIssue; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const category = ISSUE_CATEGORIES.find(c => c.id === issue.category);
  
  return (
    <motion.div
      layout
      className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Issue Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category?.gradient || 'from-cyan-500 to-blue-600'} flex items-center justify-center text-2xl shadow-lg`}>
              {category?.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{issue.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                  The Problem
                </span>
                <span className="text-white/60 text-sm">{issue.problem}</span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-white/40"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Expanded Solutions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-400 text-sm font-semibold">✅ Proven Solutions</span>
                <span className="text-white/40 text-sm">({issue.solutions.length} evidence-based approaches)</span>
              </div>
              <div className="grid gap-4">
                {issue.solutions.map((solution, index) => (
                  <SolutionCard key={solution.id} solution={solution} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function IssuesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIssue, setExpandedIssue] = useState<string | null>('economic-inequality');
  
  const filteredIssues = getIssuesByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              National Issues & Solutions
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comprehensive analysis of America&apos;s major challenges with evidence-based, bipartisan solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white/60 text-sm font-medium">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ISSUE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : 'bg-slate-800/50 text-white/60 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {filteredIssues.map((issue) => (
                <IssueSection
                  key={issue.id}
                  issue={issue}
                  isExpanded={expandedIssue === issue.id}
                  onToggle={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Take Action?
          </h2>
          <p className="text-white/60 mb-8">
            Track legislation, contact your representatives, and make your voice heard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/congressional-tracker"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Track Legislation →
            </Link>
            <Link
              href="/leaders"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Find Your Representatives
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
