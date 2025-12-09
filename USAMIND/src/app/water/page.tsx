'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function WaterPage() {
  const sector = getSectorById('water')!;
  return <SectorPageTemplate sector={sector} />;
}
