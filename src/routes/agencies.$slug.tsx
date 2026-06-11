import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { ShieldCheck, MapPin, Phone, Mail, Globe, Calendar, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { CTABanner } from "@/components/CTABanner";
import { AGENCIES, agencyBySlug, agencyInitials } from "@/data/agencies";
import { demoProperties } from "@/data/demo-data";

export const Route = createFileRoute("/agencies/$slug")({
  loader: ({ params }) => {
    const agency = agencyBySlug(params.slug);
    if (!agency) throw notFound();
    const listings = demoProperties.filter((p) => p.agency === agency.name);
    return { agency, listings };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.agency;
    if (!a) return { meta: [{ title: "Agency not found" }] };
    const title = `${a.name}, ${a.city} | GREECEVEST`;
    const desc = `${a.name} in ${a.city}, ${a.region}. ${a.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: AgencyDetailPage,
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Agency not found</h1>
      <p className="text-muted-foreground">This agency may have been removed.</p>
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

export function AgencyDetailPage() {
  const { agency, listings } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Breadcrumb */}
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
            <span className="text-foreground truncate">{agency.name}</span>
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

      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  Verified Agency
                </span>
              </div>
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex w-16 h-16 bg-accent text-primary items-center justify-center font-bold text-lg shrink-0">
                  {agencyInitials(agency.name)}
                </div>
                <div className="min-w-0">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight uppercase">
                    {agency.name}
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-primary-foreground/85">
                    {agency.tagline}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {agency.city}, {agency.region}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Est. {agency.founded}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {listings.length} active listing{listings.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="bg-card text-foreground p-6 space-y-4 relative overflow-hidden">
                <span className="absolute top-0 left-0 h-0.5 w-12 bg-accent" aria-hidden="true" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  Contact
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${agency.phone.replace(/\s+/g, "")}`}
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      {agency.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${agency.email}`}
                      className="text-foreground hover:text-accent transition-colors truncate"
                    >
                      {agency.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                    <a
                      href={`https://${agency.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors truncate"
                    >
                      {agency.website}
                    </a>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-accent text-primary hover:bg-accent/90 rounded-none"
                >
                  <Link
                    to="/properties"
                    search={{ agency: agency.slug }}
                  >
                    View all {agency.name} listings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + meta */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-4">
              About the agency
              <span className="flex-1 h-px bg-border" />
            </h2>
            <p className="text-[15px] leading-[1.85] text-muted-foreground font-light">
              {agency.description}
            </p>
          </div>
          <div className="md:col-span-4 space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Specialties
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {agency.specialties.map((s: string) => (
                  <li
                    key={s}
                    className="text-xs font-medium text-primary bg-accent/10 border border-accent/30 px-3 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Languages
              </p>
              <p className="mt-2 text-sm text-foreground">{agency.languages.join(", ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 sm:py-16 bg-surface flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                Active listings
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-primary mt-2 uppercase tracking-tight">
                Listings by {agency.name}
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-accent transition-colors"
            >
              All properties
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((p: typeof listings[number]) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              No active listings from this agency right now.
            </p>
          )}
        </div>
      </section>

      <CTABanner
        headline="Looking to list with a trusted Greek agency?"
        subheadline="Connect with verified agencies across every region of Greece."
        ctaText="Browse all agencies"
      />

      <Footer />
    </div>
  );
}

// Quiet unused-import lint for AGENCIES when bundle splits
void AGENCIES;
