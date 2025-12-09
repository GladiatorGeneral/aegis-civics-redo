'use client';

/**
 * PHNX AI - Homepage
 * Main landing page with sector navigation
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SECTORS } from '@/config/sectors';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Sector Card Component
function SectorCard({ sector, index }: { sector: typeof SECTORS[0]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={sector.href}>
        <div className={`relative group h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10`}>
          {/* Gradient Glow */}
          <div 
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${sector.gradient}`} 
          />
          
          {/* Coming Soon Badge */}
          {sector.comingSoon && (
            <div className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
              Coming Soon
            </div>
          )}

          {/* Icon */}
          <div 
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}
            style={{ boxShadow: `0 10px 40px ${sector.color}30` }}
          >
            {sector.icon}
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-white mb-2">{sector.name}</h3>
          <p className="text-white/50 text-sm mb-4">{sector.description}</p>

          {/* Features */}
          {sector.features && (
            <div className="flex flex-wrap gap-2">
              {sector.features.slice(0, 3).map((feature, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Arrow */}
          <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Stats Component
function StatsBar() {
  const stats = [
    { label: 'Active Bills Tracked', value: '2,847', icon: '📜' },
    { label: 'AI Predictions', value: '94.7%', icon: '🎯' },
    { label: 'Data Sources', value: '150+', icon: '📊' },
    { label: 'Citizens Served', value: '1.2M+', icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <span className="text-2xl mb-2 block">{stat.icon}</span>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-xs text-white/50">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                AI-Powered Civic Intelligence
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Rise with{' '}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
                Phnx AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/60 mb-8 max-w-2xl mx-auto"
            >
              Your gateway to understanding American governance. 
              Track legislation, analyze policy impacts, and engage with democracy through advanced AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/usamind">
                <motion.button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 flex items-center gap-2 mx-auto sm:mx-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🧠</span>
                  <span>Explore USAMind</span>
                </motion.button>
              </Link>
              <motion.button
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Sectors
              </motion.button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatsBar />
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Civic Intelligence Sectors
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Explore different areas of American governance with AI-powered insights and real-time data.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SECTORS.map((sector, index) => (
              <SectorCard key={sector.id} sector={sector} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Democracy at Your Fingertips
              </h2>
              <div className="space-y-6">
                {[
                  { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Neural networks analyze legislative patterns with 94.7% prediction accuracy' },
                  { icon: '⚡', title: 'Real-Time Updates', desc: 'Live feeds from Congress with <100ms latency' },
                  { icon: '🔒', title: 'Verified Data', desc: 'Blockchain-backed verification ensures data integrity' },
                  { icon: '📱', title: 'Accessible Everywhere', desc: 'Mobile-first design for civic engagement on the go' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/50 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/30">
                    🔥
                  </div>
                  <p className="text-white/60">Phnx AI Platform</p>
                  <p className="text-3xl font-bold text-white mt-2">8 Sectors</p>
                  <p className="text-white/40 text-sm mt-1">Unified Civic Intelligence</p>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                🟢 Live Data
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              >
                🤖 AI Active
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Rise?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Join thousands of citizens using Phnx AI to understand and engage with American democracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/usamind">
                <motion.button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start with USAMind
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
