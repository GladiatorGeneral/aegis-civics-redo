import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Move from zero-sum combat to collaborative problem-solving grounded in shared values and principled compromise.'
  },
  {
    title: 'Guiding Philosophy',
    body: 'Dialogue structured for discovery, not victory—technology that depolarizes language and reveals common ground.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Discourse Analysis Corpus tracking political language, framing, and persuasion patterns.',
      'Intelligence Layer: Bridge-Building Engine (neuro-symbolic AI) to identify shared values, translate partisan frames, detect escalation.',
      'Governance & Economic Layer: Bipartisan Innovation Funds requiring cross-party sponsorship; dialogue requirements for major legislation.',
      'Human Capital Layer: Cross-Partisan Facilitators (retired officials) and Political Empathy Labs using immersive perspective-taking.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Dialogue Centers (RDCs) with structured methods tuned to conflict levels: online AI-moderated for low, facilitated in-person for medium, intensive retreats for high conflict.',
      'Cross-Partisan Policy Incubators where legislators co-develop solutions with RDC support.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'Predictive polarization alerts to surface divides before they harden.',
      'Collaborative governance systems that identify and credit bipartisan contributions in legislation.',
      'Overseer Lens tracking rhetoric, cross-party collaboration metrics, and policy durability.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Democracy requires disagreement but cannot survive without dialogue; this builds the connective tissue for durable consensus.'
  }
];

export default function BipartisanDialoguePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-indigo-200">Goals</Link>
          <span>/</span>
          <span className="text-indigo-200">Bipartisan Dialogue</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-indigo-300/80 mb-3">Strategic Goal 5</p>
          <h1 className="text-4xl font-bold mb-4">Bipartisan Dialogue</h1>
          <p className="text-white/70 text-lg">
            Structured conversations that surface shared values, reduce polarization, and enable joint problem-solving instead of zero-sum battles.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-indigo-400/40">
            ← Back to Goals
          </Link>
        </div>
      </div>
    </div>
  );
}
