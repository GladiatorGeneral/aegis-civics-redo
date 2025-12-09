'use client';

import { SectorPageTemplate } from '@/components/sectors';
import { getSectorById } from '@/config/sectors';

export default function EducationPage() {
  const sector = getSectorById('education')!;
  return <SectorPageTemplate sector={sector} />;
}
