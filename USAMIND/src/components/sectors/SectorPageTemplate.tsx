'use client';

/**
 * Sector Page Template
 * Reusable template for all sector pages
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sector } from '@/config/sectors';

interface SectorPageTemplateProps {
  sector: Sector;
  children?: React.ReactNode;
}

export function SectorPageTemplate({ sector, children }: SectorPageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
            style={{ backgroundColor: `${sector.color}20` }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">{sector.name}</span>
          </motion.div>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-4xl shadow-lg`}
              style={{ boxShadow: `0 20px 60px ${sector.color}40` }}
            >
              {sector.icon}
            </motion.div>
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-3"
              >
                {sector.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/60 max-w-2xl"
              >
                {sector.description}
              </motion.p>
            </div>
          </div>

          {/* Features Tags */}
          {sector.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {sector.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm"
                >
                  {feature}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {children || <ComingSoonContent sector={sector} />}
        </div>
      </section>
    </div>
  );
}

// Coming Soon Content
function ComingSoonContent({ sector }: { sector: Sector }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-center py-20"
    >
      <div className={`w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-6xl opacity-50`}>
        {sector.icon}
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
      <p className="text-white/50 max-w-md mx-auto mb-8">
        We&apos;re building something amazing for {sector.name}. 
        Check back soon for AI-powered insights and real-time data.
      </p>
      
      {/* Notify Form */}
      <div className="max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email for updates"
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
          />
          <motion.button
            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${sector.gradient} text-white font-medium shadow-lg`}
            style={{ boxShadow: `0 10px 30px ${sector.color}30` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Notify Me
          </motion.button>
        </div>
      </div>

      {/* Back Link */}
      <Link href="/">
        <motion.button
          className="mt-12 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default SectorPageTemplate;
