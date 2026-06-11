import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalsPage } from "./professionals.index";

export const Route = createFileRoute("/el/professionals")({
  head: () => ({
    meta: [
      { title: "Πιστοποιημένοι επαγγελματίες ακινήτων, Δικηγόροι, μεσίτες και περισσότεροι | GREECEVEST" },
      { name: "description", content: "Βρες πιστοποιημένους μεσίτες, δικηγόρους, αρχιτέκτονες και φοροτεχνικούς για την επένδυσή σου στην Ελλάδα." },
      { property: "og:title", content: "Πιστοποιημένοι επαγγελματίες ακινήτων στην Ελλάδα | GREECEVEST" },
      { property: "og:description", content: "Βρες πιστοποιημένους μεσίτες, δικηγόρους, αρχιτέκτονες και φοροτεχνικούς για την επένδυσή σου στην Ελλάδα." },
    ],
  }),
  component: ProfessionalsPage,
});
