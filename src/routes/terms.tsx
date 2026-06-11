import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | GREECEVEST" },
      {
        name: "description",
        content: "Read the terms of use and service provision for the GREECEVEST platform.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Terms of Use & Service Provision</h1>
          <p className="mt-3 text-primary-foreground/70">Last updated: April 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Acceptance of Terms",
              text: "By accessing and using the GREECEVEST platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.",
            },
            {
              title: "2. Description of Service",
              text: "GREECEVEST provides a marketplace platform connecting property buyers with real estate professionals in Greece. We facilitate introductions but are not a party to any transaction between buyers and professionals.",
            },
            {
              title: "3. User Accounts",
              text: "You are responsible for safeguarding the password you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.",
            },
            {
              title: "4. User Content",
              text: "Users may post content including property information, professional profiles, reviews, and messages. You retain all rights to your content but grant GREECEVEST a license to use, display, and distribute it on the platform.",
            },
            {
              title: "5. Professional Listings",
              text: "Professionals listed on GREECEVEST undergo a verification process. However, GREECEVEST does not guarantee the quality, accuracy, or legality of any services provided by professionals.",
            },
            {
              title: "6. Limitation of Liability",
              text: "GREECEVEST shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.",
            },
            {
              title: "7. Governing Law",
              text: "These Terms shall be governed and construed in accordance with the laws of Greece, without regard to its conflict of law provisions.",
            },
            {
              title: "8. Contact",
              text: "For any questions regarding these Terms, please contact us at info@greecevest.gr.",
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
