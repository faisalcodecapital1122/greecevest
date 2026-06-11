import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/pages/ContactPage";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact GREECEVEST | Get Expert Help with Greek Property" },
      {
        name: "description",
        content:
          "Have questions about buying property in Greece? Contact the GREECEVEST team for expert guidance on investments, Golden Visa, and professional connections.",
      },
      { property: "og:title", content: "Contact GREECEVEST | Get Expert Help with Greek Property" },
      {
        property: "og:description",
        content:
          "Have questions about buying property in Greece? Contact the GREECEVEST team for expert guidance.",
      },
    ],
  }),
  component: ContactPage,
});
