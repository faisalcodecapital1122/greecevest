import { createFileRoute } from "@tanstack/react-router";
import { PropertiesPage } from "./properties.index";

export const Route = createFileRoute("/el/properties/")({
  head: () => ({
    meta: [
      { title: "Ακίνητα προς επένδυση στην Ελλάδα | GREECEVEST" },
      { name: "description", content: "Ανακάλυψε προεπιλεγμένα ακίνητα προς επένδυση σε όλη την Ελλάδα: από διαμερίσματα στην Αθήνα έως βίλες στα νησιά." },
      { property: "og:title", content: "Ακίνητα προς επένδυση στην Ελλάδα | GREECEVEST" },
      { property: "og:description", content: "Ανακάλυψε προεπιλεγμένα ακίνητα προς επένδυση σε όλη την Ελλάδα." },
    ],
  }),
  component: PropertiesPage,
});
