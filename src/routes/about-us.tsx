import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About GREECEVEST | Shaping the Future of Greek Real Estate" },
      {
        name: "description",
        content:
          "GREECEVEST was born from a real problem: navigating Greek real estate is complex. We're building the unified platform we wished existed.",
      },
      {
        property: "og:title",
        content: "About GREECEVEST | Shaping the Future of Greek Real Estate",
      },
      {
        property: "og:description",
        content:
          "GREECEVEST was born from a real problem: navigating Greek real estate is complex. We're building the unified platform we wished existed.",
      },
    ],
  }),
  component: AboutPage,
});
