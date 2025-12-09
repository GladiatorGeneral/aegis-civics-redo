'use client';

/**
 * Our Goals Page
 * Platform mission and objectives
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const GOALS = [
  {
    id: 1,
    title: 'Informed Citizens',
    description: 'Empower every American with accessible, accurate information about their government and its activities.',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    metrics: ['10M+ citizens reached', '95% accuracy rating', '24/7 access to information']
  },
  {
    id: 2,
    title: 'Transparent Government',
    description: 'Make legislative processes and government decisions visible and understandable to all.',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    metrics: ['Track 100% of bills', 'Real-time updates', 'Plain language summaries']
  },
  {
    id: 3,
    title: 'Evidence-Based Solutions',
    description: 'Promote policy solutions backed by research, data, and proven results from around the world.',
    icon: '📊',
    color: 'from-emerald-500 to-teal-500',
    metrics: ['500+ documented solutions', 'Global best practices', 'Impact assessments']
  },
  {
    id: 4,
    title: 'Civic Engagement',
    description: 'Lower barriers to participation and help citizens effectively communicate with their representatives.',
    icon: '🗳️',
    color: 'from-orange-500 to-red-500',
    metrics: ['Direct rep contact', 'Simplified voting info', 'Community organizing tools']
  },
  {
    id: 5,
    title: 'Bipartisan Dialogue',
    description: 'Create spaces for constructive conversation across political divides, focusing on shared values and common goals.',
    icon: '🤝',
    color: 'from-indigo-500 to-purple-500',
    metrics: ['Cross-party solutions', 'Common ground finder', 'Respectful debate forums']
  },
  {
    id: 6,
    title: 'AI for Democracy',
    description: 'Leverage artificial intelligence to analyze legislation, predict outcomes, and make civic information more accessible.',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-500',
    metrics: ['AI bill analysis', 'Vote predictions', 'Personalized insights']
  }
];

const VALUES = [
  { title: 'Nonpartisan', description: 'We present facts and let citizens form their own opinions.', icon: '⚖️' },
  { title: 'Accessible', description: 'Complex information made simple for everyone.', icon: '🌐' },
  { title: 'Transparent', description: 'Our methods and sources are always open to scrutiny.', icon: '🔎' },
  { title: 'Innovative', description: 'Using technology to solve civic engagement challenges.', icon: '💡' }
];

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
              <span className="text-orange-400">🎯</span>
              <span className="text-orange-400 text-sm font-medium">Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Building a More
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> Engaged Democracy</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              USAMind exists to bridge the gap between citizens and their government through transparency, education, and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              &ldquo;An informed citizenry is the foundation of a functioning democracy.&rdquo;
            </h2>
            <p className="text-white/60 text-lg">
              We believe that when people understand how their government works and have the tools to participate meaningfully, democracy thrives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Strategic Goals</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Six pillars that guide everything we build and every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOALS.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-orange-500/30 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {goal.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{goal.description}</p>
                <div className="space-y-2">
                  {goal.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <span className="text-orange-400">✓</span>
                      {metric}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/60">The principles that define who we are.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2.5M+', label: 'Citizens Educated', icon: '👥' },
              { value: '50K+', label: 'Bills Tracked', icon: '📋' },
              { value: '535', label: 'Reps Monitored', icon: '🏛️' },
              { value: '94%', label: 'AI Accuracy', icon: '🎯' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
            <p className="text-white/60 mb-8">
              Be part of building a more informed, engaged democracy. Start exploring today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/issues"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Explore Issues →
              </Link>
              <Link
                href="/civics-learning"
                className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all"
              >
                Start Learning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
