'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function AgriculturePage() {
  const sector = getSectorById('agriculture')!;
  return <SectorPageTemplate sector={sector} />;
}
