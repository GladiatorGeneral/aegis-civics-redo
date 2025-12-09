/**
 * PHNX AI - Sector Configuration
 * Modular configuration for all civic sectors
 * Add new sectors here to automatically integrate them into the platform
 */

export interface Sector {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  href: string;
  enabled: boolean;
  comingSoon?: boolean;
  features?: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
}

/**
 * All civic sectors available in Phnx AI
 * To add a new sector, simply add an entry here
 */
export const SECTORS: Sector[] = [
  {
    id: 'usamind',
    name: 'USAMind',
    shortName: 'USAMind',
    description: 'Neural Civic Intelligence - AI-powered legislative tracking and predictions',
    icon: '🧠',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    href: '/usamind',
    enabled: true,
    features: ['Legislative Tracking', 'AI Vote Predictions', 'Constitutional Analysis', 'Real-time Alerts']
  },
  {
    id: 'health',
    name: 'Health & Insurance',
    shortName: 'Health',
    description: 'Healthcare policy analysis, insurance tracking, and medical legislation',
    icon: '🏥',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    href: '/health',
    enabled: true,
    comingSoon: true,
    features: ['Healthcare Bills', 'Insurance Policy', 'Medicare/Medicaid', 'Public Health']
  },
  {
    id: 'education',
    name: 'Education',
    shortName: 'Education',
    description: 'Educational policy, funding, and school system legislation',
    icon: '📚',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    href: '/education',
    enabled: true,
    comingSoon: true,
    features: ['K-12 Policy', 'Higher Education', 'Student Loans', 'Education Funding']
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    shortName: 'Agriculture',
    description: 'Farm bills, agricultural subsidies, and food policy',
    icon: '🌾',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    href: '/agriculture',
    enabled: true,
    comingSoon: true,
    features: ['Farm Bills', 'Subsidies', 'Food Safety', 'Rural Development']
  },
  {
    id: 'housing',
    name: 'Housing',
    shortName: 'Housing',
    description: 'Housing policy, urban development, and real estate legislation',
    icon: '🏠',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    href: '/housing',
    enabled: true,
    comingSoon: true,
    features: ['Housing Policy', 'Urban Development', 'HUD Programs', 'Affordable Housing']
  },
  {
    id: 'water',
    name: 'Water',
    shortName: 'Water',
    description: 'Water infrastructure, rights, and environmental policy',
    icon: '💧',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    href: '/water',
    enabled: true,
    comingSoon: true,
    features: ['Water Rights', 'Infrastructure', 'Clean Water Act', 'Conservation']
  },
  {
    id: 'energy',
    name: 'Energy',
    shortName: 'Energy',
    description: 'Energy policy, renewable initiatives, and power grid legislation',
    icon: '⚡',
    color: '#eab308',
    gradient: 'from-yellow-500 to-amber-600',
    href: '/energy',
    enabled: true,
    comingSoon: true,
    features: ['Energy Policy', 'Renewables', 'Grid Infrastructure', 'Climate Action']
  },
  {
    id: 'leaders',
    name: 'US Leaders',
    shortName: 'Leaders',
    description: 'Track representatives, senators, and government officials',
    icon: '🏛️',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-blue-600',
    href: '/leaders',
    enabled: true,
    comingSoon: true,
    features: ['Congress Members', 'Voting Records', 'Contact Info', 'Committee Assignments']
  }
];

/**
 * Main navigation items
 */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  ...SECTORS.filter(s => s.enabled).map(sector => ({
    id: sector.id,
    label: sector.shortName,
    href: sector.href,
    icon: sector.icon
  }))
];

/**
 * Get sector by ID
 */
export function getSectorById(id: string): Sector | undefined {
  return SECTORS.find(s => s.id === id);
}

/**
 * Get all enabled sectors
 */
export function getEnabledSectors(): Sector[] {
  return SECTORS.filter(s => s.enabled);
}

/**
 * Get sectors that are coming soon
 */
export function getComingSoonSectors(): Sector[] {
  return SECTORS.filter(s => s.enabled && s.comingSoon);
}

/**
 * Get active (not coming soon) sectors
 */
export function getActiveSectors(): Sector[] {
  return SECTORS.filter(s => s.enabled && !s.comingSoon);
}
