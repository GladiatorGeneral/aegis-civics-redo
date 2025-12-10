import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Build resilient, affordable, and domestically anchored energy with clean generation, storage, and a modernized grid that survives shocks.'
  },
  {
    title: 'Phase 1: Map & Stabilize (0-2 Years)',
    bullets: [
      'Grid observability: real-time telemetry, congestion heatmaps, and outage risk scoring.',
      'Fast wins: DER interconnect playbook, virtual power plant pilots, and critical-load microgrids for hospitals/water.',
      'Policy floor: streamlined permitting lanes and incentives for storage + grid upgrades.'
    ]
  },
  {
    title: 'Phase 2: Scale Clean Supply & Storage (3-6 Years)',
    bullets: [
      'Regional resource stacking: solar + wind + long-duration storage portfolios tuned to local profiles.',
      'Firm capacity: geothermal where viable; hydrogen/ammonia for industrial loads where economics close.',
      'Transmission: priority corridors, reconductoring, HVDC backbones to link surplus to deficit regions.'
    ]
  },
  {
    title: 'Phase 3: Independence & Resilience (7-12 Years)',
    bullets: [
      'Elastic demand: nationwide dynamic pricing with protections; smart electrification of heat and transport.',
      'Cyber-physical resilience: zero-trust OT, segmented control planes, and black-start ready microgrids.',
      'Economic dividend: lower volatility, domestic jobs, exportable clean-tech IP.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Energy independence is an economic and national security multiplier: lower input costs, fewer disruptions, and climate-aligned growth.'
  }
];

export default function EnergyIndependencePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-amber-200">Goals</Link>
          <span>/</span>
          <span className="text-amber-200">Energy Independence</span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-amber-300/80 mb-3">Strategic Goal 8</p>
          <h1 className="text-4xl font-bold mb-4">Energy Independence</h1>
          <p className="text-white/70 text-lg">
            A blog-style deep dive into the roadmap for domestic clean generation, storage, and grid modernization.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
              {section.body && <p className="text-white/70 leading-relaxed">{section.body}</p>}
              {section.bullets && (
                <ul className="list-disc list-inside text-white/70 space-y-2 mt-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-amber-400/40">
            ← Back to Goals
          </Link>
          <Link href="/docs/usamind-tasklist" className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-100 hover:border-amber-300">
            Read the implementation task list
          </Link>
        </div>
      </div>
    </div>
  );
}
