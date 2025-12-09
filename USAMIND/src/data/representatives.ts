/**
 * US House Representatives Data
 * Current as of 119th Congress (2025-2027)
 */

export interface Representative {
  id: string;
  name: string;
  party: 'D' | 'R';
  state: string;
  stateAbbr: string;
  district: string;
  office: string;
  phone: string;
  committees: string[];
  imageInitials: string;
  website?: string;
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
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
  'PR': 'Puerto Rico', 'VI': 'U.S. Virgin Islands', 'AS': 'American Samoa', 'MP': 'Northern Mariana Islands'
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

const rawRepresentatives = [
  // Alabama
  { name: "Barry Moore", party: "R", state: "AL", district: "1st", office: "1511 LHOB", phone: "(202) 225-2901", committees: "Agriculture|Judiciary" },
  { name: "Shomari Figures", party: "D", state: "AL", district: "2nd", office: "225 CHOB", phone: "(202) 225-4931", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Mike Rogers", party: "R", state: "AL", district: "3rd", office: "2469 RHOB", phone: "(202) 225-3261", committees: "Armed Services" },
  { name: "Robert Aderholt", party: "R", state: "AL", district: "4th", office: "272 CHOB", phone: "(202) 225-4876", committees: "Appropriations" },
  { name: "Dale Strong", party: "R", state: "AL", district: "5th", office: "449 CHOB", phone: "(202) 225-4801", committees: "Appropriations|Homeland Security" },
  { name: "Gary Palmer", party: "R", state: "AL", district: "6th", office: "170 CHOB", phone: "(202) 225-4921", committees: "Oversight and Government Reform|Energy and Commerce" },
  { name: "Terri Sewell", party: "D", state: "AL", district: "7th", office: "1035 LHOB", phone: "(202) 225-2665", committees: "House Administration|Ways and Means" },

  // Alaska
  { name: "Nicholas Begich", party: "R", state: "AK", district: "At Large", office: "153 CHOB", phone: "(202) 225-5765", committees: "Natural Resources|Transportation and Infrastructure|Science, Space, and Technology" },

  // Arizona
  { name: "David Schweikert", party: "R", state: "AZ", district: "1st", office: "166 CHOB", phone: "(202) 225-2190", committees: "Ways and Means" },
  { name: "Elijah Crane", party: "R", state: "AZ", district: "2nd", office: "307 CHOB", phone: "(202) 225-3361", committees: "Oversight and Government Reform|Homeland Security" },
  { name: "Yassamin Ansari", party: "D", state: "AZ", district: "3rd", office: "1432 LHOB", phone: "(202) 225-4065", committees: "Education and Workforce|Oversight and Government Reform|Natural Resources" },
  { name: "Greg Stanton", party: "D", state: "AZ", district: "4th", office: "207 CHOB", phone: "(202) 225-9888", committees: "Foreign Affairs|Transportation and Infrastructure|Select Comm on the Strategic Competition US and China" },
  { name: "Andy Biggs", party: "R", state: "AZ", district: "5th", office: "464 CHOB", phone: "(202) 225-2635", committees: "Oversight and Government Reform|Judiciary" },
  { name: "Juan Ciscomani", party: "R", state: "AZ", district: "6th", office: "461 CHOB", phone: "(202) 225-2542", committees: "Appropriations|Veterans' Affairs" },
  { name: "Abraham Hamadeh", party: "R", state: "AZ", district: "8th", office: "1722 LHOB", phone: "(202) 225-4576", committees: "Armed Services|Veterans' Affairs" },
  { name: "Paul Gosar", party: "R", state: "AZ", district: "9th", office: "2057 RHOB", phone: "(202) 225-2315", committees: "Oversight and Government Reform|Natural Resources" },

  // Arkansas
  { name: "Eric Crawford", party: "R", state: "AR", district: "1st", office: "2422 RHOB", phone: "(202) 225-4076", committees: "Agriculture|Intelligence|Transportation and Infrastructure" },
  { name: "J. French Hill", party: "R", state: "AR", district: "2nd", office: "1533 LHOB", phone: "(202) 225-2506", committees: "Financial Services|Intelligence" },
  { name: "Steve Womack", party: "R", state: "AR", district: "3rd", office: "2412 RHOB", phone: "(202) 225-4301", committees: "Appropriations" },
  { name: "Bruce Westerman", party: "R", state: "AR", district: "4th", office: "202 CHOB", phone: "(202) 225-3772", committees: "Natural Resources|Transportation and Infrastructure" },

  // California
  { name: "Doug LaMalfa", party: "R", state: "CA", district: "1st", office: "408 CHOB", phone: "(202) 225-3076", committees: "Agriculture|Natural Resources|Transportation and Infrastructure" },
  { name: "Jared Huffman", party: "D", state: "CA", district: "2nd", office: "2330 RHOB", phone: "(202) 225-5161", committees: "Natural Resources|Transportation and Infrastructure" },
  { name: "Kevin Kiley", party: "R", state: "CA", district: "3rd", office: "2445 RHOB", phone: "(202) 225-2523", committees: "Education and Workforce|Judiciary|Transportation and Infrastructure" },
  { name: "Mike Thompson", party: "D", state: "CA", district: "4th", office: "268 CHOB", phone: "(202) 225-3311", committees: "Ways and Means" },
  { name: "Tom McClintock", party: "R", state: "CA", district: "5th", office: "2256 RHOB", phone: "(202) 225-2511", committees: "Budget|Natural Resources|Judiciary" },
  { name: "Ami Bera", party: "D", state: "CA", district: "6th", office: "172 CHOB", phone: "(202) 225-5716", committees: "Foreign Affairs|Intelligence" },
  { name: "Doris Matsui", party: "D", state: "CA", district: "7th", office: "2206 RHOB", phone: "(202) 225-7163", committees: "Energy and Commerce" },
  { name: "John Garamendi", party: "D", state: "CA", district: "8th", office: "2428 RHOB", phone: "(202) 225-1880", committees: "Armed Services|Transportation and Infrastructure" },
  { name: "Josh Harder", party: "D", state: "CA", district: "9th", office: "209 CHOB", phone: "(202) 225-4540", committees: "Appropriations" },
  { name: "Mark DeSaulnier", party: "D", state: "CA", district: "10th", office: "2134 RHOB", phone: "(202) 225-2095", committees: "Education and Workforce|Transportation and Infrastructure|Ethics" },
  { name: "Nancy Pelosi", party: "D", state: "CA", district: "11th", office: "1236 LHOB", phone: "(202) 225-4965", committees: "" },
  { name: "Lateefah Simon", party: "D", state: "CA", district: "12th", office: "1023 LHOB", phone: "(202) 225-2661", committees: "Oversight and Government Reform|Small Business" },
  { name: "Adam Gray", party: "D", state: "CA", district: "13th", office: "1230 LHOB", phone: "(202) 225-1947", committees: "Agriculture|Natural Resources" },
  { name: "Eric Swalwell", party: "D", state: "CA", district: "14th", office: "174 CHOB", phone: "(202) 225-5065", committees: "Homeland Security|Judiciary" },
  { name: "Kevin Mullin", party: "D", state: "CA", district: "15th", office: "1404 LHOB", phone: "(202) 225-3531", committees: "Energy and Commerce" },
  { name: "Sam Liccardo", party: "D", state: "CA", district: "16th", office: "1117 LHOB", phone: "(202) 225-8104", committees: "Financial Services" },
  { name: "Ro Khanna", party: "D", state: "CA", district: "17th", office: "306 CHOB", phone: "(202) 225-2631", committees: "Armed Services|Oversight and Government Reform|Select Comm on the Strategic Competition US and China" },
  { name: "Zoe Lofgren", party: "D", state: "CA", district: "18th", office: "1401 LHOB", phone: "(202) 225-3072", committees: "Judiciary|Science, Space, and Technology" },
  { name: "Jimmy Panetta", party: "D", state: "CA", district: "19th", office: "200 CHOB", phone: "(202) 225-2861", committees: "Budget|Ways and Means" },
  { name: "Vince Fong", party: "R", state: "CA", district: "20th", office: "243 CHOB", phone: "(202) 225-2915", committees: "Transportation and Infrastructure|Science, Space, and Technology" },

  // Colorado
  { name: "Diana DeGette", party: "D", state: "CO", district: "1st", office: "2111 RHOB", phone: "(202) 225-4431", committees: "Energy and Commerce" },
  { name: "Joe Neguse", party: "D", state: "CO", district: "2nd", office: "2400 RHOB", phone: "(202) 225-2161", committees: "Natural Resources|Judiciary|Rules" },
  { name: "Jeff Hurd", party: "R", state: "CO", district: "3rd", office: "1641 LHOB", phone: "(202) 225-4676", committees: "Natural Resources|Transportation and Infrastructure|Science, Space, and Technology" },
  { name: "Lauren Boebert", party: "R", state: "CO", district: "4th", office: "1713 LHOB", phone: "(202) 225-4761", committees: "Oversight and Government Reform|Natural Resources" },
  { name: "Jeff Crank", party: "R", state: "CO", district: "5th", office: "1029 LHOB", phone: "(202) 225-4422", committees: "Armed Services|Natural Resources" },
  { name: "Jason Crow", party: "D", state: "CO", district: "6th", office: "1323 LHOB", phone: "(202) 225-7882", committees: "Armed Services|Intelligence" },
  { name: "Brittany Pettersen", party: "D", state: "CO", district: "7th", office: "348 CHOB", phone: "(202) 225-2645", committees: "Financial Services" },
  { name: "Gabe Evans", party: "R", state: "CO", district: "8th", office: "1229 LHOB", phone: "(202) 225-5625", committees: "Homeland Security|Energy and Commerce" },

  // Connecticut
  { name: "John Larson", party: "D", state: "CT", district: "1st", office: "1501 LHOB", phone: "(202) 225-2265", committees: "Ways and Means" },
  { name: "Joe Courtney", party: "D", state: "CT", district: "2nd", office: "2449 RHOB", phone: "(202) 225-2076", committees: "Armed Services|Education and Workforce" },
  { name: "Rosa DeLauro", party: "D", state: "CT", district: "3rd", office: "2413 RHOB", phone: "(202) 225-3661", committees: "Appropriations" },
  { name: "James Himes", party: "D", state: "CT", district: "4th", office: "2137 RHOB", phone: "(202) 225-5541", committees: "Financial Services|Intelligence" },
  { name: "Jahana Hayes", party: "D", state: "CT", district: "5th", office: "2049 RHOB", phone: "(202) 225-4476", committees: "Agriculture|Education and Workforce" },

  // Delaware
  { name: "Sarah McBride", party: "D", state: "DE", district: "At Large", office: "1306 LHOB", phone: "(202) 225-4165", committees: "Foreign Affairs|Science, Space, and Technology" },

  // Florida
  { name: "Jimmy Patronis", party: "R", state: "FL", district: "1st", office: "2021 RHOB", phone: "(202) 225-4136", committees: "Transportation and Infrastructure|Small Business" },
  { name: "Neal Dunn", party: "R", state: "FL", district: "2nd", office: "466 CHOB", phone: "(202) 225-5235", committees: "Energy and Commerce|Select Comm on the Strategic Competition US and China" },
  { name: "Kat Cammack", party: "R", state: "FL", district: "3rd", office: "2421 RHOB", phone: "(202) 225-5744", committees: "Agriculture|Energy and Commerce" },
  { name: "Aaron Bean", party: "R", state: "FL", district: "4th", office: "2459 RHOB", phone: "(202) 225-0123", committees: "Ways and Means" },
  { name: "John Rutherford", party: "R", state: "FL", district: "5th", office: "1711 LHOB", phone: "(202) 225-2501", committees: "Appropriations|Ethics" },
  { name: "Randy Fine", party: "R", state: "FL", district: "6th", office: "244 CHOB", phone: "(202) 225-2706", committees: "Education and Workforce" },
  { name: "Cory Mills", party: "R", state: "FL", district: "7th", office: "346 CHOB", phone: "(202) 225-4035", committees: "Armed Services|Foreign Affairs" },
  { name: "Mike Haridopolos", party: "R", state: "FL", district: "8th", office: "1039 LHOB", phone: "(202) 225-3671", committees: "Financial Services|Science, Space, and Technology" },
  { name: "Darren Soto", party: "D", state: "FL", district: "9th", office: "2353 RHOB", phone: "(202) 225-9889", committees: "Energy and Commerce|Natural Resources" },
  { name: "Maxwell Frost", party: "D", state: "FL", district: "10th", office: "1224 LHOB", phone: "(202) 225-2176", committees: "Oversight and Government Reform|Science, Space, and Technology" },
  { name: "Daniel Webster", party: "R", state: "FL", district: "11th", office: "2184 RHOB", phone: "(202) 225-1002", committees: "Natural Resources|Transportation and Infrastructure|Science, Space, and Technology" },
  { name: "Gus Bilirakis", party: "R", state: "FL", district: "12th", office: "2306 RHOB", phone: "(202) 225-5755", committees: "Energy and Commerce|Select Comm on the Strategic Competition US and China" },
  { name: "Anna Paulina Luna", party: "R", state: "FL", district: "13th", office: "226 CHOB", phone: "(202) 225-5961", committees: "Foreign Affairs|Oversight and Government Reform" },
  { name: "Kathy Castor", party: "D", state: "FL", district: "14th", office: "2188 RHOB", phone: "(202) 225-3376", committees: "Energy and Commerce|Select Comm on the Strategic Competition US and China" },
  { name: "Laurel Lee", party: "R", state: "FL", district: "15th", office: "2464 RHOB", phone: "(202) 225-5626", committees: "House Administration|Energy and Commerce|Judiciary" },
  { name: "Vern Buchanan", party: "R", state: "FL", district: "16th", office: "2409 RHOB", phone: "(202) 225-5015", committees: "Joint Committee on Taxation|Ways and Means" },
  { name: "W. Gregory Steube", party: "R", state: "FL", district: "17th", office: "2457 RHOB", phone: "(202) 225-5792", committees: "Intelligence|Ways and Means" },
  { name: "Scott Franklin", party: "R", state: "FL", district: "18th", office: "2301 RHOB", phone: "(202) 225-1252", committees: "Appropriations|Science, Space, and Technology" },
  { name: "Byron Donalds", party: "R", state: "FL", district: "19th", office: "1710 LHOB", phone: "(202) 225-2536", committees: "Financial Services|Oversight and Government Reform" },
  { name: "Sheila Cherfilus-McCormick", party: "D", state: "FL", district: "20th", office: "2442 RHOB", phone: "(202) 225-1313", committees: "Foreign Affairs|Veterans' Affairs" },
  { name: "Brian Mast", party: "R", state: "FL", district: "21st", office: "2182 RHOB", phone: "(202) 225-3026", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Lois Frankel", party: "D", state: "FL", district: "22nd", office: "2305 RHOB", phone: "(202) 225-9890", committees: "Appropriations" },
  { name: "Jared Moskowitz", party: "D", state: "FL", district: "23rd", office: "242 CHOB", phone: "(202) 225-3001", committees: "Foreign Affairs|Judiciary" },
  { name: "Frederica Wilson", party: "D", state: "FL", district: "24th", office: "2080 RHOB", phone: "(202) 225-4506", committees: "Education and Workforce|Transportation and Infrastructure" },
  { name: "Debbie Wasserman Schultz", party: "D", state: "FL", district: "25th", office: "270 CHOB", phone: "(202) 225-7931", committees: "Appropriations" },
  { name: "Mario Diaz-Balart", party: "R", state: "FL", district: "26th", office: "374 CHOB", phone: "(202) 225-4211", committees: "Appropriations" },
  { name: "Maria Elvira Salazar", party: "R", state: "FL", district: "27th", office: "2162 RHOB", phone: "(202) 225-3931", committees: "Financial Services|Foreign Affairs" },
  { name: "Carlos Gimenez", party: "R", state: "FL", district: "28th", office: "448 CHOB", phone: "(202) 225-2778", committees: "Armed Services|Homeland Security|Select Comm on the Strategic Competition US and China" },

  // Georgia
  { name: "Earl Carter", party: "R", state: "GA", district: "1st", office: "2432 RHOB", phone: "(202) 225-5831", committees: "Budget|Energy and Commerce" },
  { name: "Sanford Bishop", party: "D", state: "GA", district: "2nd", office: "2407 RHOB", phone: "(202) 225-3631", committees: "Appropriations" },
  { name: "Brian Jack", party: "R", state: "GA", district: "3rd", office: "1320 LHOB", phone: "(202) 225-5901", committees: "Oversight and Government Reform|Rules|Small Business" },
  { name: "Henry Johnson", party: "D", state: "GA", district: "4th", office: "2240 RHOB", phone: "(202) 225-1605", committees: "Judiciary|Transportation and Infrastructure" },
  { name: "Nikema Williams", party: "D", state: "GA", district: "5th", office: "1406 LHOB", phone: "(202) 225-3801", committees: "Financial Services" },
  { name: "Lucy McBath", party: "D", state: "GA", district: "6th", office: "2246 RHOB", phone: "(202) 225-4501", committees: "Education and Workforce|Judiciary" },
  { name: "Richard McCormick", party: "R", state: "GA", district: "7th", office: "1719 LHOB", phone: "(202) 225-4272", committees: "Armed Services|Foreign Affairs|Science, Space, and Technology" },
  { name: "Austin Scott", party: "R", state: "GA", district: "8th", office: "2185 RHOB", phone: "(202) 225-6531", committees: "Agriculture|Armed Services|Intelligence|Rules" },
  { name: "Andrew Clyde", party: "R", state: "GA", district: "9th", office: "445 CHOB", phone: "(202) 225-9893", committees: "Appropriations|Budget" },
  { name: "Mike Collins", party: "R", state: "GA", district: "10th", office: "2351 RHOB", phone: "(202) 225-4101", committees: "Natural Resources|Transportation and Infrastructure|Science, Space, and Technology" },
  { name: "Barry Loudermilk", party: "R", state: "GA", district: "11th", office: "2133 RHOB", phone: "(202) 225-2931", committees: "Financial Services|House Administration" },
  { name: "Rick Allen", party: "R", state: "GA", district: "12th", office: "462 CHOB", phone: "(202) 225-2823", committees: "Education and Workforce|Energy and Commerce" },
  { name: "David Scott", party: "D", state: "GA", district: "13th", office: "468 CHOB", phone: "(202) 225-2939", committees: "Agriculture|Financial Services" },
  { name: "Marjorie Taylor Greene", party: "R", state: "GA", district: "14th", office: "2201 RHOB", phone: "(202) 225-5211", committees: "Oversight and Government Reform|Homeland Security" },

  // Guam
  { name: "James Moylan", party: "R", state: "GU", district: "Delegate", office: "228 CHOB", phone: "(202) 225-1188", committees: "Armed Services|Education and Workforce|Foreign Affairs" },

  // Hawaii
  { name: "Ed Case", party: "D", state: "HI", district: "1st", office: "2210 RHOB", phone: "(202) 225-2726", committees: "Appropriations" },
  { name: "Jill Tokuda", party: "D", state: "HI", district: "2nd", office: "1027 LHOB", phone: "(202) 225-4906", committees: "Agriculture|Armed Services|Select Comm on the Strategic Competition US and China" },

  // Idaho
  { name: "Russ Fulcher", party: "R", state: "ID", district: "1st", office: "1514 LHOB", phone: "(202) 225-6611", committees: "Energy and Commerce|Natural Resources" },
  { name: "Michael Simpson", party: "R", state: "ID", district: "2nd", office: "2084 RHOB", phone: "(202) 225-5531", committees: "Appropriations" },

  // Illinois
  { name: "Jonathan Jackson", party: "D", state: "IL", district: "1st", office: "1632 LHOB", phone: "(202) 225-4372", committees: "Agriculture|Foreign Affairs" },
  { name: "Robin Kelly", party: "D", state: "IL", district: "2nd", office: "2329 RHOB", phone: "(202) 225-0773", committees: "Energy and Commerce" },
  { name: "Delia Ramirez", party: "D", state: "IL", district: "3rd", office: "1523 LHOB", phone: "(202) 225-5701", committees: "Homeland Security|Veterans' Affairs" },
  { name: "Jesus Garcia", party: "D", state: "IL", district: "4th", office: "2334 RHOB", phone: "(202) 225-8203", committees: "Judiciary|Transportation and Infrastructure" },
  { name: "Mike Quigley", party: "D", state: "IL", district: "5th", office: "2083 RHOB", phone: "(202) 225-4061", committees: "Appropriations|Intelligence" },
  { name: "Sean Casten", party: "D", state: "IL", district: "6th", office: "2440 RHOB", phone: "(202) 225-4561", committees: "Financial Services" },
  { name: "Danny Davis", party: "D", state: "IL", district: "7th", office: "2159 RHOB", phone: "(202) 225-5006", committees: "Ways and Means" },
  { name: "Raja Krishnamoorthi", party: "D", state: "IL", district: "8th", office: "2367 RHOB", phone: "(202) 225-3711", committees: "Oversight and Government Reform|Intelligence|Select Comm on the Strategic Competition US and China" },
  { name: "Janice Schakowsky", party: "D", state: "IL", district: "9th", office: "2408 RHOB", phone: "(202) 225-2111", committees: "Energy and Commerce" },
  { name: "Bradley Schneider", party: "D", state: "IL", district: "10th", office: "300 CHOB", phone: "(202) 225-4835", committees: "Foreign Affairs|Ways and Means" },
  { name: "Bill Foster", party: "D", state: "IL", district: "11th", office: "2366 RHOB", phone: "(202) 225-3515", committees: "Financial Services|Science, Space, and Technology" },
  { name: "Mike Bost", party: "R", state: "IL", district: "12th", office: "352 CHOB", phone: "(202) 225-5661", committees: "Agriculture|Transportation and Infrastructure|Veterans' Affairs" },
  { name: "Nikki Budzinski", party: "D", state: "IL", district: "13th", office: "1717 LHOB", phone: "(202) 225-2371", committees: "Agriculture|Veterans' Affairs" },
  { name: "Lauren Underwood", party: "D", state: "IL", district: "14th", office: "2228 RHOB", phone: "(202) 225-2976", committees: "Appropriations" },
  { name: "Mary Miller", party: "R", state: "IL", district: "15th", office: "1740 LHOB", phone: "(202) 225-5271", committees: "Agriculture|Education and Workforce|House Administration" },
  { name: "Darin LaHood", party: "R", state: "IL", district: "16th", office: "503 CHOB", phone: "(202) 225-6201", committees: "Intelligence|Ways and Means|Select Comm on the Strategic Competition US and China" },
  { name: "Eric Sorensen", party: "D", state: "IL", district: "17th", office: "1314 LHOB", phone: "(202) 225-5905", committees: "Agriculture|Armed Services" },

  // Indiana
  { name: "Frank Mrvan", party: "D", state: "IN", district: "1st", office: "2441 RHOB", phone: "(202) 225-2461", committees: "Appropriations" },
  { name: "Rudy Yakym", party: "R", state: "IN", district: "2nd", office: "349 CHOB", phone: "(202) 225-3915", committees: "Ways and Means" },
  { name: "Jim Banks", party: "R", state: "IN", district: "3rd", office: "2418 RHOB", phone: "(202) 225-4436", committees: "Armed Services|Education and Workforce|Veterans' Affairs" },
  { name: "Jim Baird", party: "R", state: "IN", district: "4th", office: "440 CHOB", phone: "(202) 225-5037", committees: "Agriculture|Science, Space, and Technology|Transportation and Infrastructure" },
  { name: "Victoria Spartz", party: "R", state: "IN", district: "5th", office: "2469 RHOB", phone: "(202) 225-2276", committees: "Financial Services|Judiciary" },
  { name: "Greg Pence", party: "R", state: "IN", district: "6th", office: "415 CHOB", phone: "(202) 225-3021", committees: "Energy and Commerce|Transportation and Infrastructure" },
  { name: "Andre Carson", party: "D", state: "IN", district: "7th", office: "2135 RHOB", phone: "(202) 225-4011", committees: "Intelligence|Transportation and Infrastructure" },
  { name: "Larry Bucshon", party: "R", state: "IN", district: "8th", office: "2467 RHOB", phone: "(202) 225-4636", committees: "Energy and Commerce" },
  { name: "Erin Houchin", party: "R", state: "IN", district: "9th", office: "1641 LHOB", phone: "(202) 225-5315", committees: "Energy and Commerce|Small Business" },

  // Iowa
  { name: "Mariannette Miller-Meeks", party: "R", state: "IA", district: "1st", office: "1716 LHOB", phone: "(202) 225-6576", committees: "Energy and Commerce|Veterans' Affairs" },
  { name: "Ashley Hinson", party: "R", state: "IA", district: "2nd", office: "1034 LHOB", phone: "(202) 225-2911", committees: "Appropriations" },
  { name: "Zach Nunn", party: "R", state: "IA", district: "3rd", office: "1032 LHOB", phone: "(202) 225-5476", committees: "Agriculture|Armed Services" },
  { name: "Randy Feenstra", party: "R", state: "IA", district: "4th", office: "1440 LHOB", phone: "(202) 225-4426", committees: "Agriculture|Ways and Means" },

  // Kansas
  { name: "Tracey Mann", party: "R", state: "KS", district: "1st", office: "2459 RHOB", phone: "(202) 225-2715", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Jake LaTurner", party: "R", state: "KS", district: "2nd", office: "1630 LHOB", phone: "(202) 225-6601", committees: "Appropriations" },
  { name: "Sharice Davids", party: "D", state: "KS", district: "3rd", office: "1541 LHOB", phone: "(202) 225-2865", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Ron Estes", party: "R", state: "KS", district: "4th", office: "2234 RHOB", phone: "(202) 225-6216", committees: "Ways and Means|Budget" },

  // Kentucky
  { name: "James Comer", party: "R", state: "KY", district: "1st", office: "2410 RHOB", phone: "(202) 225-3115", committees: "Oversight and Government Reform|Agriculture" },
  { name: "Brett Guthrie", party: "R", state: "KY", district: "2nd", office: "2434 RHOB", phone: "(202) 225-3501", committees: "Energy and Commerce" },
  { name: "Morgan McGarvey", party: "D", state: "KY", district: "3rd", office: "1432 LHOB", phone: "(202) 225-5401", committees: "Energy and Commerce|Small Business" },
  { name: "Thomas Massie", party: "R", state: "KY", district: "4th", office: "2453 RHOB", phone: "(202) 225-3465", committees: "Judiciary|Transportation and Infrastructure" },
  { name: "Hal Rogers", party: "R", state: "KY", district: "5th", office: "2406 RHOB", phone: "(202) 225-4601", committees: "Appropriations" },
  { name: "Andy Barr", party: "R", state: "KY", district: "6th", office: "2430 RHOB", phone: "(202) 225-4706", committees: "Financial Services|Veterans' Affairs" },

  // Louisiana
  { name: "Steve Scalise", party: "R", state: "LA", district: "1st", office: "2049 RHOB", phone: "(202) 225-3015", committees: "" },
  { name: "Troy Carter", party: "D", state: "LA", district: "2nd", office: "506 CHOB", phone: "(202) 225-6636", committees: "Energy and Commerce|Transportation and Infrastructure" },
  { name: "Clay Higgins", party: "R", state: "LA", district: "3rd", office: "424 CHOB", phone: "(202) 225-2031", committees: "Homeland Security|Oversight and Government Reform" },
  { name: "Mike Johnson", party: "R", state: "LA", district: "4th", office: "2049 RHOB", phone: "(202) 225-2777", committees: "Judiciary|Armed Services" },
  { name: "Julia Letlow", party: "R", state: "LA", district: "5th", office: "1408 LHOB", phone: "(202) 225-8490", committees: "Agriculture|Appropriations" },
  { name: "Garret Graves", party: "R", state: "LA", district: "6th", office: "2402 RHOB", phone: "(202) 225-3901", committees: "Natural Resources|Transportation and Infrastructure" },

  // Maine
  { name: "Chellie Pingree", party: "D", state: "ME", district: "1st", office: "2162 RHOB", phone: "(202) 225-6116", committees: "Appropriations" },
  { name: "Jared Golden", party: "D", state: "ME", district: "2nd", office: "1223 LHOB", phone: "(202) 225-6306", committees: "Armed Services|Small Business" },

  // Maryland
  { name: "Andy Harris", party: "R", state: "MD", district: "1st", office: "2334 RHOB", phone: "(202) 225-5311", committees: "Appropriations" },
  { name: "Dutch Ruppersberger", party: "D", state: "MD", district: "2nd", office: "2416 RHOB", phone: "(202) 225-3061", committees: "Appropriations" },
  { name: "John Sarbanes", party: "D", state: "MD", district: "3rd", office: "2370 RHOB", phone: "(202) 225-4016", committees: "Energy and Commerce|Oversight and Government Reform" },
  { name: "Glenn Ivey", party: "D", state: "MD", district: "4th", office: "1221 LHOB", phone: "(202) 225-8699", committees: "Ethics|Judiciary" },
  { name: "Steny Hoyer", party: "D", state: "MD", district: "5th", office: "1705 LHOB", phone: "(202) 225-4131", committees: "" },
  { name: "David Trone", party: "D", state: "MD", district: "6th", office: "1213 LHOB", phone: "(202) 225-2721", committees: "Appropriations|Joint Economic Committee" },
  { name: "Kweisi Mfume", party: "D", state: "MD", district: "7th", office: "2267 RHOB", phone: "(202) 225-4741", committees: "Oversight and Government Reform|Small Business" },
  { name: "Jamie Raskin", party: "D", state: "MD", district: "8th", office: "2242 RHOB", phone: "(202) 225-5341", committees: "Judiciary|Oversight and Government Reform" },

  // Massachusetts
  { name: "Richard Neal", party: "D", state: "MA", district: "1st", office: "2309 RHOB", phone: "(202) 225-5601", committees: "Joint Committee on Taxation|Ways and Means" },
  { name: "Jim McGovern", party: "D", state: "MA", district: "2nd", office: "370 CHOB", phone: "(202) 225-6101", committees: "Rules|House Administration" },
  { name: "Lori Trahan", party: "D", state: "MA", district: "3rd", office: "1616 LHOB", phone: "(202) 225-3411", committees: "Armed Services|Education and Workforce" },
  { name: "Jake Auchincloss", party: "D", state: "MA", district: "4th", office: "1524 LHOB", phone: "(202) 225-5931", committees: "Financial Services|Transportation and Infrastructure" },
  { name: "Katherine Clark", party: "D", state: "MA", district: "5th", office: "2351 RHOB", phone: "(202) 225-2836", committees: "Appropriations" },
  { name: "Seth Moulton", party: "D", state: "MA", district: "6th", office: "1127 LHOB", phone: "(202) 225-8020", committees: "Armed Services|Budget" },
  { name: "Ayanna Pressley", party: "D", state: "MA", district: "7th", office: "1108 LHOB", phone: "(202) 225-5111", committees: "Financial Services|Oversight and Government Reform" },
  { name: "Stephen Lynch", party: "D", state: "MA", district: "8th", office: "2109 RHOB", phone: "(202) 225-8273", committees: "Financial Services|Oversight and Government Reform" },
  { name: "Bill Keating", party: "D", state: "MA", district: "9th", office: "2351 RHOB", phone: "(202) 225-3111", committees: "Armed Services|Foreign Affairs" },

  // Michigan
  { name: "Jack Bergman", party: "R", state: "MI", district: "1st", office: "566 CHOB", phone: "(202) 225-4735", committees: "Armed Services|Veterans' Affairs" },
  { name: "John Moolenaar", party: "R", state: "MI", district: "2nd", office: "2440 RHOB", phone: "(202) 225-3761", committees: "Appropriations|Select Comm on the Strategic Competition US and China" },
  { name: "Hillary Scholten", party: "D", state: "MI", district: "3rd", office: "1508 LHOB", phone: "(202) 225-3831", committees: "Armed Services|Homeland Security" },
  { name: "Bill Huizenga", party: "R", state: "MI", district: "4th", office: "2232 RHOB", phone: "(202) 225-4401", committees: "Financial Services" },
  { name: "Tim Walberg", party: "R", state: "MI", district: "5th", office: "2436 RHOB", phone: "(202) 225-6276", committees: "Education and Workforce|Energy and Commerce" },
  { name: "Debbie Dingell", party: "D", state: "MI", district: "6th", office: "2203 RHOB", phone: "(202) 225-4071", committees: "Energy and Commerce|Natural Resources" },
  { name: "Elissa Slotkin", party: "D", state: "MI", district: "7th", office: "2411 RHOB", phone: "(202) 225-4872", committees: "Armed Services|Homeland Security" },
  { name: "Dan Kildee", party: "D", state: "MI", district: "8th", office: "2188 RHOB", phone: "(202) 225-3611", committees: "Budget|Ways and Means" },
  { name: "Lisa McClain", party: "R", state: "MI", district: "9th", office: "218 CHOB", phone: "(202) 225-2106", committees: "Armed Services|House Administration" },
  { name: "John James", party: "R", state: "MI", district: "10th", office: "1415 LHOB", phone: "(202) 225-4961", committees: "Armed Services|Homeland Security" },
  { name: "Haley Stevens", party: "D", state: "MI", district: "11th", office: "227 CHOB", phone: "(202) 225-8171", committees: "Education and Workforce|Science, Space, and Technology" },
  { name: "Rashida Tlaib", party: "D", state: "MI", district: "12th", office: "1628 LHOB", phone: "(202) 225-5126", committees: "Financial Services|Oversight and Government Reform" },
  { name: "Shri Thanedar", party: "D", state: "MI", district: "13th", office: "1517 LHOB", phone: "(202) 225-2261", committees: "Financial Services|Homeland Security" },

  // Minnesota
  { name: "Brad Finstad", party: "R", state: "MN", district: "1st", office: "1622 LHOB", phone: "(202) 225-2472", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Angie Craig", party: "D", state: "MN", district: "2nd", office: "1523 LHOB", phone: "(202) 225-2271", committees: "Agriculture|Energy and Commerce" },
  { name: "Dean Phillips", party: "D", state: "MN", district: "3rd", office: "1305 LHOB", phone: "(202) 225-2871", committees: "Foreign Affairs|Small Business" },
  { name: "Betty McCollum", party: "D", state: "MN", district: "4th", office: "2256 RHOB", phone: "(202) 225-6631", committees: "Appropriations" },
  { name: "Ilhan Omar", party: "D", state: "MN", district: "5th", office: "1730 LHOB", phone: "(202) 225-4755", committees: "Budget|Foreign Affairs" },
  { name: "Tom Emmer", party: "R", state: "MN", district: "6th", office: "2209 RHOB", phone: "(202) 225-2331", committees: "Financial Services" },
  { name: "Michelle Fischbach", party: "R", state: "MN", district: "7th", office: "1740 LHOB", phone: "(202) 225-2165", committees: "Agriculture|Rules" },
  { name: "Pete Stauber", party: "R", state: "MN", district: "8th", office: "461 CHOB", phone: "(202) 225-6211", committees: "Natural Resources|Transportation and Infrastructure" },

  // Mississippi
  { name: "Trent Kelly", party: "R", state: "MS", district: "1st", office: "2243 RHOB", phone: "(202) 225-4306", committees: "Agriculture|Armed Services" },
  { name: "Bennie Thompson", party: "D", state: "MS", district: "2nd", office: "2466 RHOB", phone: "(202) 225-5876", committees: "Homeland Security" },
  { name: "Michael Guest", party: "R", state: "MS", district: "3rd", office: "2184 RHOB", phone: "(202) 225-5031", committees: "Ethics|Homeland Security" },
  { name: "Mike Ezell", party: "R", state: "MS", district: "4th", office: "1535 LHOB", phone: "(202) 225-5772", committees: "Armed Services|Homeland Security" },

  // Missouri
  { name: "Cori Bush", party: "D", state: "MO", district: "1st", office: "1535 LHOB", phone: "(202) 225-2406", committees: "Judiciary|Oversight and Government Reform" },
  { name: "Ann Wagner", party: "R", state: "MO", district: "2nd", office: "2350 RHOB", phone: "(202) 225-1621", committees: "Financial Services|Foreign Affairs" },
  { name: "Blaine Luetkemeyer", party: "R", state: "MO", district: "3rd", office: "2230 RHOB", phone: "(202) 225-2956", committees: "Financial Services|Small Business" },
  { name: "Mark Alford", party: "R", state: "MO", district: "4th", office: "1541 LHOB", phone: "(202) 225-2876", committees: "Armed Services|Agriculture" },
  { name: "Emanuel Cleaver", party: "D", state: "MO", district: "5th", office: "2335 RHOB", phone: "(202) 225-4535", committees: "Financial Services|Select Comm on the Strategic Competition US and China" },
  { name: "Sam Graves", party: "R", state: "MO", district: "6th", office: "1135 LHOB", phone: "(202) 225-7041", committees: "Transportation and Infrastructure|Armed Services" },
  { name: "Eric Burlison", party: "R", state: "MO", district: "7th", office: "1213 LHOB", phone: "(202) 225-6536", committees: "Oversight and Government Reform|Science, Space, and Technology" },
  { name: "Jason Smith", party: "R", state: "MO", district: "8th", office: "2418 RHOB", phone: "(202) 225-4404", committees: "Budget|Ways and Means" },

  // Montana
  { name: "Ryan Zinke", party: "R", state: "MT", district: "1st", office: "1419 LHOB", phone: "(202) 225-3211", committees: "Armed Services|Natural Resources" },
  { name: "Troy Downing", party: "R", state: "MT", district: "2nd", office: "1022 LHOB", phone: "(202) 225-3211", committees: "Energy and Commerce|Natural Resources" },

  // Nebraska
  { name: "Mike Flood", party: "R", state: "NE", district: "1st", office: "1024 LHOB", phone: "(202) 225-4806", committees: "Judiciary|Science, Space, and Technology" },
  { name: "Don Bacon", party: "R", state: "NE", district: "2nd", office: "1024 LHOB", phone: "(202) 225-4155", committees: "Agriculture|Armed Services" },
  { name: "Adrian Smith", party: "R", state: "NE", district: "3rd", office: "502 CHOB", phone: "(202) 225-6435", committees: "Ways and Means" },

  // Nevada
  { name: "Dina Titus", party: "D", state: "NV", district: "1st", office: "2464 RHOB", phone: "(202) 225-5965", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Mark Amodei", party: "R", state: "NV", district: "2nd", office: "2440 RHOB", phone: "(202) 225-6155", committees: "Appropriations" },
  { name: "Susie Lee", party: "D", state: "NV", district: "3rd", office: "365 CHOB", phone: "(202) 225-3252", committees: "Appropriations" },
  { name: "Steven Horsford", party: "D", state: "NV", district: "4th", office: "1330 LHOB", phone: "(202) 225-9894", committees: "Budget|Natural Resources" },

  // New Hampshire
  { name: "Chris Pappas", party: "D", state: "NH", district: "1st", office: "323 CHOB", phone: "(202) 225-5456", committees: "Transportation and Infrastructure|Veterans' Affairs" },
  { name: "Annie Kuster", party: "D", state: "NH", district: "2nd", office: "137 CHOB", phone: "(202) 225-5206", committees: "Energy and Commerce" },

  // New Jersey
  { name: "Donald Norcross", party: "D", state: "NJ", district: "1st", office: "2267 RHOB", phone: "(202) 225-6501", committees: "Armed Services|Education and Workforce" },
  { name: "Jeff Van Drew", party: "R", state: "NJ", district: "2nd", office: "2404 RHOB", phone: "(202) 225-6572", committees: "Agriculture|Small Business" },
  { name: "Andy Kim", party: "D", state: "NJ", district: "3rd", office: "1516 LHOB", phone: "(202) 225-4765", committees: "Armed Services|Foreign Affairs" },
  { name: "Chris Smith", party: "R", state: "NJ", district: "4th", office: "2373 RHOB", phone: "(202) 225-3765", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Josh Gottheimer", party: "D", state: "NJ", district: "5th", office: "203 CHOB", phone: "(202) 225-4465", committees: "Financial Services|Intelligence" },
  { name: "Frank Pallone Jr.", party: "D", state: "NJ", district: "6th", office: "2107 RHOB", phone: "(202) 225-4671", committees: "Energy and Commerce" },
  { name: "Tom Kean Jr.", party: "R", state: "NJ", district: "7th", office: "1317 LHOB", phone: "(202) 225-5361", committees: "Foreign Affairs|Science, Space, and Technology" },
  { name: "Rob Menendez", party: "D", state: "NJ", district: "8th", office: "1007 LHOB", phone: "(202) 225-7919", committees: "Homeland Security|Transportation and Infrastructure" },
  { name: "Bill Pascrell Jr.", party: "D", state: "NJ", district: "9th", office: "2464 RHOB", phone: "(202) 225-5751", committees: "Budget|Ways and Means" },
  { name: "Donald Payne Jr.", party: "D", state: "NJ", district: "10th", office: "2332 RHOB", phone: "(202) 225-3436", committees: "Homeland Security|Transportation and Infrastructure" },
  { name: "Mikie Sherrill", party: "D", state: "NJ", district: "11th", office: "1208 LHOB", phone: "(202) 225-5034", committees: "Armed Services|Science, Space, and Technology" },
  { name: "Bonnie Watson Coleman", party: "D", state: "NJ", district: "12th", office: "1535 LHOB", phone: "(202) 225-5801", committees: "Appropriations" },

  // New Mexico
  { name: "Melanie Stansbury", party: "D", state: "NM", district: "1st", office: "1305 LHOB", phone: "(202) 225-6316", committees: "Natural Resources|Science, Space, and Technology" },
  { name: "Gabe Vasquez", party: "D", state: "NM", district: "2nd", office: "1223 LHOB", phone: "(202) 225-2365", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Teresa Leger Fernandez", party: "D", state: "NM", district: "3rd", office: "1432 LHOB", phone: "(202) 225-6190", committees: "Education and Workforce|Natural Resources" },

  // New York
  { name: "Nick LaLota", party: "R", state: "NY", district: "1st", office: "1530 LHOB", phone: "(202) 225-3826", committees: "Armed Services|Homeland Security" },
  { name: "Andrew Garbarino", party: "R", state: "NY", district: "2nd", office: "1516 LHOB", phone: "(202) 225-7896", committees: "Homeland Security|Small Business" },
  { name: "Tom Suozzi", party: "D", state: "NY", district: "3rd", office: "407 CHOB", phone: "(202) 225-3335", committees: "Foreign Affairs|Ways and Means" },
  { name: "Anthony D'Esposito", party: "R", state: "NY", district: "4th", office: "1530 LHOB", phone: "(202) 225-5516", committees: "Financial Services|Homeland Security" },
  { name: "Gregory Meeks", party: "D", state: "NY", district: "5th", office: "2310 RHOB", phone: "(202) 225-3461", committees: "Financial Services|Foreign Affairs" },
  { name: "Grace Meng", party: "D", state: "NY", district: "6th", office: "2209 RHOB", phone: "(202) 225-2601", committees: "Appropriations" },
  { name: "Nydia Velazquez", party: "D", state: "NY", district: "7th", office: "2302 RHOB", phone: "(202) 225-2361", committees: "Financial Services|Small Business" },
  { name: "Hakeem Jeffries", party: "D", state: "NY", district: "8th", office: "2433 RHOB", phone: "(202) 225-5936", committees: "" },
  { name: "Yvette Clarke", party: "D", state: "NY", district: "9th", office: "2058 RHOB", phone: "(202) 225-6231", committees: "Energy and Commerce|Homeland Security" },
  { name: "Daniel Goldman", party: "D", state: "NY", district: "10th", office: "1508 LHOB", phone: "(202) 225-5244", committees: "Homeland Security|Oversight and Government Reform" },
  { name: "Nicole Malliotakis", party: "R", state: "NY", district: "11th", office: "417 CHOB", phone: "(202) 225-3371", committees: "Transportation and Infrastructure|Ways and Means" },
  { name: "Jerrold Nadler", party: "D", state: "NY", district: "12th", office: "2132 RHOB", phone: "(202) 225-5635", committees: "Judiciary" },
  { name: "Adriano Espaillat", party: "D", state: "NY", district: "13th", office: "1630 LHOB", phone: "(202) 225-4365", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Alexandria Ocasio-Cortez", party: "D", state: "NY", district: "14th", office: "229 CHOB", phone: "(202) 225-3965", committees: "Financial Services|Oversight and Government Reform" },
  { name: "Ritchie Torres", party: "D", state: "NY", district: "15th", office: "1414 LHOB", phone: "(202) 225-4361", committees: "Financial Services|Transportation and Infrastructure" },
  { name: "Jamaal Bowman", party: "D", state: "NY", district: "16th", office: "1641 LHOB", phone: "(202) 225-2464", committees: "Education and Workforce|Science, Space, and Technology" },
  { name: "Mike Lawler", party: "R", state: "NY", district: "17th", office: "1641 LHOB", phone: "(202) 225-6506", committees: "Financial Services|Foreign Affairs" },
  { name: "Pat Ryan", party: "D", state: "NY", district: "18th", office: "1221 LHOB", phone: "(202) 225-5614", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Marcus Molinaro", party: "R", state: "NY", district: "19th", office: "1641 LHOB", phone: "(202) 225-5441", committees: "Agriculture|Financial Services" },
  { name: "Paul Tonko", party: "D", state: "NY", district: "20th", office: "2369 RHOB", phone: "(202) 225-5076", committees: "Energy and Commerce|Science, Space, and Technology" },
  { name: "Stefanik Elise", party: "R", state: "NY", district: "21st", office: "2211 RHOB", phone: "(202) 225-4611", committees: "Armed Services|Education and Workforce|Intelligence" },
  { name: "Brandon Williams", party: "R", state: "NY", district: "22nd", office: "1641 LHOB", phone: "(202) 225-3701", committees: "Science, Space, and Technology|Transportation and Infrastructure" },
  { name: "Nick Langworthy", party: "R", state: "NY", district: "23rd", office: "1641 LHOB", phone: "(202) 225-3161", committees: "Agriculture|Oversight and Government Reform" },
  { name: "Claudia Tenney", party: "R", state: "NY", district: "24th", office: "2441 RHOB", phone: "(202) 225-3665", committees: "Armed Services|Foreign Affairs" },
  { name: "Joe Morelle", party: "D", state: "NY", district: "25th", office: "1317 LHOB", phone: "(202) 225-3615", committees: "Education and Workforce|Rules" },
  { name: "Tim Kennedy", party: "D", state: "NY", district: "26th", office: "1641 LHOB", phone: "(202) 225-3306", committees: "Agriculture|Transportation and Infrastructure" },

  // North Carolina
  { name: "Don Davis", party: "D", state: "NC", district: "1st", office: "1641 LHOB", phone: "(202) 225-3101", committees: "Agriculture|Armed Services" },
  { name: "Deborah Ross", party: "D", state: "NC", district: "2nd", office: "1318 LHOB", phone: "(202) 225-3032", committees: "Judiciary|Science, Space, and Technology" },
  { name: "Greg Murphy", party: "R", state: "NC", district: "3rd", office: "2333 RHOB", phone: "(202) 225-3415", committees: "Education and Workforce|Energy and Commerce" },
  { name: "Valerie Foushee", party: "D", state: "NC", district: "4th", office: "1207 LHOB", phone: "(202) 225-1784", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Virginia Foxx", party: "R", state: "NC", district: "5th", office: "2350 RHOB", phone: "(202) 225-2071", committees: "Education and Workforce|Oversight and Government Reform" },
  { name: "Kathy Manning", party: "D", state: "NC", district: "6th", office: "1229 LHOB", phone: "(202) 225-3065", committees: "Education and Workforce|Foreign Affairs" },
  { name: "David Rouzer", party: "R", state: "NC", district: "7th", office: "2333 RHOB", phone: "(202) 225-2731", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Richard Hudson", party: "R", state: "NC", district: "8th", office: "2112 RHOB", phone: "(202) 225-3715", committees: "Energy and Commerce" },
  { name: "Dan Bishop", party: "R", state: "NC", district: "9th", office: "132 CHOB", phone: "(202) 225-1976", committees: "Homeland Security|Judiciary" },
  { name: "Patrick McHenry", party: "R", state: "NC", district: "10th", office: "2004 RHOB", phone: "(202) 225-2576", committees: "Financial Services" },
  { name: "Chuck Edwards", party: "R", state: "NC", district: "11th", office: "1641 LHOB", phone: "(202) 225-6401", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Alma Adams", party: "D", state: "NC", district: "12th", office: "2436 RHOB", phone: "(202) 225-1510", committees: "Agriculture|Education and Workforce|Financial Services" },
  { name: "Wiley Nickel", party: "D", state: "NC", district: "13th", office: "1641 LHOB", phone: "(202) 225-4531", committees: "Financial Services|Veterans' Affairs" },
  { name: "Jeff Jackson", party: "D", state: "NC", district: "14th", office: "1641 LHOB", phone: "(202) 225-1830", committees: "Armed Services|Transportation and Infrastructure" },

  // North Dakota
  { name: "Kelly Armstrong", party: "R", state: "ND", district: "At Large", office: "1740 LHOB", phone: "(202) 225-2611", committees: "Energy and Commerce|Judiciary" },

  // Ohio
  { name: "Greg Landsman", party: "D", state: "OH", district: "1st", office: "1641 LHOB", phone: "(202) 225-2216", committees: "Education and Workforce|Veterans' Affairs" },
  { name: "Brad Wenstrup", party: "R", state: "OH", district: "2nd", office: "2419 RHOB", phone: "(202) 225-3164", committees: "Intelligence|Ways and Means" },
  { name: "Joyce Beatty", party: "D", state: "OH", district: "3rd", office: "2303 RHOB", phone: "(202) 225-4324", committees: "Financial Services" },
  { name: "Jim Jordan", party: "R", state: "OH", district: "4th", office: "2056 RHOB", phone: "(202) 225-2676", committees: "Judiciary|Oversight and Government Reform" },
  { name: "Bob Latta", party: "R", state: "OH", district: "5th", office: "2467 RHOB", phone: "(202) 225-6405", committees: "Energy and Commerce" },
  { name: "Bill Johnson", party: "R", state: "OH", district: "6th", office: "2336 RHOB", phone: "(202) 225-5705", committees: "Energy and Commerce|Transportation and Infrastructure" },
  { name: "Max Miller", party: "R", state: "OH", district: "7th", office: "1641 LHOB", phone: "(202) 225-3876", committees: "Science, Space, and Technology|Small Business" },
  { name: "Warren Davidson", party: "R", state: "OH", district: "8th", office: "1107 LHOB", phone: "(202) 225-6205", committees: "Financial Services" },
  { name: "Marcy Kaptur", party: "D", state: "OH", district: "9th", office: "2186 RHOB", phone: "(202) 225-4146", committees: "Appropriations" },
  { name: "Mike Turner", party: "R", state: "OH", district: "10th", office: "2082 RHOB", phone: "(202) 225-6465", committees: "Armed Services|Intelligence" },
  { name: "Shontel Brown", party: "D", state: "OH", district: "11th", office: "1641 LHOB", phone: "(202) 225-7032", committees: "Budget|Veterans' Affairs" },
  { name: "Troy Balderson", party: "R", state: "OH", district: "12th", office: "2429 RHOB", phone: "(202) 225-5355", committees: "Energy and Commerce|Small Business" },
  { name: "Emilia Sykes", party: "D", state: "OH", district: "13th", office: "1641 LHOB", phone: "(202) 225-3401", committees: "Education and Workforce|Science, Space, and Technology" },
  { name: "David Joyce", party: "R", state: "OH", district: "14th", office: "1127 LHOB", phone: "(202) 225-5731", committees: "Appropriations" },
  { name: "Mike Carey", party: "R", state: "OH", district: "15th", office: "1641 LHOB", phone: "(202) 225-2015", committees: "Budget|Energy and Commerce" },

  // Oklahoma
  { name: "Kevin Hern", party: "R", state: "OK", district: "1st", office: "1019 LHOB", phone: "(202) 225-2211", committees: "Budget|Ways and Means" },
  { name: "Josh Brecheen", party: "R", state: "OK", district: "2nd", office: "1641 LHOB", phone: "(202) 225-2701", committees: "Budget|Oversight and Government Reform" },
  { name: "Frank Lucas", party: "R", state: "OK", district: "3rd", office: "2405 RHOB", phone: "(202) 225-5565", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Tom Cole", party: "R", state: "OK", district: "4th", office: "2207 RHOB", phone: "(202) 225-6165", committees: "Appropriations|Rules" },
  { name: "Stephanie Bice", party: "R", state: "OK", district: "5th", office: "1641 LHOB", phone: "(202) 225-2132", committees: "Armed Services|Science, Space, and Technology" },

  // Oregon
  { name: "Suzanne Bonamici", party: "D", state: "OR", district: "1st", office: "2231 RHOB", phone: "(202) 225-0855", committees: "Education and Workforce|Science, Space, and Technology" },
  { name: "Cliff Bentz", party: "R", state: "OR", district: "2nd", office: "2185 RHOB", phone: "(202) 225-6730", committees: "Judiciary|Natural Resources" },
  { name: "Earl Blumenauer", party: "D", state: "OR", district: "3rd", office: "1111 LHOB", phone: "(202) 225-4811", committees: "Budget|Ways and Means" },
  { name: "Val Hoyle", party: "D", state: "OR", district: "4th", office: "1641 LHOB", phone: "(202) 225-6416", committees: "Education and Workforce|Natural Resources" },
  { name: "Lori Chavez-DeRemer", party: "R", state: "OR", district: "5th", office: "1641 LHOB", phone: "(202) 225-5711", committees: "Education and Workforce|Transportation and Infrastructure" },
  { name: "Andrea Salinas", party: "D", state: "OR", district: "6th", office: "1641 LHOB", phone: "(202) 225-5643", committees: "Agriculture|Transportation and Infrastructure" },

  // Pennsylvania
  { name: "Brian Fitzpatrick", party: "R", state: "PA", district: "1st", office: "2242 RHOB", phone: "(202) 225-4276", committees: "Financial Services|Foreign Affairs" },
  { name: "Brendan Boyle", party: "D", state: "PA", district: "2nd", office: "2213 RHOB", phone: "(202) 225-6111", committees: "Budget|Ways and Means" },
  { name: "Dwight Evans", party: "D", state: "PA", district: "3rd", office: "1105 LHOB", phone: "(202) 225-4001", committees: "Budget|Ways and Means" },
  { name: "Madeleine Dean", party: "D", state: "PA", district: "4th", office: "129 CHOB", phone: "(202) 225-4731", committees: "Financial Services|Judiciary" },
  { name: "Mary Gay Scanlon", party: "D", state: "PA", district: "5th", office: "1535 LHOB", phone: "(202) 225-2011", committees: "Judiciary|Rules" },
  { name: "Chrissy Houlahan", party: "D", state: "PA", district: "6th", office: "1218 LHOB", phone: "(202) 225-4315", committees: "Armed Services|Small Business" },
  { name: "Susan Wild", party: "D", state: "PA", district: "7th", office: "1607 LHOB", phone: "(202) 225-6411", committees: "Education and Workforce|Foreign Affairs" },
  { name: "Matt Cartwright", party: "D", state: "PA", district: "8th", office: "2102 RHOB", phone: "(202) 225-5546", committees: "Appropriations" },
  { name: "Daniel Meuser", party: "R", state: "PA", district: "9th", office: "326 CHOB", phone: "(202) 225-6511", committees: "Energy and Commerce|Veterans' Affairs" },
  { name: "Scott Perry", party: "R", state: "PA", district: "10th", office: "1207 LHOB", phone: "(202) 225-5836", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Lloyd Smucker", party: "R", state: "PA", district: "11th", office: "127 CHOB", phone: "(202) 225-2411", committees: "Education and Workforce|Transportation and Infrastructure" },
  { name: "Summer Lee", party: "D", state: "PA", district: "12th", office: "1641 LHOB", phone: "(202) 225-2135", committees: "Financial Services|Oversight and Government Reform" },
  { name: "John Joyce", party: "R", state: "PA", district: "13th", office: "1337 LHOB", phone: "(202) 225-2431", committees: "Energy and Commerce|Homeland Security" },
  { name: "Guy Reschenthaler", party: "R", state: "PA", district: "14th", office: "1032 LHOB", phone: "(202) 225-2065", committees: "Appropriations|Rules" },
  { name: "Glenn Thompson", party: "R", state: "PA", district: "15th", office: "400 CHOB", phone: "(202) 225-5121", committees: "Agriculture|Education and Workforce" },
  { name: "Mike Kelly", party: "R", state: "PA", district: "16th", office: "2210 RHOB", phone: "(202) 225-5406", committees: "Ways and Means" },
  { name: "Chris Deluzio", party: "D", state: "PA", district: "17th", office: "1641 LHOB", phone: "(202) 225-2301", committees: "Armed Services|Veterans' Affairs" },

  // Rhode Island
  { name: "David Cicilline", party: "D", state: "RI", district: "1st", office: "2233 RHOB", phone: "(202) 225-4911", committees: "Foreign Affairs|Judiciary" },
  { name: "Seth Magaziner", party: "D", state: "RI", district: "2nd", office: "1641 LHOB", phone: "(202) 225-2735", committees: "Financial Services|Foreign Affairs" },

  // South Carolina
  { name: "Nancy Mace", party: "R", state: "SC", district: "1st", office: "212 CHOB", phone: "(202) 225-3176", committees: "Oversight and Government Reform|Veterans' Affairs" },
  { name: "Joe Wilson", party: "R", state: "SC", district: "2nd", office: "1436 LHOB", phone: "(202) 225-2452", committees: "Armed Services|Foreign Affairs" },
  { name: "Jeff Duncan", party: "R", state: "SC", district: "3rd", office: "2229 RHOB", phone: "(202) 225-5301", committees: "Energy and Commerce|Foreign Affairs" },
  { name: "William Timmons", party: "R", state: "SC", district: "4th", office: "267 CHOB", phone: "(202) 225-6030", committees: "Financial Services|Select Comm on the Strategic Competition US and China" },
  { name: "Ralph Norman", party: "R", state: "SC", district: "5th", office: "569 CHOB", phone: "(202) 225-5501", committees: "Budget|Oversight and Government Reform" },
  { name: "Jim Clyburn", party: "D", state: "SC", district: "6th", office: "2135 RHOB", phone: "(202) 225-3315", committees: "Appropriations" },
  { name: "Russell Fry", party: "R", state: "SC", district: "7th", office: "1641 LHOB", phone: "(202) 225-9895", committees: "Armed Services|Judiciary" },

  // South Dakota
  { name: "Dusty Johnson", party: "R", state: "SD", district: "At Large", office: "1714 LHOB", phone: "(202) 225-2801", committees: "Agriculture|Transportation and Infrastructure" },

  // Tennessee
  { name: "Diana Harshbarger", party: "R", state: "TN", district: "1st", office: "167 CHOB", phone: "(202) 225-6356", committees: "Energy and Commerce|Homeland Security" },
  { name: "Tim Burchett", party: "R", state: "TN", district: "2nd", office: "1122 LHOB", phone: "(202) 225-5435", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Chuck Fleischmann", party: "R", state: "TN", district: "3rd", office: "2410 RHOB", phone: "(202) 225-3271", committees: "Appropriations" },
  { name: "Scott DesJarlais", party: "R", state: "TN", district: "4th", office: "2301 RHOB", phone: "(202) 225-6831", committees: "Agriculture|Armed Services" },
  { name: "Andy Ogles", party: "R", state: "TN", district: "5th", office: "1641 LHOB", phone: "(202) 225-4311", committees: "Financial Services|Judiciary" },
  { name: "John Rose", party: "R", state: "TN", district: "6th", office: "1232 LHOB", phone: "(202) 225-4231", committees: "Financial Services" },
  { name: "Mark Green", party: "R", state: "TN", district: "7th", office: "533 CHOB", phone: "(202) 225-2811", committees: "Homeland Security|Oversight and Government Reform" },
  { name: "David Kustoff", party: "R", state: "TN", district: "8th", office: "2410 RHOB", phone: "(202) 225-4714", committees: "Financial Services" },
  { name: "Steve Cohen", party: "D", state: "TN", district: "9th", office: "2104 RHOB", phone: "(202) 225-3265", committees: "Judiciary|Transportation and Infrastructure" },

  // Texas
  { name: "Nathaniel Moran", party: "R", state: "TX", district: "1st", office: "1641 LHOB", phone: "(202) 225-3035", committees: "Education and Workforce|Veterans' Affairs" },
  { name: "Dan Crenshaw", party: "R", state: "TX", district: "2nd", office: "413 CHOB", phone: "(202) 225-6565", committees: "Energy and Commerce|Homeland Security" },
  { name: "Keith Self", party: "R", state: "TX", district: "3rd", office: "1641 LHOB", phone: "(202) 225-4201", committees: "Foreign Affairs|Veterans' Affairs" },
  { name: "Pat Fallon", party: "R", state: "TX", district: "4th", office: "1118 LHOB", phone: "(202) 225-6673", committees: "Armed Services|Oversight and Government Reform" },
  { name: "Lance Gooden", party: "R", state: "TX", district: "5th", office: "425 CHOB", phone: "(202) 225-3484", committees: "Financial Services|Judiciary" },
  { name: "Jake Ellzey", party: "R", state: "TX", district: "6th", office: "1641 LHOB", phone: "(202) 225-2002", committees: "Armed Services|Veterans' Affairs" },
  { name: "Lizzie Fletcher", party: "D", state: "TX", district: "7th", office: "1429 LHOB", phone: "(202) 225-2571", committees: "Energy and Commerce|Science, Space, and Technology" },
  { name: "Morgan Luttrell", party: "R", state: "TX", district: "8th", office: "1641 LHOB", phone: "(202) 225-4901", committees: "Armed Services|Veterans' Affairs" },
  { name: "Al Green", party: "D", state: "TX", district: "9th", office: "2347 RHOB", phone: "(202) 225-7508", committees: "Financial Services|Homeland Security" },
  { name: "Michael McCaul", party: "R", state: "TX", district: "10th", office: "2001 RHOB", phone: "(202) 225-2401", committees: "Foreign Affairs|Homeland Security" },
  { name: "August Pfluger", party: "R", state: "TX", district: "11th", office: "1641 LHOB", phone: "(202) 225-4005", committees: "Foreign Affairs|Homeland Security" },
  { name: "Kay Granger", party: "R", state: "TX", district: "12th", office: "1026 LHOB", phone: "(202) 225-5071", committees: "Appropriations" },
  { name: "Ronny Jackson", party: "R", state: "TX", district: "13th", office: "1641 LHOB", phone: "(202) 225-3706", committees: "Armed Services|Foreign Affairs" },
  { name: "Randy Weber", party: "R", state: "TX", district: "14th", office: "2330 RHOB", phone: "(202) 225-2831", committees: "Science, Space, and Technology|Transportation and Infrastructure" },
  { name: "Monica De La Cruz", party: "R", state: "TX", district: "15th", office: "1641 LHOB", phone: "(202) 225-2531", committees: "Agriculture|Veterans' Affairs" },
  { name: "Veronica Escobar", party: "D", state: "TX", district: "16th", office: "1505 LHOB", phone: "(202) 225-4831", committees: "Armed Services|Judiciary" },
  { name: "Pete Sessions", party: "R", state: "TX", district: "17th", office: "2204 RHOB", phone: "(202) 225-6105", committees: "Financial Services" },
  { name: "Sheila Jackson Lee", party: "D", state: "TX", district: "18th", office: "2079 RHOB", phone: "(202) 225-3816", committees: "Budget|Homeland Security|Judiciary" },
  { name: "Jodey Arrington", party: "R", state: "TX", district: "19th", office: "1029 LHOB", phone: "(202) 225-4005", committees: "Budget|Ways and Means" },
  { name: "Joaquin Castro", party: "D", state: "TX", district: "20th", office: "2241 RHOB", phone: "(202) 225-3236", committees: "Foreign Affairs|Intelligence" },
  { name: "Chip Roy", party: "R", state: "TX", district: "21st", office: "1319 LHOB", phone: "(202) 225-4236", committees: "Budget|Judiciary" },
  { name: "Troy Nehls", party: "R", state: "TX", district: "22nd", office: "1104 LHOB", phone: "(202) 225-5951", committees: "Judiciary|Transportation and Infrastructure" },
  { name: "Tony Gonzales", party: "R", state: "TX", district: "23rd", office: "1009 LHOB", phone: "(202) 225-4511", committees: "Appropriations" },
  { name: "Beth Van Duyne", party: "R", state: "TX", district: "24th", office: "1725 LHOB", phone: "(202) 225-6605", committees: "Small Business|Transportation and Infrastructure" },
  { name: "Roger Williams", party: "R", state: "TX", district: "25th", office: "1708 LHOB", phone: "(202) 225-9896", committees: "Financial Services" },
  { name: "Michael Burgess", party: "R", state: "TX", district: "26th", office: "2161 RHOB", phone: "(202) 225-7772", committees: "Energy and Commerce|Rules" },
  { name: "Michael Cloud", party: "R", state: "TX", district: "27th", office: "1314 LHOB", phone: "(202) 225-7742", committees: "Oversight and Government Reform|Science, Space, and Technology" },
  { name: "Henry Cuellar", party: "D", state: "TX", district: "28th", office: "2372 RHOB", phone: "(202) 225-1640", committees: "Agriculture|Appropriations" },
  { name: "Sylvia Garcia", party: "D", state: "TX", district: "29th", office: "1620 LHOB", phone: "(202) 225-1688", committees: "Financial Services|Judiciary" },
  { name: "Jasmine Crockett", party: "D", state: "TX", district: "30th", office: "1641 LHOB", phone: "(202) 225-8885", committees: "Agriculture|Oversight and Government Reform" },
  { name: "John Carter", party: "R", state: "TX", district: "31st", office: "2110 RHOB", phone: "(202) 225-3864", committees: "Appropriations" },
  { name: "Colin Allred", party: "D", state: "TX", district: "32nd", office: "328 CHOB", phone: "(202) 225-2231", committees: "Foreign Affairs|Transportation and Infrastructure" },
  { name: "Marc Veasey", party: "D", state: "TX", district: "33rd", office: "2348 RHOB", phone: "(202) 225-9897", committees: "Armed Services|Energy and Commerce" },
  { name: "Vicente Gonzalez", party: "D", state: "TX", district: "34th", office: "113 CHOB", phone: "(202) 225-9901", committees: "Financial Services|Small Business" },
  { name: "Lloyd Doggett", party: "D", state: "TX", district: "35th", office: "2307 RHOB", phone: "(202) 225-4865", committees: "Budget|Ways and Means" },
  { name: "Brian Babin", party: "R", state: "TX", district: "36th", office: "2236 RHOB", phone: "(202) 225-1555", committees: "Science, Space, and Technology|Transportation and Infrastructure" },
  { name: "Wesley Hunt", party: "R", state: "TX", district: "38th", office: "1641 LHOB", phone: "(202) 225-2571", committees: "Armed Services|Judiciary" },

  // Puerto Rico
  { name: "Jenniffer González-Colón", party: "R", state: "PR", district: "Resident Commissioner", office: "1609 LHOB", phone: "(202) 225-2615", committees: "Natural Resources|Transportation and Infrastructure" },

  // U.S. Virgin Islands
  { name: "Stacey Plaskett", party: "D", state: "VI", district: "Delegate", office: "2404 RHOB", phone: "(202) 225-1790", committees: "Oversight and Government Reform|Transportation and Infrastructure" },

  // American Samoa
  { name: "Amata Coleman Radewagen", party: "R", state: "AS", district: "Delegate", office: "2059 RHOB", phone: "(202) 225-8577", committees: "Natural Resources|Veterans' Affairs" },

  // Northern Mariana Islands
  { name: "Gregorio Kilili Camacho Sablan", party: "D", state: "MP", district: "Delegate", office: "2267 RHOB", phone: "(202) 225-2646", committees: "Education and Workforce|Natural Resources" },

  // Additional California representatives
  { name: "Jay Obernolte", party: "R", state: "CA", district: "21st", office: "1029 LHOB", phone: "(202) 225-5861", committees: "Natural Resources|Science, Space, and Technology" },
  { name: "David Valadao", party: "R", state: "CA", district: "22nd", office: "1728 LHOB", phone: "(202) 225-4695", committees: "Appropriations" },
  { name: "Kevin McCarthy", party: "R", state: "CA", district: "23rd", office: "2421 RHOB", phone: "(202) 225-2915", committees: "" },
  { name: "Salud Carbajal", party: "D", state: "CA", district: "24th", office: "1431 LHOB", phone: "(202) 225-3601", committees: "Armed Services|Transportation and Infrastructure" },
  { name: "Raul Ruiz", party: "D", state: "CA", district: "25th", office: "2342 RHOB", phone: "(202) 225-5330", committees: "Energy and Commerce" },
  { name: "Julia Brownley", party: "D", state: "CA", district: "26th", office: "2262 RHOB", phone: "(202) 225-5811", committees: "Energy and Commerce|Transportation and Infrastructure" },
  { name: "Mike Garcia", party: "R", state: "CA", district: "27th", office: "1535 LHOB", phone: "(202) 225-1956", committees: "Appropriations|Science, Space, and Technology" },
  { name: "Judy Chu", party: "D", state: "CA", district: "28th", office: "2423 RHOB", phone: "(202) 225-5464", committees: "Appropriations|Small Business" },
  { name: "Tony Cárdenas", party: "D", state: "CA", district: "29th", office: "2181 RHOB", phone: "(202) 225-6131", committees: "Energy and Commerce" },
  { name: "Adam Schiff", party: "D", state: "CA", district: "30th", office: "2372 RHOB", phone: "(202) 225-4176", committees: "Appropriations|Intelligence" },
  { name: "Grace Napolitano", party: "D", state: "CA", district: "31st", office: "1610 LHOB", phone: "(202) 225-5256", committees: "Natural Resources|Transportation and Infrastructure" },
  { name: "Brad Sherman", party: "D", state: "CA", district: "32nd", office: "2181 RHOB", phone: "(202) 225-5911", committees: "Financial Services|Foreign Affairs" },
  { name: "Pete Aguilar", party: "D", state: "CA", district: "33rd", office: "109 CHOB", phone: "(202) 225-3201", committees: "Appropriations|House Administration" },
  { name: "Jimmy Gomez", party: "D", state: "CA", district: "34th", office: "1226 LHOB", phone: "(202) 225-6235", committees: "Oversight and Government Reform|Ways and Means" },
  { name: "Norma Torres", party: "D", state: "CA", district: "35th", office: "2444 RHOB", phone: "(202) 225-6161", committees: "Appropriations|Rules" },
  { name: "Ted Lieu", party: "D", state: "CA", district: "36th", office: "403 CHOB", phone: "(202) 225-3976", committees: "Foreign Affairs|Judiciary" },
  { name: "Sydney Kamlager-Dove", party: "D", state: "CA", district: "37th", office: "1641 LHOB", phone: "(202) 225-7084", committees: "Natural Resources|Science, Space, and Technology" },
  { name: "Linda Sánchez", party: "D", state: "CA", district: "38th", office: "2329 RHOB", phone: "(202) 225-6676", committees: "Ways and Means" },
  { name: "Mark Takano", party: "D", state: "CA", district: "39th", office: "420 CHOB", phone: "(202) 225-2305", committees: "Education and Workforce|Veterans' Affairs" },
  { name: "Young Kim", party: "R", state: "CA", district: "40th", office: "1306 LHOB", phone: "(202) 225-4111", committees: "Financial Services|Foreign Affairs" },
  { name: "Ken Calvert", party: "R", state: "CA", district: "41st", office: "2201 RHOB", phone: "(202) 225-1986", committees: "Appropriations" },
  { name: "Robert Garcia", party: "D", state: "CA", district: "42nd", office: "1641 LHOB", phone: "(202) 225-7924", committees: "Homeland Security|Science, Space, and Technology" },
  { name: "Maxine Waters", party: "D", state: "CA", district: "43rd", office: "2221 RHOB", phone: "(202) 225-2201", committees: "Financial Services" },
  { name: "Nanette Barragán", party: "D", state: "CA", district: "44th", office: "1320 LHOB", phone: "(202) 225-8220", committees: "Energy and Commerce|Homeland Security" },
  { name: "Michelle Steel", party: "R", state: "CA", district: "45th", office: "1113 LHOB", phone: "(202) 225-2415", committees: "Education and Workforce|Ways and Means" },
  { name: "Lou Correa", party: "D", state: "CA", district: "46th", office: "1039 LHOB", phone: "(202) 225-2965", committees: "Homeland Security|Judiciary" },
  { name: "Katie Porter", party: "D", state: "CA", district: "47th", office: "1117 LHOB", phone: "(202) 225-5611", committees: "Financial Services|Natural Resources" },
  { name: "Darrell Issa", party: "R", state: "CA", district: "48th", office: "2108 RHOB", phone: "(202) 225-3906", committees: "Foreign Affairs|Judiciary" },
  { name: "Mike Levin", party: "D", state: "CA", district: "49th", office: "1030 LHOB", phone: "(202) 225-3906", committees: "Natural Resources|Veterans' Affairs" },
  { name: "Scott Peters", party: "D", state: "CA", district: "50th", office: "1201 LHOB", phone: "(202) 225-0508", committees: "Budget|Energy and Commerce" },
  { name: "Sara Jacobs", party: "D", state: "CA", district: "51st", office: "1232 LHOB", phone: "(202) 225-2040", committees: "Armed Services|Foreign Affairs" },
  { name: "Juan Vargas", party: "D", state: "CA", district: "52nd", office: "2244 RHOB", phone: "(202) 225-8045", committees: "Financial Services|Foreign Affairs" },

  // Utah
  { name: "Blake Moore", party: "R", state: "UT", district: "1st", office: "1641 LHOB", phone: "(202) 225-0453", committees: "Armed Services|Budget" },
  { name: "Celeste Maloy", party: "R", state: "UT", district: "2nd", office: "1641 LHOB", phone: "(202) 225-9730", committees: "Natural Resources|Oversight and Government Reform" },
  { name: "John Curtis", party: "R", state: "UT", district: "3rd", office: "2236 RHOB", phone: "(202) 225-7751", committees: "Energy and Commerce|Foreign Affairs" },
  { name: "Burgess Owens", party: "R", state: "UT", district: "4th", office: "1641 LHOB", phone: "(202) 225-3011", committees: "Education and Workforce|Judiciary" },

  // Vermont
  { name: "Becca Balint", party: "D", state: "VT", district: "At Large", office: "1641 LHOB", phone: "(202) 225-4115", committees: "Budget|Oversight and Government Reform" },

  // Virginia
  { name: "Rob Wittman", party: "R", state: "VA", district: "1st", office: "2055 RHOB", phone: "(202) 225-4261", committees: "Armed Services|Natural Resources" },
  { name: "Jen Kiggans", party: "R", state: "VA", district: "2nd", office: "1641 LHOB", phone: "(202) 225-4215", committees: "Armed Services|Small Business" },
  { name: "Bobby Scott", party: "D", state: "VA", district: "3rd", office: "1201 LHOB", phone: "(202) 225-8351", committees: "Education and Workforce" },
  { name: "Jennifer McClellan", party: "D", state: "VA", district: "4th", office: "1641 LHOB", phone: "(202) 225-6365", committees: "Armed Services|Science, Space, and Technology" },
  { name: "Bob Good", party: "R", state: "VA", district: "5th", office: "1641 LHOB", phone: "(202) 225-4711", committees: "Budget|Education and Workforce" },
  { name: "Ben Cline", party: "R", state: "VA", district: "6th", office: "1009 LHOB", phone: "(202) 225-5431", committees: "Appropriations|Judiciary" },
  { name: "Abigail Spanberger", party: "D", state: "VA", district: "7th", office: "1239 LHOB", phone: "(202) 225-2815", committees: "Foreign Affairs|Intelligence" },
  { name: "Don Beyer", party: "D", state: "VA", district: "8th", office: "1119 LHOB", phone: "(202) 225-4376", committees: "Science, Space, and Technology|Ways and Means" },
  { name: "Morgan Griffith", party: "R", state: "VA", district: "9th", office: "2202 RHOB", phone: "(202) 225-3861", committees: "Energy and Commerce" },
  { name: "Jennifer Wexton", party: "D", state: "VA", district: "10th", office: "1217 LHOB", phone: "(202) 225-5136", committees: "Appropriations|Science, Space, and Technology" },
  { name: "Gerry Connolly", party: "D", state: "VA", district: "11th", office: "2238 RHOB", phone: "(202) 225-1492", committees: "Foreign Affairs|Oversight and Government Reform" },

  // Washington
  { name: "Suzan DelBene", party: "D", state: "WA", district: "1st", office: "2330 RHOB", phone: "(202) 225-6311", committees: "Ways and Means" },
  { name: "Rick Larsen", party: "D", state: "WA", district: "2nd", office: "2163 RHOB", phone: "(202) 225-2605", committees: "Armed Services|Transportation and Infrastructure" },
  { name: "Marie Gluesenkamp Perez", party: "D", state: "WA", district: "3rd", office: "1641 LHOB", phone: "(202) 225-3536", committees: "Small Business|Transportation and Infrastructure" },
  { name: "Dan Newhouse", party: "R", state: "WA", district: "4th", office: "1641 LHOB", phone: "(202) 225-5816", committees: "Appropriations|Select Comm on the Strategic Competition US and China" },
  { name: "Cathy McMorris Rodgers", party: "R", state: "WA", district: "5th", office: "1035 LHOB", phone: "(202) 225-2006", committees: "Energy and Commerce" },
  { name: "Derek Kilmer", party: "D", state: "WA", district: "6th", office: "1520 LHOB", phone: "(202) 225-5916", committees: "Appropriations" },
  { name: "Pramila Jayapal", party: "D", state: "WA", district: "7th", office: "1510 LHOB", phone: "(202) 225-3106", committees: "Budget|Judiciary" },
  { name: "Kim Schrier", party: "D", state: "WA", district: "8th", office: "1123 LHOB", phone: "(202) 225-7761", committees: "Agriculture|Energy and Commerce" },
  { name: "Adam Smith", party: "D", state: "WA", district: "9th", office: "2264 RHOB", phone: "(202) 225-8901", committees: "Armed Services" },
  { name: "Marilyn Strickland", party: "D", state: "WA", district: "10th", office: "1004 LHOB", phone: "(202) 225-9740", committees: "Armed Services|Transportation and Infrastructure" },

  // West Virginia
  { name: "Carol Miller", party: "R", state: "WV", district: "1st", office: "1605 LHOB", phone: "(202) 225-3452", committees: "Agriculture|Science, Space, and Technology" },
  { name: "Alexander Mooney", party: "R", state: "WV", district: "2nd", office: "2228 RHOB", phone: "(202) 225-2711", committees: "Financial Services" },

  // Wisconsin
  { name: "Bryan Steil", party: "R", state: "WI", district: "1st", office: "1526 LHOB", phone: "(202) 225-3031", committees: "Financial Services" },
  { name: "Mark Pocan", party: "D", state: "WI", district: "2nd", office: "1421 LHOB", phone: "(202) 225-2906", committees: "Appropriations" },
  { name: "Derrick Van Orden", party: "R", state: "WI", district: "3rd", office: "1641 LHOB", phone: "(202) 225-5506", committees: "Agriculture|Transportation and Infrastructure" },
  { name: "Gwen Moore", party: "D", state: "WI", district: "4th", office: "2252 RHOB", phone: "(202) 225-4572", committees: "Financial Services|Science, Space, and Technology" },
  { name: "Scott Fitzgerald", party: "R", state: "WI", district: "5th", office: "1507 LHOB", phone: "(202) 225-5101", committees: "Education and Workforce|Judiciary" },
  { name: "Glenn Grothman", party: "R", state: "WI", district: "6th", office: "1427 LHOB", phone: "(202) 225-2476", committees: "Budget|Oversight and Government Reform" },
  { name: "Thomas Tiffany", party: "R", state: "WI", district: "7th", office: "1640 LHOB", phone: "(202) 225-3365", committees: "Judiciary|Natural Resources" },
  { name: "Mike Gallagher", party: "R", state: "WI", district: "8th", office: "1230 LHOB", phone: "(202) 225-5665", committees: "Armed Services|Transportation and Infrastructure" },

  // Wyoming
  { name: "Harriet Hageman", party: "R", state: "WY", district: "At Large", office: "1641 LHOB", phone: "(202) 225-2311", committees: "Judiciary|Natural Resources" }
] as const;

// Transform raw data into Representative objects
export const REPRESENTATIVES: Representative[] = rawRepresentatives.map(r => ({
  id: generateId(r.name),
  name: r.name,
  party: r.party as 'D' | 'R',
  state: STATE_NAMES[r.state] || r.state,
  stateAbbr: r.state,
  district: r.district,
  office: r.office,
  phone: r.phone,
  committees: r.committees.split('|').filter(c => c.trim() !== ''),
  imageInitials: getInitials(r.name),
  website: `https://www.${r.name.split(' ').pop()?.toLowerCase()}.house.gov`
}));

// Helper functions
export function getRepresentativesByState(stateAbbr: string): Representative[] {
  return REPRESENTATIVES.filter(r => r.stateAbbr === stateAbbr);
}

export function getRepresentativesByParty(party: 'D' | 'R'): Representative[] {
  return REPRESENTATIVES.filter(r => r.party === party);
}

export function getRepresentativeById(id: string): Representative | undefined {
  return REPRESENTATIVES.find(r => r.id === id);
}

export function searchRepresentatives(query: string): Representative[] {
  const q = query.toLowerCase();
  return REPRESENTATIVES.filter(r => 
    r.name.toLowerCase().includes(q) ||
    r.state.toLowerCase().includes(q) ||
    r.stateAbbr.toLowerCase() === q ||
    r.district.toLowerCase().includes(q)
  );
}

export function getAllRepresentativeStates(): string[] {
  return [...new Set(REPRESENTATIVES.map(r => r.stateAbbr))].sort();
}

export function getRepresentativePartyBreakdown(): { D: number; R: number } {
  return {
    D: REPRESENTATIVES.filter(r => r.party === 'D').length,
    R: REPRESENTATIVES.filter(r => r.party === 'R').length
  };
}

// Statistics
export const HOUSE_STATS = {
  total: REPRESENTATIVES.length,
  democrats: REPRESENTATIVES.filter(r => r.party === 'D').length,
  republicans: REPRESENTATIVES.filter(r => r.party === 'R').length,
  states: [...new Set(REPRESENTATIVES.map(r => r.stateAbbr))].length
};

// State list for filtering
export const HOUSE_STATES = Object.entries(STATE_NAMES)
  .map(([abbr, name]) => ({ abbr, name }))
  .sort((a, b) => a.name.localeCompare(b.name));