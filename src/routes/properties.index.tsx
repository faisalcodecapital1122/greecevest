import { createFileRoute, useNavigate, stripSearchParams } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { toast } from "sonner";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Mail,
  X,
  SlidersHorizontal,
  Share2,
  BellPlus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Bell,
  Trash2,
  Map as MapIcon,
  LayoutGrid,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RegionCombobox } from "@/components/RegionCombobox";
import { PropertyCard } from "@/components/PropertyCard";
import {
  PROPERTY_FEATURE_META,
  type PropertyFeature,
  type PropertyData,
} from "@/components/PropertyCard";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { demoProperties } from "@/data/demo-data";
import { AGENCIES, agencyByName } from "@/data/agencies";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-properties.jpg";
import { PropertyMap, type LatLng } from "@/components/PropertyMap";
import { pointInPolygon } from "@/lib/geo";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  villa: "Villa",
  apartment: "Apartment",
  house: "House",
  land: "Land",
};

const BUDGET_LABELS: Record<string, string> = {
  under200: "Under €200,000",
  "200to500": "€200,000 to €500,000",
  "500to1m": "€500,000 to €1M",
  over1m: "Over €1,000,000",
};

const SORT_LABELS: Record<string, string> = {
  recommended: "Recommended",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "size-desc": "Largest first",
  "beds-desc": "Most bedrooms",
};

const PER_PAGE_OPTIONS = [6, 12, 24] as const;
type PageSize = (typeof PER_PAGE_OPTIONS)[number];

const FEATURE_KEYS = Object.keys(PROPERTY_FEATURE_META) as [PropertyFeature, ...PropertyFeature[]];

const defaultSearch = {
  q: "",
  type: "all" as const,
  region: "all",
  budget: "all" as const,
  agency: "all",
  features: [] as PropertyFeature[],
  match: "all" as const,
  sort: "recommended" as const,
  page: 1,
  perPage: 6 as PageSize,
};

const propertiesSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  type: fallback(z.enum(["all", "villa", "apartment", "house", "land"]), "all").default("all"),
  region: fallback(z.string(), "all").default("all"),
  budget: fallback(z.enum(["all", "under200", "200to500", "500to1m", "over1m"]), "all").default(
    "all",
  ),
  agency: fallback(z.string(), "all").default("all"),
  features: fallback(z.array(z.enum(FEATURE_KEYS)), []).default([]),
  match: fallback(z.enum(["all", "any"]), "all").default("all"),
  sort: fallback(
    z.enum(["recommended", "price-asc", "price-desc", "size-desc", "beds-desc"]),
    "recommended",
  ).default("recommended"),
  page: fallback(z.number().int().min(1), 1).default(1),
  perPage: fallback(z.union([z.literal(6), z.literal(12), z.literal(24)]), 6).default(6),
});

type PropertiesSearch = z.infer<typeof propertiesSearchSchema>;

// Parse "€385,000" → 385000 and "220 m²" → 220
const parsePrice = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;
const parseSize = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;

const inBudget = (priceNum: number, budget: PropertiesSearch["budget"]) => {
  switch (budget) {
    case "under200":
      return priceNum < 200_000;
    case "200to500":
      return priceNum >= 200_000 && priceNum < 500_000;
    case "500to1m":
      return priceNum >= 500_000 && priceNum < 1_000_000;
    case "over1m":
      return priceNum >= 1_000_000;
    default:
      return true;
  }
};

export const Route = createFileRoute("/properties/")({
  validateSearch: zodValidator(propertiesSearchSchema),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  head: () => ({
    meta: [
      { title: "Greek Properties for Sale, Villas, Apartments & More | GREECEVEST" },
      {
        name: "description",
        content:
          "Browse verified Greek properties for sale, villas, apartments, houses, and land across Athens, Santorini, Crete, Corfu, and more. Filter by location, budget, and type.",
      },
      { property: "og:title", content: "Greek Properties for Sale | GREECEVEST" },
      {
        property: "og:description",
        content:
          "Browse verified Greek properties for sale across all regions. Find your dream property in Greece.",
      },
    ],
  }),
  component: PropertiesPage,
});

const FILTERS_STORAGE_KEY = "greecevest:properties:filters";
const ALERTS_STORAGE_KEY = "greecevest:properties:alerts";

type SavedAlert = {
  id: string;
  email: string;
  filters: Pick<PropertiesSearch, "q" | "type" | "region" | "budget" | "agency" | "features" | "match">;
  polygon?: LatLng[] | null;
  createdAt: number;
};

