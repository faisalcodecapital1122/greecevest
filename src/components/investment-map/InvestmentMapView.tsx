import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { marketData, type Market } from "@/data/market-data";
import { poisData, type POI, type POICategory } from "@/data/pois-data";
import MarkerClusterGroup from "./MarkerClusterGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Filter as FilterIcon,
  Layers,
  MapPin,
  Pin,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-investment-map.jpg";

/* ============================================================
 * Constants & helpers
 * ============================================================ */

type LayerKey = "sale" | "rental" | "yield" | "appreciation";
type InvType = "all" | "long_term" | "short_term" | "resale" | "golden_visa";

const PRICE_MIN = 0;
const PRICE_MAX = 6000;
const YIELD_MIN = 0;
const YIELD_MAX = 16;

const fmtEuro = (n: number) => "€" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtPct = (n: number, d = 1) => n.toFixed(d) + "%";

function colorForValue(value: number, min: number, max: number, ramp: string[]): string {
  if (max <= min) return ramp[Math.floor(ramp.length / 2)];
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const idx = Math.min(ramp.length - 1, Math.floor(t * ramp.length));
  return ramp[idx];
}

const RAMPS: Record<LayerKey, { ramp: string[]; label: string; format: (n: number) => string }> = {
  sale: {
    ramp: ["#bfe3f1", "#86c9f2", "#3b82c4", "#1e4f79", "#0f233d"],
    label: "Sale Price (€/m²)",
    format: (n) => fmtEuro(n),
  },
  rental: {
    ramp: ["#dbeafe", "#86c9f2", "#3b82c4", "#1e4f79", "#0f233d"],
    label: "Rent (€/m²/mo)",
    format: (n) => "€" + n.toFixed(1),
  },
  yield: {
    ramp: ["#fde68a", "#fcd34d", "#bbf7d0", "#6ee7b7", "#10b981"],
    label: "Gross Yield",
    format: (n) => fmtPct(n),
  },
  appreciation: {
    ramp: ["#fecaca", "#fde68a", "#d9f99d", "#86efac", "#10b981"],
    label: "12m Growth",
    format: (n) => fmtPct(n),
  },
};

const POI_STYLE: Record<POICategory, { color: string; label: string; plural: string }> = {
  port: { color: "#1E4F79", label: "Port", plural: "Ports" },
  marina: { color: "#0B6E8E", label: "Marina", plural: "Marinas" },
  hospital: { color: "#6A8C3C", label: "Hospital", plural: "Hospitals" },
  airport: { color: "#F59E0B", label: "Airport", plural: "Airports" },
};

