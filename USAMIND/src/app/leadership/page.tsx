'use client';

/**
 * Government Leadership Page
 * Track elected officials and government leaders
 * Updated with real 119th Congress Senator data
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  SENATORS, 
  Senator, 
  getSenatorsByState, 
  getSenatorsByParty, 
  getAllSenatorStates, 
  getSenatorPartyBreakdown 
} from '@/data/senators';

function SenatorCard({ senator, index }: { senator: Senator; index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  // Generate initials from name
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.5) }}
      className="bg-slate-900/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-indigo-500/30 transition-all group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
          senator.party === 'D' ? 'from-blue-500 to-blue-700' :
          senator.party === 'R' ? 'from-red-500 to-red-700' :
          'from-purple-500 to-purple-700'
        } flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {getInitials(senator.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              senator.party === 'D' ? 'bg-blue-500/20 text-blue-400' :
              senator.party === 'R' ? 'bg-red-500/20 text-red-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {senator.party === 'D' ? 'Democrat' : senator.party === 'R' ? 'Republican' : 'Independent'}
            </span>
            <span className="text-white/40 text-xs">Senate</span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
            {senator.name}
          </h3>
          <p className="text-white/60 text-sm">
            {senator.state} ({senator.stateAbbr})
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-white/40 mb-1">Suite</div>
          <div className="text-sm font-mono text-white/70">{senator.suite}</div>
        </div>
      </div>

      {/* Committees */}
      {senator.committees && senator.committees.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-white/40 mb-2">Committees</div>
          <div className="flex flex-wrap gap-1">
            {senator.committees.slice(0, expanded ? undefined : 3).map((committee) => (
              <span
                key={committee}
                className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-md"
              >
                {committee}
              </span>
            ))}
            {!expanded && senator.committees.length > 3 && (
              <span className="px-2 py-1 text-indigo-400 text-xs">
                +{senator.committees.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expanded Contact Info */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-white/40">Phone:</span>
                  <span className="text-white ml-2">{senator.phone}</span>
                </div>
                {senator.email && (
                  <div>
                    <span className="text-white/40">Email:</span>
                    <a href={`mailto:${senator.email}`} className="text-indigo-400 ml-2 hover:underline">
                      Contact
                    </a>
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {senator.website && (
                  <a
                    href={senator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 bg-white/5 text-white/70 text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    🌐 Website
                  </a>
                )}
              </div>
              
              {/* Contact Actions */}
              <div className="flex gap-3">
                <a
                  href={`tel:${senator.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-3 py-2 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-500/20 transition-colors text-center"
                >
                  📞 Call Office
                </a>
                {senator.email && (
                  <a
                    href={`mailto:${senator.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-3 py-2 bg-white/5 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
                  >
                    📧 Email
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <div className="mt-3 text-center">
        <span className="text-xs text-white/30">
          {expanded ? '▲ Click to collapse' : '▼ Click for details'}
        </span>
      </div>
    </motion.div>
  );
}

export default function GovernmentLeadershipPage() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>('all');
  const [party, setParty] = useState<'all' | 'D' | 'R' | 'I'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Redirect legacy route to consolidated leaders page
  useEffect(() => {
    router.replace('/leaders');
  }, [router]);
  
  const allStates = useMemo(() => getAllSenatorStates(), []);
  const partyBreakdown = useMemo(() => getSenatorPartyBreakdown(), []);

  const filteredSenators = useMemo(() => {
    return SENATORS.filter(senator => {
      if (selectedState !== 'all' && senator.stateAbbr !== selectedState) return false;
      if (party !== 'all' && senator.party !== party) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          senator.name.toLowerCase().includes(query) ||
          senator.state.toLowerCase().includes(query) ||
          senator.stateAbbr.toLowerCase().includes(query) ||
          (senator.committees && senator.committees.some(c => c.toLowerCase().includes(query)))
        );
      }
      return true;
    });
  }, [selectedState, party, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <span className="text-indigo-400">🏛️</span>
              <span className="text-indigo-400 text-sm font-medium">119th United States Congress</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              United States Senate
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              Connect with your senators, view their committee assignments, and contact their offices directly.
            </p>
            
            {/* Party Breakdown Stats */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-semibold">{partyBreakdown.R}</span>
                <span className="text-white/50">Republicans</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400 font-semibold">{partyBreakdown.D}</span>
                <span className="text-white/50">Democrats</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-purple-400 font-semibold">{partyBreakdown.I}</span>
                <span className="text-white/50">Independents</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-white/10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              {/* State Filter */}
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500/50 cursor-pointer"
                >
                  <option value="all">All States</option>
                  {allStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">▼</span>
              </div>
              
              {/* Party Filter */}
              <div className="flex gap-2">
                {(['all', 'D', 'R', 'I'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setParty(p)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      party === p
                        ? p === 'D' ? 'bg-blue-500 text-white' :
                          p === 'R' ? 'bg-red-500 text-white' :
                          p === 'I' ? 'bg-purple-500 text-white' :
                          'bg-indigo-500 text-white'
                        : 'bg-slate-800/50 text-white/60 hover:text-white'
                    }`}
                  >
                    {p === 'all' ? 'All' : 
                     p === 'D' ? 'Dem' : 
                     p === 'R' ? 'Rep' : 'Ind'}
                  </button>
                ))}
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-white/60'
                  }`}
                >
                  ▦ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-white/60'
                  }`}
                >
                  ☰ List
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder="Search senators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-white/50 text-sm">
            Showing {filteredSenators.length} of {SENATORS.length} senators
            {selectedState !== 'all' && ` from ${selectedState}`}
            {party !== 'all' && ` (${party === 'D' ? 'Democrats' : party === 'R' ? 'Republicans' : 'Independents'})`}
          </div>
        </div>
      </section>

      {/* Senators Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSenators.map((senator, index) => (
                <SenatorCard key={senator.id} senator={senator} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {/* List Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-white/40 text-sm font-medium border-b border-white/10">
                <div className="col-span-4">Senator</div>
                <div className="col-span-2">State</div>
                <div className="col-span-1">Party</div>
                <div className="col-span-2">Suite</div>
                <div className="col-span-3">Phone</div>
              </div>
              {filteredSenators.map((senator, index) => (
                <motion.div
                  key={senator.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.5) }}
                  className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-900/50 rounded-lg hover:bg-slate-800/50 transition-colors items-center"
                >
                  <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                      senator.party === 'D' ? 'bg-blue-500/30' :
                      senator.party === 'R' ? 'bg-red-500/30' :
                      'bg-purple-500/30'
                    }`}>
                      {senator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-white font-medium">{senator.name}</span>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-white/70">{senator.state}</div>
                  <div className="col-span-6 md:col-span-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      senator.party === 'D' ? 'bg-blue-500/20 text-blue-400' :
                      senator.party === 'R' ? 'bg-red-500/20 text-red-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {senator.party}
                    </span>
                  </div>
                  <div className="col-span-6 md:col-span-2 text-white/50 font-mono text-sm">{senator.suite}</div>
                  <div className="col-span-6 md:col-span-3">
                    <a href={`tel:${senator.phone}`} className="text-indigo-400 hover:underline text-sm">
                      {senator.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {filteredSenators.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No senators found</h3>
              <p className="text-white/50">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Senate Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Total Senators', value: '100', icon: '🏛️', color: 'indigo' },
              { label: 'Republicans', value: partyBreakdown.R.toString(), icon: '🔴', color: 'red' },
              { label: 'Democrats', value: partyBreakdown.D.toString(), icon: '🔵', color: 'blue' },
              { label: 'Independents', value: partyBreakdown.I.toString(), icon: '🟣', color: 'purple' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl bg-${stat.color}-500/5 border border-${stat.color}-500/20`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Coming Soon - House */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <span className="text-amber-400">🚧</span>
            <span className="text-amber-400 text-sm font-medium">Coming Soon</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">House of Representatives</h3>
          <p className="text-white/50">
            435 Representatives with full contact details and committee assignments
          </p>
        </div>
      </section>
    </div>
  );
}
