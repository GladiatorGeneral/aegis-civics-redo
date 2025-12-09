'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function HealthPage() {
  const sector = getSectorById('health')!;
  return <SectorPageTemplate sector={sector} />;
}
