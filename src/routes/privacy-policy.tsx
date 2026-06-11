import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | GREECEVEST" },
      {
        name: "description",
        content:
          "Read GREECEVEST's privacy policy to understand how we collect, use, and protect your personal data.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-primary-foreground/70">Last updated: April 2026</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            {
              title: "1. Information We Collect",
              text: "We collect information you provide directly to us, such as when you create an account, fill out a form, make an inquiry, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.",
            },
            {
              title: "2. How We Use Your Information",
              text: "We use the information we collect to provide, maintain, and improve our services, to send you technical notices, updates, and support messages, and to respond to your comments, questions, and requests.",
            },
            {
              title: "3. Information Sharing",
              text: "We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy or as required by law.",
            },
            {
              title: "4. Data Security",
              text: "We implement appropriate technical and organizational security measures to protect the security of your personal information. However, no method of transmission over the Internet is 100% secure.",
            },
            {
              title: "5. Cookies",
              text: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.",
            },
            {
              title: "6. Your Rights",
              text: "Under GDPR, you have the right to access, rectify, or erase your personal data, restrict processing, data portability, and the right to object to processing. Contact us at info@greecevest.gr to exercise these rights.",
            },
            {
              title: "7. Changes to This Policy",
              text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'last updated' date.",
            },
            {
              title: "8. Contact Us",
              text: "If you have any questions about this Privacy Policy, please contact us at info@greecevest.gr.",
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
