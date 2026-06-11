import { Button } from "@/components/ui/button";

interface CTABannerProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  variant?: "navy" | "teal";
}

export function CTABanner({ headline, subheadline, ctaText, variant = "navy" }: CTABannerProps) {
  const bg = variant === "navy" ? "bg-primary" : "bg-accent";
  const text = "text-primary-foreground";

  return (
    <section className={`${bg} ${text} py-16 sm:py-20`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{headline}</h2>
        {/* <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2> */}
        <p className="mt-4 textbase sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">{subheadline}</p>
        {/* <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">{subheadline}</p> */}
        <Button
          size="lg"
          className={`mt-8 ${variant === "navy" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
