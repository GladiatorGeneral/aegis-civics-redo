/**
 * PHNX AI - Navigation Configuration
 * Comprehensive navigation structure for the civic intelligence platform
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
  badge?: string;
}

export interface IssueCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface NationalIssue {
  id: string;
  category: string;
  title: string;
  problem: string;
  problemStat: string;
  solutions: Solution[];
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  evidence: string;
  impact: string;
  icon: string;
}

/**
 * Main Navigation Structure
 */
export const MAIN_NAV: NavItem[] = [
  {
    id: 'usamind',
    label: 'USAMind',
    href: '/usamind',
    icon: '🧠',
    description: 'Civic Intelligence Hub',
    children: [
      {
        id: 'issues',
        label: 'Issues & Solutions',
        href: '/issues',
        icon: '📋',
        description: 'National challenges with evidence-based solutions'
      },
      {
        id: 'congressional-tracker',
        label: 'Congressional Tracker',
        href: '/congressional-tracker',
        icon: '🏛️',
        description: 'Track bills, votes, and congressional activity'
      },
      {
        id: 'intelligence-suite',
        label: 'Intelligence Suite',
        href: '/intelligence-suite',
        icon: '🔍',
        description: 'AI-powered civic analysis tools'
      },
      {
        id: 'legislative-monitoring',
        label: 'Legislative Monitoring',
        href: '/legislative-monitoring',
        icon: '📊',
        description: 'Real-time legislative tracking'
      }
    ]
  },
  {
    id: 'civics-learning',
    label: 'Civics Learning',
    href: '/civics-learning',
    icon: '📚',
    description: 'Educational resources for civic engagement'
  },
  {
    id: 'our-goals',
    label: 'Our Goals',
    href: '/goals',
    icon: '🎯',
    description: 'Our mission and objectives'
  },
  {
    id: 'government-leadership',
    label: 'Government Leadership',
    href: '/leaders',
    icon: '👥',
    description: 'Track elected officials and government leaders'
  },
  {
    id: 'login',
    label: 'Login',
    href: '/login',
    icon: '🔐',
    description: 'Sign in to your account'
  }
];

/**
 * Issue Categories for filtering
 */
