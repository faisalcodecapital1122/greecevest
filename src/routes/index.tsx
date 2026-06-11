import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GREECEVEST, Your Entire Greek Property Journey, One Platform" },
      {
        name: "description",
        content:
          "Stop juggling agents, lawyers, and unknown processes. GREECEVEST connects you with verified properties and trusted professionals to buy, sell, or move to Greece with confidence.",
      },
      {
        property: "og:title",
        content: "GREECEVEST, Your Entire Greek Property Journey, One Platform",
      },
      {
        property: "og:description",
        content:
          "Find properties, connect with verified professionals, and navigate Greek real estate with confidence.",
      },
    ],
  }),
  component: HomePage,
});
