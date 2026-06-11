export interface Agency {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  region: string;
  founded: number;
  description: string;
  specialties: string[];
  languages: string[];
  phone: string;
  email: string;
  website: string;
}

export const AGENCIES: Agency[] = [
  {
    slug: "kalamata-coast-realty",
    name: "Kalamata Coast Realty",
    tagline: "Coastal homes across Messinia and the Mani.",
    city: "Kalamata",
    region: "Peloponnese",
    founded: 2012,
    description:
      "Family-run brokerage covering the western Peloponnese, from Kalamata's seafront to the stone villages of the Mani peninsula. We focus on character properties, restored farmhouses, and seaview villas with verified titles and full legal support.",
    specialties: ["Coastal villas", "Stone farmhouses", "Investment land"],
    languages: ["Greek", "English", "French"],
    phone: "+30 27210 88 412",
    email: "info@kalamatacoast.gr",
    website: "kalamatacoast.gr",
  },
  {
    slug: "acropolis-property-group",
    name: "Acropolis Property Group",
    tagline: "Central Athens apartments and investment properties.",
    city: "Athens",
    region: "Attica",
    founded: 2008,
    description:
      "Athens-based agency specialising in central apartments, Golden Visa eligible properties, and yield-focused rentals across Kolonaki, Plaka, Koukaki, and the Athenian Riviera. Trusted by international buyers since 2008.",
    specialties: ["City apartments", "Golden Visa", "Rental yield"],
    languages: ["Greek", "English", "German", "Arabic"],
    phone: "+30 210 360 7711",
    email: "hello@acropolisproperty.gr",
    website: "acropolisproperty.gr",
  },
  {
    slug: "cyclades-island-homes",
    name: "Cyclades Island Homes",
    tagline: "Traditional and modern homes across the Cyclades.",
    city: "Parikia",
    region: "Cyclades",
    founded: 2015,
    description:
      "Boutique agency with offices on Paros, Naxos, and Syros. We curate authentic Cycladic homes, from whitewashed village houses to contemporary architect builds, and guide buyers through island-specific zoning and renovation.",
    specialties: ["Cycladic homes", "Renovation projects", "Sea view land"],
    languages: ["Greek", "English", "Italian"],
    phone: "+30 22840 24 590",
    email: "contact@cycladeshomes.gr",
    website: "cycladeshomes.gr",
  },
  {
    slug: "ionian-luxury-estates",
    name: "Ionian Luxury Estates",
    tagline: "Trophy estates and waterfront villas in the Ionian.",
    city: "Corfu Town",
    region: "Ionian Islands",
    founded: 2005,
    description:
      "Specialists in high-end seafront estates across Corfu, Paxos, Lefkada, and Kefalonia. We represent a discreet portfolio of trophy properties and offer end-to-end concierge, from acquisition to staffed management.",
    specialties: ["Trophy estates", "Waterfront villas", "Concierge"],
    languages: ["Greek", "English", "Italian", "French"],
    phone: "+30 26610 30 220",
    email: "office@ionianluxury.com",
    website: "ionianluxury.com",
  },
  {
    slug: "plaka-heritage-realty",
    name: "Plaka Heritage Realty",
    tagline: "Neoclassical and heritage homes in historic Athens.",
    city: "Athens",
    region: "Attica",
    founded: 2011,
    description:
      "Heritage-focused agency working exclusively with neoclassical, listed, and pre-war buildings across Plaka, Anafiotika, Thissio, and Metaxourgeio. We pair each listing with restoration architects and heritage legal counsel.",
    specialties: ["Neoclassical homes", "Listed buildings", "Restoration"],
    languages: ["Greek", "English"],
    phone: "+30 210 324 8870",
    email: "hello@plakaheritage.gr",
    website: "plakaheritage.gr",
  },
  {
    slug: "naxos-aegean-properties",
    name: "Naxos Aegean Properties",
    tagline: "Naxos homes, land, and renovation opportunities.",
    city: "Naxos",
    region: "Cyclades",
    founded: 2017,
    description:
      "Independent Naxos agency covering Chora, Filoti, Apollonas, and the inland mountain villages. We work with local builders, notaries, and surveyors so buyers can move from viewing to completion without leaving the island.",
    specialties: ["Village houses", "Building plots", "Off-grid retreats"],
    languages: ["Greek", "English"],
    phone: "+30 22850 25 311",
    email: "info@naxosaegean.gr",
    website: "naxosaegean.gr",
  },
];

export function agencyBySlug(slug: string): Agency | undefined {
  return AGENCIES.find((a) => a.slug === slug);
}

export function agencyByName(name: string | undefined): Agency | undefined {
  if (!name) return undefined;
  return AGENCIES.find((a) => a.name === name);
}

export function agencyInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