export const ISSUE_CATEGORIES: IssueCategory[] = [
  { id: 'all', name: 'All Issues', icon: '📋', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'economic', name: 'Economic Inequality', icon: '💰', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
  { id: 'housing', name: 'Housing Crisis', icon: '🏠', color: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
  { id: 'healthcare', name: 'Healthcare Crisis', icon: '🏥', color: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
  { id: 'education', name: 'Education Crisis', icon: '📚', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
  { id: 'infrastructure', name: 'Infrastructure Crisis', icon: '🌉', color: '#3b82f6', gradient: 'from-blue-500 to-indigo-600' },
  { id: 'government', name: 'Government Reform', icon: '🏛️', color: '#6366f1', gradient: 'from-indigo-500 to-blue-600' },
  { id: 'climate', name: 'Climate Crisis', icon: '🌍', color: '#22c55e', gradient: 'from-green-500 to-emerald-600' }
];

/**
 * National Issues with Evidence-Based Solutions
 */
export const NATIONAL_ISSUES: NationalIssue[] = [
  {
    id: 'economic-inequality',
    category: 'economic',
    title: 'Economic Inequality',
    problem: 'Top 1% owns 32% of wealth, bottom 50% owns 2.6%',
    problemStat: '32% vs 2.6%',
    solutions: [
      {
        id: 'algorithmic-wage',
        title: 'Algorithmic Wage Floor',
        description: 'Ties minimum wage to local housing costs ($34/hr SF vs. $15/hr AL). Uses real-time data from housing markets.',
        evidence: 'Denmark model cut poverty 18% without job loss.',
        impact: 'Eliminates poverty-level wages nationwide',
        icon: '📈'
      },
      {
        id: 'wealth-tax',
        title: 'Wealth Tax (3% >$50M)',
        description: 'Raises $4.3T over decade. Public ledger shows exact spending.',
        evidence: 'Norway funds free college with 0.85% tax.',
        impact: 'Funds major infrastructure and education programs',
        icon: '💎'
      },
      {
        id: 'worker-ownership',
        title: 'Worker Ownership',
        description: 'Mandate profit-sharing for corps with >500 employees. Expand ESOP tax benefits.',
        evidence: 'Mondragon Corp (Spain): 0 layoffs in 70 years.',
        impact: 'Creates shared prosperity and job security',
        icon: '🤝'
      }
    ]
  },
  {
    id: 'housing-crisis',
    category: 'housing',
    title: 'Housing Crisis',
    problem: '46% of renters are cost-burdened, 580K homeless',
    problemStat: '46% cost-burdened',
    solutions: [
      {
        id: '3d-printed-homes',
        title: '3D-Printed Neighborhoods',
        description: "ICON's tech builds $10K homes in 24hrs. 60% less energy than traditional builds.",
        evidence: 'Austin deployed 100 homes in 6 months.',
        impact: 'Rapid affordable housing deployment',
        icon: '🏗️'
      },
      {
        id: 'zoning-reform',
        title: 'Zoning Reform',
        description: 'Federal grants require 4-plexes near transit. Fast-track permits for affordable projects (<30 days).',
        evidence: 'Tokyo reforms dropped rents 47%.',
        impact: 'Increases housing supply dramatically',
        icon: '📐'
      },
      {
        id: 'community-land-trusts',
        title: 'Community Land Trusts',
        description: 'Blockchain-managed to prevent speculation. Permanently caps resale prices at 25% appreciation.',
        evidence: '250+ CLTs in U.S. already operating.',
        impact: 'Prevents housing speculation bubbles',
        icon: '🏘️'
      }
    ]
  },
  {
    id: 'healthcare-crisis',
    category: 'healthcare',
    title: 'Healthcare Crisis',
    problem: '30M uninsured, medical debt = #1 bankruptcy cause',
    problemStat: '30M uninsured',
    solutions: [
      {
        id: 'medicare-public-option',
        title: 'Medicare for All Who Want It',
        description: 'Public option competes with private insurers. Caps insulin at $35/month (all ages).',
        evidence: 'Urban Institute: 30% lower premiums.',
        impact: 'Universal healthcare access and affordability',
        icon: '🏥'
      },
      {
        id: 'ai-diagnostics',
        title: 'AI Diagnostics',
        description: 'Zebra Medical detects tumors at $1/scan (95% accuracy). FDA-approved for 15 conditions.',
        evidence: 'Cuts radiologist workload 40%.',
        impact: 'Early detection saves lives and costs',
        icon: '🤖'
      },
      {
        id: 'elder-care-tech',
        title: 'Elder Care Tech',
        description: 'IoT fall sensors alert caregivers in 10sec. VR therapy cuts dementia agitation 60%.',
        evidence: 'Japan ROBEAR reduces caregiver injuries 40%.',
        impact: 'Dignified aging with reduced caregiver burden',
        icon: '👴'
      }
    ]
  },
  {
    id: 'education-crisis',
    category: 'education',
    title: 'Education Crisis',
    problem: 'U.S. ranks 38th in math, teacher pay gap = -23%',
    problemStat: '38th in math',
    solutions: [
      {
        id: 'teacher-academies',
        title: 'Finland 2.0 Teacher Academies',
        description: 'Free masters + $100K starting salaries. Funded by 1% tech tax ($8B/year).',
        evidence: 'RAND: $1 investment = $12 economic return.',
        impact: 'World-class education system',
        icon: '🎓'
      },
      {
        id: 'vocational-nfts',
        title: 'Vocational Skill NFTs',
        description: 'Blockchain credentials for trades. IBM pledges 500K free coding certificates.',
        evidence: 'Germany dual system: 5.3% youth unemployment.',
        impact: 'Skills-based economy with guaranteed employment',
        icon: '🔧'
      },
      {
        id: 'ai-tutors',
        title: 'AI Tutors',
        description: 'Khanmigo personalizes math instruction. Frees teachers for mentorship.',
        evidence: 'MIT study: 20% higher test scores.',
        impact: 'Personalized learning for every student',
        icon: '🧑‍🏫'
      }
    ]
  },
  {
    id: 'infrastructure-crisis',
    category: 'infrastructure',
    title: 'Infrastructure Crisis',
    problem: 'ASCE grade = C-, 43% of roads in poor condition',
    problemStat: 'Grade: C-',
    solutions: [
      {
        id: 'renewable-surge',
        title: 'Renewable Energy Surge',
        description: 'Solar now cheaper than coal (Lazard). $75/ton carbon tax funds transition.',
        evidence: 'Texas wind powers 40% of state.',
        impact: 'Clean energy independence and jobs',
        icon: '☀️'
      },
      {
        id: 'ai-leak-detection',
        title: 'AI Leak Detection',
        description: 'Google Pipeguard finds ruptures in minutes. 30% quicker repairs.',
        evidence: 'Flint pilot saved 100M gallons/year.',
        impact: 'Prevents water crises and waste',
        icon: '💧'
      },
      {
        id: 'disaster-proofing',
        title: 'Disaster-Proofing',
        description: 'Japan earthquake-resilient buildings. Miami installing $500M stormwater pumps. FEMA funds tied to climate adaptation.',
        evidence: 'Japan: zero building collapses 2023.',
        impact: 'Resilient communities against natural disasters',
        icon: '🛡️'
      }
    ]
  },
  {
    id: 'government-reform',
    category: 'government',
    title: 'Government Reform',
    problem: '86% distrust federal government (Pew 2024)',
    problemStat: '86% distrust',
    solutions: [
      {
        id: 'e-gov',
        title: "Estonia's e-Gov Model",
        description: '99% services online (voting takes 3 minutes). Blockchain secures all records.',
        evidence: 'Saves 2% GDP/year in bureaucracy.',
        impact: 'Efficient, transparent government services',
        icon: '🖥️'
      },
      {
        id: 'citizen-assemblies',
        title: 'Citizen Assemblies',
        description: '70% of proposals become law. VR debates reduce partisan hostility.',
        evidence: 'Ireland used them to legalize gay marriage.',
        impact: 'Direct democracy and reduced polarization',
        icon: '🗳️'
      },
      {
        id: 'lobbyist-bans',
        title: 'Lobbyist Bans',
        description: 'Federal officials barred from private sector lobbying for 10 years. Real-time donor tracking via AI.',
        evidence: 'Norway model cut corruption 75%.',
        impact: 'Eliminates corporate capture of government',
        icon: '🚫'
      }
    ]
  },
  {
    id: 'climate-crisis',
    category: 'climate',
    title: 'Climate Crisis',
    problem: '$165B/year in disaster costs since 2020',
    problemStat: '$165B/year',
    solutions: [
      {
        id: 'green-jobs',
        title: 'Green New Deal Jobs',
        description: '15M jobs installing solar/wind. Appalachian coal miners retrained as battery engineers. $50K/year minimum wage for green jobs.',
        evidence: 'Economic transformation with environmental benefits.',
        impact: 'Economic transformation with environmental benefits',
        icon: '🌱'
      },
      {
        id: 'carbon-rewards',
        title: 'Carbon Rewards',
        description: 'Crypto tokens for recycling/solar. Redeemable for tax credits.',
        evidence: 'Sweden cut emissions 34% with similar program.',
        impact: 'Market-based incentives for climate action',
        icon: '🪙'
      },
      {
        id: 'vertical-farming',
        title: 'Vertical Farming',
        description: '90% less water than traditional ag. AeroFarms grows lettuce in 12 days (vs. 30). Eliminates food deserts in cities.',
        evidence: 'Sustainable food security in urban areas.',
        impact: 'Sustainable food security in urban areas',
        icon: '🏢'
      }
    ]
  }
];

/**
 * Footer Links
 */
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Issues & Solutions', href: '/issues' },
    { label: 'Congressional Tracker', href: '/congressional-tracker' },
    { label: 'Civics Learning', href: '/civics-learning' }
  ],
  contact: {
    email: 'info@usamind.org',
    phone: '(555) 123-4567'
  },
  social: [
    { label: 'Twitter', href: '#', icon: '𝕏' },
    { label: 'Facebook', href: '#', icon: '📘' },
    { label: 'LinkedIn', href: '#', icon: '💼' }
  ]
};

/**
 * Helper Functions
 */
export function getIssuesByCategory(categoryId: string): NationalIssue[] {
  if (categoryId === 'all') return NATIONAL_ISSUES;
  return NATIONAL_ISSUES.filter(issue => issue.category === categoryId);
}

export function getIssueById(id: string): NationalIssue | undefined {
  return NATIONAL_ISSUES.find(issue => issue.id === id);
}

export function getCategoryById(id: string): IssueCategory | undefined {
  return ISSUE_CATEGORIES.find(cat => cat.id === id);
}

export function getNavItemById(id: string): NavItem | undefined {
  for (const item of MAIN_NAV) {
    if (item.id === id) return item;
    if (item.children) {
      const child = item.children.find(c => c.id === id);
      if (child) return child;
    }
  }
  return undefined;
}
