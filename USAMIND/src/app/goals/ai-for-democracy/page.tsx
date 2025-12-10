import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'AI as democracy’s amplifier—augmenting judgment, scaling deliberation, and optimizing governance without replacing human agency.'
  },
  {
    title: 'Guiding Philosophy',
    body: 'Constitutional, transparent AI with democratic values embedded; always accountable and overrideable by humans.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Democratic Training Corpus with ethical annotations; AI audit trails for all democratic AI systems.',
      'Intelligence Layer: Constitutional AI architectures with fairness constraints, explanation, and human override protocols.',
      'Governance & Economic Layer: Democratic AI Oversight Boards with rotating citizen membership; Public AI Trust to steward critical infrastructure.',
      'Human Capital Layer: AI Civics Specialists in every branch; public AI literacy campaigns.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional AI Democracy Labs (RADLs) focused on legislative analysis, policy simulation, deliberation management, and misinformation defense.',
      'Application protocols: Assistive AI (summarize/analyze/predict), Deliberative AI (manage large-scale participation equitably), Guardrail AI (monitor backsliding/manipulation).',
      'Federated Democratic AI training across jurisdictions without sharing sensitive data.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'AI-human symbiotic governance where AI handles complexity scaling and humans provide values and judgment.',
      'Democratic AI evolution via public review and iterative refinement.',
      'Overseer Lens monitoring alignment, preventing concentration of algorithmic power, and ensuring digital public sphere sovereignty.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'AI will transform governance—this blueprint ensures it strengthens rather than subverts democracy.'
  }
];

export default function AiForDemocracyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-cyan-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-cyan-200">Goals</Link>
          <span>/</span>
          <span className="text-cyan-200">AI for Democracy</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-cyan-300/80 mb-3">Strategic Goal 6</p>
          <h1 className="text-4xl font-bold mb-4">AI for Democracy</h1>
          <p className="text-white/70 text-lg">
            Constitutional AI that augments human judgment, scales participation, and protects democratic sovereignty across every layer of governance.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-cyan-400/40">
            ← Back to Goals
          </Link>
        </div>
      </div>
    </div>
  );
}
