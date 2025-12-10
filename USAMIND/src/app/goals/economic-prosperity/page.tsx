import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Catalyze broad-based economic growth through workforce upskilling, resilient supply chains, and innovation sandboxes that de-risk new industries.'
  },
  {
    title: 'Phase 1: Workforce & Safety Net (0-2 Years)',
    bullets: [
      'Map skills-to-jobs gaps; launch rapid credential pathways in critical sectors (energy, semiconductors, ag-tech, healthcare).',
      'Targeted stipends/UBI pilots tied to upskilling to reduce transition friction.',
      'Local capital stack: blend public grants + catalytic private capital for SMB modernization.'
    ]
  },
  {
    title: 'Phase 2: Supply-Chain Resilience (3-6 Years)',
    bullets: [
      'Reshore/friend-shore key nodes; dual-source critical components.',
      'Digital twins for logistics to stress-test disruptions and re-route dynamically.',
      'Finance: guarantee facilities and inventory insurance to smooth volatility.'
    ]
  },
  {
    title: 'Phase 3: Innovation Sandboxes (5-10 Years)',
    bullets: [
      'Regulatory sandboxes for frontier tech (climate, bio, compute) with clear guardrails.',
      'Public procurement as a demand signal for domestic innovators.',
      'Export pathways for proven solutions; shared IP frameworks for public-good tech.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Economic prosperity underwrites civic stability—more resilient jobs, higher wages, and fiscal room to invest in public goods.'
  }
];

export default function EconomicProsperityPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-rose-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-rose-200">Goals</Link>
          <span>/</span>
          <span className="text-rose-200">Economic Prosperity</span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-rose-200/80 mb-3">Strategic Goal 9</p>
          <h1 className="text-4xl font-bold mb-4">Economic Prosperity</h1>
          <p className="text-white/70 text-lg">
            A long-form brief on how we drive growth with skills, resilient supply chains, and innovation sandboxes.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-rose-300/40">
            ← Back to Goals
          </Link>
          <Link href="/docs/usamind-tasklist" className="px-4 py-2 rounded-lg bg-rose-500/20 border border-rose-400/30 text-rose-100 hover:border-rose-300">
            Read the implementation task list
          </Link>
        </div>
      </div>
    </div>
  );
}
