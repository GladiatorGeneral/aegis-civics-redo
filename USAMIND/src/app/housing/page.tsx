'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function HousingPage() {
  const sector = getSectorById('housing')!;
  return <SectorPageTemplate sector={sector} />;
}
