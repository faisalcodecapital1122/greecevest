import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/el/")({
  head: () => ({
    meta: [
      { title: "GREECEVEST, Όλη η διαδρομή του ελληνικού ακινήτου σε μία πλατφόρμα" },
      {
        name: "description",
        content:
          "Σταμάτα να κυνηγάς μεσίτες, δικηγόρους και άγνωστες διαδικασίες. Το GREECEVEST σε συνδέει με πιστοποιημένα ακίνητα και έμπιστους επαγγελματίες για να αγοράσεις, να πουλήσεις ή να μετακομίσεις στην Ελλάδα με σιγουριά.",
      },
      {
        property: "og:title",
        content: "GREECEVEST, Όλη η διαδρομή του ελληνικού ακινήτου σε μία πλατφόρμα",
      },
      {
        property: "og:description",
        content:
          "Βρες ακίνητα, συνδέσου με πιστοποιημένους επαγγελματίες και κινήσου με σιγουριά στην ελληνική αγορά ακινήτων.",
      },
    ],
  }),
  component: HomePage,
});
