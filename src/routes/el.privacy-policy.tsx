import { createFileRoute } from "@tanstack/react-router";
import { FooterEl } from "@/components/FooterEl";

export const Route = createFileRoute("/el/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Πολιτική απορρήτου | GREECEVEST" },
      {
        name: "description",
        content:
          "Διάβασε την πολιτική απορρήτου του GREECEVEST για τη συλλογή, χρήση και προστασία προσωπικών δεδομένων.",
      },
    ],
  }),
  component: PrivacyPolicyPageEl,
});

function PrivacyPolicyPageEl() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Πολιτική απορρήτου</h1>
          <p className="mt-3 text-primary-foreground/70">Τελευταία ενημέρωση: Απρίλιος 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Πληροφορίες που συλλέγουμε",
              text: "Συλλέγουμε πληροφορίες που μας παρέχεις, όπως όνομα, email, τηλέφωνο και οποιαδήποτε άλλη πληροφορία επιλέξεις.",
            },
            {
              title: "2. Πώς χρησιμοποιούμε τις πληροφορίες",
              text: "Χρησιμοποιούμε τις πληροφορίες για παροχή, συντήρηση και βελτίωση των υπηρεσιών μας.",
            },
            {
              title: "3. Κοινοποίηση πληροφοριών",
              text: "Δεν πουλάμε ούτε μεταφέρουμε τα προσωπικά σου δεδομένα σε τρίτους χωρίς τη συγκατάθεσή σου.",
            },
            {
              title: "4. Ασφάλεια δεδομένων",
              text: "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα ασφαλείας.",
            },
            {
              title: "5. Cookies",
              text: "Χρησιμοποιούμε cookies. Μπορείς να ρυθμίσεις το πρόγραμμα περιήγησης να αρνείται cookies.",
            },
            {
              title: "6. Τα δικαιώματά σου",
              text: "Βάσει GDPR, έχεις δικαίωμα πρόσβασης, διόρθωσης, διαγραφής και φορητότητας δεδομένων. Επικοινώνησε στο info@greecevest.gr.",
            },
            {
              title: "7. Αλλαγές πολιτικής",
              text: "Μπορεί να ενημερώσουμε αυτή την πολιτική. Θα σε ειδοποιήσουμε δημοσιεύοντας τη νέα εκδοχή.",
            },
            {
              title: "8. Επικοινωνία",
              text: "Για ερωτήσεις, επικοινώνησε στο info@greecevest.gr.",
            },
          ].map(({ title, text }) => (
            <div key={title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <FooterEl />
    </>
  );
}
