import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, Tag, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";
import {
  addQuote,
  formatBudget,
  GIG_CATEGORIES,
  getGig,
  isOwner,
  timeAgo,
  useQuotes,
} from "@/data/gigs-store";

export const Route = createFileRoute("/gigs/$id")({
  component: GigDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-foreground">Gig not found</h1>
        <Link
          to="/gigs"
          className="mt-6 inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to gigs
        </Link>
      </div>
    </div>
  ),
});

export function GigDetailPage() {
  const { id } = Route.useParams();
  const [gig, setGig] = useState(() => getGig(id));
  useEffect(() => {
    setGig(getGig(id));
  }, [id]);
  if (!gig) throw notFound();

  const owner = isOwner(gig.id);
  const quotes = useQuotes(gig.id);
  const catLabel = GIG_CATEGORIES.find((c) => c.value === gig.category)?.en ?? gig.category;
  const budget = formatBudget(gig.budgetMinEur, gig.budgetMaxEur);

  // Quote form state
  const [proName, setProName] = useState("");
  const [proEmail, setProEmail] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!proName.trim() || !proEmail.includes("@"))
      return setError("Please add your name and a valid email.");
    if (!price || Number(price) <= 0) return setError("Please enter a valid price.");
    if (message.trim().length < 10) return setError("Add a short message (min 10 characters).");
    addQuote({
      gigId: gig!.id,
      professionalName: proName.trim().slice(0, 80),
      professionalEmail: proEmail.trim().slice(0, 120),
      priceEur: Number(price),
      message: message.trim().slice(0, 1500),
    });
    setSubmitted(true);
    setPrice("");
    setMessage("");
  };

  return (
    <>
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/gigs"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to gigs
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/20 text-accent text-xs font-semibold">
              <Tag className="h-3 w-3" /> {catLabel}
            </span>
            <span className="text-xs text-primary-foreground/60">
              Posted {timeAgo(gig.createdAt)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{gig.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {gig.location}
            </span>
            {gig.timeframe && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {gig.timeframe}
              </span>
            )}
            {budget && <span className="font-semibold text-accent">{budget}</span>}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-foreground mb-3">Job description</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {gig.description}
              </p>
              {gig.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gig.photos.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-full aspect-square object-cover rounded-md border border-border"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quotes section */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Quotes ({quotes.length})</h2>
                {!owner && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" /> Private to gig owner
                  </span>
                )}
              </div>

              {quotes.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No quotes yet. Be the first to send one.
                </p>
              )}

              {owner ? (
                <div className="space-y-4">
                  {quotes.map((q) => (
                    <div key={q.id} className="border border-border rounded-lg p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <div className="font-semibold text-foreground">{q.professionalName}</div>
                          <a
                            href={`mailto:${q.professionalEmail}`}
                            className="text-xs text-accent hover:underline"
                          >
                            {q.professionalEmail}
                          </a>
                        </div>
                        <div className="text-xl font-bold text-foreground">
                          €{q.priceEur.toLocaleString()}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">
                        {q.message}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {timeAgo(q.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                quotes.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {quotes.length} professional{quotes.length === 1 ? "" : "s"}{" "}
                    {quotes.length === 1 ? "has" : "have"} sent a quote. Only the gig owner can see
                    them.
                  </p>
                )
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {!owner ? (
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-32">
                <h3 className="text-lg font-bold text-foreground">Send a private quote</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Only {gig.postedByName.split(" ")[0]} will see your quote and contact details.
                </p>

                {submitted ? (
                  <div className="mt-5 p-4 rounded-md bg-accent/10 border border-accent/30 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold text-foreground">Quote sent!</div>
                      <div className="text-muted-foreground mt-0.5">
                        You can send another if you want to revise it.
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 text-accent text-xs font-medium hover:underline"
                      >
                        Send another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuote} className="mt-5 space-y-3">
                    <Input
                      value={proName}
                      onChange={(e) => setProName(e.target.value)}
                      placeholder="Your name"
                      maxLength={80}
                    />
                    <Input
                      type="email"
                      value={proEmail}
                      onChange={(e) => setProEmail(e.target.value)}
                      placeholder="you@example.com"
                      maxLength={120}
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        €
                      </span>
                      <Input
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="Your price"
                        inputMode="numeric"
                        className="pl-7"
                      />
                    </div>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly: what's included, timing, any caveats…"
                      rows={5}
                      maxLength={1500}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Send Quote
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-32">
                <h3 className="text-lg font-bold text-foreground">Your gig</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You posted this gig. New quotes will appear above as professionals respond.
                </p>
                <div className="mt-4 text-sm">
                  <div className="text-foreground">{gig.postedByName}</div>
                  <div className="text-muted-foreground">{gig.postedByEmail}</div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}
