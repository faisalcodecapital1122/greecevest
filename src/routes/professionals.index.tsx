import { createFileRoute } from "@tanstack/react-router";
import { LocaleLink as Link } from "@/i18n/locale";
import { useMemo, useState } from "react";
import {
  Shield,
  Globe,
  Award,
  Mail,
  CheckCircle,
  Search,
  X,
  SlidersHorizontal,
  Bookmark,
  BookmarkPlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegionCombobox } from "@/components/RegionCombobox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { ProfessionTaxonomy } from "@/components/ProfessionTaxonomy";

import { Footer } from "@/components/Footer";
import { demoProfessionals } from "@/data/demo-data";
import { useSavedSearches } from "@/hooks/use-saved-searches";
import { useTx } from "@/i18n/locale";
import heroImage from "@/assets/hero-professionals.jpg";

export const Route = createFileRoute("/professionals/")({
  head: () => ({
    meta: [
      { title: "Verified Greek Property Professionals, Lawyers, Agents & More | GREECEVEST" },
      {
        name: "description",
        content:
          "Find verified real estate agents, property lawyers, architects, tax advisors, and more. Every professional on GREECEVEST is vetted to help you invest in Greece with confidence.",
      },
      { property: "og:title", content: "Verified Greek Property Professionals | GREECEVEST" },
      {
        property: "og:description",
        content:
          "Connect with verified agents, lawyers, architects, and tax advisors for your Greek property investment.",
      },
    ],
  }),
  component: ProfessionalsPage,
});

type SortKey = "rating" | "reviews" | "name";

interface ProfessionalFilters {
  query: string;
  category: string;
  region: string;
  verifiedOnly: boolean;
  sort: SortKey;
}

