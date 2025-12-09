'use client';

/**
 * Login Page
 * User authentication
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    console.log('Auth:', { email, password, isLogin });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
                🔥
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-white">
                  Phnx<span className="text-orange-400"> AI</span>
                </span>
                <p className="text-xs text-white/40">Civic Intelligence Platform</p>
              </div>
            </Link>
          </div>

          {/* Toggle */}
          <div className="flex bg-slate-800/50 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                isLogin ? 'bg-cyan-500 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                !isLogin ? 'bg-cyan-500 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-white/60 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            )}
            
            <div>
              <label className="block text-white/60 text-sm mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-slate-800" />
                  <span className="text-white/60 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-white/60 text-sm mb-2">ZIP Code (for local reps)</label>
                <input
                  type="text"
                  placeholder="12345"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-white/40">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-slate-800 transition-all">
              <span>🌐</span>
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-slate-800 transition-all">
              <span>🍎</span>
              <span className="text-sm">Apple</span>
            </button>
          </div>

          {/* Terms */}
          {!isLogin && (
            <p className="text-white/40 text-xs text-center mt-6">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
            </p>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm mb-4">With an account, you can:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Track bills', 'Save searches', 'Get alerts', 'Contact reps'].map((feature) => (
              <span key={feature} className="flex items-center gap-1 text-white/60">
                <span className="text-cyan-400">✓</span>
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
