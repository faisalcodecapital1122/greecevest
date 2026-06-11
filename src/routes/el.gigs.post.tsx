import { createFileRoute } from "@tanstack/react-router";
import { PostGigPage } from "./gigs.post";

export const Route = createFileRoute("/el/gigs/post")({
  head: () => ({
    meta: [
      { title: "Δημοσίευση Gig | GREECEVEST" },
      { name: "description", content: "Δημοσίευσε ένα νέο έργο για επαγγελματίες στην Ελλάδα." },
    ],
  }),
  component: PostGigPage,
});
