import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body:
      'Personalized, verified access that turns passive consumption into active engagement, building an information commons citizens can trust.'
  },
  {
    title: 'Guiding Philosophy',
    body:
      'Information as a public utility—clarity, accuracy, and cognitive sovereignty. AI filters signal from noise while preserving human agency.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Civic Information Datacube integrating government APIs, legislative data, verified news, research, and local feeds with provenance.',
      'Intelligence Layer: Truth-Signal Engine using neuro-symbolic AI for misinformation detection, context, and explainable summaries; AutoML tuned for comprehension.',
      'Governance & Economic Layer: Information Trust Councils, credibility scoring with visibility premiums, micro-payments for quality journalism.',
      'Human Capital Layer: Digital Civic Literacy Academies; train 10k Information Navigators; UBI pilots for vulnerable populations to engage.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Civic Intelligence Hubs delivering hyper-local curation (budgets, school boards) with journalists, librarians, and community elders.',
      'Protocols: Crisis information (AI-verified, geofenced), legislative content (plain language + impact forecasting), community knowledge (oral history digitization).',
      'Inter-Hub Validation: Blockchain-anchored fact-checking and multi-hub dispute review before dissemination.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'Personalized civic education pathways informed by engagement and knowledge gaps.',
      'Collective intelligence fabric that spots emergent concerns before crisis and enables proactive governance.',
      'Overseer Lens tracking information ecosystem health, polarization metrics, and minority voice amplification.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Misinformation is a pathogen to democracy; this blueprint builds herd immunity through verification and education.'
  }
];

export default function InformedCitizensPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-orange-200">Goals</Link>
          <span>/</span>
          <span className="text-orange-200">Informed Citizens</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-orange-300/80 mb-3">Strategic Goal 1</p>
          <h1 className="text-4xl font-bold mb-4">Informed Citizens</h1>
          <p className="text-white/70 text-lg">
            Treat information as a public utility—managed for clarity, accuracy, and empowerment. This deep dive outlines the phased plan to
            deliver personalized, verified civic intelligence at scale.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-orange-400/40">
            ← Back to Goals
          </Link>
        </div>
      </div>
    </div>
  );
}
