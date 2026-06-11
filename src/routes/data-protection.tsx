import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/data-protection")({
  head: () => ({
    meta: [
      { title: "Personal Data Protection | GREECEVEST" },
      {
        name: "description",
        content:
          "Learn about GREECEVEST's personal data protection statement and how we comply with GDPR regulations.",
      },
    ],
  }),
  component: DataProtectionPage,
});

function DataProtectionPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Personal Data Protection Statement
          </h1>
          <p className="mt-3 text-primary-foreground/70">Last updated: April 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Data Controller",
              text: "GREECEVEST acts as the data controller for personal information collected through this platform. We are committed to protecting your privacy in accordance with the General Data Protection Regulation (GDPR) and Greek data protection laws.",
            },
            {
              title: "2. Legal Basis for Processing",
              text: "We process your personal data based on: your consent, performance of a contract, compliance with legal obligations, and our legitimate interests in operating and improving our platform.",
            },
            {
              title: "3. Data We Process",
              text: "We process personal data including: identification data (name, email, phone), account data, usage data, communication records, and any additional information you voluntarily provide.",
            },
            {
              title: "4. Data Retention",
              text: "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.",
            },
            {
              title: "5. International Transfers",
              text: "Your data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure appropriate safeguards are in place, including Standard Contractual Clauses.",
            },
            {
              title: "6. Your Rights Under GDPR",
              text: "You have the right to: access your personal data, rectification, erasure ('right to be forgotten'), restriction of processing, data portability, object to processing, and withdraw consent at any time.",
            },
            {
              title: "7. Data Protection Officer",
              text: "For questions about our data protection practices or to exercise your rights, contact our Data Protection Officer at dpo@greecevest.gr.",
            },
            {
              title: "8. Supervisory Authority",
              text: "You have the right to lodge a complaint with the Hellenic Data Protection Authority (HDPA) if you believe your data protection rights have been violated.",
            },
          ].map(({ title, text }) => (
            <div key={title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
