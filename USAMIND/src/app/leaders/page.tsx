'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';
import {
  GOVERNORS,
  GOVERNOR_STATS,
  MAYORS,
  MAYOR_STATS,
  REPRESENTATIVES,
  HOUSE_STATS,
  SENATORS,
  SENATE_STATS
} from '@/data';

type Category = 'governors' | 'mayors' | 'senators' | 'representatives';

type LeaderCardItem = {
  id: string;
  name: string;
  region: string;
  detail?: string;
  party: 'D' | 'R' | 'I' | 'N';
  phone?: string;
  website?: string;
};

const PARTY_STYLES: Record<LeaderCardItem['party'], string> = {
  D: 'bg-blue-500/15 text-blue-100 border-blue-400/40',
  R: 'bg-red-500/15 text-red-100 border-red-400/40',
  I: 'bg-amber-500/15 text-amber-100 border-amber-400/40',
  N: 'bg-slate-500/15 text-slate-100 border-slate-400/40'
};

export default function LeadersPage() {
  const sector = getSectorById('leaders')!;
  const [activeCategory, setActiveCategory] = useState<Category>('governors');
  const [query, setQuery] = useState('');

  const datasets: Record<Category, LeaderCardItem[]> = useMemo(() => ({
    governors: GOVERNORS.map(g => ({
      id: g.id,
      name: g.name,
      region: `${g.state} (${g.stateAbbr})`,
      detail: g.contact ?? g.address ?? 'State governor',
      party: g.party,
      phone: g.phone,
      website: g.website
    })),
    mayors: MAYORS.map(m => ({
      id: m.id,
      name: m.name,
      region: `${m.city}, ${m.stateAbbr}`,
      detail: m.address ?? 'City mayor',
      party: m.party,
      phone: m.phone,
      website: m.website
    })),
    senators: SENATORS.map(s => ({
      id: s.id,
      name: s.name,
      region: `${s.state} (${s.stateAbbr})`,
      detail: `Suite ${s.suite}`,
      party: s.party,
      phone: s.phone,
      website: s.website
    })),
    representatives: REPRESENTATIVES.map(r => ({
      id: r.id,
      name: r.name,
      region: `${r.state} (${r.stateAbbr}) – ${r.district}`,
      detail: r.committees.join(', ') || 'House Member',
      party: r.party,
      phone: r.phone,
      website: r.website
    }))
  }), []);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return datasets[activeCategory];
    return datasets[activeCategory].filter(item =>
      [item.name, item.region, item.detail ?? '', item.phone ?? '']
        .some(field => field.toLowerCase().includes(q))
    );
  }, [activeCategory, datasets, query]);

  const stats = useMemo(() => ([
    {
      title: 'Senators',
      value: SENATE_STATS.total,
      subtitle: `${SENATE_STATS.states} states · ${SENATE_STATS.democrats} D / ${SENATE_STATS.republicans} R / ${SENATE_STATS.independents} I`,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'House',
      value: HOUSE_STATS.total,
      subtitle: `${HOUSE_STATS.states} states · ${HOUSE_STATS.democrats} D / ${HOUSE_STATS.republicans} R`,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Governors',
      value: GOVERNOR_STATS.total,
      subtitle: `${GOVERNOR_STATS.states} states · ${GOVERNOR_STATS.democrats} D / ${GOVERNOR_STATS.republicans} R / ${GOVERNOR_STATS.independents} I`,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Mayors',
      value: MAYOR_STATS.total,
      subtitle: `${MAYOR_STATS.cities} cities · ${MAYOR_STATS.democrats} D / ${MAYOR_STATS.republicans} R / ${MAYOR_STATS.independents} I / ${MAYOR_STATS.nonpartisan} N`,
      gradient: 'from-rose-500 to-pink-600'
    }
  ]), []);

  const tabs: { id: Category; label: string; count: number }[] = [
    { id: 'governors', label: 'Governors', count: GOVERNOR_STATS.total },
    { id: 'mayors', label: 'Mayors', count: MAYOR_STATS.total },
    { id: 'senators', label: 'Senators', count: SENATE_STATS.total },
    { id: 'representatives', label: 'House', count: HOUSE_STATS.total }
  ];

  return (
    <SectorPageTemplate sector={{ ...sector, comingSoon: false }}>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(card => (
            <div
              key={card.title}
              className={`rounded-2xl p-4 border border-white/10 bg-gradient-to-br ${card.gradient} text-white shadow-lg shadow-black/30`}
            >
              <div className="text-sm text-white/70 mb-1">{card.title}</div>
              <div className="text-3xl font-semibold">{card.value.toLocaleString()}</div>
              <div className="text-xs text-white/80 mt-2">{card.subtitle}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                activeCategory === tab.id
                  ? 'bg-white text-slate-900 border-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">{tab.count}</span>
            </button>
          ))}
          <div className="flex-1" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, state, city, or phone"
            className="w-full md:w-80 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
          />
        </div>

        <LeaderGrid items={filteredItems} />
      </div>
    </SectorPageTemplate>
  );
}

function LeaderGrid({ items }: { items: LeaderCardItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70 text-center">
        No results. Try a different search.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <article
          key={item.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-inner shadow-black/20"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-white/60">{item.region}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs border ${PARTY_STYLES[item.party]}`}>
              {item.party}
            </span>
          </div>
          {item.detail && (
            <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.detail}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
            {item.phone && <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">{item.phone}</span>}
            {item.website && (
              <Link
                href={item.website}
                target="_blank"
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
              >
                Website
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
