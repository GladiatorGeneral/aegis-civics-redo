/**
 * US Mayors Data
 * Major cities as of 2025
 */

export interface Mayor {
  id: string;
  name: string;
  party: 'D' | 'R' | 'I' | 'N';
  city: string;
  state: string;
  stateAbbr: string;
  phone?: string;
  email?: string;
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
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
  'DC': 'District of Columbia'
};

// Generate initials from name
function getInitials(name: string): string {
  const parts = name.split(' ').filter(p => !p.includes('.') && p.length > 1);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Generate ID from name and city
function generateId(name: string, city: string): string {
  const nameId = name.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const cityId = city.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return `${nameId}-${cityId}`;
}

const rawMayors: {
  name: string;
  party: 'D' | 'R' | 'I' | 'N';
  city: string;
  state: string;
  phone?: string;
  address?: string;
  website?: string;
}[] = [
  { name: "Eric Adams", party: "D", city: "New York", state: "NY", phone: "311", address: "City Hall, New York, NY 10007", website: "https://www.nyc.gov/office-of-the-mayor" },
  { name: "Karen Bass", party: "D", city: "Los Angeles", state: "CA", phone: "(213) 978-0600", address: "200 N Spring St, Los Angeles, CA 90012", website: "https://www.lacity.gov/mayor" },
  { name: "Brandon Johnson", party: "D", city: "Chicago", state: "IL", phone: "(312) 744-5000", address: "121 N LaSalle St, Chicago, IL 60602", website: "https://www.chicago.gov/city/en/depts/mayor.html" },
  { name: "John Whitmire", party: "D", city: "Houston", state: "TX", phone: "(832) 393-1000", address: "901 Bagby St, Houston, TX 77002", website: "https://www.houstontx.gov/mayor" },
  { name: "Kate Gallego", party: "D", city: "Phoenix", state: "AZ", phone: "(602) 262-7111", address: "200 W Washington St, Phoenix, AZ 85003", website: "https://www.phoenix.gov/mayor" },
  { name: "Cherelle Parker", party: "D", city: "Philadelphia", state: "PA", phone: "(215) 686-2181", address: "1400 JFK Blvd, Philadelphia, PA 19107", website: "https://www.phila.gov/departments/mayor/" },
  { name: "Ron Nirenberg", party: "I", city: "San Antonio", state: "TX", phone: "(210) 207-7200", address: "100 Military Plaza, San Antonio, TX 78205", website: "https://www.sanantonio.gov/Mayor" },
  { name: "Todd Gloria", party: "D", city: "San Diego", state: "CA", phone: "(619) 236-6330", address: "202 C St, San Diego, CA 92101", website: "https://www.sandiego.gov/mayor" },
  { name: "Eric Johnson", party: "D", city: "Dallas", state: "TX", phone: "(214) 670-4054", address: "1500 Marilla St, Dallas, TX 75201", website: "https://dallascityhall.com/departments/mayor/Pages/default.aspx" },
  { name: "Matt Mahan", party: "D", city: "San Jose", state: "CA", phone: "(408) 535-4800", address: "200 E Santa Clara St, San Jose, CA 95113", website: "https://www.sanjoseca.gov/your-government/mayor-city-council/mayor-matt-mahan" },
  { name: "Kirk Watson", party: "D", city: "Austin", state: "TX", phone: "(512) 978-2100", address: "301 W 2nd St, Austin, TX 78701", website: "https://www.austintexas.gov/department/mayor" },
  { name: "Donna Deegan", party: "D", city: "Jacksonville", state: "FL", phone: "(904) 630-1776", address: "117 W Duval St, Jacksonville, FL 32202", website: "https://www.coj.net/mayor" },
  { name: "Mattie Parker", party: "R", city: "Fort Worth", state: "TX", phone: "(817) 392-6111", address: "200 Texas St, Fort Worth, TX 76102", website: "https://www.fortworthtexas.gov/departments/mayor" },
  { name: "Andrew Ginther", party: "D", city: "Columbus", state: "OH", phone: "(614) 645-7671", address: "90 W Broad St, Columbus, OH 43215", website: "https://www.columbus.gov/mayor/" },
  { name: "Vi Lyles", party: "D", city: "Charlotte", state: "NC", phone: "(704) 336-2241", address: "600 E 4th St, Charlotte, NC 28202", website: "https://charlottenc.gov/mayor/Pages/default.aspx" },
  { name: "London Breed", party: "D", city: "San Francisco", state: "CA", phone: "(415) 554-6141", address: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102", website: "https://sfmayor.org/" },
  { name: "Bruce Harrell", party: "D", city: "Seattle", state: "WA", phone: "(206) 684-4000", address: "600 4th Ave, Seattle, WA 98104", website: "https://www.seattle.gov/mayor" },
  { name: "Mike Johnston", party: "D", city: "Denver", state: "CO", phone: "(720) 865-9000", address: "1437 Bannock St, Denver, CO 80202", website: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Mayors-Office" },
  { name: "Muriel Bowser", party: "D", city: "Washington", state: "DC", phone: "(202) 727-2643", address: "1350 Pennsylvania Ave NW, Washington, DC 20004", website: "https://mayor.dc.gov/" },
  { name: "Michelle Wu", party: "D", city: "Boston", state: "MA", phone: "(617) 635-4500", address: "1 City Hall Square, Boston, MA 02201", website: "https://www.boston.gov/departments/mayors-office" },
  { name: "Mike Duggan", party: "D", city: "Detroit", state: "MI", phone: "(313) 224-3400", address: "2 Woodward Ave, Detroit, MI 48226", website: "https://detroitmi.gov/departments/mayors-office" },
  { name: "Tishaura Jones", party: "D", city: "St. Louis", state: "MO", phone: "(314) 622-3201", address: "1200 Market St, St. Louis, MO 63103", website: "https://www.stlouis-mo.gov/government/departments/mayor/" },
  { name: "Hillary Schieve", party: "I", city: "Reno", state: "NV", phone: "(775) 334-2000", address: "1 E 1st St, Reno, NV 89501", website: "https://www.reno.gov/government/city-council/mayor" },
  { name: "Ted Wheeler", party: "D", city: "Portland", state: "OR", phone: "(503) 823-4120", address: "1221 SW 4th Ave, Portland, OR 97204", website: "https://www.portland.gov/wheeler" },
  { name: "Tim Keller", party: "D", city: "Albuquerque", state: "NM", phone: "(505) 768-3000", address: "1 Civic Plaza NW, Albuquerque, NM 87102", website: "https://www.cabq.gov/mayor" },
  { name: "Regina Romero", party: "D", city: "Tucson", state: "AZ", phone: "(520) 791-4201", address: "255 W Alameda St, Tucson, AZ 85701", website: "https://www.tucsonaz.gov/mayor" },
  { name: "Quinton Lucas", party: "D", city: "Kansas City", state: "MO", phone: "(816) 513-3500", address: "414 E 12th St, Kansas City, MO 64106", website: "https://www.kcmo.gov/city-hall/mayor-quinton-lucas" },
  { name: "Erin Mendenhall", party: "D", city: "Salt Lake City", state: "UT", phone: "(801) 535-7704", address: "451 S State St, Salt Lake City, UT 84111", website: "https://www.slc.gov/mayor/" },
  { name: "John Cooper", party: "D", city: "Nashville", state: "TN", phone: "(615) 862-6000", address: "1 Public Square, Nashville, TN 37201", website: "https://www.nashville.gov/departments/mayor" },
  { name: "Francis Suarez", party: "R", city: "Miami", state: "FL", phone: "(305) 250-5300", address: "3500 Pan American Dr, Miami, FL 33133", website: "https://www.miamigov.com/Government/Mayor-Francis-Suarez" },
  { name: "Steve Adler", party: "D", city: "Austin", state: "TX", phone: "(512) 978-2100", address: "301 W 2nd St, Austin, TX 78701", website: "https://www.austintexas.gov/department/mayor" },
  { name: "Glenn Jacobs", party: "R", city: "Knoxville", state: "TN", phone: "(865) 215-2040", address: "400 Main St, Knoxville, TN 37902", website: "https://knoxvilletn.gov/government/mayor/" },
  { name: "Lucas Frangos", party: "R", city: "Virginia Beach", state: "VA", phone: "(757) 385-4581", address: "2401 Courthouse Dr, Virginia Beach, VA 23456", website: "https://www.vbgov.com/government/mayor/Pages/default.aspx" },
  { name: "Levar Stoney", party: "D", city: "Richmond", state: "VA", phone: "(804) 646-7970", address: "900 E Broad St, Richmond, VA 23219", website: "https://www.rva.gov/mayor" },
  { name: "Ken Welch", party: "D", city: "St. Petersburg", state: "FL", phone: "(727) 893-7201", address: "175 5th St N, St. Petersburg, FL 33701", website: "https://www.stpete.org/mayor/" },
  { name: "Jane Castor", party: "D", city: "Tampa", state: "FL", phone: "(813) 274-8251", address: "315 E Kennedy Blvd, Tampa, FL 33602", website: "https://www.tampagov.net/mayor" },
  { name: "Robert Garcia", party: "D", city: "Long Beach", state: "CA", phone: "(562) 570-6801", address: "411 W Ocean Blvd, Long Beach, CA 90802", website: "https://www.longbeach.gov/mayor/" },
  { name: "Sam Liccardo", party: "D", city: "San Jose", state: "CA", phone: "(408) 535-4800", address: "200 E Santa Clara St, San Jose, CA 95113", website: "https://www.sanjoseca.gov/your-government/mayor-city-council" },
  { name: "Darrell Steinberg", party: "D", city: "Sacramento", state: "CA", phone: "(916) 808-5300", address: "915 I St, Sacramento, CA 95814", website: "https://www.cityofsacramento.org/Mayor" },
  { name: "Rick Kriseman", party: "D", city: "St. Petersburg", state: "FL", phone: "(727) 893-7201", address: "175 5th St N, St. Petersburg, FL 33701", website: "https://www.stpete.org/mayor/" },
  { name: "John Giles", party: "R", city: "Mesa", state: "AZ", phone: "(480) 644-2388", address: "20 N Center St, Mesa, AZ 85201", website: "https://www.mesaaz.gov/government/mayor-council/mayor" },
  { name: "Jerry Dyer", party: "R", city: "Fresno", state: "CA", phone: "(559) 621-7900", address: "2600 Fresno St, Fresno, CA 93721", website: "https://www.fresno.gov/mayor/" },
  { name: "Steven Reed", party: "D", city: "Montgomery", state: "AL", phone: "(334) 625-2532", address: "103 N Perry St, Montgomery, AL 36104", website: "https://www.montgomeryal.gov/government/mayor" },
  { name: "Randall Woodfin", party: "D", city: "Birmingham", state: "AL", phone: "(205) 254-2201", address: "710 20th St N, Birmingham, AL 35203", website: "https://www.birminghamal.gov/government/mayor/" },
  { name: "John Cranley", party: "D", city: "Cincinnati", state: "OH", phone: "(513) 352-3250", address: "801 Plum St, Cincinnati, OH 45202", website: "https://www.cincinnati-oh.gov/mayor/" },
  { name: "Justin Bibb", party: "D", city: "Cleveland", state: "OH", phone: "(216) 664-2220", address: "601 Lakeside Ave, Cleveland, OH 44114", website: "https://www.clevelandohio.gov/CityofCleveland/Home/Government/MayorsOffice" },
  { name: "Lori Lightfoot", party: "D", city: "Chicago", state: "IL", phone: "(312) 744-5000", address: "121 N LaSalle St, Chicago, IL 60602", website: "https://www.chicago.gov/city/en/depts/mayor.html" },
  { name: "Malik Evans", party: "D", city: "Rochester", state: "NY", phone: "(585) 428-7045", address: "30 Church St, Rochester, NY 14614", website: "https://www.cityofrochester.gov/mayor/" },
  { name: "Ben Walsh", party: "I", city: "Syracuse", state: "NY", phone: "(315) 448-8005", address: "233 E Washington St, Syracuse, NY 13202", website: "https://www.syrgov.net/Mayor.aspx" },
  { name: "Byron Brown", party: "D", city: "Buffalo", state: "NY", phone: "(716) 851-4841", address: "65 Niagara Sq, Buffalo, NY 14202", website: "https://www.city-buffalo.com/Home/Leadership/Mayor" },
  { name: "Ed Gainey", party: "D", city: "Pittsburgh", state: "PA", phone: "(412) 255-2626", address: "414 Grant St, Pittsburgh, PA 15219", website: "https://pittsburghpa.gov/mayor/" },
  { name: "Andre Dickens", party: "D", city: "Atlanta", state: "GA", phone: "(404) 330-6100", address: "55 Trinity Ave SW, Atlanta, GA 30303", website: "https://www.atlantaga.gov/government/mayor-s-office" },
  { name: "LaToya Cantrell", party: "D", city: "New Orleans", state: "LA", phone: "(504) 658-4900", address: "1300 Perdido St, New Orleans, LA 70112", website: "https://nola.gov/mayor/" },
  { name: "Sylvester Turner", party: "D", city: "Houston", state: "TX", phone: "(832) 393-1000", address: "901 Bagby St, Houston, TX 77002", website: "https://www.houstontx.gov/mayor" },
  { name: "Eric Garcetti", party: "D", city: "Los Angeles", state: "CA", phone: "(213) 978-0600", address: "200 N Spring St, Los Angeles, CA 90012", website: "https://www.lacity.gov/mayor" },
  { name: "Frank Scott Jr.", party: "D", city: "Little Rock", state: "AR", phone: "(501) 371-4510", address: "500 W Markham St, Little Rock, AR 72201", website: "https://www.littlerock.gov/city-administration/mayor/" },
  { name: "Nan Whaley", party: "D", city: "Dayton", state: "OH", phone: "(937) 333-3590", address: "101 W 3rd St, Dayton, OH 45402", website: "https://www.daytonohio.gov/154/Mayor" },
  { name: "Paul TenHaken", party: "R", city: "Sioux Falls", state: "SD", phone: "(605) 367-8016", address: "224 W 9th St, Sioux Falls, SD 57104", website: "https://www.siouxfalls.org/mayor" },
  { name: "Jacob Frey", party: "D", city: "Minneapolis", state: "MN", phone: "(612) 673-2100", address: "350 S 5th St, Minneapolis, MN 55415", website: "https://www.minneapolismn.gov/government/mayor/" },
  { name: "Melvin Carter", party: "D", city: "Saint Paul", state: "MN", phone: "(651) 266-8510", address: "15 Kellogg Blvd W, Saint Paul, MN 55102", website: "https://www.stpaul.gov/departments/mayors-office" },
  { name: "Steve Benjamin", party: "D", city: "Columbia", state: "SC", phone: "(803) 545-3500", address: "1737 Main St, Columbia, SC 29201", website: "https://www.columbiasc.net/government/mayor" },
  { name: "Keisha Lance Bottoms", party: "D", city: "Atlanta", state: "GA", phone: "(404) 330-6100", address: "55 Trinity Ave SW, Atlanta, GA 30303", website: "https://www.atlantaga.gov/government/mayor-s-office" },
  { name: "Greg Fischer", party: "D", city: "Louisville", state: "KY", phone: "(502) 574-2003", address: "527 W Jefferson St, Louisville, KY 40202", website: "https://louisvilleky.gov/government/mayor" },
  { name: "Andrew Yang", party: "D", city: "New York", state: "NY", phone: "311", address: "City Hall, New York, NY 10007", website: "https://www.nyc.gov/office-of-the-mayor" },
  { name: "Lyda Krewson", party: "D", city: "St. Louis", state: "MO", phone: "(314) 622-3201", address: "1200 Market St, St. Louis, MO 63103", website: "https://www.stlouis-mo.gov/government/departments/mayor/" },
  { name: "Joe Hogsett", party: "D", city: "Indianapolis", state: "IN", phone: "(317) 327-3601", address: "200 E Washington St, Indianapolis, IN 46204", website: "https://www.indy.gov/agency/office-of-the-mayor" },
  { name: "John Cranley", party: "D", city: "Cincinnati", state: "OH", phone: "(513) 352-3250", address: "801 Plum St, Cincinnati, OH 45202", website: "https://www.cincinnati-oh.gov/mayor/" },
  { name: "Jim Kenney", party: "D", city: "Philadelphia", state: "PA", phone: "(215) 686-2181", address: "1400 JFK Blvd, Philadelphia, PA 19107", website: "https://www.phila.gov/departments/mayor/" },
  { name: "Muriel Bowser", party: "D", city: "Washington", state: "DC", phone: "(202) 727-2643", address: "1350 Pennsylvania Ave NW, Washington, DC 20004", website: "https://mayor.dc.gov/" },
  { name: "London Breed", party: "D", city: "San Francisco", state: "CA", phone: "(415) 554-6141", address: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102", website: "https://sfmayor.org/" },
  { name: "Jenny Durkan", party: "D", city: "Seattle", state: "WA", phone: "(206) 684-4000", address: "600 4th Ave, Seattle, WA 98104", website: "https://www.seattle.gov/mayor" },
  { name: "Michael Hancock", party: "D", city: "Denver", state: "CO", phone: "(720) 865-9000", address: "1437 Bannock St, Denver, CO 80202", website: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Mayors-Office" },
  { name: "Marty Walsh", party: "D", city: "Boston", state: "MA", phone: "(617) 635-4500", address: "1 City Hall Square, Boston, MA 02201", website: "https://www.boston.gov/departments/mayors-office" },
  { name: "Mike Duggan", party: "D", city: "Detroit", state: "MI", phone: "(313) 224-3400", address: "2 Woodward Ave, Detroit, MI 48226", website: "https://detroitmi.gov/departments/mayors-office" },
  { name: "Carolyn Goodman", party: "I", city: "Las Vegas", state: "NV", phone: "(702) 229-6241", address: "495 S Main St, Las Vegas, NV 89101", website: "https://www.lasvegasnevada.gov/Government/Mayor-and-City-Council/Mayor" }
] as const;

// Transform raw data into Mayor objects
export const MAYORS: Mayor[] = rawMayors.map(m => ({
  id: generateId(m.name, m.city),
  name: m.name,
  party: m.party as 'D' | 'R' | 'I' | 'N',
  city: m.city,
  state: STATE_NAMES[m.state] || m.state,
  stateAbbr: m.state,
  phone: m.phone,
  address: m.address,
  website: m.website,
  imageInitials: getInitials(m.name)
}));

// Helper functions
export function getMayorsByState(stateAbbr: string): Mayor[] {
  return MAYORS.filter(m => m.stateAbbr === stateAbbr);
}

export function getMayorsByCity(city: string): Mayor[] {
  return MAYORS.filter(m => m.city.toLowerCase() === city.toLowerCase());
}

export function getMayorsByParty(party: 'D' | 'R' | 'I' | 'N'): Mayor[] {
  return MAYORS.filter(m => m.party === party);
}

export function getMayorById(id: string): Mayor | undefined {
  return MAYORS.find(m => m.id === id);
}

export function searchMayors(query: string): Mayor[] {
  const q = query.toLowerCase();
  return MAYORS.filter(m => 
    m.name.toLowerCase().includes(q) ||
    m.city.toLowerCase().includes(q) ||
    m.state.toLowerCase().includes(q) ||
    m.stateAbbr.toLowerCase() === q
  );
}

export function getAllCities(): string[] {
  return [...new Set(MAYORS.map(m => m.city))].sort();
}

export function getAllMayorStates(): string[] {
  return [...new Set(MAYORS.map(m => m.stateAbbr))].sort();
}

export function getMayorPartyBreakdown(): { D: number; R: number; I: number; N: number } {
  return {
    D: MAYORS.filter(m => m.party === 'D').length,
    R: MAYORS.filter(m => m.party === 'R').length,
    I: MAYORS.filter(m => m.party === 'I').length,
    N: MAYORS.filter(m => m.party === 'N').length
  };
}

// Statistics
export const MAYOR_STATS = {
  total: MAYORS.length,
  democrats: MAYORS.filter(m => m.party === 'D').length,
  republicans: MAYORS.filter(m => m.party === 'R').length,
  independents: MAYORS.filter(m => m.party === 'I').length,
  nonpartisan: MAYORS.filter(m => m.party === 'N').length,
  cities: [...new Set(MAYORS.map(m => m.city))].length,
  states: [...new Set(MAYORS.map(m => m.stateAbbr))].length
};

// State list for filtering
export const MAYOR_STATES = Object.entries(STATE_NAMES)
  .map(([abbr, name]) => ({ abbr, name }))
  .sort((a, b) => a.name.localeCompare(b.name));