function poiIcon(cat: POICategory): L.DivIcon {
  const c = POI_STYLE[cat].color;
  const shapes: Record<POICategory, string> = {
    port: `<circle cx="9" cy="9" r="7" fill="${c}" stroke="white" stroke-width="2"/>`,
    marina: `<path d="M9,2 L16,12 L9,10 L2,12 Z" fill="${c}" stroke="white" stroke-width="1.5"/>`,
    hospital: `<rect x="2" y="2" width="14" height="14" rx="2" fill="${c}" stroke="white" stroke-width="1.5"/><text x="9" y="13" text-anchor="middle" fill="white" font-size="10" font-weight="700">H</text>`,
    airport: `<circle cx="9" cy="9" r="7" fill="${c}" stroke="white" stroke-width="2"/><path d="M5,9 L13,9 M9,5 L9,13" stroke="white" stroke-width="1.8"/>`,
  };
  return L.divIcon({
    className: "",
    html: `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">${shapes[cat]}</svg>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitToData({ markets, signal }: { markets: Market[]; signal: number }) {
  const map = useMap();
  useEffect(() => {
    if (!markets.length) return;
    const bounds = L.latLngBounds(markets.map((m) => [m.lat, m.lon] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal]);
  return null;
}

interface CalcInputs {
  price: string;
  size: string;
  rentalType: "long" | "short";
  occupancy: string;
  opex: string;
}

/* ============================================================
 * Component
 * ============================================================ */

export default function InvestmentMapView() {
  // ---- Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [yieldRange, setYieldRange] = useState<[number, number]>([YIELD_MIN, YIELD_MAX]);
  const [invType, setInvType] = useState<InvType>("all");
  const [searchQ, setSearchQ] = useState("");
  const [layer, setLayer] = useState<LayerKey>("yield");
  const [poiToggles, setPoiToggles] = useState<Record<POICategory, boolean>>({
    port: false,
    marina: true,
    hospital: false,
    airport: true,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"rankings" | "calculator" | "costs">("rankings");

  const jumpToInsights = (tab: "rankings" | "calculator" | "costs") => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      document.getElementById("insights")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // ---- Compare
  const [pinned, setPinned] = useState<Market[]>([]);
  const togglePin = (m: Market) => {
    setPinned((cur) => {
      const exists = cur.find((x) => x.city === m.city && x.region === m.region);
      if (exists) return cur.filter((x) => x !== exists);
      if (cur.length >= 3) return cur;
      return [...cur, m];
    });
  };
  const isPinned = (m: Market) =>
    pinned.some((x) => x.city === m.city && x.region === m.region);

  // ---- Calculator
  const [calc, setCalc] = useState<CalcInputs>({
    price: "",
    size: "",
    rentalType: "long",
    occupancy: "85",
    opex: "25",
  });
  const [calcResult, setCalcResult] = useState<null | {
    gross: number;
    net: number;
    netYield: number;
    grossYield: number;
    monthly: number;
    payback: number;
  }>(null);

  // ---- Derived
  const filtered = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    return marketData.filter((m) => {
      if (m.sale_price_eur_m2 < priceRange[0] || m.sale_price_eur_m2 > priceRange[1]) return false;
      if (m.gross_yield_pct < yieldRange[0] || m.gross_yield_pct > yieldRange[1]) return false;
      if (invType === "golden_visa" && !m.golden_visa_eligible) return false;
      if (invType === "long_term" && (m.long_term_score ?? 0) < 6) return false;
      if (invType === "short_term" && (m.short_term_score ?? 0) < 6) return false;
      if (invType === "resale" && (m.resale_score ?? 0) < 6) return false;
      if (q) {
        const hay = (m.city + " " + m.region + " " + (m.city_alt ?? "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [priceRange, yieldRange, invType, searchQ]);

  const fitSignal = useMemo(
    () => priceRange[0] + priceRange[1] + yieldRange[0] + yieldRange[1] + invType.length + searchQ.length,
    [priceRange, yieldRange, invType, searchQ],
  );

  const visiblePois = useMemo(
    () => poisData.filter((p) => poiToggles[p.category]),
    [poiToggles],
  );

  const layerRange = useMemo(() => {
    const vals = filtered.map((m) => {
      switch (layer) {
        case "sale":
          return m.sale_price_eur_m2;
        case "rental":
          return m.rent_price_eur_m2_month;
        case "yield":
          return m.gross_yield_pct;
        case "appreciation":
          return m.trend_12m_pct ?? 0;
      }
    });
    return { min: Math.min(...vals, 0), max: Math.max(...vals, 1) };
  }, [filtered, layer]);

  const kpis = useMemo(() => {
    if (!filtered.length) return { price: 0, yield: 0, cities: 0 };
    const p = filtered.reduce((s, m) => s + m.sale_price_eur_m2, 0) / filtered.length;
    const y = filtered.reduce((s, m) => s + m.gross_yield_pct, 0) / filtered.length;
    return { price: Math.round(p), yield: y, cities: filtered.length };
  }, [filtered]);

  const filterCount =
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (yieldRange[0] !== YIELD_MIN || yieldRange[1] !== YIELD_MAX ? 1 : 0) +
    (invType !== "all" ? 1 : 0) +
    (searchQ.trim() ? 1 : 0);

  const topLongTerm = useMemo(
    () =>
      [...filtered]
        .filter((m) => (m.long_term_score ?? 0) >= 7)
        .sort(
          (a, b) =>
            b.gross_yield_pct * 0.6 +
            (b.long_term_score ?? 0) * 0.4 -
            (a.gross_yield_pct * 0.6 + (a.long_term_score ?? 0) * 0.4),
        )
        .slice(0, 5),
    [filtered],
  );
  const topShortTerm = useMemo(
    () =>
      [...filtered]
        .filter((m) => (m.short_term_score ?? 0) >= 7)
        .sort((a, b) => (b.short_term_score ?? 0) - (a.short_term_score ?? 0))
        .slice(0, 5),
    [filtered],
  );
  const topResale = useMemo(
    () =>
      [...filtered]
        .sort((a, b) => (b.trend_12m_pct ?? 0) - (a.trend_12m_pct ?? 0))
        .slice(0, 5),
    [filtered],
  );
  const goldenVisa = useMemo(
    () =>
      filtered
        .filter((m) => m.golden_visa_eligible)
        .sort((a, b) => b.gross_yield_pct - a.gross_yield_pct)
        .slice(0, 5),
    [filtered],
  );

  function resetFilters() {
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setYieldRange([YIELD_MIN, YIELD_MAX]);
    setInvType("all");
    setSearchQ("");
  }

  function exportCSV() {
    const headers = [
      "city",
      "region",
      "sale_price_eur_m2",
      "rent_price_eur_m2_month",
      "gross_yield_pct",
      "trend_12m_pct",
      "lat",
      "lon",
    ];
    const rows = filtered.map((m) =>
      headers.map((h) => JSON.stringify((m as unknown as Record<string, unknown>)[h] ?? "")).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "greecevest-markets.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportGeoJSON() {
    const fc = {
      type: "FeatureCollection",
      features: filtered.map((m) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [m.lon, m.lat] },
        properties: m,
      })),
    };
    const blob = new Blob([JSON.stringify(fc, null, 2)], { type: "application/geo+json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "greecevest-markets.geojson";
    a.click();
    URL.revokeObjectURL(url);
  }

  function runCalc() {
    const price = parseFloat(calc.price);
    const size = parseFloat(calc.size);
    const occ = parseFloat(calc.occupancy) / 100;
    const opex = parseFloat(calc.opex) / 100;
    if (!price || !size) {
      setCalcResult(null);
      return;
    }
    const eurM2 = price / size;
    const nearest = [...marketData].sort(
      (a, b) => Math.abs(a.sale_price_eur_m2 - eurM2) - Math.abs(b.sale_price_eur_m2 - eurM2),
    )[0];
    const monthlyRent =
      calc.rentalType === "long"
        ? size * nearest.rent_price_eur_m2_month
        : size * nearest.rent_price_eur_m2_month * 2.2;
    const gross = monthlyRent * 12 * occ;
    const net = gross * (1 - opex);
    setCalcResult({
      gross,
      net,
      grossYield: (gross / price) * 100,
      netYield: (net / price) * 100,
      monthly: monthlyRent,
      payback: price / Math.max(net, 1),
    });
  }

  // POI cluster points
  const poiPoints = useMemo(
    () =>
      visiblePois.map((p, i) => ({
        id: `${p.category}-${p.name}-${i}`,
        lat: p.lat,
        lon: p.lon,
        icon: poiIcon(p.category),
        popupHtml: `<div style="font:12px Inter,sans-serif"><strong>${escapeHtml(p.name)}</strong><br/><span style="color:#64748b">${POI_STYLE[p.category].label}${p.city ? " · " + escapeHtml(p.city) : ""}</span></div>`,
      })),
    [visiblePois],
  );

  /* -------- Render -------- */
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Aerial view of a Greek coastal town overlooking the Aegean Sea"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/55" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Market Intelligence
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-foreground leading-tight max-w-3xl">
            Greek real estate market intelligence.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-primary-foreground/80 max-w-2xl">
            Compare yields, prices, and Golden Visa opportunities across {marketData.length} Greek markets.
          </p>
        </div>
      </section>


      {/* Sticky Toolbar */}
      <div className="sticky top-14 sm:top-16 z-30 border-y border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 flex-wrap">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <FilterIcon className="h-3.5 w-3.5" />
                Filters
                {filterCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full">
                    {filterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[340px] sm:w-[380px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters and Layers</SheetTitle>
                <SheetDescription>
                  Narrow the {marketData.length} tracked Greek markets.
                </SheetDescription>
              </SheetHeader>
              <FiltersPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                yieldRange={yieldRange}
                setYieldRange={setYieldRange}
                invType={invType}
                setInvType={setInvType}
                poiToggles={poiToggles}
                setPoiToggles={setPoiToggles}
                layer={layer}
                setLayer={setLayer}
              />
            </SheetContent>
          </Sheet>

          <Select value={layer} onValueChange={(v) => setLayer(v as LayerKey)}>
            <SelectTrigger className="h-9 w-[170px]">
              <Layers className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[2000]">
              <SelectItem value="yield">Gross Yield (%)</SelectItem>
              <SelectItem value="sale">Sale Price (€/m²)</SelectItem>
              <SelectItem value="rental">Rental (€/m²/mo)</SelectItem>
              <SelectItem value="appreciation">12m Price Growth</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search city or region"
              className="h-9 pl-8 w-44 sm:w-56"
            />
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <QuickChip
              active={priceRange[1] <= 1800}
              onClick={() => {
                setPriceRange([PRICE_MIN, 1800]);
                setYieldRange([YIELD_MIN, YIELD_MAX]);
              }}
            >
              Budget
            </QuickChip>
            <QuickChip
              active={yieldRange[0] >= 6}
              onClick={() => setYieldRange([6, YIELD_MAX])}
            >
              High Yield
            </QuickChip>
            <QuickChip
              active={priceRange[0] >= 3000}
              onClick={() => {
                setPriceRange([3000, PRICE_MAX]);
                setYieldRange([YIELD_MIN, YIELD_MAX]);
              }}
            >
              Prime
            </QuickChip>
            <QuickChip
              active={invType === "golden_visa"}
              onClick={() => setInvType(invType === "golden_visa" ? "all" : "golden_visa")}
            >
              Golden Visa
            </QuickChip>
          </div>

          <div className="flex-1" />

          <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground mr-2">
            <span>
              <strong className="text-foreground">{kpis.cities}</strong> of {marketData.length} markets
            </span>
            <span>Avg <strong className="text-foreground">{fmtPct(kpis.yield)}</strong> yield</span>
            <span>Avg <strong className="text-foreground">{fmtEuro(kpis.price)}</strong>/m²</span>
          </div>

          {filterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Reset
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[2000]">
              <DropdownMenuItem onClick={exportCSV}>Download CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={exportGeoJSON}>Download GeoJSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Full-bleed Map */}
      <div className="relative bg-muted">
        <div className="h-[70vh] min-h-[520px] w-full">
          <MapContainer
            center={[38.5, 24.5]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="bg-muted"
          >

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitToData markets={filtered} signal={fitSignal} />

            {filtered.map((m, idx) => {
              const v =
                layer === "sale"
                  ? m.sale_price_eur_m2
                  : layer === "rental"
                    ? m.rent_price_eur_m2_month
                    : layer === "yield"
                      ? m.gross_yield_pct
                      : m.trend_12m_pct ?? 0;
              const color = colorForValue(v, layerRange.min, layerRange.max, RAMPS[layer].ramp);
              const pinned = isPinned(m);
              return (
                <CircleMarker
                  key={`${m.city}-${m.region}-${idx}`}
                  center={[m.lat, m.lon]}
                  radius={pinned ? 12 : 9}
                  pathOptions={{
                    color: pinned ? "#86c9f2" : "white",
                    weight: pinned ? 3 : 2,
                    fillColor: color,
                    fillOpacity: 0.95,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]}>
                    <strong>{m.city}</strong>
                    <br />
                    {RAMPS[layer].label}: {RAMPS[layer].format(v)}
                  </Tooltip>
                  <Popup>
                    <div className="text-xs space-y-1 min-w-[180px]">
                      <div className="font-semibold text-sm">{m.city}</div>
                      <div className="text-muted-foreground">{m.region}</div>
                      <div>Sale: {fmtEuro(m.sale_price_eur_m2)}/m²</div>
                      <div>Rent: €{m.rent_price_eur_m2_month.toFixed(1)}/m²/mo</div>
                      <div>Yield: {fmtPct(m.gross_yield_pct)}</div>
                      {m.trend_12m_pct !== undefined && (
                        <div>12m Growth: {fmtPct(m.trend_12m_pct)}</div>
                      )}
                      {m.golden_visa_eligible && (
                        <div className="inline-block text-[10px] font-semibold bg-accent/40 text-primary px-1.5 py-0.5 rounded mt-1">
                          Golden Visa eligible
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => togglePin(m)}
                        className={cn(
                          "mt-2 w-full text-xs font-semibold rounded px-2 py-1.5 border transition-colors flex items-center justify-center gap-1",
                          pinned
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-foreground border-border hover:border-accent",
                        )}
                      >
                        <Pin className="h-3 w-3" />
                        {pinned ? "Unpin" : "Pin to compare"}
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            <MarkerClusterGroup points={poiPoints} />
          </MapContainer>
        </div>

        {/* Legend overlay */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-card/95 backdrop-blur border border-border rounded-lg shadow-lg p-3 text-xs space-y-2 w-[220px]">
          <div className="font-semibold text-foreground">{RAMPS[layer].label}</div>
          <div className="flex h-2 rounded overflow-hidden">
            {RAMPS[layer].ramp.map((c, i) => (
              <div key={i} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <div className="flex justify-between text-muted-foreground text-[10px]">
            <span>{RAMPS[layer].format(layerRange.min)}</span>
            <span>{RAMPS[layer].format(layerRange.max)}</span>
          </div>
          <div className="pt-2 border-t border-border space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Infrastructure
            </div>
            {(Object.keys(POI_STYLE) as POICategory[]).map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer hover:text-primary"
              >
                <Checkbox
                  checked={poiToggles[c]}
                  onCheckedChange={(v) => setPoiToggles((s) => ({ ...s, [c]: !!v }))}
                  className="h-3.5 w-3.5"
                />
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm"
                  style={{ background: POI_STYLE[c].color }}
                />
                <span className="text-xs">{POI_STYLE[c].plural}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Discoverability strip: signals there's more below the map */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </span>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-accent">Keep scrolling</div>
                <div className="text-sm font-semibold text-primary">Rankings, ROI modelling and tax breakdown below</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
              <button
                type="button"
                onClick={() => jumpToInsights("rankings")}
                className="group text-left rounded-lg border border-border bg-background hover:border-accent hover:shadow-sm transition px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Top markets</div>
                  <div className="text-sm font-semibold text-primary">Rankings by strategy</div>
                </div>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition">→</span>
              </button>
              <button
                type="button"
                onClick={() => jumpToInsights("calculator")}
                className="group text-left rounded-lg border border-border bg-background hover:border-accent hover:shadow-sm transition px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Model returns</div>
                  <div className="text-sm font-semibold text-primary">ROI calculator</div>
                </div>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition">→</span>
              </button>
              <button
                type="button"
                onClick={() => jumpToInsights("costs")}
                className="group text-left rounded-lg border border-border bg-background hover:border-accent hover:shadow-sm transition px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Full picture</div>
                  <div className="text-sm font-semibold text-primary">Costs and tax</div>
                </div>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Compare tray */}
      {pinned.length > 0 && (
        <div className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Pin className="h-4 w-4 text-accent" />
              Comparing {pinned.length} of 3 markets
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {pinned.map((m) => (
                <div
                  key={m.city + m.region}
                  className="flex items-center gap-2 bg-primary-foreground/10 rounded-full pl-3 pr-1 py-1 text-xs"
                >
                  <span className="font-medium">{m.city}</span>
                  <span className="text-primary-foreground/60">·</span>
                  <span className="text-accent font-semibold">
                    {fmtPct(m.gross_yield_pct)}
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePin(m)}
                    className="ml-1 w-5 h-5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center"
                    aria-label={`Remove ${m.city}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPinned([])}
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Clear
            </Button>
          </div>
          {pinned.length >= 2 && <CompareTable items={pinned} />}
        </div>
      )}

      {/* Insights section below the map */}
      <section id="insights" className="bg-surface py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              Intelligence Layer
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
              Rank, model, and price every market.
            </h2>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>

            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="rankings">Rankings</TabsTrigger>
              <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
              <TabsTrigger value="costs">Costs and Tax</TabsTrigger>
            </TabsList>

            <TabsContent value="rankings" className="mt-6">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <RankCard
                  title="Long-Term Rental"
                  items={topLongTerm}
                  metric={(m) => fmtPct(m.gross_yield_pct) + " yield"}
                />
                <RankCard
                  title="Short-Term Rental"
                  items={topShortTerm}
                  metric={(m) => "Score " + (m.short_term_score ?? 0) + "/10"}
                />
                <RankCard
                  title="Resale / Appreciation"
                  items={topResale}
                  metric={(m) => (m.trend_12m_pct ?? 0).toFixed(1) + "% YoY"}
                />
                <RankCard
                  title="Golden Visa"
                  items={goldenVisa}
                  metric={(m) => fmtPct(m.gross_yield_pct)}
                  highlight
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-4">
                Top 5 within current filters. Pin any market on the map to compare side by side.
              </p>
            </TabsContent>

            <TabsContent value="calculator" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] max-w-4xl">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Inputs
                  </h3>
                  <CalcField label="Property price (€)">
                    <Input
                      type="number"
                      value={calc.price}
                      onChange={(e) => setCalc({ ...calc, price: e.target.value })}
                      placeholder="e.g. 250000"
                    />
                  </CalcField>
                  <CalcField label="Size (m²)">
                    <Input
                      type="number"
                      value={calc.size}
                      onChange={(e) => setCalc({ ...calc, size: e.target.value })}
                      placeholder="e.g. 85"
                    />
                  </CalcField>
                  <CalcField label="Rental strategy">
                    <Select
                      value={calc.rentalType}
                      onValueChange={(v) => setCalc({ ...calc, rentalType: v as "long" | "short" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long-Term Rental</SelectItem>
                        <SelectItem value="short">Short-Term (Airbnb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </CalcField>
                  <div className="grid grid-cols-2 gap-3">
                    <CalcField label="Occupancy %">
                      <Input
                        type="number"
                        value={calc.occupancy}
                        onChange={(e) => setCalc({ ...calc, occupancy: e.target.value })}
                      />
                    </CalcField>
                    <CalcField label="Opex %">
                      <Input
                        type="number"
                        value={calc.opex}
                        onChange={(e) => setCalc({ ...calc, opex: e.target.value })}
                      />
                    </CalcField>
                  </div>
                  <Button onClick={runCalc} className="w-full">
                    Calculate full analysis
                  </Button>
                </div>

                <div
                  className={cn(
                    "rounded-2xl p-6 space-y-3 shadow-sm",
                    calcResult
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-dashed border-border text-muted-foreground flex items-center justify-center text-sm",
                  )}
                >
                  {calcResult ? (
                    <>
                      <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                        Results
                      </h3>
                      <Row label="Monthly Rent" value={fmtEuro(calcResult.monthly)} />
                      <Row label="Gross Annual" value={fmtEuro(calcResult.gross)} />
                      <Row label="Net Annual" value={fmtEuro(calcResult.net)} />
                      <Row label="Gross Yield" value={fmtPct(calcResult.grossYield)} />
                      <Row label="Net Yield" value={fmtPct(calcResult.netYield)} highlight />
                      <Row label="Payback" value={calcResult.payback.toFixed(1) + " yrs"} />
                    </>
                  ) : (
                    <p>Enter price and size to model net yield, monthly rent, and payback period.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <CostBox
                  title="Buying Costs (% of price)"
                  items={[
                    ["Transfer Tax", "3.09% (resale)"],
                    ["VAT", "24% (new builds, suspended to Dec 31 2026)"],
                    ["Notary", "0.8 to 1%"],
                    ["Legal", "1 to 2%"],
                    ["Agency", "2 to 3%"],
                  ]}
                  footer="Typical total: 7 to 10% on resales."
                />
                <CostBox
                  title="Ongoing (Annual)"
                  items={[
                    ["Property Tax (ENFIA)", "variable"],
                    ["Management (if rented)", "8 to 12%"],
                    ["HOA Fees", "variable"],
                  ]}
                  footer="Typical: 20 to 30% of rental income."
                />
                <CostBox
                  title="Rental Income Tax (Individuals)"
                  items={[
                    ["€0 to €12,000", "15%"],
                    ["€12,001 to €35,000", "35%"],
                    ["Over €35,000", "45%"],
                  ]}
                  footer="Corporate: 22% flat. Capital gains suspended to Dec 31 2026."
                />
                <CostBox
                  title="Short-Term Rental Rules"
                  body="Up to 2 properties stay outside VAT. Managing 3 or more is generally treated as a business with VAT and possible GNTO licensing. A 90 day cap (60 on small islands) may apply. AADE registry and AMA required."
                />
                <CostBox
                  title="Why Invest Now"
                  tone="accent"
                  items={[
                    ["VAT suspension", "qualifying new builds, to Dec 31 2026"],
                    ["Capital gains", "suspended to Dec 31 2026"],
                    ["Sale prices", "rising through Q4 2025, growth moderating"],
                    ["Core cities", "~4 to 6% gross long-term yield"],
                  ]}
                />
                <CostBox
                  title="Golden Visa Thresholds"
                  items={[
                    ["Zone A (Athens, Thess., islands >3.1k)", "€800,000"],
                    ["Zone B (rest of Greece)", "€400,000"],
                    ["Minimum unit size", "120 m²"],
                    ["Restoration / conversion", "€250,000"],
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-10 text-center">
            Data: Spitogatos SPI (Q4 2025), Bank of Greece residential price indices (Q4 2025, published Mar 19 2026),
            AADE STR guidance, Ministry of Economy and Finance tax guides. POIs from OpenStreetMap. Refreshed Mar 31 2026.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ============================================================
 * Subcomponents
 * ============================================================ */

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-accent/60 pl-3 sm:pl-4">
      <div className="text-2xl sm:text-3xl font-extrabold text-primary-foreground leading-none">
        {value}
      </div>
      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-primary-foreground/70 mt-1.5">
        {label}
      </div>
    </div>
  );
}

function QuickChip({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-xs font-medium px-2.5 h-7 rounded-full border transition-colors whitespace-nowrap",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:border-accent hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

function FiltersPanel(props: {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  yieldRange: [number, number];
  setYieldRange: (v: [number, number]) => void;
  invType: InvType;
  setInvType: (v: InvType) => void;
  poiToggles: Record<POICategory, boolean>;
  setPoiToggles: React.Dispatch<React.SetStateAction<Record<POICategory, boolean>>>;
  layer: LayerKey;
  setLayer: (v: LayerKey) => void;
}) {
  const {
    priceRange,
    setPriceRange,
    yieldRange,
    setYieldRange,
    invType,
    setInvType,
    poiToggles,
    setPoiToggles,
    layer,
    setLayer,
  } = props;
  return (
    <div className="mt-6 space-y-6">
      <FilterGroup label={`Price (€/m²): ${fmtEuro(priceRange[0])} to ${fmtEuro(priceRange[1])}`}>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
        />
      </FilterGroup>

      <FilterGroup label={`Yield: ${fmtPct(yieldRange[0])} to ${fmtPct(yieldRange[1])}`}>
        <Slider
          min={YIELD_MIN}
          max={YIELD_MAX}
          step={0.5}
          value={yieldRange}
          onValueChange={(v) => setYieldRange(v as [number, number])}
        />
      </FilterGroup>

      <FilterGroup label="Investment Type">
        <Select value={invType} onValueChange={(v) => setInvType(v as InvType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="long_term">Long-Term Rental</SelectItem>
            <SelectItem value="short_term">Short-Term / Airbnb</SelectItem>
            <SelectItem value="resale">Resale / Appreciation</SelectItem>
            <SelectItem value="golden_visa">Golden Visa Eligible</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Map Layer">
        <Select value={layer} onValueChange={(v) => setLayer(v as LayerKey)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yield">Gross Yield (%)</SelectItem>
            <SelectItem value="sale">Sale Price (€/m²)</SelectItem>
            <SelectItem value="rental">Rental (€/m²/mo)</SelectItem>
            <SelectItem value="appreciation">12m Price Growth</SelectItem>
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Infrastructure on map">
        <div className="space-y-2">
          {(Object.keys(POI_STYLE) as POICategory[]).map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-foreground cursor-pointer"
            >
              <Checkbox
                checked={poiToggles[cat]}
                onCheckedChange={(v) => setPoiToggles((s) => ({ ...s, [cat]: !!v }))}
              />
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: POI_STYLE[cat].color }}
              />
              {POI_STYLE[cat].plural}
              <span className="ml-auto text-xs text-muted-foreground">
                {poisData.filter((p) => p.category === cat).length}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 text-xs text-foreground/80">
        <strong className="text-primary">Golden Visa:</strong> single property minimum 120 m².
        Short-term letting restrictions may apply.
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
        {label}
      </Label>
      {children}
    </div>
  );
}

function CalcField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-xs uppercase tracking-wider opacity-70">{label}</span>
      <span className={cn("font-semibold", highlight ? "text-accent text-xl" : "text-sm")}>
        {value}
      </span>
    </div>
  );
}

function RankCard({
  title,
  items,
  metric,
  highlight,
}: {
  title: string;
  items: Market[];
  metric: (m: Market) => string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col",
        highlight ? "border-accent/60" : "border-border",
      )}
    >
      <div
        className={cn(
          "px-4 py-3 border-b",
          highlight ? "bg-accent/15 border-accent/40" : "bg-muted/40 border-border",
        )}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
          Top 5 {title}
        </h3>
      </div>
      {items.length === 0 ? (
        <div className="text-xs text-muted-foreground italic px-4 py-6 text-center">
          No matches under current filters.
        </div>
      ) : (
        <ul className="flex-1">
          {items.map((m, i) => (
            <li
              key={`${m.city}-${m.region}-${i}`}
              className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-border last:border-b-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={cn(
                    "text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0",
                    i === 0
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{m.city}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {m.region}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary whitespace-nowrap">
                {metric(m)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CompareTable({ items }: { items: Market[] }) {
  const rows: Array<[string, (m: Market) => string]> = [
    ["Region", (m) => m.region],
    ["Sale €/m²", (m) => fmtEuro(m.sale_price_eur_m2)],
    ["Rent €/m²/mo", (m) => "€" + m.rent_price_eur_m2_month.toFixed(1)],
    ["Gross Yield", (m) => fmtPct(m.gross_yield_pct)],
    ["12m Growth", (m) => (m.trend_12m_pct !== undefined ? fmtPct(m.trend_12m_pct) : "—")],
    ["Long-term score", (m) => (m.long_term_score ?? 0) + "/10"],
    ["Short-term score", (m) => (m.short_term_score ?? 0) + "/10"],
    ["Golden Visa", (m) => (m.golden_visa_eligible ? "Eligible" : "Not eligible")],
  ];
  return (
    <div className="border-t border-primary-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-5 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-primary-foreground/60">
              <th className="font-medium pb-2 pr-4">Metric</th>
              {items.map((m) => (
                <th key={m.city + m.region} className="font-medium pb-2 pr-4">
                  {m.city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-primary-foreground/90">
            {rows.map(([label, get]) => (
              <tr key={label} className="border-t border-primary-foreground/10">
                <td className="py-2 pr-4 text-primary-foreground/60 text-xs uppercase tracking-wider">
                  {label}
                </td>
                {items.map((m) => (
                  <td key={m.city + m.region + label} className="py-2 pr-4 font-medium">
                    {get(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CostBox({
  title,
  items,
  body,
  footer,
  tone,
}: {
  title: string;
  items?: Array<[string, string]>;
  body?: string;
  footer?: string;
  tone?: "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm",
        tone === "accent"
          ? "bg-accent/10 border-accent/40"
          : "bg-card border-border",
      )}
    >
      <div className="font-semibold text-primary text-xs uppercase tracking-wider mb-3">
        {title}
      </div>
      {items && (
        <dl className="space-y-1.5 text-sm">
          {items.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-muted-foreground text-xs">{k}</dt>
              <dd className="text-foreground font-medium text-right text-xs">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {body && <p className="text-xs text-foreground/80 leading-relaxed">{body}</p>}
      {footer && (
        <p className="mt-3 pt-3 border-t border-border/60 text-xs font-semibold text-primary">
          {footer}
        </p>
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
