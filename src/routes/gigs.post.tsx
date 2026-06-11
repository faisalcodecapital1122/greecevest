import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";
import { addGig, GIG_CATEGORIES, type GigCategory } from "@/data/gigs-store";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/gigs/post")({
  head: () => ({
    meta: [
      { title: "Post a Gig | GREECEVEST" },
      {
        name: "description",
        content:
          "Describe the work you need on your property and get private quotes from verified professionals across Greece.",
      },
    ],
  }),
  component: PostGigPage,
});

export function PostGigPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<GigCategory>("plumbing");
  const [location, setLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.slice(0, 5 - photos.length).forEach((file) => {
      if (file.size > 3 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotos((p) => [...p, reader.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (title.trim().length < 5) return setError("Please add a clearer title (min 5 characters).");
    if (description.trim().length < 20)
      return setError("Please describe the job in at least 20 characters.");
    if (!location.trim()) return setError("Location is required.");
    if (!name.trim() || !email.includes("@"))
      return setError("Please provide your name and a valid email.");

    setSubmitting(true);
    const gig = addGig({
      title: title.trim().slice(0, 140),
      description: description.trim().slice(0, 2000),
      category,
      location: location.trim().slice(0, 100),
      budgetMinEur: budgetMin ? Number(budgetMin) : undefined,
      budgetMaxEur: budgetMax ? Number(budgetMax) : undefined,
      timeframe: timeframe.trim() || undefined,
      photos,
      postedByName: name.trim().slice(0, 80),
      postedByEmail: email.trim().slice(0, 120),
    });
    navigate({ to: "/gigs/$id", params: { id: gig.id } });
  };

  return (
    <>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/gigs"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to gigs
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Post a gig</h1>
          <p className="mt-3 text-primary-foreground/80">
            Tell us what you need. Verified professionals will send you private quotes, only you see
            them.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Need a plumber to fix a leaking pipe"
                maxLength={140}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GigCategory)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {GIG_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Athens, Kolonaki"
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the work, materials, access details, anything pros need to know…"
                rows={6}
                maxLength={2000}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Min budget (€)
                </label>
                <Input
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="optional"
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Max budget (€)
                </label>
                <Input
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="optional"
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Timeframe
                </label>
                <Input
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  placeholder="e.g. Within 2 weeks"
                  maxLength={80}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Photos (optional, up to 5)
              </label>
              <div className="flex flex-wrap gap-3">
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-border"
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 bg-background/90 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <label className="w-24 h-24 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 text-muted-foreground">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs mt-1">Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  maxLength={80}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  maxLength={120}
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {submitting ? "Posting…" : "Post Gig"}
              </Button>
              <Link to="/gigs">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
