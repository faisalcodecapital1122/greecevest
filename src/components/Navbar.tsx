import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleLink, useLocale, useLp, useTx } from "@/i18n/locale";
import logo from "@/assets/logo-greecevest.svg";

const navLink =
  "relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm";
const navLinkActive =
  "relative text-sm font-medium text-foreground py-2 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-accent after:rounded-full";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const tx = useTx();
  const lp = useLp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { to: "/properties", label: tx("Properties", "Ακίνητα") },
    { to: "/professionals", label: tx("Professionals", "Επαγγελματίες") },
    { to: "/investment-map", label: tx("Market Intelligence", "Αγορά") },
    { to: "/about-us", label: tx("About", "Σχετικά") },
    { to: "/contact-us", label: tx("Contact", "Επικοινωνία") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? "border-border shadow-sm" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "h-13 sm:h-16" : "h-16 sm:h-20"
        }`}
      >
        <LocaleLink
          to="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md"
          aria-label={tx("GREECEVEST, home", "GREECEVEST, αρχική")}
        >
          <img
            src={logo}
            alt="GREECEVEST"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-7 sm:h-10" : "h-9 sm:h-12"}`}
            // className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
          />
        </LocaleLink>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <LocaleLink
              key={item.to}
              to={item.to}
              className={navLink}
              activeProps={{ className: navLinkActive }}
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {/* Language switch jumps to the opposite locale's home page */}
          <a
            href={locale === "el" ? "/" : "/el"}
            className="text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground border border-border hover:border-accent/50 rounded-full px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={locale === "el" ? "Switch to English" : "Switch to Greek"}
          >
            {locale === "el" ? "EN" : "GR"}
          </a>
          <span className="w-px h-5 bg-border mx-1" aria-hidden="true" />
          <LocaleLink to="/login">
            <Button variant="ghost" size="sm">
              {tx("Log In", "Σύνδεση")}
            </Button>
          </LocaleLink>
          <LocaleLink to="/signup">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
            >
              {tx("Sign Up Free", "Εγγραφή")}
            </Button>
          </LocaleLink>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen
              ? tx("Close menu", "Κλείσιμο μενού")
              : tx("Open menu", "Άνοιγμα μενού")
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-[80vh] border-b border-border" : "max-h-0"
        } bg-card`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <LocaleLink
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 border-b border-border/40 last:border-b-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </LocaleLink>
          ))}
          <a
            href={locale === "el" ? "/" : "/el"}
            className="text-sm font-medium text-accent hover:text-accent/80 py-3"
            onClick={() => setMobileOpen(false)}
          >
            {locale === "el" ? "🇬🇧 English" : "🇬🇷 Ελληνικά"}
          </a>
          <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
            <LocaleLink to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">
                {tx("Log In", "Σύνδεση")}
              </Button>
            </LocaleLink>
            <LocaleLink to="/signup" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              >
                {tx("Sign Up Free", "Εγγραφή")}
              </Button>
            </LocaleLink>
          </div>
        </nav>
      </div>
      {/* keep lp referenced for future use without breaking strict tsc */}
      <span hidden>{lp("/")}</span>
    </header>
  );
}
