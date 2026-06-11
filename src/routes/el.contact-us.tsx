import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/pages/ContactPage";

export const Route = createFileRoute("/el/contact-us")({
  head: () => ({
    meta: [
      { title: "Επικοινωνία | GREECEVEST" },
      {
        name: "description",
        content:
          "Έχεις απορίες για αγορά ακινήτου στην Ελλάδα; Επικοινώνησε με την ομάδα του GREECEVEST για εξειδικευμένη καθοδήγηση σε επενδύσεις, Golden Visa και επαγγελματίες.",
      },
      { property: "og:title", content: "Επικοινωνία | GREECEVEST" },
      {
        property: "og:description",
        content:
          "Έχεις απορίες για αγορά ακινήτου στην Ελλάδα; Επικοινώνησε με την ομάδα του GREECEVEST για εξειδικευμένη καθοδήγηση.",
      },
    ],
  }),
  component: ContactPage,
});
