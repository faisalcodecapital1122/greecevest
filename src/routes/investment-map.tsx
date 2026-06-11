import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const InvestmentMapView = lazy(
  () => import("@/components/investment-map/InvestmentMapView"),
);

export const Route = createFileRoute("/investment-map")({
  head: () => ({
    meta: [
      { title: "Market Intelligence, Greek Real Estate | GREECEVEST" },
      {
        name: "description",
        content:
          "Live market intelligence for Greek real estate. Compare yields, prices, and Golden Visa opportunities across 110 markets, with rankings, ROI, and cost insights.",
      },
      { property: "og:title", content: "Market Intelligence | GREECEVEST" },
      {
        property: "og:description",
        content:
          "Live intelligence on Greek real estate yields, prices, and Golden Visa opportunities.",
      },
    ],
  }),
  component: InvestmentMapPage,
});

function Skeleton() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-10 w-1/2 rounded bg-muted animate-pulse mb-4" />
      <div className="grid lg:grid-cols-[300px_1fr_380px] gap-4 h-[640px]">
        <div className="rounded-2xl bg-muted animate-pulse" />
        <div className="rounded-2xl bg-muted animate-pulse" />
        <div className="rounded-2xl bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function InvestmentMapPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Skeleton />;
  return (
    <Suspense fallback={<Skeleton />}>
      <InvestmentMapView />
    </Suspense>
  );
}
