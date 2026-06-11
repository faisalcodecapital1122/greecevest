import { useEffect, useState } from "react";

export type GigCategory =
  | "plumbing"
  | "electrical"
  | "gardening"
  | "construction"
  | "renovation"
  | "architecture"
  | "legal"
  | "cleaning"
  | "painting"
  | "moving"
  | "other";

export const GIG_CATEGORIES: { value: GigCategory; en: string; el: string }[] = [
  { value: "plumbing", en: "Plumbing", el: "Υδραυλικά" },
  { value: "electrical", en: "Electrical", el: "Ηλεκτρολογικά" },
  { value: "gardening", en: "Gardening", el: "Κηπουρική" },
  { value: "construction", en: "Construction", el: "Κατασκευή" },
  { value: "renovation", en: "Renovation", el: "Ανακαίνιση" },
  { value: "architecture", en: "Architecture", el: "Αρχιτεκτονική" },
  { value: "legal", en: "Legal", el: "Νομικά" },
  { value: "cleaning", en: "Cleaning", el: "Καθαρισμός" },
  { value: "painting", en: "Painting", el: "Βαψίματα" },
  { value: "moving", en: "Moving", el: "Μετακομίσεις" },
  { value: "other", en: "Other", el: "Άλλο" },
];

export type Quote = {
  id: string;
  gigId: string;
  professionalName: string;
  professionalEmail: string;
  priceEur: number;
  message: string;
  createdAt: number;
};

export type Gig = {
  id: string;
  title: string;
  description: string;
  category: GigCategory;
  location: string;
  budgetMinEur?: number;
  budgetMaxEur?: number;
  timeframe?: string;
  photos: string[]; // data URLs
  postedByName: string;
  postedByEmail: string;
  createdAt: number;
};

const GIGS_KEY = "greecevest.gigs.v1";
const QUOTES_KEY = "greecevest.quotes.v1";
const OWNER_KEY = "greecevest.gig.owner.v1"; // gigIds the current browser owns
const OWNER_EMAIL_KEY = "greecevest.owner.email.v1";

const seedGigs = (): Gig[] => [
  {
    id: "seed-1",
    title: "Need a plumber to fix a leaking bathroom pipe",
    description:
      "There is a slow leak under the bathroom sink in our apartment. Looking for a licensed plumber to inspect and fix as soon as possible. Pipes look like old copper.",
    category: "plumbing",
    location: "Athens, Kolonaki",
    budgetMinEur: 80,
    budgetMaxEur: 250,
    timeframe: "Within this week",
    photos: [],
    postedByName: "Maria K.",
    postedByEmail: "maria@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: "seed-2",
    title: "Garden redesign for a 120m² yard",
    description:
      "Looking for a gardener / landscaper to redesign our backyard. We want a low-maintenance Mediterranean garden with olive trees, lavender, and a small irrigation system.",
    category: "gardening",
    location: "Thessaloniki, Panorama",
    budgetMinEur: 2000,
    budgetMaxEur: 6000,
    timeframe: "Next 1 to 2 months",
    photos: [],
    postedByName: "Nikos P.",
    postedByEmail: "nikos@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "seed-3",
    title: "Construction quote for a 90m² stone house in Crete",
    description:
      "Plot of 2.000m² in central Crete. Need quotes from contractors for a turn-key 90m² stone house with 2 bedrooms, 1 bathroom, open kitchen/living, and a small pool.",
    category: "construction",
    location: "Heraklion, Crete",
    budgetMinEur: 180000,
    budgetMaxEur: 250000,
    timeframe: "Start within 6 months",
    photos: [],
    postedByName: "James L.",
    postedByEmail: "james@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "seed-4",
    title: "Electrician needed, upgrade fuse box and rewire kitchen",
    description:
      "Older apartment in Pagkrati. Need a certified electrician to upgrade the fuse box and rewire the kitchen with proper grounding for new appliances.",
    category: "electrical",
    location: "Athens, Pagkrati",
    budgetMinEur: 500,
    budgetMaxEur: 1500,
    timeframe: "Within 2 weeks",
    photos: [],
    postedByName: "Eleni V.",
    postedByEmail: "eleni@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "seed-5",
    title: "Kitchen and bathroom renovation, 75m² apartment",
    description:
      "Buying a 75m² apartment in Glyfada. Need a full renovation of the kitchen and main bathroom. Looking for fixed quotes including materials.",
    category: "renovation",
    location: "Athens, Glyfada",
    budgetMinEur: 15000,
    budgetMaxEur: 30000,
    timeframe: "Next 3 months",
    photos: [],
    postedByName: "Sofia A.",
    postedByEmail: "sofia@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}

export function getGigs(): Gig[] {
  const stored = read<Gig[] | null>(GIGS_KEY, null);
  if (stored && stored.length > 0) return stored;
  const seeded = seedGigs();
  write(GIGS_KEY, seeded);
  return seeded;
}

export function getGig(id: string): Gig | undefined {
  return getGigs().find((g) => g.id === id);
}

export function addGig(input: Omit<Gig, "id" | "createdAt">): Gig {
  const gig: Gig = {
    ...input,
    id: `gig-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const all = [gig, ...getGigs()];
  write(GIGS_KEY, all);
  // Mark current browser as owner
  const owned = read<string[]>(OWNER_KEY, []);
  write(OWNER_KEY, [...owned, gig.id]);
  write(OWNER_EMAIL_KEY, input.postedByEmail);
  notify();
  return gig;
}

export function isOwner(gigId: string): boolean {
  const owned = read<string[]>(OWNER_KEY, []);
  return owned.includes(gigId);
}

export function getQuotes(gigId: string): Quote[] {
  const all = read<Quote[]>(QUOTES_KEY, []);
  return all.filter((q) => q.gigId === gigId).sort((a, b) => b.createdAt - a.createdAt);
}

export function addQuote(input: Omit<Quote, "id" | "createdAt">): Quote {
  const quote: Quote = {
    ...input,
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const all = read<Quote[]>(QUOTES_KEY, []);
  write(QUOTES_KEY, [quote, ...all]);
  notify();
  return quote;
}

export function useGigs(): Gig[] {
  const [gigs, setGigs] = useState<Gig[]>([]);
  useEffect(() => {
    setGigs(getGigs());
    const l = () => setGigs(getGigs());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return gigs;
}

export function useQuotes(gigId: string): Quote[] {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    setQuotes(getQuotes(gigId));
    const l = () => setQuotes(getQuotes(gigId));
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, [gigId]);
  return quotes;
}

export function formatBudget(min?: number, max?: number, currency = "€"): string | null {
  if (min == null && max == null) return null;
  if (min != null && max != null)
    return `${currency}${min.toLocaleString()} to ${currency}${max.toLocaleString()}`;
  if (min != null) return `From ${currency}${min.toLocaleString()}`;
  if (max != null) return `Up to ${currency}${max.toLocaleString()}`;
  return null;
}

export function timeAgo(ts: number, locale: "en" | "el" = "en"): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (locale === "el") {
    if (m < 1) return "μόλις τώρα";
    if (m < 60) return `${m} λεπτά πριν`;
    if (h < 24) return `${h} ώρες πριν`;
    return `${d} ημέρες πριν`;
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
