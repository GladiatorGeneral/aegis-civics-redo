import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: 'Citizens shift from spectators to co-creators, with engagement woven into daily life through multiple low-friction pathways.'
  },
  {
    title: 'Guiding Philosophy',
    body: 'Lower participation costs while increasing the value and impact of every act of engagement.'
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Civic Engagement Graph mapping issues, orgs, officials, and citizens.',
      'Intelligence Layer: Participation Optimizer matching people to opportunities by skills, interests, and availability with sustainability prediction.',
      'Governance & Economic Layer: Civic Contribution Credits and Deliberative Democracy Dollars for citizen-led policy development.',
      'Human Capital Layer: Professional Facilitators and Community Organizer Academies in underserved areas.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Engagement Hubs (REHs) as physical/virtual spaces for consultation, collaboration, and decision-making.',
      'Protocols: Consultation (large-scale sentiment + AI synthesis), Collaboration (co-design), Decision (binding assemblies).',
      'Cross-Hub Deliberation: Sequential refinement across hubs to build consensus across regions.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'Predictive engagement highlights policy areas needing input before controversy.',
      'Civic Reputation Systems to reward constructive participation across platforms.',
      'Overseer Lens monitoring participation equity, deliberation quality, and implementation of public input.'
    ]
  },
  {
    title: 'Why It Matters',
    body: 'Democracy atrophies without participation; this blueprint builds the muscle for meaningful, durable engagement.'
  }
];

export default function CivicEngagementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-orange-200">Goals</Link>
          <span>/</span>
          <span className="text-orange-200">Civic Engagement</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-orange-300/80 mb-3">Strategic Goal 4</p>
          <h1 className="text-4xl font-bold mb-4">Civic Engagement</h1>
          <p className="text-white/70 text-lg">
            Multiple on-ramps, real impact. A system that matches people to the right opportunities and rewards constructive participation.
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