export function ProfessionalsPage() {
  const tx = useTx();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [savedListOpen, setSavedListOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  const {
    searches: savedSearches,
    save,
    remove,
  } = useSavedSearches<ProfessionalFilters>("greecevest.savedSearches.professionals");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = demoProfessionals.filter((p) => {
      if (category !== "all" && p.profession.toLowerCase() !== category) return false;
      if (region !== "all" && !p.location.toLowerCase().includes(region)) return false;
      if (verifiedOnly && !p.verified) return false;
      if (q) {
        const haystack = `${p.name} ${p.profession} ${p.location} ${p.bio}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    const sorted = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "reviews") return b.reviewCount - a.reviewCount;
      return b.rating - a.rating;
    });
    return sorted;
  }, [query, category, region, verifiedOnly, sort]);

  const activeCount =
    (query ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (region !== "all" ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setCategory("all");
    setRegion("all");
    setVerifiedOnly(false);
  };

  const describeFilters = (f: ProfessionalFilters) => {
    const parts: string[] = [];
    if (f.category !== "all") parts.push(f.category);
    if (f.region !== "all") parts.push(f.region);
    if (f.verifiedOnly) parts.push(tx("verified", "πιστοποιημένοι"));
    if (f.query) parts.push(`"${f.query}"`);
    return parts.length ? parts.join(" · ") : tx("All professionals", "Όλοι οι επαγγελματίες");
  };

  const defaultSaveName = describeFilters({ query, category, region, verifiedOnly, sort });

  const handleSave = () => {
    save(saveName || defaultSaveName, { query, category, region, verifiedOnly, sort });
    setSaveName("");
    setSaveOpen(false);
  };

  const applySaved = (f: ProfessionalFilters) => {
    setQuery(f.query);
    setCategory(f.category);
    setRegion(f.region);
    setVerifiedOnly(f.verifiedOnly);
    setSort(f.sort);
    setSavedListOpen(false);
    setMobileOpen(false);
  };

  const scrollToId = (id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    if (value !== "all") scrollToId("results-grid");
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[32vh] sm:h-[40vh] min-h-[220px] sm:min-h-[300px] flex items-center">
        <img
          src={heroImage}
          alt={tx("Professional team in Greek office", "Ομάδα επαγγελματιών σε γραφείο στην Ελλάδα")}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground">
            {tx("Verified Professionals You Can Trust", "Πιστοποιημένοι επαγγελματίες που εμπιστεύεσαι")}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {tx(
              "Vetted experts across legal, financial, construction, property management, and lifestyle. Every professional behind a Greek property transaction, in one place.",
              "Επιλεγμένοι ειδικοί σε νομικά, οικονομικά, κατασκευές, διαχείριση ακινήτων και lifestyle. Κάθε επαγγελματίας πίσω από μια ελληνική συναλλαγή ακινήτου, σε ένα μέρος."
            )}
          </p>
          <Button
            size="lg"
            className="mt-4 sm:mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {tx("Join as a Professional", "Γίνε επαγγελματίας")}
          </Button>
        </div>
      </section>


      {/* Filter Bar */}
      <section className="sticky top-14 sm:top-16 z-40 bg-surface/95 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 space-y-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search — always visible */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tx("Search name or specialty...", "Αναζήτηση ονόματος ή ειδικότητας...")}
                className="pl-10 h-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Mobile: open Filters sheet */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="sm:hidden h-10 shrink-0"
                  aria-label={tx("Open filters", "Άνοιγμα φίλτρων")}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="ml-1">{tx("Filters", "Φίλτρα")}</span>
                  {activeCount > 0 && (
                    <Badge className="ml-1 bg-accent text-accent-foreground h-5 min-w-5 px-1.5">
                      {activeCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
                <SheetHeader className="px-5 py-4 border-b border-border">
                  <SheetTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" /> {tx("Filters", "Φίλτρα")}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {tx("Region", "Περιοχή")}
                    </Label>
                    <RegionCombobox value={region} onChange={setRegion} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {tx("Sort by", "Ταξινόμηση")}
                    </Label>
                    <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                      <SelectTrigger className="w-full h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">{tx("Top rated", "Κορυφαία αξιολόγηση")}</SelectItem>
                        <SelectItem value="reviews">{tx("Most reviewed", "Περισσότερες κριτικές")}</SelectItem>
                        <SelectItem value="name">{tx("Name (A to Z)", "Όνομα (Α έως Ω)")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border p-3">
                    <Label htmlFor="verified-m" className="text-sm font-medium cursor-pointer">
                      {tx("Verified only", "Μόνο πιστοποιημένοι")}
                    </Label>
                    <Switch
                      id="verified-m"
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                  </div>
                </div>
                <SheetFooter className="px-5 py-4 border-t border-border bg-card flex-row gap-2 sm:flex-row">
                  <Button variant="outline" className="flex-1" onClick={clearAll}>
                    {tx("Clear all", "Καθαρισμός")}
                  </Button>
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tx(
                      `Show ${filtered.length} result${filtered.length === 1 ? "" : "s"}`,
                      `Εμφάνιση ${filtered.length} ${filtered.length === 1 ? "αποτελέσματος" : "αποτελεσμάτων"}`
                    )}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Desktop inline filters */}
            <div className="hidden sm:flex items-center gap-2">
              <RegionCombobox value={region} onChange={setRegion} />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-40 h-10">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder={tx("Sort by", "Ταξινόμηση")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">{tx("Top rated", "Κορυφαία αξιολόγηση")}</SelectItem>
                  <SelectItem value="reviews">{tx("Most reviewed", "Περισσότερες κριτικές")}</SelectItem>
                  <SelectItem value="name">{tx("Name (A to Z)", "Όνομα (Α έως Ω)")}</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 px-3 h-10 rounded-md border border-border bg-card">
                <Switch id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                <Label
                  htmlFor="verified"
                  className="text-sm font-medium cursor-pointer whitespace-nowrap"
                >
                  {tx("Verified", "Πιστοποιημένοι")}
                </Label>
              </div>
            </div>

            {/* Saved searches — right aligned */}
            <div className="ml-auto flex items-center gap-1.5">
              {/* Save current */}
              <Popover open={saveOpen} onOpenChange={setSaveOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10"
                    disabled={activeCount === 0}
                    aria-label={tx("Save current search", "Αποθήκευση αναζήτησης")}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">{tx("Save", "Αποθήκευση")}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72 p-3 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {tx("Save this search", "Αποθήκευση αυτής της αναζήτησης")}
                    </Label>
                    <Input
                      placeholder={defaultSaveName}
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    />
                  </div>
                  <Button
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={handleSave}
                  >
                    {tx("Save search", "Αποθήκευση αναζήτησης")}
                  </Button>
                </PopoverContent>
              </Popover>

              {/* Saved list */}
              <Popover open={savedListOpen} onOpenChange={setSavedListOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10" aria-label={tx("Saved searches", "Αποθηκευμένες αναζητήσεις")}>
                    <Bookmark className="h-4 w-4" />
                    {savedSearches.length > 0 && (
                      <Badge className="ml-1 bg-accent text-accent-foreground h-5 min-w-5 px-1.5">
                        {savedSearches.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold">{tx("Saved searches", "Αποθηκευμένες αναζητήσεις")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tx("Stored on this device.", "Αποθηκευμένες σε αυτή τη συσκευή.")}</p>
                  </div>
                  {savedSearches.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      {tx("No saved searches yet.", "Δεν υπάρχουν αποθηκευμένες αναζητήσεις ακόμη.")}
                    </div>
                  ) : (
                    <ul className="max-h-72 overflow-y-auto py-1">
                      {savedSearches.map((s) => (
                        <li key={s.id} className="flex items-center gap-1 px-2 hover:bg-surface">
                          <button
                            type="button"
                            onClick={() => applySaved(s.filters)}
                            className="flex-1 text-left px-2 py-2 min-w-0"
                          >
                            <p className="text-sm font-medium truncate">{s.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {describeFilters(s.filters)}
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(s.id)}
                            className="p-2 text-muted-foreground hover:text-destructive shrink-0"
                            aria-label={tx(`Delete ${s.name}`, `Διαγραφή ${s.name}`)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Active filters + count row */}
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 min-w-0">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" /> {tx(`Clear (${activeCount})`, `Καθαρισμός (${activeCount})`)}
                </button>
              )}
            </div>
            <span className="whitespace-nowrap">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {tx(
                filtered.length === 1 ? "professional" : "professionals",
                filtered.length === 1 ? "επαγγελματίας" : "επαγγελματίες"
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Profession Taxonomy (collapsed by default) */}
      <section className="py-6 sm:py-10 lg:py-12 bg-surface border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProfessionTaxonomy
            selected={category}
            onSelect={handleCategorySelect}
            onGroupOpen={() => scrollToId("profession-pills")}
          />
        </div>
      </section>



      {/* Professional Grid */}
      <section id="results-grid" className="py-10 sm:py-12 lg:py-14 bg-surface scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProfessionalCard key={p.id} professional={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {tx("No professionals match your filters", "Κανένας επαγγελματίας δεν ταιριάζει στα φίλτρα σου")}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {tx(
                  "Try adjusting your filters, or get notified when matching experts join the platform.",
                  "Δοκίμασε να αλλάξεις τα φίλτρα ή μάθε πρώτος όταν νέοι επαγγελματίες ενταχθούν στην πλατφόρμα."
                )}
              </p>
              {activeCount > 0 && (
                <Button variant="outline" className="mt-4" onClick={clearAll}>
                  {tx("Clear filters", "Καθαρισμός φίλτρων")}
                </Button>
              )}
              <div className="mt-6 flex gap-2 max-w-sm mx-auto">
                <Input type="email" placeholder="your@email.com" />
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                  {tx("Notify Me", "Ειδοποίησέ με")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose GREECEVEST Professionals */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            {/* <span className="text-sm font-semibold text-accent uppercase tracking-wider"> */}
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("Why GREECEVEST", "Γιατί GREECEVEST")}
            </span>
            <h2 className="mt-3 text-[28px] sm:text-3xl font-bold text-foreground leading-[1.2]">
            {/* <h2 className="mt-3 text-3xl font-bold text-foreground"> */}
              {tx("Professionals You Can Actually Trust", "Επαγγελματίες που μπορείς πραγματικά να εμπιστευτείς")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: tx("Verified Credentials", "Πιστοποιημένα διαπιστευτήρια"),
                desc: tx(
                  "Every professional's licenses, certifications, and track record are verified before they join the platform.",
                  "Οι άδειες, πιστοποιήσεις και το ιστορικό κάθε επαγγελματία επαληθεύονται πριν την ένταξη στην πλατφόρμα."
                ),
              },
              {
                icon: Globe,
                title: tx("International Experience", "Διεθνής εμπειρία"),
                desc: tx(
                  "Our professionals specialize in helping foreign buyers navigate Greek property law, tax, and transactions.",
                  "Οι επαγγελματίες μας ειδικεύονται στο να βοηθούν ξένους αγοραστές με το ελληνικό δίκαιο ακινήτων, τη φορολογία και τις συναλλαγές."
                ),
              },
              {
                icon: Award,
                title: tx("Client-Reviewed", "Αξιολογημένοι από πελάτες"),
                desc: tx(
                  "Real reviews from real clients. See ratings, feedback, and success stories before you choose.",
                  "Πραγματικές κριτικές από πραγματικούς πελάτες. Δες αξιολογήσεις και ιστορίες επιτυχίας πριν επιλέξεις."
                ),
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Sign-Up CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{tx("Work in Greek Real Estate?", "Δραστηριοποιείσαι στα ελληνικά ακίνητα;")}</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              {tx(
                "Join GREECEVEST to get discovered by qualified international buyers. Build your profile, receive leads, and grow your business.",
                "Γίνε μέλος της GREECEVEST για να σε ανακαλύψουν διεθνείς αγοραστές. Δημιούργησε το προφίλ σου, λάβε leads και ανάπτυξε την επιχείρησή σου."
              )}
            </p>
            <ul className="mt-8 inline-flex flex-col gap-3 text-left">
              {[
                tx("Verified professional profile", "Πιστοποιημένο επαγγελματικό προφίλ"),
                tx("Direct access to international buyers", "Άμεση πρόσβαση σε διεθνείς αγοραστές"),
                tx("Review system to build trust", "Σύστημα κριτικών για χτίσιμο εμπιστοσύνης"),
                tx("Dashboard to manage leads", "Πίνακας για διαχείριση leads"),
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-primary-foreground/80"
                >
                  <CheckCircle className="h-4 w-4 text-accent shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                {tx("Join as a Professional", "Γίνε επαγγελματίας")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
