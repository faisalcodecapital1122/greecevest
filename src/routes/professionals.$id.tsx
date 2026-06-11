import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import {
  BadgeCheck,
  MapPin,
  Star,
  Mail,
  Phone,
  Globe,
  ChevronLeft,
  ShieldCheck,
  Calendar,
  Languages,
  Award,
  Building2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  ProfessionalCard,
  type ProfessionalData,
  type ProfessionalReview,
} from "@/components/ProfessionalCard";
import { demoProfessionals } from "@/data/demo-data";

// Deterministic defaults so every professional gets a rich profile,
// even if the demo data doesn't define every field yet.
function enrich(p: ProfessionalData): Required<
  Pick<
    ProfessionalData,
    | "headline"
    | "about"
    | "languages"
    | "specialties"
    | "yearsExperience"
    | "serviceAreas"
    | "email"
    | "phone"
    | "website"
    | "licenseNumber"
    | "credentials"
    | "reviews"
  >
> {
  const slug = p.name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "");
  const profBased: Record<string, { specialties: string[]; credentials: string[] }> = {
    "real estate agent": {
      specialties: [
        "International buyers",
        "Luxury villas",
        "Investment properties",
        "Golden Visa properties",
      ],
      credentials: ["Licensed Real Estate Broker", "Member, Hellenic Association of Realtors"],
    },
    lawyer: {
      specialties: [
        "Title searches",
        "Contract drafting",
        "Golden Visa applications",
        "Cross-border transactions",
      ],
      credentials: ["Athens Bar Association", "LL.M. Real Estate Law"],
    },
    architect: {
      specialties: [
        "Cycladic restorations",
        "Modern villa design",
        "Heritage renovations",
        "Sustainable building",
      ],
      credentials: ["TEE registered architect", "RIBA International Affiliate"],
    },
    accountant: {
      specialties: [
        "Non-resident taxation",
        "Property income reporting",
        "Inheritance & transfer tax",
        "ENFIA filings",
      ],
      credentials: ["Certified Tax Advisor", "ACCA member"],
    },
    "property manager": {
      specialties: [
        "Short-term rentals",
        "Long-term tenancy",
        "Maintenance & repairs",
        "Owner reporting",
      ],
      credentials: ["Short-term Rental Operator License", "AirDNA certified analyst"],
    },
    "mortgage broker": {
      specialties: [
        "Non-resident mortgages",
        "Refinancing",
        "EUR & multi-currency loans",
        "Bank negotiations",
      ],
      credentials: ["Bank of Greece registered intermediary"],
    },
  };

  const fallback = profBased[p.profession.toLowerCase()] ?? {
    specialties: ["Greek property market", "International clients", "Investment advisory"],
    credentials: ["Verified GREECEVEST professional"],
  };

  const defaultReviews: ProfessionalReview[] = [
    {
      author: "James W.",
      rating: 5,
      date: "Mar 2026",
      comment:
        "Responsive, transparent, and genuinely knowledgeable about the local market. Made our purchase from abroad feel effortless.",
    },
    {
      author: "Sophie L.",
      rating: 5,
      date: "Jan 2026",
      comment:
        "Helped us navigate every step, from initial viewings to closing. Communication in English was flawless.",
    },
    {
      author: "Andreas M.",
      rating: 4,
      date: "Nov 2025",
      comment:
        "Solid expertise and great attention to detail. Would recommend to anyone investing in Greece.",
    },
  ];

  return {
    headline: p.headline ?? `${p.profession} based in ${p.location}`,
    about:
      p.about ??
      `${p.bio} Over the past decade, ${p.name.split(" ")[0]} has built a reputation for clarity, ` +
        "discretion, and a deep network across the Greek property ecosystem. Clients include private " +
        "individuals, family offices, and international investors looking for a trusted partner on the ground.",
    languages: p.languages ?? ["Greek", "English", "German"],
    specialties: p.specialties ?? fallback.specialties,
    yearsExperience: p.yearsExperience ?? 12,
    serviceAreas: p.serviceAreas ?? [p.location.split(",")[0], "Athens", "Greek Islands"],
    email: p.email ?? `${slug}@greecevest-pros.com`,
    phone: p.phone ?? "+30 210 000 0000",
    website: p.website ?? "greecevest.com",
    licenseNumber: p.licenseNumber ?? "GR-PRO-" + p.id.padStart(6, "0"),
    credentials: p.credentials ?? fallback.credentials,
    reviews: p.reviews ?? defaultReviews,
  };
}

