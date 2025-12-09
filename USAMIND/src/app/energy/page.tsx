'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function EnergyPage() {
  const sector = getSectorById('energy')!;
  return <SectorPageTemplate sector={sector} />;
}
