import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Governance as applied science—hypothesize, implement, measure, iterate with a global evidence backbone.'
  },
  {
    title: 'Guiding Philosophy',
    body: 'Replace ideology with evidence through rigorous feedback loops and contextualized learning.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Policy Evidence Commons of interventions, RCTs, longitudinal studies, and implementation notes.',
      'Intelligence Layer: Policy Match Engine using causal inference to recommend interventions by demographic/economic/cultural fit.',
      'Governance & Economic Layer: What Works certification with liability protection; Policy Innovation Bonds tied to outcomes.',
      'Human Capital Layer: Policy Scientists in every legislative office; Evidence Brokerage linking academics and policymakers.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Policy Labs (RPLs): university-government partnerships for rapid-cycle evaluations by domain.',
      'Tiered protocols: Tier 1 (Proven) fast-track; Tier 2 (Promising) A/B tests; Tier 3 (Experimental) sandboxed opt-in pilots.',
      'Inter-Lab Learning Network with federated learning and quarterly meta-analyses.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'Predictive policy simulation to model second/third-order effects pre-implementation.',
      'Adaptive policy systems that auto-tune parameters from continuous outcome data.',
      'Overseer Lens monitoring evidence quality, replication rates, and implementation fidelity.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Ideology without evidence is superstition; this system grounds governance in measurable reality.'
  }
];

export default function EvidenceBasedSolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-emerald-200">Goals</Link>
          <span>/</span>
          <span className="text-emerald-200">Evidence-Based Solutions</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-300/80 mb-3">Strategic Goal 3</p>
          <h1 className="text-4xl font-bold mb-4">Evidence-Based Solutions</h1>
          <p className="text-white/70 text-lg">
            Shift policy from ideological competition to solution optimization with rigorous, contextual evidence and continuous improvement loops.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-emerald-400/40">
            ← Back to Goals
          </Link>
        </div>
      </div>
    </div>
  );
}
