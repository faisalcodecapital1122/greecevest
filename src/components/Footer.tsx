import { LocaleLink, useTx } from "@/i18n/locale";
import logo from "@/assets/logo-greecevest.svg";

export function Footer() {
  const tx = useTx();

  const platformLinks = [
    { to: "/properties", label: tx("Properties", "Ακίνητα") },
    { to: "/professionals", label: tx("Professionals", "Επαγγελματίες") },
  ];

  const companyLinks = [
    { to: "/about-us", label: tx("About", "Σχετικά") },
    { to: "/contact-us", label: tx("Contact", "Επικοινωνία") },
    { to: "/login", label: tx("Log In", "Σύνδεση") },
    { to: "/signup", label: tx("Sign Up", "Εγγραφή") },
  ];

  const legalLinks = [
    { to: "/privacy-policy", label: tx("Privacy Policy", "Πολιτική απορρήτου") },
    { to: "/terms", label: tx("Terms of Use", "Όροι χρήσης") },
    { to: "/data-protection", label: tx("Data Protection", "Προστασία δεδομένων") },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            {/* <img src={logo} alt="GREECEVEST" className="h-14 w-auto brightness-0 invert" /> */}
            <img src={logo} alt="GREECEVEST" className="sm:h-14 h-12 w-auto brightness-0 invert" />
            <p className="text-sm text-primary-foreground/60 mt-3">
              {tx(
                "Your all-in-one platform for Greek real estate.",
                "Η πλήρης πλατφόρμα για ελληνικά ακίνητα.",
              )}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{tx("Platform", "Πλατφόρμα")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {platformLinks.map((l) => (
                <li key={l.to}>
                  <LocaleLink to={l.to} className="hover:text-primary-foreground transition-colors">
                    {l.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{tx("Company", "Εταιρεία")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <LocaleLink to={l.to} className="hover:text-primary-foreground transition-colors">
                    {l.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">{tx("Legal", "Νομικά")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <LocaleLink to={l.to} className="hover:text-primary-foreground transition-colors">
                    {l.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} GREECEVEST.{" "}
          {tx("All rights reserved.", "Με επιφύλαξη παντός δικαιώματος.")}
        </div>
      </div>
    </footer>
  );
}
