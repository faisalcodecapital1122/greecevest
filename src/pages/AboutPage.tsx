import { Eye, Award, Compass, Link2, Globe2, Home, Briefcase } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { useTx } from "@/i18n/locale";
import heroImage from "@/assets/about-hero.jpg";
import storyImage from "@/assets/about-story.jpg";

export function AboutPage() {
  const tx = useTx();

  const values = [
    {
      icon: Eye,
      title: tx("Transparency", "Διαφάνεια"),
      desc: tx(
        "Full visibility into every property, process, and professional, with no hidden surprises.",
        "Πλήρης ορατότητα σε κάθε ακίνητο, διαδικασία και επαγγελματία, χωρίς κρυφές εκπλήξεις.",
      ),
    },
    {
      icon: Award,
      title: tx("Quality", "Ποιότητα"),
      desc: tx(
        "Every listing verified, every professional vetted across all eight categories. We hold the bar high.",
        "Κάθε καταχώρηση επαληθευμένη, κάθε επαγγελματίας ελεγμένος και στις οκτώ κατηγορίες. Κρατάμε ψηλά τον πήχη.",
      ),
    },
    {
      icon: Compass,
      title: tx("Clarity", "Σαφήνεια"),
      desc: tx(
        "Complex processes made simple, with clear guidance from first search to long-term ownership.",
        "Πολύπλοκες διαδικασίες γίνονται απλές, με σαφή καθοδήγηση από την πρώτη αναζήτηση έως τη μακροχρόνια κατοχή.",
      ),
    },
    {
      icon: Link2,
      title: tx("Connection", "Σύνδεση"),
      desc: tx(
        "Bridging properties, owners, buyers, and the full network of professionals who serve them.",
        "Συνδέουμε ακίνητα, ιδιοκτήτες, αγοραστές και ολόκληρο το δίκτυο επαγγελματιών που τους εξυπηρετούν.",
      ),
    },
  ];

  const audiences = [
    {
      icon: Globe2,
      title: tx("International buyers", "Διεθνείς αγοραστές"),
      desc: tx(
        "Discover verified properties and English-speaking professionals across all eight categories, so you can buy, build, or move to Greece with confidence from anywhere.",
        "Ανακάλυψε πιστοποιημένα ακίνητα και αγγλόφωνους επαγγελματίες σε όλες τις οκτώ κατηγορίες, ώστε να αγοράσεις, να χτίσεις ή να μετακομίσεις στην Ελλάδα με σιγουριά από οπουδήποτε.",
      ),
    },
    {
      icon: Home,
      title: tx("Local buyers, sellers & owners", "Έλληνες αγοραστές, πωλητές και ιδιοκτήτες"),
      desc: tx(
        "Greek residents finding a home, selling a flat, renovating, or managing a rental, with vetted lawyers, notaries, architects, contractors, and managers all in one place.",
        "Έλληνες που αναζητούν σπίτι, πουλούν διαμέρισμα, ανακαινίζουν ή διαχειρίζονται μίσθωμα, με ελεγμένους δικηγόρους, συμβολαιογράφους, αρχιτέκτονες, εργολάβους και διαχειριστές σε ένα μέρος.",
      ),
    },
    {
      icon: Briefcase,
      title: tx("Property professionals", "Επαγγελματίες ακινήτων"),
      desc: tx(
        "From legal and financial to construction, management, tech, and lifestyle. Reach serious clients, build trust through verified reviews, and grow your practice.",
        "Από νομικά και χρηματοοικονομικά μέχρι κατασκευή, διαχείριση, τεχνολογία και lifestyle. Φτάσε σε σοβαρούς πελάτες, χτίσε εμπιστοσύνη μέσω πιστοποιημένων αξιολογήσεων και αναπτύξου επαγγελματικά.",
      ),
    },
  ];

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <img
          src={heroImage}
          alt={tx(
            "Athens skyline with the Acropolis at golden hour",
            "Το πανόραμα της Αθήνας με την Ακρόπολη το σούρουπο",
          )}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("About Us", "Σχετικά με εμάς")}
            </span>
            {/* <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight"> */}
            <h1 className="mt-3 text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight">
              {tx("Shaping the future of ", "Χτίζουμε το μέλλον της ")}
              <span className="text-accent">
                {tx("Greek real estate.", "ελληνικής αγοράς ακινήτων.")}
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
              {tx(
                "One platform uniting buyers, owners, and eight categories of verified professionals, from legal and financial to construction, property management, and lifestyle support.",
                "Μία πλατφόρμα που ενώνει αγοραστές, ιδιοκτήτες και οκτώ κατηγορίες πιστοποιημένων επαγγελματιών, από νομικά και χρηματοοικονομικά έως κατασκευή, διαχείριση ακινήτων και lifestyle.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {tx("Our Story", "Η ιστορία μας")}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                {tx("Born from a real problem.", "Γεννηθήκαμε από ένα πραγματικό πρόβλημα.")}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {tx(
                    "GREECEVEST was born when our founder saw how tangled Greek real estate had become for everyone involved. Not only foreign buyers, but everyday Greeks selling a family home, owners managing a rental, or families planning a renovation. Finding a trusted lawyer, notary, architect, contractor, or property manager was a word-of-mouth lottery.",
                    "Το GREECEVEST γεννήθηκε όταν ο ιδρυτής μας είδε πόσο μπερδεμένη είχε γίνει η ελληνική αγορά ακινήτων για όλους. Όχι μόνο για ξένους αγοραστές, αλλά και για Έλληνες που πουλούσαν πατρικό, ιδιοκτήτες που διαχειρίζονταν μίσθωμα ή οικογένειες που σχεδίαζαν ανακαίνιση. Η εύρεση έμπιστου δικηγόρου, συμβολαιογράφου, αρχιτέκτονα, εργολάβου ή διαχειριστή ήταν λοταρία στόμα με στόμα.",
                  )}
                </p>
                <p>
                  {tx(
                    "Listings were scattered across dozens of channels. Credentials were impossible to verify. Each stage, from search and due diligence to construction, management, and lifestyle support, lived in its own silo. Whether you were buying a villa from abroad, selling a flat in Athens, or moving in down the street, the journey was exhausting.",
                    "Οι καταχωρήσεις ήταν διασκορπισμένες σε δεκάδες κανάλια. Τα διαπιστευτήρια ήταν αδύνατο να επαληθευτούν. Κάθε στάδιο, από αναζήτηση και έλεγχο μέχρι κατασκευή, διαχείριση και υποστήριξη lifestyle, ζούσε στο δικό του σιλό. Είτε αγόραζες βίλα από το εξωτερικό, είτε πουλούσες διαμέρισμα στην Αθήνα, είτε μετακόμιζες δίπλα, η διαδρομή ήταν εξαντλητική.",
                  )}
                </p>
                <p>
                  {tx(
                    "We built GREECEVEST to fix that. Verified properties, eight categories of vetted professionals (legal, financial, technical, construction, management, maintenance, tech, and lifestyle), and clear guidance, all in one platform for buyers, sellers, owners, movers, and the professionals who serve them.",
                    "Φτιάξαμε το GREECEVEST για να το διορθώσουμε. Πιστοποιημένα ακίνητα, οκτώ κατηγορίες ελεγμένων επαγγελματιών (νομικά, χρηματοοικονομικά, τεχνικά, κατασκευή, διαχείριση, συντήρηση, τεχνολογία και lifestyle), και σαφή καθοδήγηση, όλα σε μία πλατφόρμα για αγοραστές, πωλητές, ιδιοκτήτες, μετακινούμενους και τους επαγγελματίες που τους εξυπηρετούν.",
                  )}
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-elegant aspect-[4/5] md:aspect-square">
              <img
                src={storyImage}
                alt={tx(
                  "A quiet neoclassical street in Plaka, Athens with the Acropolis above",
                  "Ένα ήσυχο νεοκλασικό δρομάκι στην Πλάκα, με την Ακρόπολη πάνω",
                )}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-accent">2024</span>
                  <span className="text-sm font-semibold text-foreground">
                    {tx("Founded in Athens", "Ιδρύθηκε στην Αθήνα")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tx(
                    "Built on the ground we know best, with a mission to change how people buy, sell, own, and care for Greek property.",
                    "Χτισμένο στον τόπο που γνωρίζουμε καλύτερα, με αποστολή να αλλάξουμε τον τρόπο που οι άνθρωποι αγοράζουν, πουλούν, κατέχουν και φροντίζουν ελληνικά ακίνητα.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-accent/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {tx("Our Mission", "Η αποστολή μας")}
          </span>
          {/* <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground"> */}
          <h2 className="mt-3 text-[26px] leading-[1.2] sm:text-3xl md:text-4xl font-bold text-foreground">
            {tx(
              "To simplify and professionalize Greek real estate for everyone.",
              "Να απλοποιήσουμε και να αναβαθμίσουμε την ελληνική αγορά ακινήτων για όλους.",
            )}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {tx(
              "Buyers, sellers, owners, movers, and the eight categories of professionals who serve them all deserve transparency, quality, and clarity at every step.",
              "Αγοραστές, πωλητές, ιδιοκτήτες, μετακινούμενοι και οι οκτώ κατηγορίες επαγγελματιών που τους εξυπηρετούν αξίζουν διαφάνεια, ποιότητα και σαφήνεια σε κάθε βήμα.",
            )}
          </p>

          <div className="mt-10 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center shadow-elegant">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              {tx("Our Vision", "Το όραμά μας")}
            </span>
            <p className="mt-3 text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              {tx(
                "A unified digital ecosystem where verified properties and vetted professionals, across legal, financial, technical, construction, management, maintenance, tech, and lifestyle, come together for a modern, transparent, end-to-end real estate experience.",
                "Ένα ενοποιημένο ψηφιακό οικοσύστημα όπου πιστοποιημένα ακίνητα και ελεγμένοι επαγγελματίες, σε νομικά, χρηματοοικονομικά, τεχνικά, κατασκευή, διαχείριση, συντήρηση, τεχνολογία και lifestyle, ενώνονται για μια σύγχρονη, διαφανή και ολοκληρωμένη εμπειρία ακινήτων.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("Who It's For", "Για ποιους είναι")}
            </span>
            {/* <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground"> */}
            <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.2]">
              {tx(
                "Built for everyone in Greek property.",
                "Φτιαγμένο για όλους στην ελληνική αγορά ακινήτων.",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tx(
                "Whether you're buying from abroad, selling a family home, renovating, managing a rental, or running a practice that serves any of them, GREECEVEST is built for you.",
                "Είτε αγοράζεις από το εξωτερικό, πουλάς πατρικό, ανακαινίζεις, διαχειρίζεσαι μίσθωμα ή έχεις γραφείο που τους εξυπηρετεί, το GREECEVEST είναι φτιαγμένο για σένα.",
              )}
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {audiences.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="bg-card rounded-xl border border-border p-6 transition-all hover:border-accent/40 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("What We Stand For", "Τι πρεσβεύουμε")}
            </span>
            {/* <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground"> */}
            <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.2]">
              {tx("Our Core Values", "Οι βασικές μας αξίες")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tx(
                "The principles that guide every decision we make.",
                "Οι αρχές που καθοδηγούν κάθε απόφασή μας.",
              )}
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="bg-card rounded-xl border border-border p-6 transition-all hover:border-accent/40 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline={tx(
          "Be part of the future of Greek real estate.",
          "Γίνε μέρος του μέλλοντος των ελληνικών ακινήτων.",
        )}
        subheadline={tx(
          "Join GREECEVEST today and experience a new standard in property investment.",
          "Μπες στο GREECEVEST σήμερα και ζήσε ένα νέο πρότυπο στην επένδυση ακινήτων.",
        )}
        ctaText={tx("Sign Up Free", "Εγγραφή δωρεάν")}
      />

      <Footer />
    </>
  );
}
