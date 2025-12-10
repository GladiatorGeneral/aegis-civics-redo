import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: 'Vision',
    body: `Transition from a fragmented, reactive food system to an integrated, predictive, and resilient network that optimizes for nutritional output, environmental sustainability, and human capital.`
  },
  {
    title: 'Guiding Philosophy',
    body: `A planetary-scale cybernetic organism with a feedback loop (Data → AI Analysis → Resource Orchestration → Human Execution). Transition is buffered by a sliding-scale economic model, UBI, and upskilling.`
  },
  {
    title: 'Phase 1: Foundation & Proto-Nexus (Years 0-2)',
    bullets: [
      'Data Layer: Build the GFSAD30+ Global Datacube (climate, soil telemetry, supply chain). Federated model with FAIR principles.',
      'Intelligence Layer: GAN Predictive Engine with AutoML + neuro-symbolic AI; dynamic global zoning map (HEZ, SPZ, RDZ, SRZ).',
      'Governance & Economic Layer: GAN Steering Council; sliding-scale NSU exchange (currency + tech transfer + data premiums).',
      'Human Capital Layer: GAN Future-Farmer Academy; UBI pilots to enable retraining and adoption.'
    ]
  },
  {
    title: 'Phase 2: Regional Node Deployment (Years 3-7)',
    bullets: [
      'Regional Agricultural Nexus (RAN): local AI + RAD teams + civic sandbox.',
      'Zone protocols: HEZ (maximize NSU, SDI at scale), SPZ (provenance and microclimate IoT), RDZ (regenerative transition), SRZ (stress-tested reserves).',
      'Inter-RAN Resource Negotiation (IRRN): federated negotiation of surplus/deficit across regions using NSU.'
    ]
  },
  {
    title: 'Phase 3: Full Orchestration (Years 8-15+)',
    bullets: [
      'NSU as multifactor global unit (biodiversity, equity premiums); UBI as stabilizer and human feedback layer.',
      'AI as predictive fabric for global second/third-order effects; humans as system orchestrators and stewards.',
      'Overseer lens: balance efficiency, resilience, equity; continuous adaptation.'
    ]
  },
  {
    title: 'Why It Matters',
    body: `Food, water, and soil security underpin every other goal—this blueprint is the backbone for resilience and a just transition.`
  }
];

export default function AgWaterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav className="text-sm text-white/50 flex items-center gap-2">
          <Link href="/" className="hover:text-lime-200">Home</Link>
          <span>/</span>
          <Link href="/goals" className="hover:text-lime-200">Goals</Link>
          <span>/</span>
          <span className="text-lime-200">Ag & Water Resilience</span>
        </nav>

        <div>
          <p className="text-sm uppercase tracking-wide text-lime-300/80 mb-3">Strategic Goal 7</p>
          <h1 className="text-4xl font-bold mb-4">Ag & Water Resilience</h1>
          <p className="text-white/70 text-lg">
            Deploy regenerative agriculture, precision water systems, and globally coordinated food security playbooks. This page carries
            the long-form narrative and phased plan (GAN) for how we deliver it.
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
          <Link href="/goals" className="px-4 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-lime-400/40">
            ← Back to Goals
          </Link>
          <Link href="/docs/usamind-tasklist" className="px-4 py-2 rounded-lg bg-lime-500/20 border border-lime-400/30 text-lime-100 hover:border-lime-300">
            Read the implementation task list
          </Link>
        </div>
      </div>
    </div>
  );
}
