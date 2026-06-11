import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Share2,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Printer,
  LayoutGrid,
  Lock,
  Mail,
  X,

  Eye,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import {
  PropertyCard,
  PROPERTY_FEATURE_META,
  type PropertyFeature,
} from "@/components/PropertyCard";
import { demoProperties } from "@/data/demo-data";
import { agencyByName, agencyInitials } from "@/data/agencies";
import { cn } from "@/lib/utils";
import { track, type AnalyticsPayload } from "@/lib/analytics";

function parseNumeric(value: string): number | null {
  const digits = value.replace(/[^0-9.]/g, "");
  if (!digits) return null;
  const n = parseFloat(digits);
  return Number.isFinite(n) ? n : null;
}

// Deterministic comma-separated formatter (avoids SSR vs client locale mismatch)
function formatNumber(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = demoProperties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    if (!p) return { meta: [{ title: "Property not found" }] };
    const title = `${p.title}, ${p.location} | GREECEVEST`;
    const desc = `${p.type} in ${p.location}, ${p.region}. ${p.size}, ${p.bedrooms} bed, ${p.bathrooms} bath. ${p.price}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: PropertyDetailPage,
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Property not found</h1>
      <p className="text-muted-foreground">
        This listing may have been removed or the link is incorrect.
      </p>
      <Button asChild>
        <Link to="/properties">Browse properties</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">{error.message}</p>
      <Button asChild>
        <Link to="/properties">Back to properties</Link>
      </Button>
    </div>
  ),
});

// Deterministic pseudo-random helpers so demo content is stable per id
function seededValue(seed: string, max: number, offset = 0): number {
  let hash = offset;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash % max;
}

const ENERGY_CLASSES = ["A+", "A", "B", "B+", "C"] as const;
const ORIENTATIONS = ["South", "South-East", "South-West", "East", "West"] as const;
const AGENT_NAMES = [
  { name: "Maria Papadopoulou", role: "Senior Listing Agent" },
  { name: "Nikos Stavridis", role: "Property Advisor" },
  { name: "Elena Georgiou", role: "Luxury Specialist" },
  { name: "Dimitris Katsaros", role: "Investment Consultant" },
];

export function PropertyDetailPage() {
  const { property } = Route.useLoaderData();
  const [saved, setSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);


  const extras = useMemo(() => {
    const yearBuilt = 1970 + seededValue(property.id, 50, 7);
    const energy = ENERGY_CLASSES[seededValue(property.id, ENERGY_CLASSES.length, 13)];
    const orientation = ORIENTATIONS[seededValue(property.id, ORIENTATIONS.length, 19)];
    const floors = 1 + seededValue(property.id, 3, 23);
    const agent = AGENT_NAMES[seededValue(property.id, AGENT_NAMES.length, 29)];
    const ref = `GV-${property.id.padStart(4, "0")}-${(seededValue(property.id, 9000, 41) + 1000)
      .toString()
      .toUpperCase()}`;
    const listedDays = 3 + seededValue(property.id, 45, 53);
    const viewsThisWeek = 40 + seededValue(property.id, 220, 61);
    const enquiriesThisWeek = 2 + seededValue(property.id, 11, 67);
    return {
      yearBuilt,
      energy,
      orientation,
      floors,
      agent,
      ref,
      listedDays,
      viewsThisWeek,
      enquiriesThisWeek,
    };
  }, [property.id]);

  // Build a small "gallery" from the single demo image by reusing it
  const gallery = useMemo(
    () => [property.image, property.image, property.image, property.image, property.image, property.image],
    [property.image],
  );

  const similar = useMemo(
    () =>
      demoProperties
        .filter(
          (p) => p.id !== property.id && (p.region === property.region || p.type === property.type),
        )
        .slice(0, 3),
    [property.id, property.region, property.type],
  );

  // Shared analytics payload for this property
  const trackingPayload = useMemo<AnalyticsPayload>(
    () => ({
      property_id: property.id,
      property_ref: extras.ref,
      property_title: property.title,
      property_price: property.price,
      property_type: property.type,
      property_region: property.region,
    }),
    [property, extras.ref],
  );

  // Fire a page view once per property
  useEffect(() => {
    track("enquiry_cta_click", { ...trackingPayload, source: "page_view" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.id]);

  const description = useMemo(() => {
    return `Set in the heart of ${property.location}, ${property.region}, this ${property.type.toLowerCase()} offers ${property.size} of refined living space across ${extras.floors} floor${extras.floors > 1 ? "s" : ""}. Thoughtfully oriented to the ${extras.orientation.toLowerCase()}, the home enjoys generous natural light throughout the day and a calm, private atmosphere uncommon for the area.

The property has been carefully maintained and is delivered in move-in condition, with ${property.bedrooms} well-proportioned bedroom${property.bedrooms > 1 ? "s" : ""} and ${property.bathrooms} bathroom${property.bathrooms > 1 ? "s" : ""}. Living spaces flow naturally toward outdoor terraces, ideal for both quiet mornings and entertaining.

A rare combination of location, character, and long-term value, this listing is well suited to discerning international buyers, full-time residents, and investors seeking a foothold in one of Greece's most sought-after regions.`;
  }, [property, extras.floors, extras.orientation]);

  const handleSave = () => {
    setSaved((s) => {
      const next = !s;
      track("property_save", { ...trackingPayload, saved: next });
      return next;
    });
  };

  const handleShare = async () => {
    track("property_share", trackingPayload);
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    track("property_print", trackingPayload);
    window.print();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: bots fill hidden fields
    if ((data.get("company") as string)?.trim()) {
      toast.success("Enquiry sent. The agent will be in touch shortly.");
      form.reset();
      setEnquiryOpen(false);
      return;
    }
    if (data.get("not_robot") !== "on") {
      toast.error("Please confirm you are not a robot.");
      return;
    }
    track("enquiry_submit", {
      ...trackingPayload,
      has_phone: !!(data.get("phone") as string)?.trim(),
    });
    toast.success("Enquiry sent. The agent will be in touch shortly.");
    form.reset();
    setEnquiryOpen(false);
  };

  const openEnquiry = (source: string) => {
    track("enquiry_cta_click", { ...trackingPayload, source });
    setEnquiryOpen(true);
    setTimeout(() => {
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 80);
  };



  const openLightbox = (index = activeImage) => {
    setActiveImage(index);
    setLightboxOpen(true);
    track("gallery_open", { ...trackingPayload, image_index: index });
  };

  const priceNum = parseNumeric(property.price);
  const sizeNum = parseNumeric(property.size);
  const pricePerSqm = priceNum && sizeNum && sizeNum > 0 ? Math.round(priceNum / sizeNum) : null;

  const prevImage = () => {
    setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
    track("gallery_prev", trackingPayload);
  };
  const nextImage = () => {
    setActiveImage((i) => (i + 1) % gallery.length);
    track("gallery_next", trackingPayload);
  };

  // Preload adjacent gallery images for snappy nav
  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = gallery[(activeImage + 1) % gallery.length];
    const prev = gallery[(activeImage - 1 + gallery.length) % gallery.length];
    [next, prev].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activeImage, gallery]);


  // Keyboard navigation: arrow keys when lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, gallery.length]);


  const features = (property.features ?? []) as PropertyFeature[];


  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Slim breadcrumb */}
      <div className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3 min-w-0 font-semibold"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <Link to="/properties" className="hover:text-foreground transition-colors">
              Properties
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-foreground truncate">{property.title}</span>
          </nav>
          <Link
            to="/properties"
            className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All listings
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 flex-1">
        <article className="bg-card shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-border">
          {/* Architectural Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
            <div className="md:col-span-8 p-6 sm:p-8 md:p-12 md:border-r border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                <nav className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent flex flex-wrap gap-x-2 gap-y-1">
                  <span>Greece</span>
                  <span className="text-border">/</span>
                  <span>{property.region}</span>
                  <span className="text-border">/</span>
                  <span className="text-primary">{property.location}</span>
                </nav>
              </div>
              <h1 className="text-[26px] sm:text-4xl md:text-5xl font-light text-primary leading-[1.05] tracking-tight uppercase">
                {property.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground tracking-wide">
                {property.type} · {property.size} · {property.bedrooms} bed · {property.bathrooms} bath
              </p>
              <div className="mt-7 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  aria-pressed={saved}
                  aria-label={saved ? "Remove from favorites" : "Save to favorites"}
                  className={cn(
                    "h-9 inline-flex items-center gap-2 px-3 border text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200",
                    saved
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border text-primary hover:border-primary hover:bg-surface",
                  )}
                >
                  <Heart
                    className={cn("h-3.5 w-3.5 transition-transform", saved && "fill-accent text-accent scale-110")}
                    aria-hidden="true"
                  />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share property"
                  className="h-9 inline-flex items-center gap-2 px-3 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-surface transition-all duration-200"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="h-9 hidden sm:inline-flex items-center gap-2 px-3 border border-border text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-surface transition-all duration-200"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  Print
                </button>
              </div>
            </div>
            <div className="md:col-span-4 p-6 sm:p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-end relative overflow-hidden">
              <span className="absolute top-0 left-0 h-1 w-16 bg-accent" aria-hidden="true" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
                Guide Price
              </p>
              {priceNum ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl lg:text-4xl font-bold tracking-tight">
                    {property.price}
                  </span>
                  {pricePerSqm && (
                    <span className="text-xs text-accent/90 uppercase font-medium tracking-wider">
                      €{formatNumber(pricePerSqm)} / m²
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-2xl font-light">Price on request</div>
              )}
              <p className="text-[10px] font-medium opacity-60 mt-4 tracking-[0.25em] uppercase">
                Ref: {extras.ref}
              </p>
              <button
                type="button"
                onClick={() => openEnquiry("header_price_block")}
                className="group mt-7 inline-flex items-center justify-center gap-2 bg-accent text-primary py-3.5 px-5 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-accent/90 hover:gap-3 transition-all duration-300"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Enquire Now
                <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" aria-hidden="true" />
              </button>
            </div>

          </div>


          {/* Architectural Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-1 p-1 bg-surface">
            <div className="md:col-span-8 relative group overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-surface to-muted animate-pulse" aria-hidden="true" />
              <img
                key={activeImage}
                src={gallery[activeImage]}
                alt={property.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative w-full aspect-[16/9] object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03] animate-in fade-in duration-500"
              />

              <button
                type="button"
                onClick={() => openLightbox(activeImage)}
                aria-label="Open gallery"
                className="absolute inset-0 cursor-zoom-in"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent text-background">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-background/95 text-foreground hover:bg-accent hover:text-primary transition-all duration-200"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs font-medium tabular-nums tracking-wider px-1">
                    {activeImage + 1} / {gallery.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-background/95 text-foreground hover:bg-accent hover:text-primary transition-all duration-200"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => openLightbox(activeImage)}
                  className="pointer-events-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors bg-background/10 backdrop-blur px-3 py-1.5"
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                  View All ({gallery.length})
                </button>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-1 md:aspect-[8/9]">
              <button
                type="button"
                onClick={() => openLightbox((activeImage + 1) % gallery.length)}
                className="flex-1 min-h-0 w-full bg-muted overflow-hidden group aspect-[4/3] md:aspect-auto"
              >
                <img
                  src={gallery[(activeImage + 1) % gallery.length]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              <button
                type="button"
                onClick={() => openLightbox((activeImage + 2) % gallery.length)}
                className="flex-1 min-h-0 w-full bg-muted overflow-hidden relative group aspect-[4/3] md:aspect-auto"
              >
                <img
                  src={gallery[(activeImage + 2) % gallery.length]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {gallery.length > 3 && (
                  <span className="absolute inset-0 bg-primary/75 text-primary-foreground flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-[0.25em] group-hover:bg-primary/85 transition-colors">
                    <span className="text-3xl font-light mb-1">+{gallery.length - 2}</span>
                    View Gallery
                  </span>
                )}
              </button>
            </div>

          </div>



          {/* Content & Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Primary Content */}
            <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 md:p-12 space-y-10 md:space-y-12 md:border-r border-border">
              <section className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-4">
                  Description
                  <span className="flex-1 h-px bg-border" />
                </h3>
                <div className="text-[15px] leading-[1.85] text-muted-foreground font-light whitespace-pre-line first-letter:text-5xl first-letter:font-light first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[1]">
                  {description}
                </div>
              </section>



              <section className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-4">
                  Specification Data
                  <span className="flex-1 h-px bg-border" />
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 lg:gap-x-12">
                  <SpecCell label="Interior" value={property.size} />
                  <SpecCell label="Plot" value={property.plotSize} />
                  <SpecCell label="Built" value={String(extras.yearBuilt)} />
                  <SpecCell label="Bedrooms" value={String(property.bedrooms)} />
                  <SpecCell label="Bathrooms" value={String(property.bathrooms)} />
                  <SpecCell label="Efficiency" value={`Class ${extras.energy}`} />
                  <SpecCell label="Orientation" value={extras.orientation} />
                  <SpecCell
                    label="Floors"
                    value={`${extras.floors} floor${extras.floors > 1 ? "s" : ""}`}
                  />
                  <SpecCell label="Type" value={property.type} />
                </div>
              </section>

              {features.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-4">
                    Features and Amenities
                    <span className="flex-1 h-px bg-border" />
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((f) => {
                      const meta = PROPERTY_FEATURE_META[f];
                      return (
                        <li
                          key={f}
                          className="flex items-center gap-3 py-2.5 px-3 bg-surface/60 hover:bg-surface transition-colors"
                        >
                          <span className="h-5 w-5 inline-flex items-center justify-center bg-accent/15 shrink-0">
                            <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                          </span>
                          <span className="text-sm text-foreground">{meta.label}</span>
                        </li>
                      );
                    })}
                  </ul>

                </section>
              )}

              <section className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-4">
                  Location
                  <span className="flex-1 h-px bg-border" />
                </h3>
                <div className="overflow-hidden border border-border bg-card aspect-[16/9]">
                  <iframe
                    title={`Map of ${property.location}`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=23.5,37.9,23.9,38.1&layer=mapnik&marker=38,23.7`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Approximate area in {property.location}, {property.region}. The precise address
                  is shared with verified buyers after an initial enquiry.
                </p>
              </section>
            </div>

            {/* Secondary / Agent Column */}
            <div className="md:col-span-5 lg:col-span-4 p-5 sm:p-6 md:p-8 bg-surface/50">
              <div className="md:sticky md:top-12 space-y-6">
                <div className="bg-card border border-border p-6 space-y-5 shadow-[0_4px_24px_-12px_rgba(25,57,89,0.15)] relative overflow-hidden">
                  <span className="absolute top-0 left-0 h-0.5 w-12 bg-accent" aria-hidden="true" />

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs tracking-tighter shrink-0">
                      {extras.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-primary leading-tight truncate">
                        {extras.agent.name}
                      </p>
                      <p className="text-[9px] text-accent uppercase font-bold tracking-[0.18em] inline-flex items-center gap-1 mt-1">
                        <ShieldCheck className="h-2.5 w-2.5" aria-hidden="true" />
                        {extras.agent.role}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEnquiry("sidebar_card")}
                    className="w-full bg-primary text-primary-foreground py-3.5 font-bold text-[10px] uppercase tracking-[0.25em] hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Enquire about this property
                  </button>


                  <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-3 border-t border-border">
                    <Lock className="h-3 w-3" aria-hidden="true" />
                    Typical reply within 4 hours.
                  </p>
                </div>

                {(() => {
                  const ag = agencyByName(property.agency);
                  if (!ag) return null;
                  return (
                    <div className="bg-card border border-border p-6 space-y-4 relative overflow-hidden">
                      <span className="absolute top-0 left-0 h-0.5 w-12 bg-accent" aria-hidden="true" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                        Listed by
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs tracking-tighter shrink-0">
                          {agencyInitials(ag.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-primary leading-tight truncate">
                            {ag.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1 truncate">
                            {ag.city}, {ag.region}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {ag.tagline}
                      </p>
                      <Link
                        to="/agencies/$slug"
                        params={{ slug: ag.slug }}
                        className="block w-full text-center border border-border py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary hover:border-primary hover:bg-surface transition-all"
                      >
                        View agency profile
                      </Link>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
                  <div className="text-muted-foreground">
                    Listed
                    <div className="text-primary mt-1">{extras.listedDays}d ago</div>
                  </div>
                  <div className="text-muted-foreground text-center inline-flex flex-col items-center">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3 w-3" aria-hidden="true" /> Views
                    </span>
                    <div className="text-primary mt-1">{extras.viewsThisWeek}/wk</div>
                  </div>
                  <div className="text-muted-foreground text-right">
                    Enquiries
                    <div className="text-primary mt-1">{extras.enquiriesThisWeek}/wk</div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </article>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="bg-background border-t border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                  Further opportunities
                </div>
                {/* <h2 className="text-2xl lg:text-3xl font-semibold text-primary mt-2 uppercase tracking-tight"> */}
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                {/* <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mt-2 uppercase tracking-tight"> */}
                  You may also consider
                </h2>
              </div>
              <Link
                to="/properties"
                className="text-[10px] text-nowrap uppercase tracking-[0.2em] font-bold text-primary hover:text-accent transition-colors"
              >
                View all listings
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky enquiry CTA */}
      <div className="md:hidden sticky bottom-0 inset-x-0 z-30 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
        <div className="min-w-0 flex-1">
          <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            Guide price
          </div>
          <div className="text-base font-bold text-primary truncate">{property.price}</div>
        </div>
        <Button
          onClick={() => openEnquiry("mobile_sticky")}
          className="h-11 px-5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none"
        >
          <Mail className="h-3.5 w-3.5 mr-2" aria-hidden="true" /> Enquire
        </Button>
      </div>

      {/* Gallery lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 bg-foreground border-foreground text-background overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/10] bg-black flex items-center justify-center">
              <img
                key={activeImage}
                src={gallery[activeImage]}
                alt={`${property.title} image ${activeImage + 1}`}
                decoding="async"
                onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                className="max-h-full max-w-full object-contain opacity-0 [&.opacity-100]:opacity-100 transition-opacity duration-300"
              />

            </div>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
              className="absolute top-3 right-3 h-10 w-10 inline-flex items-center justify-center rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute top-3 left-3 bg-background/90 text-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]">
              {activeImage + 1} / {gallery.length}
            </div>
          </div>
          <div className="bg-background p-4 flex gap-2 overflow-x-auto">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  "shrink-0 w-24 h-16 overflow-hidden border-2 transition-colors",
                  i === activeImage ? "border-accent" : "border-transparent opacity-70 hover:opacity-100",
                )}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Enquiry modal */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="max-w-lg w-[95vw] p-0 bg-card border-border overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
              Enquire about
            </p>
            <h2 className="text-lg font-semibold leading-tight">{property.title}</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-2">
              Ref: {extras.ref} · {property.price}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-3">
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              tabIndex={-1}
            >
              <label>
                Company (leave blank)
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-9 h-9 bg-primary flex items-center justify-center text-primary-foreground font-bold text-[10px] tracking-tighter shrink-0">
                {extras.agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-primary leading-tight">{extras.agent.name}</p>
                <p className="text-[9px] text-accent uppercase font-bold tracking-[0.18em] inline-flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-2.5 w-2.5" aria-hidden="true" />
                  {extras.agent.role}
                </p>
              </div>
            </div>

            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              autoComplete="name"
              className="w-full bg-surface border border-border px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:border-accent outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              autoComplete="email"
              className="w-full bg-surface border border-border px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:border-accent outline-none transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              autoComplete="tel"
              className="w-full bg-surface border border-border px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:border-accent outline-none transition-colors"
            />
            <textarea
              name="message"
              rows={4}
              defaultValue={`I am interested in Ref: ${extras.ref}.`}
              className="w-full bg-surface border border-border px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:border-accent outline-none transition-colors resize-none"
            />

            <label htmlFor="not_robot_modal" className="flex items-start gap-2 cursor-pointer pt-0.5">
              <Checkbox id="not_robot_modal" name="not_robot" required className="mt-0.5" />
              <span className="text-xs text-foreground leading-snug">
                I am not a robot and this is a genuine enquiry.
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary/90 transition-all"
            >
              Submit Interest
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-1">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Protected by spam filtering. Reply within 4 hours.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />

    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="group">
      <p className="text-[10px] font-bold text-accent uppercase tracking-[0.25em] mb-2">{label}</p>
      <p className="text-lg font-medium text-primary leading-tight">{value}</p>
      <span className="block h-px w-6 bg-border mt-3 group-hover:w-12 group-hover:bg-accent transition-all duration-300" aria-hidden="true" />
    </div>
  );
}






