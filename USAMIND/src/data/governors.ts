/**
 * US Governors Data
 * Current as of 2025
 */

export interface Governor {
  id: string;
  name: string;
  party: 'D' | 'R' | 'I';
  state: string;
  stateAbbr: string;
  phone: string;
  contact?: string;
  address?: string;
  website?: string;
  imageInitials: string;
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

// Reverse mapping for abbr lookup
const STATE_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_NAMES).map(([abbr, name]) => [name, abbr])
);

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

const rawGovernors: {
  name: string;
  party: 'D' | 'R' | 'I';
  state: string;
  contact?: string;
  phone: string;
  address?: string;
}[] = [
  { name: "Kay Ivey", party: "R", state: "Alabama", contact: "Casey Rogers, External Affairs Director", phone: "334-353-4952", address: "State Capitol, 600 Dexter Ave, Montgomery, AL 36130" },
  { name: "Mike Dunleavy", party: "R", state: "Alaska", contact: "Jerry Moses, Director of State-Federal Relations", phone: "202-624-5988", address: "444 N Capitol St NW #336, Washington, DC 20001" },
  { name: "Katie Hobbs", party: "D", state: "Arizona", contact: "Billy Kovacs, Federal Affairs Representative", phone: "602-542-4331", address: "1700 W Washington St, Phoenix, AZ 85007" },
  { name: "Sarah Huckabee Sanders", party: "R", state: "Arkansas", contact: "Judd Deere, Deputy Chief of Staff", phone: "501-682-2345", address: "500 Woodland St #250, Little Rock, AR 72201" },
  { name: "Gavin Newsom", party: "D", state: "California", contact: "Jonathan Cousimano, Director of Federal Affairs", phone: "202-624-5275", address: "444 N Capitol St NW #234, Washington, DC 20001" },
  { name: "Jared Polis", party: "D", state: "Colorado", contact: "Mara Sheldon, Senior Policy Advisor", phone: "303-894-6109", address: "717 17th St #1825, Denver, CO 80202" },
  { name: "Ned Lamont", party: "D", state: "Connecticut", contact: "Dan DeSimone, Director", phone: "202-403-8654", address: "444 N Capitol St NW #317, Washington, DC 20001" },
  { name: "John Carney", party: "D", state: "Delaware", contact: "Delaware Governor's Office", phone: "302-744-4101", address: "Tatnall Building, 150 Martin Luther King Jr Blvd S, Dover, DE 19901" },
  { name: "Ron DeSantis", party: "R", state: "Florida", contact: "Katherine Anne Russo, Washington Representative", phone: "202-624-5885", address: "444 N Capitol St #349, Washington, DC 20001" },
  { name: "Brian Kemp", party: "R", state: "Georgia", contact: "Georgia Governor's Office", phone: "404-656-1776", address: "206 Washington St #111, Atlanta, GA 30334" },
  { name: "Josh Green", party: "D", state: "Hawaii", contact: "Hawaii Governor's Office", phone: "808-586-0034", address: "Executive Chambers, State Capitol, Honolulu, HI 96813" },
  { name: "Brad Little", party: "R", state: "Idaho", contact: "Idaho Governor's Office", phone: "208-334-2100", address: "700 W Jefferson St, Boise, ID 83720" },
  { name: "J.B. Pritzker", party: "D", state: "Illinois", contact: "Illinois Governor's Office", phone: "217-782-0244", address: "207 Statehouse, Springfield, IL 62706" },
  { name: "Eric Holcomb", party: "R", state: "Indiana", contact: "Indiana Governor's Office", phone: "317-232-4567", address: "200 W Washington St #206, Indianapolis, IN 46204" },
  { name: "Kim Reynolds", party: "R", state: "Iowa", contact: "Iowa Governor's Office", phone: "515-281-5211", address: "1007 E Grand Ave, Des Moines, IA 50319" },
  { name: "Laura Kelly", party: "D", state: "Kansas", contact: "Kansas Governor's Office", phone: "785-296-3232", address: "300 SW 10th Ave #241S, Topeka, KS 66612" },
  { name: "Andy Beshear", party: "D", state: "Kentucky", contact: "Kentucky Governor's Office", phone: "502-564-2611", address: "700 Capitol Ave #100, Frankfort, KY 40601" },
  { name: "Jeff Landry", party: "R", state: "Louisiana", contact: "Louisiana Governor's Office", phone: "225-342-7015", address: "1051 N 3rd St, Baton Rouge, LA 70802" },
  { name: "Janet Mills", party: "D", state: "Maine", contact: "Maine Governor's Office", phone: "207-287-3531", address: "1 State House Station, Augusta, ME 04333" },
  { name: "Wes Moore", party: "D", state: "Maryland", contact: "Maryland Governor's Office", phone: "410-974-3901", address: "100 State Cir, Annapolis, MD 21401" },
  { name: "Maura Healey", party: "D", state: "Massachusetts", contact: "Massachusetts Governor's Office", phone: "617-725-4005", address: "24 Beacon St #280, Boston, MA 02133" },
  { name: "Gretchen Whitmer", party: "D", state: "Michigan", contact: "Michigan Governor's Office", phone: "517-373-3400", address: "PO Box 30013, Lansing, MI 48909" },
  { name: "Tim Walz", party: "D", state: "Minnesota", contact: "Minnesota Governor's Office", phone: "651-201-3400", address: "130 State Capitol, 75 Rev Dr Martin Luther King Jr Blvd, Saint Paul, MN 55155" },
  { name: "Tate Reeves", party: "R", state: "Mississippi", contact: "Mississippi Governor's Office", phone: "601-359-3150", address: "550 High St, Jackson, MS 39201" },
  { name: "Mike Parson", party: "R", state: "Missouri", contact: "Missouri Governor's Office", phone: "573-751-3222", address: "216 State Capitol Bldg, Jefferson City, MO 65101" },
  { name: "Greg Gianforte", party: "R", state: "Montana", contact: "Montana Governor's Office", phone: "406-444-3111", address: "204 N Roberts St, Helena, MT 59620" },
  { name: "Pete Ricketts", party: "R", state: "Nebraska", contact: "Nebraska Governor's Office", phone: "402-471-2244", address: "1445 K St #2000, Lincoln, NE 68509" },
  { name: "Joe Lombardo", party: "R", state: "Nevada", contact: "Nevada Governor's Office", phone: "775-684-5670", address: "101 N Carson St, Carson City, NV 89701" },
  { name: "Chris Sununu", party: "R", state: "New Hampshire", contact: "New Hampshire Governor's Office", phone: "603-271-2121", address: "107 N Main St, Concord, NH 03301" },
  { name: "Phil Murphy", party: "D", state: "New Jersey", contact: "New Jersey Governor's Office", phone: "609-292-6000", address: "125 W State St, Trenton, NJ 08608" },
  { name: "Michelle Lujan Grisham", party: "D", state: "New Mexico", contact: "New Mexico Governor's Office", phone: "505-476-2200", address: "490 Old Santa Fe Trail #400, Santa Fe, NM 87501" },
  { name: "Kathy Hochul", party: "D", state: "New York", contact: "Kylah Hynes, Director for Federal Policy", phone: "202-434-7100", address: "444 N Capitol St NW #301, Washington, DC 20001" },
  { name: "Roy Cooper", party: "D", state: "North Carolina", contact: "North Carolina Governor's Office", phone: "919-814-2000", address: "20301 Mail Service Center, Raleigh, NC 27699" },
  { name: "Doug Burgum", party: "R", state: "North Dakota", contact: "North Dakota Governor's Office", phone: "701-328-2200", address: "600 E Boulevard Ave Dept 101, Bismarck, ND 58505" },
  { name: "Mike DeWine", party: "R", state: "Ohio", contact: "Ohio Governor's Office", phone: "614-466-3555", address: "77 S High St 30th Floor, Columbus, OH 43215" },
  { name: "Kevin Stitt", party: "R", state: "Oklahoma", contact: "Oklahoma Governor's Office", phone: "405-521-2342", address: "2300 N Lincoln Blvd #212, Oklahoma City, OK 73105" },
  { name: "Tina Kotek", party: "D", state: "Oregon", contact: "Oregon Governor's Office", phone: "503-378-4582", address: "160 State Capitol, 900 Court St NE, Salem, OR 97301" },
  { name: "Josh Shapiro", party: "D", state: "Pennsylvania", contact: "Pennsylvania Governor's Office", phone: "717-787-2500", address: "508 Main Capitol Bldg, Harrisburg, PA 17120" },
  { name: "Dan McKee", party: "D", state: "Rhode Island", contact: "Rhode Island Governor's Office", phone: "401-222-2080", address: "82 Smith St, Providence, RI 02903" },
  { name: "Henry McMaster", party: "R", state: "South Carolina", contact: "South Carolina Governor's Office", phone: "803-734-2100", address: "1205 Pendleton St, Columbia, SC 29201" },
  { name: "Kristi Noem", party: "R", state: "South Dakota", contact: "South Dakota Governor's Office", phone: "605-773-3212", address: "500 E Capitol Ave, Pierre, SD 57501" },
  { name: "Bill Lee", party: "R", state: "Tennessee", contact: "Tennessee Governor's Office", phone: "615-741-2001", address: "1st Floor, State Capitol, Nashville, TN 37243" },
  { name: "Greg Abbott", party: "R", state: "Texas", contact: "Wes Hambrick, Director", phone: "202-638-3927", address: "660 Pennsylvania Ave SE #203, Washington, DC 20003" },
  { name: "Spencer Cox", party: "R", state: "Utah", contact: "Utah Governor's Office", phone: "801-538-1000", address: "350 State Capitol, Salt Lake City, UT 84114" },
  { name: "Phil Scott", party: "R", state: "Vermont", contact: "Vermont Governor's Office", phone: "802-828-3333", address: "109 State St, Montpelier, VT 05609" },
  { name: "Glenn Youngkin", party: "R", state: "Virginia", contact: "Virginia Governor's Office", phone: "804-786-2211", address: "1111 E Broad St, Richmond, VA 23219" },
  { name: "Jay Inslee", party: "D", state: "Washington", contact: "Washington Governor's Office", phone: "360-902-4111", address: "416 14th Ave SW, Olympia, WA 98504" },
  { name: "Jim Justice", party: "R", state: "West Virginia", contact: "West Virginia Governor's Office", phone: "304-558-2000", address: "1900 Kanawha Blvd E, Charleston, WV 25305" },
  { name: "Tony Evers", party: "D", state: "Wisconsin", contact: "Wisconsin Governor's Office", phone: "608-266-1212", address: "115 E State Capitol, Madison, WI 53702" },
  { name: "Mark Gordon", party: "R", state: "Wyoming", contact: "Wyoming Governor's Office", phone: "307-777-7434", address: "200 W 24th St, Cheyenne, WY 82002" }
];

