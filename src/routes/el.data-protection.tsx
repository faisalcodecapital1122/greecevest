import { createFileRoute } from "@tanstack/react-router";
import { FooterEl } from "@/components/FooterEl";

export const Route = createFileRoute("/el/data-protection")({
  head: () => ({
    meta: [
      { title: "Προστασία προσωπικών δεδομένων | GREECEVEST" },
      {
        name: "description",
        content:
          "Μάθε πώς το GREECEVEST προστατεύει τα προσωπικά σου δεδομένα σύμφωνα με τον GDPR.",
      },
    ],
  }),
  component: DataProtectionPageEl,
});

function DataProtectionPageEl() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Δήλωση προστασίας προσωπικών δεδομένων
          </h1>
          <p className="mt-3 text-primary-foreground/70">Τελευταία ενημέρωση: Απρίλιος 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Υπεύθυνος επεξεργασίας",
              text: "Το GREECEVEST ενεργεί ως υπεύθυνος επεξεργασίας δεδομένων σύμφωνα με τον GDPR και την ελληνική νομοθεσία.",
            },
            {
              title: "2. Νομική βάση επεξεργασίας",
              text: "Επεξεργαζόμαστε δεδομένα βάσει: συγκατάθεσης, εκτέλεσης σύμβασης, νομικών υποχρεώσεων και νόμιμων συμφερόντων.",
            },
            {
              title: "3. Δεδομένα που επεξεργαζόμαστε",
              text: "Επεξεργαζόμαστε: στοιχεία ταυτότητας, δεδομένα λογαριασμού, δεδομένα χρήσης και αρχεία επικοινωνίας.",
            },
            {
              title: "4. Διατήρηση δεδομένων",
              text: "Διατηρούμε δεδομένα μόνο για όσο χρειάζεται για την εκπλήρωση των σκοπών συλλογής.",
            },
            {
              title: "5. Διεθνείς μεταφορές",
              text: "Τα δεδομένα μπορεί να μεταφερθούν εκτός ΕΟΧ με κατάλληλες εγγυήσεις (τυπικές συμβατικές ρήτρες).",
            },
            {
              title: "6. Δικαιώματα βάσει GDPR",
              text: "Έχεις δικαίωμα: πρόσβασης, διόρθωσης, διαγραφής, περιορισμού, φορητότητας, εναντίωσης και ανάκλησης συγκατάθεσης.",
            },
            {
              title: "7. Υπεύθυνος προστασίας δεδομένων",
              text: "Για ερωτήσεις, επικοινώνησε στο dpo@greecevest.gr.",
            },
            {
              title: "8. Εποπτική αρχή",
              text: "Έχεις δικαίωμα υποβολής καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ).",
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
