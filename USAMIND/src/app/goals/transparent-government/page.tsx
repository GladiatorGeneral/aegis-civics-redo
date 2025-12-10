import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Government as a glass box—every process, decision, and dollar traceable in real time by any citizen.'
  },
  {
    title: 'Guiding Philosophy',
    body: 'Radical transparency as both disinfectant and innovation catalyst, secured with immutable, comprehensible records.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: API-first government data with standardized schemas; secure audit ledgers for contracts, expenditures, meetings.',
      'Intelligence Layer: Accountability Engine to flag spending anomalies, bottlenecks, and generate compliance reports.',
      'Governance & Economic Layer: Transparency Bonds tied to openness metrics; whistleblower crypto-channels for secure reporting.',
      'Human Capital Layer: Public Servant Data Stewards; Civic Tech Fellowships embedding technologists in agencies.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Transparency Offices (RTOs) with subpoena power and direct data access.',
      'Protocols: Legislative transparency (lobbyist tracking, amendment lineage), budget transparency (dollar-level flows, vendor graphs), regulatory transparency (contextual explainers).',
      'Cross-Jurisdiction Auditing: Peer audits and friendly competition for transparency using shared AI tools.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'Predictive transparency to anticipate opacity risks and recommend preemptive disclosures.',
      'Citizen-led audits with crowdsourced verification and incentives.',
      'Overseer Lens tracking corruption risk, public trust, and efficiency gains while protecting necessary security secrecy.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Transparency is democracy’s immune system—detecting and isolating malfeasance before it becomes systemic.'
  }
];

export default function TransparentGovernmentPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-pink-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-pink-200">Goals</Link>
          <span>/</span>
          <span className="text-pink-200">Transparent Government</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-pink-300/80 mb-3">Strategic Goal 2</p>
          <h1 className="text-4xl font-bold mb-4">Transparent Government</h1>
          <p className="text-white/70 text-lg">
            Make the state legible: real-time, immutable, and comprehensible records of public stewardship so every citizen can trace process,
            decisions, and dollars.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-pink-400/40">
            ← Back to Goals
          </Link>
        </div>
      </div>
    </div>
  );
}
