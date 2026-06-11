import { createFileRoute } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { useMemo, useState } from "react";
import { MapPin, Clock, Tag, Plus, Search, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import {
  GIG_CATEGORIES,
  formatBudget,
  timeAgo,
  useGigs,
  type GigCategory,
} from "@/data/gigs-store";

export const Route = createFileRoute("/gigs/")({
  head: () => ({
    meta: [
      { title: "Gigs, Post a Job or Quote on Real Estate Work | GREECEVEST" },
      {
        name: "description",
        content:
          "Property owners post jobs (plumbing, gardening, renovation, construction). Verified professionals send private quotes.",
      },
    ],
  }),
  component: GigsIndex,
});

export function GigsIndex() {
  const gigs = useGigs();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<GigCategory | "all">("all");

  const filtered = useMemo(() => {
    return gigs.filter((g) => {
      if (cat !== "all" && g.category !== cat) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !g.title.toLowerCase().includes(q) &&
          !g.description.toLowerCase().includes(q) &&
          !g.location.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [gigs, query, cat]);

  return (
    <>
      <section className="relative py-20 md:py-28 bg-hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Marketplace
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
                Post a job. Get quotes from{" "}
                <span className="text-accent">verified professionals</span>.
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Plumbers, electricians, gardeners, contractors, architects, lawyers, describe the
                work you need on your property and let professionals come to you with private
                quotes.
              </p>
            </div>
            <Link to="/gigs/post">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant"
              >
                <Plus className="h-4 w-4 mr-2" /> Post a Gig
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="sticky top-20 lg:top-24 z-30 py-4 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3 bg-card border border-border rounded-2xl shadow-sm p-2 md:p-2">
            <div className="relative flex-1 min-w-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keyword, location…"
                aria-label="Search gigs"
                className="pl-9 h-11 bg-transparent border-0 focus-visible:ring-0 shadow-none"
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-border" aria-hidden="true" />
            <div className="hidden md:block text-sm text-muted-foreground pr-3 tabular-nums whitespace-nowrap">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </div>
          </div>
          <div
            className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1"
            role="tablist"
            aria-label="Filter by category"
          >
            <button
              role="tab"
              aria-selected={cat === "all"}
              onClick={() => setCat("all")}
              className={`px-4 h-10 rounded-full text-sm font-medium whitespace-nowrap border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${cat === "all" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-accent/40 hover:bg-accent/5"}`}
            >
              All
            </button>
            {GIG_CATEGORIES.map((c) => (
              <button
                key={c.value}
                role="tab"
                aria-selected={cat === c.value}
                onClick={() => setCat(c.value)}
                className={`px-4 h-10 rounded-full text-sm font-medium whitespace-nowrap border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${cat === c.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-accent/40 hover:bg-accent/5"}`}
              >
                {c.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length === 0
                ? "No results"
                : `Showing ${filtered.length} ${filtered.length === 1 ? "gig" : "gigs"}`}
              {cat !== "all" && ` in ${GIG_CATEGORIES.find((c) => c.value === cat)?.en}`}
            </p>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-border">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <Inbox className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                No gigs match your filters yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try clearing filters or be the first to post.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCat("all");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Button>
                <Link to="/gigs/post">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Post the first gig
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((g) => {
                const catLabel =
                  GIG_CATEGORIES.find((c) => c.value === g.category)?.en ?? g.category;
                const budget = formatBudget(g.budgetMinEur, g.budgetMaxEur);
                return (
                  <Link
                    key={g.id}
                    to="/gigs/$id"
                    params={{ id: g.id }}
                    className="group bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-semibold">
                        <Tag className="h-3 w-3" /> {catLabel}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {timeAgo(g.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2 min-h-[2.75rem]">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[4.125rem]">
                      {g.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {g.location}
                      </div>
                      {g.timeframe && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {g.timeframe}
                        </div>
                      )}
                      {budget && <div className="font-semibold text-foreground">{budget}</div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
