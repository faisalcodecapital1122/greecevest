import { createFileRoute } from "@tanstack/react-router";
import { FooterEl } from "@/components/FooterEl";

export const Route = createFileRoute("/el/terms")({
  head: () => ({
    meta: [
      { title: "Όροι χρήσης | GREECEVEST" },
      {
        name: "description",
        content: "Διάβασε τους όρους χρήσης και παροχής υπηρεσιών της πλατφόρμας GREECEVEST.",
      },
    ],
  }),
  component: TermsPageEl,
});

function TermsPageEl() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Όροι χρήσης και παροχής υπηρεσιών</h1>
          <p className="mt-3 text-primary-foreground/70">Τελευταία ενημέρωση: Απρίλιος 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Αποδοχή όρων",
              text: "Με τη χρήση της πλατφόρμας GREECEVEST, αποδέχεσαι και δεσμεύεσαι από τους παρόντες όρους.",
            },
            {
              title: "2. Περιγραφή υπηρεσίας",
              text: "Το GREECEVEST παρέχει πλατφόρμα σύνδεσης αγοραστών ακινήτων με επαγγελματίες στην Ελλάδα. Διευκολύνουμε γνωριμίες αλλά δεν είμαστε μέρος συναλλαγών.",
            },
            {
              title: "3. Λογαριασμοί χρηστών",
              text: "Είσαι υπεύθυνος για τον κωδικό πρόσβασής σου και τις ενέργειες που γίνονται με αυτόν.",
            },
            {
              title: "4. Περιεχόμενο χρηστών",
              text: "Διατηρείς τα δικαιώματα στο περιεχόμενό σου αλλά χορηγείς στο GREECEVEST άδεια χρήσης και εμφάνισής του.",
            },
            {
              title: "5. Καταχωρήσεις επαγγελματιών",
              text: "Οι επαγγελματίες υπόκεινται σε διαδικασία πιστοποίησης. Δεν εγγυόμαστε την ποιότητα των υπηρεσιών τους.",
            },
            {
              title: "6. Περιορισμός ευθύνης",
              text: "Το GREECEVEST δεν φέρει ευθύνη για έμμεσες, τυχαίες ή αποθετικές ζημίες.",
            },
            {
              title: "7. Εφαρμοστέο δίκαιο",
              text: "Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο.",
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