export const Route = createFileRoute("/professionals/$id")({
  loader: ({ params }) => {
    const professional = demoProfessionals.find((p) => p.id === params.id);
    if (!professional) throw notFound();
    return { professional };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.professional;
    if (!p) return { meta: [{ title: "Professional not found" }] };
    const title = `${p.name}, ${p.profession} in ${p.location} | GREECEVEST`;
    const desc = `${p.name} is a verified ${p.profession.toLowerCase()} on GREECEVEST. ${p.bio}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p.photo },
        { property: "og:type", content: "profile" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold text-foreground">Professional not found</h1>
      <p className="mt-2 text-muted-foreground">
        This profile doesn't exist or has been removed.
      </p>
      <Button asChild className="mt-6">
        <Link to="/professionals">Browse professionals</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  ),
  component: ProfessionalProfilePage,
});

export function ProfessionalProfilePage() {
  const { professional } = Route.useLoaderData();
  const rich = enrich(professional);

  const related = demoProfessionals
    .filter((p) => p.id !== professional.id && p.profession === professional.profession)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/professionals"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> All professionals
          </Link>
        </div>
      </div>

      {/* Hero / identity */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <img
                  src={professional.photo}
                  alt={`Portrait of ${professional.name}`}
                  className="w-full h-full rounded-2xl object-cover ring-4 ring-surface shadow-card"
                />
                {professional.verified && (
                  <span
                    className="absolute -bottom-2 -right-2 bg-card rounded-full p-1 shadow-md"
                    aria-label="Verified professional"
                  >
                    <BadgeCheck className="h-7 w-7 text-accent fill-accent/20" />
                  </span>
                )}
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent">
                {professional.profession}
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {professional.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{rich.headline}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{professional.location}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{professional.rating}</span>
                  <span>({professional.reviewCount} reviews)</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{rich.yearsExperience}+ years experience</span>
                </div>
                {professional.verified && (
                  <div className="inline-flex items-center gap-1.5 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={`mailto:${rich.email}`}>
                    <Mail className="h-4 w-4" /> Contact {professional.name.split(" ")[0]}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${rich.phone.replace(/\s+/g, "")}`}>
                    <Phone className="h-4 w-4" /> Request a call
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={async () => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    try {
                      if (typeof navigator !== "undefined" && navigator.share) {
                        await navigator.share({ title: professional.name, url });
                      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                        await navigator.clipboard.writeText(url);
                      }
                    } catch {
                      /* user cancelled */
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" /> Share profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-surface py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground">About</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{rich.about}</p>
            </div>

            {/* Specialties */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground">Specialties</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {rich.specialties.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="text-sm font-normal py-1.5 px-3"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Credentials & licensing
              </h2>
              <ul className="mt-4 space-y-3">
                {rich.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-muted-foreground">
                    <BadgeCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-muted-foreground text-sm pt-2 border-t border-border/60">
                  <span className="font-semibold text-foreground">License №</span>
                  <span className="font-mono">{rich.licenseNumber}</span>
                </li>
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <h2 className="text-xl font-bold text-foreground">Client reviews</h2>
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-lg font-bold text-foreground">{professional.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({professional.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {rich.reviews.map((r, i) => (
                  <div key={i} className="pb-6 border-b border-border/60 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-semibold text-foreground">{r.author}</p>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-3.5 w-3.5 ${j < r.rating ? "fill-accent text-accent" : "text-border"}`}
                            />
                          ))}
                        </div>
                        <span>{r.date}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: contact sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Get in touch
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href={`mailto:${rich.email}`}
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{rich.email}</span>
                  </a>
                  <a
                    href={`tel:${rich.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{rich.phone}</span>
                  </a>
                  <a
                    href={`https://${rich.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{rich.website}</span>
                  </a>
                </div>
                <Button asChild className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`mailto:${rich.email}`}>Send a message</a>
                </Button>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-5">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Languages className="h-4 w-4" /> Languages
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rich.languages.map((l) => (
                      <Badge key={l} variant="outline" className="font-normal">
                        {l}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-5 border-t border-border/60">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Service areas
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                    {rich.serviceAreas.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related professionals */}
      {related.length > 0 && (
        <section className="bg-card border-t border-border py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Other {professional.profession.toLowerCase()}s
              </h2>
              <Link
                to="/professionals"
                className="text-sm font-medium text-accent hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProfessionalCard key={p.id} professional={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
