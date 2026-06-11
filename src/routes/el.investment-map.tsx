import { createFileRoute } from "@tanstack/react-router";
import { InvestmentMapPage } from "./investment-map";

export const Route = createFileRoute("/el/investment-map")({
  head: () => ({
    meta: [
      { title: "Χάρτης επενδύσεων στην Ελλάδα | GREECEVEST" },
      { name: "description", content: "Εξερεύνησε ευκαιρίες επένδυσης σε ακίνητα σε όλη την Ελλάδα στον διαδραστικό χάρτη." },
    ],
  }),
  component: InvestmentMapPage,
});