export function PropertiesPage() {
  const search = Route.useSearch() as PropertiesSearch;
  const navigate = useNavigate({ from: "/properties" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [savedAlerts, setSavedAlerts] = useState<SavedAlert[]>([]);
  const [alertsListOpen, setAlertsListOpen] = useState(false);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [polygon, setPolygon] = useState<LatLng[] | null>(null);
  const [drawing, setDrawing] = useState(false);
  const restoredRef = useRef(false);

  // Restore filters from localStorage on first mount when URL has no params.
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    if (typeof window === "undefined") return;

    // Load saved alerts
    try {
      const raw = window.localStorage.getItem(ALERTS_STORAGE_KEY);
      if (raw) setSavedAlerts(JSON.parse(raw));
    } catch {
      /* ignore */
    }

    // If the URL is "clean" (all defaults), restore last filters
    const isDefault =
      search.q === "" &&
      search.type === "all" &&
      search.region === "all" &&
      search.budget === "all" &&
      search.agency === "all" &&
      search.features.length === 0 &&
      search.match === "all" &&
      search.sort === "recommended" &&
      search.page === 1 &&
      search.perPage === 6;
    if (!isDefault) return;
    try {
      const raw = window.localStorage.getItem(FILTERS_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<PropertiesSearch>;
      navigate({
        search: () => ({ ...defaultSearch, ...saved, page: 1 }) as PropertiesSearch,
        replace: true,
      });
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist current filters
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const { page: _p, ...rest } = search;
      window.localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(rest));
    } catch {
      /* ignore */
    }
  }, [search]);

  const persistAlerts = (next: SavedAlert[]) => {
    setSavedAlerts(next);
    try {
      window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  // Any change other than page resets page to 1
  const update = (patch: Partial<PropertiesSearch>, opts?: { keepPage?: boolean }) => {
    navigate({
      search: (prev: PropertiesSearch) => ({
        ...prev,
        ...patch,
        ...(opts?.keepPage ? {} : { page: 1 }),
      }),
      replace: true,
    });
  };

  const toggleFeature = (f: PropertyFeature) => {
    const next = search.features.includes(f)
      ? search.features.filter((x: PropertyFeature) => x !== f)
      : [...search.features, f];
    update({ features: next });
  };

  const clearAll = () => {
    setPolygon(null);
    update({
      q: "",
      type: "all",
      region: "all",
      budget: "all",
      agency: "all",
      features: [],
      match: "all",
    });
  };

  // Filter + sort
  const matched = useMemo<PropertyData[]>(() => {
    const list = demoProperties.filter((p) => {
      if (search.type !== "all" && p.type.toLowerCase() !== search.type) return false;
      if (
        search.region !== "all" &&
        !`${p.region} ${p.location}`.toLowerCase().includes(search.region)
      )
        return false;
      if (
        search.q &&
        !p.title.toLowerCase().includes(search.q.toLowerCase()) &&
        !p.location.toLowerCase().includes(search.q.toLowerCase())
      )
        return false;
      if (!inBudget(parsePrice(p.price), search.budget)) return false;
      if (search.agency !== "all" && agencyByName(p.agency)?.slug !== search.agency) return false;
      if (search.features.length > 0) {
        const pf = p.features ?? [];
        const test = (f: PropertyFeature) => pf.includes(f);
        const ok =
          search.match === "any" ? search.features.some(test) : search.features.every(test);
        if (!ok) return false;
      }
      if (polygon && polygon.length > 2) {
        if (!p.lat || !p.lng) return false;
        if (!pointInPolygon({ lat: p.lat, lng: p.lng }, polygon)) return false;
      }
      return true;
    });

    switch (search.sort) {
      case "price-asc":
        return [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case "price-desc":
        return [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case "size-desc":
        return [...list].sort((a, b) => parseSize(b.size) - parseSize(a.size));
      case "beds-desc":
        return [...list].sort((a, b) => b.bedrooms - a.bedrooms);
      default:
        return list;
    }
  }, [search, polygon]);

  const totalPages = Math.max(1, Math.ceil(matched.length / search.perPage));
  const currentPage = Math.min(search.page, totalPages);
  const pageStart = (currentPage - 1) * search.perPage;
  const pagedProperties = matched.slice(pageStart, pageStart + search.perPage);

  const hasActive =
    search.type !== "all" ||
    search.region !== "all" ||
    search.budget !== "all" ||
    search.agency !== "all" ||
    search.q !== "" ||
    search.features.length > 0 ||
    !!polygon;
  const activeCount =
    (search.type !== "all" ? 1 : 0) +
    (search.region !== "all" ? 1 : 0) +
    (search.budget !== "all" ? 1 : 0) +
    (search.agency !== "all" ? 1 : 0) +
    (search.q ? 1 : 0) +
    search.features.length +
    (polygon ? 1 : 0);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Greek properties on GREECEVEST", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user-cancelled or clipboard blocked — silent
    }
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(alertEmail)) {
      toast.error("Please enter a valid email");
      return;
    }
    const alert: SavedAlert = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      email: alertEmail,
      filters: {
        q: search.q,
        type: search.type,
        region: search.region,
        budget: search.budget,
        agency: search.agency,
        features: search.features,
        match: search.match,
      },
      polygon: polygon,
      createdAt: Date.now(),
    };
    persistAlerts([alert, ...savedAlerts]);
    toast.success("Search alert saved", {
      description: polygon
        ? `We'll email ${alertEmail} when new properties appear in your drawn area.`
        : `We'll email ${alertEmail} when new matching properties are listed.`,
    });
    setAlertEmail("");
    setAlertOpen(false);
  };

  const deleteAlert = (id: string) => {
    persistAlerts(savedAlerts.filter((a) => a.id !== id));
    toast.success("Alert removed");
  };

  const applyAlert = (a: SavedAlert) => {
    update({ ...a.filters });
    setPolygon(a.polygon ?? null);
    setAlertsListOpen(false);
  };

  const FeatureToggles = (
    <div className="flex flex-wrap items-center gap-2" aria-label="Filter by features">
      {FEATURE_KEYS.map((f) => {
        const meta = PROPERTY_FEATURE_META[f];
        const Icon = meta.icon;
        const active = search.features.includes(f);
        return (
          <button
            key={f}
            type="button"
            onClick={() => toggleFeature(f)}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              active
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-foreground border-border hover:border-accent/50 hover:text-accent",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );

  const MatchToggle = (
    <div
      className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-medium"
      role="group"
      aria-label="Feature match mode"
    >
      <button
        type="button"
        onClick={() => update({ match: "all" })}
        aria-pressed={search.match === "all"}
        className={cn(
          "px-3 py-1 rounded-full transition-colors",
          search.match === "all"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Match all
      </button>
      <button
        type="button"
        onClick={() => update({ match: "any" })}
        aria-pressed={search.match === "any"}
        className={cn(
          "px-3 py-1 rounded-full transition-colors",
          search.match === "any"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Match any
      </button>
    </div>
  );

  const SortSelect = (
    <Select
      value={search.sort}
      onValueChange={(v) => update({ sort: v as PropertiesSearch["sort"] })}
    >
      <SelectTrigger className="h-9 w-full sm:w-52" aria-label="Sort properties">
        <ArrowUpDown className="h-4 w-4 mr-1 text-muted-foreground" aria-hidden="true" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SORT_LABELS).map(([k, v]) => (
          <SelectItem key={k} value={k}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <img
          src={heroImage}
          alt="Luxury Greek property with sea views"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="sm:text-3xl text-[26px] leading-8 md:text-4xl lg:text-5xl font-extrabold text-primary-foreground">
            Find Your Perfect Property in Greece
          </h1>
          {/* <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto"> */}
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Browse verified listings across every region, backed by eight categories of vetted
            professionals ready to support you end to end.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-12 sm:top-16 z-20 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          {/* Search + filters on a single row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search location..."
                className="pl-10 h-10"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
              />
            </div>

            {/* Mobile: open drawer */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden shrink-0" aria-label="Open filters">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold">
                      {activeCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
                <SheetHeader className="px-5 py-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeCount > 0 && (
                      <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold">
                        {activeCount}
                      </span>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                  <FilterField label="Sort by">{SortSelect}</FilterField>
                  <FilterField label="Property type">
                    <Select
                      value={search.type}
                      onValueChange={(v) => update({ type: v as PropertiesSearch["type"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterField>
                  <FilterField label="Region">
                    <RegionCombobox
                      value={search.region}
                      onChange={(v) => update({ region: v })}
                      locale="en"
                    />
                  </FilterField>
                  <FilterField label="Budget">
                    <Select
                      value={search.budget}
                      onValueChange={(v) => update({ budget: v as PropertiesSearch["budget"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Budget</SelectItem>
                        <SelectItem value="under200">Under €200,000</SelectItem>
                        <SelectItem value="200to500">€200,000 to €500,000</SelectItem>
                        <SelectItem value="500to1m">€500,000 to €1M</SelectItem>
                        <SelectItem value="over1m">Over €1,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterField>
                  <FilterField label="Agency">
                    <Select
                      value={search.agency}
                      onValueChange={(v) => update({ agency: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Agencies</SelectItem>
                        {AGENCIES.map((a) => (
                          <SelectItem key={a.slug} value={a.slug}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FilterField>
                  <FilterField label="Match mode">{MatchToggle}</FilterField>
                  <FilterField label="Features">{FeatureToggles}</FilterField>
                </div>
                <SheetFooter className="px-5 py-4 border-t border-border bg-card flex-row gap-2 sm:flex-row">
                  <Button variant="outline" className="flex-1" onClick={clearAll}>
                    Clear all
                  </Button>
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    Show {matched.length} {matched.length === 1 ? "result" : "results"}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Desktop filters — inline with search */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              <Select
                value={search.type}
                onValueChange={(v) => update({ type: v as PropertiesSearch["type"] })}
              >
                <SelectTrigger className="w-36 h-10">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <RegionCombobox
                value={search.region}
                onChange={(v) => update({ region: v })}
                locale="en"
              />
              <Select
                value={search.budget}
                onValueChange={(v) => update({ budget: v as PropertiesSearch["budget"] })}
              >
                <SelectTrigger className="w-40 h-10">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Budget</SelectItem>
                  <SelectItem value="under200">Under €200,000</SelectItem>
                  <SelectItem value="200to500">€200,000 to €500,000</SelectItem>
                  <SelectItem value="500to1m">€500,000 to €1M</SelectItem>
                  <SelectItem value="over1m">Over €1,000,000</SelectItem>
                </SelectContent>
              </Select>
              <Select value={search.agency} onValueChange={(v) => update({ agency: v })}>
                <SelectTrigger className="w-44 h-10" aria-label="Filter by agency">
                  <SelectValue placeholder="Agency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agencies</SelectItem>
                  {AGENCIES.map((a) => (
                    <SelectItem key={a.slug} value={a.slug}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              {/* Features collapsed into a popover to keep the bar compact */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 h-10" aria-label="Filter by features">
                    <SlidersHorizontal className="h-4 w-4" />
                    Features
                    {search.features.length > 0 && (
                      <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold">
                        {search.features.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[22rem] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Features
                    </p>
                    {MatchToggle}
                  </div>
                  {FeatureToggles}
                  {search.features.length > 0 && (
                    <button
                      type="button"
                      onClick={() => update({ features: [] })}
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      Clear features
                    </button>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {hasActive && (
            <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {search.q && <FilterChip label={`"${search.q}"`} onClear={() => update({ q: "" })} />}
              {search.type !== "all" && (
                <FilterChip
                  label={PROPERTY_TYPE_LABELS[search.type] ?? search.type}
                  onClear={() => update({ type: "all" })}
                />
              )}
              {search.region !== "all" && (
                <FilterChip label={search.region} onClear={() => update({ region: "all" })} />
              )}
              {search.budget !== "all" && (
                <FilterChip
                  label={BUDGET_LABELS[search.budget] ?? search.budget}
                  onClear={() => update({ budget: "all" })}
                />
              )}
              {search.agency !== "all" && (
                <FilterChip
                  label={
                    AGENCIES.find((a) => a.slug === search.agency)?.name ?? search.agency
                  }
                  onClear={() => update({ agency: "all" })}
                />
              )}
              {search.features.map((f: PropertyFeature) => (
                <FilterChip
                  key={f}
                  label={PROPERTY_FEATURE_META[f].label}
                  onClear={() => toggleFeature(f)}
                />
              ))}
              {polygon && (
                <FilterChip
                  label={`Custom area (${polygon.length} points)`}
                  onClear={() => setPolygon(null)}
                />
              )}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-accent hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-10 sm:py-12 lg:py-14 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                <span className="font-semibold text-foreground">{matched.length}</span>{" "}
                {matched.length === 1 ? "property" : "properties"}
                {hasActive ? " match your filters" : " available"}
                {matched.length > search.perPage && (
                  <span className="text-muted-foreground">
                    {" "}
                    · showing {pageStart + 1} to{" "}
                    {Math.min(pageStart + search.perPage, matched.length)}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-[200px]">{SortSelect}</div>
              <Select
                value={String(search.perPage)}
                onValueChange={(v) =>
                  update({ perPage: Number(v) as PageSize }, { keepPage: true })
                }
              >
                <SelectTrigger className="h-9 w-[130px]" aria-label="Results per page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PER_PAGE_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} per page
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="hidden md:inline-block h-6 w-px bg-border mx-1" aria-hidden="true" />

              {savedAlerts.length > 0 && (
                <Dialog open={alertsListOpen} onOpenChange={setAlertsListOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" aria-label="View saved alerts">
                      <Bell className="h-4 w-4" />
                      My alerts
                      <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold">
                        {savedAlerts.length}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Saved search alerts</DialogTitle>
                      <DialogDescription>
                        Click an alert to re-apply its filters. Alerts are stored on this device.
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                      {savedAlerts.map((a) => (
                        <li
                          key={a.id}
                          className="flex items-start gap-2 rounded-lg border border-border p-3 hover:border-accent/50 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => applyAlert(a)}
                            className="flex-1 text-left"
                          >
                            <p className="text-sm font-medium text-foreground truncate">
                              {a.email}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {summarize({ ...defaultSearch, ...a.filters } as PropertiesSearch)}
                            </p>
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete alert"
                            onClick={() => deleteAlert(a.id)}
                            className="h-8 w-8 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              )}

              <div
                role="group"
                aria-label="View mode"
                className="inline-flex rounded-full border border-border bg-card p-0.5"
              >
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium transition-colors",
                    view === "grid"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setView("map")}
                  aria-pressed={view === "map"}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium transition-colors",
                    view === "map"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  Map
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share search
              </Button>
              <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <BellPlus className="h-4 w-4" />
                    Save alert
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save this search</DialogTitle>
                    <DialogDescription>
                      Get an email when new properties match these filters.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveAlert} className="space-y-4">
                    <div className="rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium text-foreground">Filters:</span>{" "}
                        {summarize(search)}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Sort:</span>{" "}
                        {SORT_LABELS[search.sort]}
                      </p>
                    </div>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      required
                    />
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setAlertOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        Create alert
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {view === "map" && (
            <div className="mb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Pencil className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Draw your area of interest</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Outline a neighborhood on the map. We'll only show properties inside it, and
                      you can save the area as a smart alert.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {polygon ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPolygon(null);
                          setDrawing(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                        Clear area
                      </Button>
                      <Button
                        size="sm"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => setAlertOpen(true)}
                      >
                        <BellPlus className="h-4 w-4" />
                        Save area alert
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setDrawing((d) => !d)}
                    >
                      <Pencil className="h-4 w-4" />
                      {drawing ? "Cancel drawing" : "Draw area"}
                    </Button>
                  )}
                </div>
              </div>
              <PropertyMap
                properties={matched}
                polygon={polygon}
                onPolygonChange={setPolygon}
                drawing={drawing}
                onDrawingChange={setDrawing}
              />
            </div>
          )}

          {pagedProperties.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-10 flex items-center justify-center gap-1"
                  aria-label="Pagination"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => update({ page: currentPage - 1 }, { keepPage: true })}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  {getPageItems(currentPage, totalPages).map((item, idx) =>
                    item === "…" ? (
                      <span
                        key={`gap-${idx}`}
                        className="h-9 min-w-9 px-2 inline-flex items-center justify-center text-sm text-muted-foreground"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => update({ page: item }, { keepPage: true })}
                        aria-current={item === currentPage ? "page" : undefined}
                        aria-label={`Go to page ${item}`}
                        className={cn(
                          "h-9 min-w-9 px-3 rounded-md text-sm font-medium border transition-colors",
                          item === currentPage
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-foreground border-border hover:border-accent/50 hover:text-accent",
                        )}
                      >
                        {item}
                      </button>
                    ),
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => update({ page: currentPage + 1 }, { keepPage: true })}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No properties match your filters
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try switching to “Match any”, removing a filter, or save an alert to get notified.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" onClick={clearAll}>
                  Clear filters
                </Button>
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setAlertOpen(true)}
                >
                  <BellPlus className="h-4 w-4" />
                  Save alert
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="Don't Miss Your Dream Property"
        subheadline="Sign up now to get personalized property alerts and exclusive listings before anyone else."
        ctaText="Create Free Account"
      />

      <Footer />
    </>
  );
}

function getPageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

function summarize(s: PropertiesSearch) {
  const parts: string[] = [];
  if (s.type !== "all") parts.push(PROPERTY_TYPE_LABELS[s.type] ?? s.type);
  if (s.region !== "all") parts.push(s.region);
  if (s.budget !== "all") parts.push(BUDGET_LABELS[s.budget] ?? s.budget);
  if (s.agency !== "all")
    parts.push(AGENCIES.find((a) => a.slug === s.agency)?.name ?? s.agency);
  if (s.q) parts.push(`"${s.q}"`);
  if (s.features.length) {
    const labels = s.features.map((f) => PROPERTY_FEATURE_META[f].label);
    parts.push(`${s.match === "any" ? "any of" : "all of"}: ${labels.join(", ")}`);
  }
  return parts.length ? parts.join(" · ") : "Any property";
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove filter: ${label}`}
        className="inline-flex items-center justify-center h-5 w-5 rounded-full hover:bg-accent/20"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}
