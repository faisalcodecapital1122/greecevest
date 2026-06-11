import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/el/about-us")({
  head: () => ({
    meta: [
      { title: "Σχετικά με το GREECEVEST | Χτίζουμε το μέλλον της ελληνικής αγοράς ακινήτων" },
      {
        name: "description",
        content:
          "Το GREECEVEST γεννήθηκε από ένα πραγματικό πρόβλημα: η ελληνική αγορά ακινήτων είναι περίπλοκη. Φτιάχνουμε την ενοποιημένη πλατφόρμα που πάντα θέλαμε να υπάρχει.",
      },
      {
        property: "og:title",
        content: "Σχετικά με το GREECEVEST | Χτίζουμε το μέλλον της ελληνικής αγοράς ακινήτων",
      },
      {
        property: "og:description",
        content:
          "Το GREECEVEST γεννήθηκε από ένα πραγματικό πρόβλημα: η ελληνική αγορά ακινήτων είναι περίπλοκη. Φτιάχνουμε την ενοποιημένη πλατφόρμα που πάντα θέλαμε να υπάρχει.",
      },
    ],
  }),
  component: AboutPage,
});
