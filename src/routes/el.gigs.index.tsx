import { createFileRoute } from "@tanstack/react-router";
import { GigsIndex } from "./gigs.index";

export const Route = createFileRoute("/el/gigs/")({
  head: () => ({
    meta: [
      { title: "Έργα και Gigs | GREECEVEST" },
      { name: "description", content: "Δες τρέχοντα έργα από ιδιοκτήτες ακινήτων σε όλη την Ελλάδα." },
      { property: "og:title", content: "Έργα και Gigs | GREECEVEST" },
      { property: "og:description", content: "Δες τρέχοντα έργα από ιδιοκτήτες ακινήτων σε όλη την Ελλάδα." },
    ],
  }),
  component: GigsIndex,
});
