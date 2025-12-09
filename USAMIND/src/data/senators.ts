/**
 * US Senators Data
 * Current as of 119th Congress (2025-2027)
 */

export interface Senator {
  id: string;
  name: string;
  party: 'D' | 'R' | 'I';
  state: string;
  stateAbbr: string;
  suite: string;
  phone: string;
  email?: string;
  website?: string;
  imageInitials: string;
  committees?: string[];
  leadership?: string;
  termEnd?: number;
}

// State name mapping
const STATE_NAMES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

// Generate initials from name
function getInitials(name: string): string {
  const parts = name.split(' ').filter(p => !p.includes('.') && p.length > 1);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Generate ID from name
function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const rawSenators = [
  { name: "Angela Alsobrooks", party: "D", state: "MD", suite: "SR-374", phone: "(202) 224-4524" },
  { name: "Tammy Baldwin", party: "D", state: "WI", suite: "SH-141", phone: "(202) 224-5653" },
  { name: "Jim Banks", party: "R", state: "IN", suite: "SH-303", phone: "(202) 224-4814" },
  { name: "John Barrasso", party: "R", state: "WY", suite: "SD-307", phone: "(202) 224-6441" },
  { name: "Michael F. Bennet", party: "D", state: "CO", suite: "SR-261", phone: "(202) 224-5852" },
  { name: "Marsha Blackburn", party: "R", state: "TN", suite: "SD-357", phone: "(202) 224-3344" },
  { name: "Richard Blumenthal", party: "D", state: "CT", suite: "SH-503", phone: "(202) 224-2823" },
  { name: "Lisa Blunt Rochester", party: "D", state: "DE", suite: "SH-513", phone: "(202) 224-2441" },
  { name: "Cory A. Booker", party: "D", state: "NJ", suite: "SH-306", phone: "(202) 224-3224" },
  { name: "John Boozman", party: "R", state: "AR", suite: "SD-555", phone: "(202) 224-4843" },
  { name: "Katie Boyd Britt", party: "R", state: "AL", suite: "SR-416", phone: "(202) 224-5744" },
  { name: "Ted Budd", party: "R", state: "NC", suite: "SR-354", phone: "(202) 224-3154" },
  { name: "Maria Cantwell", party: "D", state: "WA", suite: "SH-511", phone: "(202) 224-3441" },
  { name: "Shelley Moore Capito", party: "R", state: "WV", suite: "SR-170", phone: "(202) 224-6472" },
  { name: "Bill Cassidy", party: "R", state: "LA", suite: "SD-455", phone: "(202) 224-5824" },
  { name: "Susan M. Collins", party: "R", state: "ME", suite: "SD-413", phone: "(202) 224-2523" },
  { name: "Christopher A. Coons", party: "D", state: "DE", suite: "SR-218", phone: "(202) 224-5042" },
  { name: "John Cornyn", party: "R", state: "TX", suite: "SH-517", phone: "(202) 224-2934" },
  { name: "Catherine Cortez Masto", party: "D", state: "NV", suite: "SH-309", phone: "(202) 224-3542" },
  { name: "Tom Cotton", party: "R", state: "AR", suite: "SR-326", phone: "(202) 224-2353" },
  { name: "Kevin Cramer", party: "R", state: "ND", suite: "SH-313", phone: "(202) 224-2043" },
  { name: "Mike Crapo", party: "R", state: "ID", suite: "SD-239", phone: "(202) 224-6142" },
  { name: "Ted Cruz", party: "R", state: "TX", suite: "SR-167", phone: "(202) 224-5922" },
  { name: "John R. Curtis", party: "R", state: "UT", suite: "SH-502", phone: "(202) 224-5251" },
  { name: "Steve Daines", party: "R", state: "MT", suite: "SH-320", phone: "(202) 224-2651" },
  { name: "Tammy Duckworth", party: "D", state: "IL", suite: "SH-524", phone: "(202) 224-2854" },
  { name: "Richard J. Durbin", party: "D", state: "IL", suite: "SH-711", phone: "(202) 224-2152" },
  { name: "Joni Ernst", party: "R", state: "IA", suite: "SR-260", phone: "(202) 224-3254" },
  { name: "John Fetterman", party: "D", state: "PA", suite: "SR-142", phone: "(202) 224-4254" },
  { name: "Deb Fischer", party: "R", state: "NE", suite: "SR-448", phone: "(202) 224-6551" },
  { name: "Ruben M. Gallego", party: "D", state: "AZ", suite: "SH-302", phone: "(202) 224-4521" },
  { name: "Kirsten E. Gillibrand", party: "D", state: "NY", suite: "SR-478", phone: "(202) 224-4451" },
  { name: "Lindsey Graham", party: "R", state: "SC", suite: "SR-211", phone: "(202) 224-5972" },
  { name: "Chuck Grassley", party: "R", state: "IA", suite: "SH-135", phone: "(202) 224-3744" },
  { name: "Bill Hagerty", party: "R", state: "TN", suite: "SR-251", phone: "(202) 224-4944" },
  { name: "Maggie Hassan", party: "D", state: "NH", suite: "SH-324", phone: "(202) 224-3324" },
  { name: "Josh Hawley", party: "R", state: "MO", suite: "SR-379A", phone: "(202) 224-6154" },
  { name: "Martin Heinrich", party: "D", state: "NM", suite: "SH-709", phone: "(202) 224-5521" },
  { name: "John W. Hickenlooper", party: "D", state: "CO", suite: "SH-316", phone: "(202) 224-5941" },
  { name: "Mazie K. Hirono", party: "D", state: "HI", suite: "SH-109", phone: "(202) 224-6361" },
  { name: "John Hoeven", party: "R", state: "ND", suite: "SR-338", phone: "(202) 224-2551" },
  { name: "Jon Husted", party: "R", state: "OH", suite: "SR-304", phone: "(202) 224-3353" },
  { name: "Cindy Hyde-Smith", party: "R", state: "MS", suite: "SH-528", phone: "(202) 224-5054" },
  { name: "Ron Johnson", party: "R", state: "WI", suite: "SH-328", phone: "(202) 224-5323" },
  { name: "James C. Justice", party: "R", state: "WV", suite: "SD-G12", phone: "(202) 224-3954" },
  { name: "Tim Kaine", party: "D", state: "VA", suite: "SR-231", phone: "(202) 224-4024" },
  { name: "Mark Kelly", party: "D", state: "AZ", suite: "SH-516", phone: "(202) 224-2235" },
  { name: "John Kennedy", party: "R", state: "LA", suite: "SR-437", phone: "(202) 224-4623" },
  { name: "Andy Kim", party: "D", state: "NJ", suite: "SH-520", phone: "(202) 224-4744" },
  { name: "Angus S. King Jr.", party: "I", state: "ME", suite: "SH-133", phone: "(202) 224-5344" },
  { name: "Amy Klobuchar", party: "D", state: "MN", suite: "SD-425", phone: "(202) 224-3244" },
  { name: "James Lankford", party: "R", state: "OK", suite: "SH-731", phone: "(202) 224-5754" },
  { name: "Mike Lee", party: "R", state: "UT", suite: "SR-363", phone: "(202) 224-5444" },
  { name: "Ben Ray Lujan", party: "D", state: "NM", suite: "SR-498", phone: "(202) 224-6621" },
  { name: "Cynthia M. Lummis", party: "R", state: "WY", suite: "SR-127A", phone: "(202) 224-3424" },
  { name: "Edward J. Markey", party: "D", state: "MA", suite: "SD-255", phone: "(202) 224-2742" },
  { name: "Roger Marshall", party: "R", state: "KS", suite: "SR-479A", phone: "(202) 224-4774" },
  { name: "Mitch McConnell", party: "R", state: "KY", suite: "SR-317", phone: "(202) 224-2541" },
  { name: "David H. McCormick", party: "R", state: "PA", suite: "SH-702", phone: "(202) 224-6324" },
  { name: "Jeff Merkley", party: "D", state: "OR", suite: "SH-531", phone: "(202) 224-3753" },
  { name: "Ashley Moody", party: "R", state: "FL", suite: "SR-387", phone: "(202) 224-3041" },
  { name: "Jerry Moran", party: "R", state: "KS", suite: "SD-521", phone: "(202) 224-6521" },
  { name: "Bernie F. Moreno", party: "R", state: "OH", suite: "SR-284", phone: "(202) 224-2315" },
  { name: "Markwayne Mullin", party: "R", state: "OK", suite: "SH-330", phone: "(202) 224-4721" },
  { name: "Lisa Murkowski", party: "R", state: "AK", suite: "SH-522", phone: "(202) 224-6665" },
  { name: "Christopher Murphy", party: "D", state: "CT", suite: "SH-136", phone: "(202) 224-4041" },
  { name: "Patty Murray", party: "D", state: "WA", suite: "SR-154", phone: "(202) 224-2621" },
  { name: "Jon Ossoff", party: "D", state: "GA", suite: "SH-317", phone: "(202) 224-3521" },
  { name: "Alex Padilla", party: "D", state: "CA", suite: "SH-331", phone: "(202) 224-3553" },
  { name: "Rand Paul", party: "R", state: "KY", suite: "SR-295", phone: "(202) 224-4343" },
  { name: "Gary C. Peters", party: "D", state: "MI", suite: "SH-724", phone: "(202) 224-6221" },
  { name: "Jack Reed", party: "D", state: "RI", suite: "SH-728", phone: "(202) 224-4642" },
  { name: "Pete Ricketts", party: "R", state: "NE", suite: "SR-139", phone: "(202) 224-4224" },
  { name: "James E. Risch", party: "R", state: "ID", suite: "SR-483", phone: "(202) 224-2752" },
  { name: "Jacky Rosen", party: "D", state: "NV", suite: "SH-713", phone: "(202) 224-6244" },
  { name: "Mike Rounds", party: "R", state: "SD", suite: "SH-716", phone: "(202) 224-5842" },
  { name: "Bernard Sanders", party: "I", state: "VT", suite: "SD-332", phone: "(202) 224-5141" },
  { name: "Brian Schatz", party: "D", state: "HI", suite: "SH-722", phone: "(202) 224-3934" },
  { name: "Adam B. Schiff", party: "D", state: "CA", suite: "SH-112", phone: "(202) 224-3841" },
  { name: "Eric Schmitt", party: "R", state: "MO", suite: "SR-404", phone: "(202) 224-5721" },
  { name: "Charles E. Schumer", party: "D", state: "NY", suite: "SH-322", phone: "(202) 224-6542" },
  { name: "Rick Scott", party: "R", state: "FL", suite: "SH-110", phone: "(202) 224-5274" },
  { name: "Tim Scott", party: "R", state: "SC", suite: "SH-104", phone: "(202) 224-6121" },
  { name: "Jeanne Shaheen", party: "D", state: "NH", suite: "SH-506", phone: "(202) 224-2841" },
  { name: "Tim Sheehy", party: "R", state: "MT", suite: "SD-G55", phone: "(202) 224-2644" },
  { name: "Elissa B. Slotkin", party: "D", state: "MI", suite: "SR-291", phone: "(202) 224-4822" },
  { name: "Tina Smith", party: "D", state: "MN", suite: "SH-720", phone: "(202) 224-5641" },
  { name: "Dan Sullivan", party: "R", state: "AK", suite: "SH-706", phone: "(202) 224-3004" },
  { name: "John Thune", party: "R", state: "SD", suite: "SD-511", phone: "(202) 224-2321" },
  { name: "Thom Tillis", party: "R", state: "NC", suite: "SD-113", phone: "(202) 224-6342" },
  { name: "Tommy Tuberville", party: "R", state: "AL", suite: "SR-455", phone: "(202) 224-4124" },
  { name: "Chris Van Hollen", party: "D", state: "MD", suite: "SH-730", phone: "(202) 224-4654" },
  { name: "Mark R. Warner", party: "D", state: "VA", suite: "SH-703", phone: "(202) 224-2023" },
  { name: "Raphael G. Warnock", party: "D", state: "GA", suite: "SH-717", phone: "(202) 224-3643" },
  { name: "Elizabeth Warren", party: "D", state: "MA", suite: "SH-311", phone: "(202) 224-4543" },
  { name: "Peter Welch", party: "D", state: "VT", suite: "SR-124", phone: "(202) 224-4242" },
  { name: "Sheldon Whitehouse", party: "D", state: "RI", suite: "SH-530", phone: "(202) 224-2921" },
  { name: "Roger F. Wicker", party: "R", state: "MS", suite: "SR-425", phone: "(202) 224-6253" },
  { name: "Ron Wyden", party: "D", state: "OR", suite: "SD-221", phone: "(202) 224-5244" },
  { name: "Todd Young", party: "R", state: "IN", suite: "SD-185", phone: "(202) 224-5623" }
] as const;

// Transform raw data into Senator objects
export const SENATORS: Senator[] = rawSenators.map(s => ({
  id: generateId(s.name),
  name: s.name,
  party: s.party as 'D' | 'R' | 'I',
  state: STATE_NAMES[s.state] || s.state,
  stateAbbr: s.state,
  suite: s.suite,
  phone: s.phone,
  imageInitials: getInitials(s.name),
  website: `https://www.${s.name.split(' ').pop()?.toLowerCase()}.senate.gov`
}));

// Helper functions
export function getSenatorsByState(stateAbbr: string): Senator[] {
  return SENATORS.filter(s => s.stateAbbr === stateAbbr);
}

export function getSenatorsByParty(party: 'D' | 'R' | 'I'): Senator[] {
  return SENATORS.filter(s => s.party === party);
}

export function getSenatorById(id: string): Senator | undefined {
  return SENATORS.find(s => s.id === id);
}

export function searchSenators(query: string): Senator[] {
  const q = query.toLowerCase();
  return SENATORS.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.state.toLowerCase().includes(q) ||
    s.stateAbbr.toLowerCase() === q
  );
}

export function getAllSenatorStates(): string[] {
  return [...new Set(SENATORS.map(s => s.stateAbbr))].sort();
}

export function getSenatorPartyBreakdown(): { D: number; R: number; I: number } {
  return {
    D: SENATORS.filter(s => s.party === 'D').length,
    R: SENATORS.filter(s => s.party === 'R').length,
    I: SENATORS.filter(s => s.party === 'I').length
  };
}

// Statistics
export const SENATE_STATS = {
  total: SENATORS.length,
  democrats: SENATORS.filter(s => s.party === 'D').length,
  republicans: SENATORS.filter(s => s.party === 'R').length,
  independents: SENATORS.filter(s => s.party === 'I').length,
  states: [...new Set(SENATORS.map(s => s.stateAbbr))].length
};

// State list for filtering
export const STATES = Object.entries(STATE_NAMES)
  .map(([abbr, name]) => ({ abbr, name }))
  .sort((a, b) => a.name.localeCompare(b.name));