// Transform raw data into Governor objects
export const GOVERNORS: Governor[] = rawGovernors.map(g => ({
  id: generateId(g.name),
  name: g.name,
  party: g.party as 'D' | 'R' | 'I',
  state: g.state,
  stateAbbr: STATE_ABBR[g.state] || g.state,
  phone: g.phone,
  contact: g.contact,
  address: g.address,
  imageInitials: getInitials(g.name),
  website: `https://governor.${g.state.toLowerCase().replace(/\s+/g, '')}.gov` // Generate basic website
}));

// Helper functions
export function getGovernorsByState(stateAbbr: string): Governor[] {
  return GOVERNORS.filter(g => g.stateAbbr === stateAbbr);
}

export function getGovernorsByParty(party: 'D' | 'R' | 'I'): Governor[] {
  return GOVERNORS.filter(g => g.party === party);
}

export function getGovernorById(id: string): Governor | undefined {
  return GOVERNORS.find(g => g.id === id);
}

export function searchGovernors(query: string): Governor[] {
  const q = query.toLowerCase();
  return GOVERNORS.filter(g => 
    g.name.toLowerCase().includes(q) ||
    g.state.toLowerCase().includes(q) ||
    g.stateAbbr.toLowerCase() === q
  );
}

export function getAllGovernorStates(): string[] {
  return [...new Set(GOVERNORS.map(g => g.stateAbbr))].sort();
}

export function getGovernorPartyBreakdown(): { D: number; R: number; I: number } {
  return {
    D: GOVERNORS.filter(g => g.party === 'D').length,
    R: GOVERNORS.filter(g => g.party === 'R').length,
    I: GOVERNORS.filter(g => g.party === 'I').length
  };
}

// Statistics
export const GOVERNOR_STATS = {
  total: GOVERNORS.length,
  democrats: GOVERNORS.filter(g => g.party === 'D').length,
  republicans: GOVERNORS.filter(g => g.party === 'R').length,
  independents: GOVERNORS.filter(g => g.party === 'I').length,
  states: [...new Set(GOVERNORS.map(g => g.stateAbbr))].length
};

// State list for filtering
export const GOVERNOR_STATES = Object.entries(STATE_NAMES)
  .map(([abbr, name]) => ({ abbr, name }))
  .sort((a, b) => a.name.localeCompare(b.name));