import {
  Search,
  Shield,
  ArrowRight,
  CheckCircle,
  MapPin,
  Globe,
  Compass,
  Home,
  Briefcase,
  Building,
  Users,
  Scale,
  Ruler,
  Building2,
  HardHat,
  KeyRound,
  Wrench,
  Camera,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PropertyCard } from "@/components/PropertyCard";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { LocaleLink, useTx } from "@/i18n/locale";
import { demoProperties } from "@/data/demo-data";
import heroImage from "@/assets/hero-homepage.jpg";

export function HomePage() {
  const tx = useTx();

  const audiences = [
    {
      num: "01",
      tag: tx("Buyers", "Αγοραστές"),
      title: tx(
        "Property buyers, local and international",
        "Αγοραστές ακινήτων, στην Ελλάδα και διεθνώς",
      ),
      desc: tx(
        "Discover verified listings, save searches, and message agents directly. Get expert help when you need it, from legal to lifestyle.",
        "Ανακάλυψε πιστοποιημένες καταχωρήσεις, αποθήκευσε αναζητήσεις και επικοινώνησε απευθείας με μεσίτες. Λάβε εξειδικευμένη βοήθεια όποτε τη χρειάζεσαι, από νομικά μέχρι lifestyle.",
      ),
      points: [
        tx("Advanced filters and map-based search", "Προηγμένα φίλτρα και αναζήτηση στον χάρτη"),
        tx(
          "Saved alerts when new listings match",
          "Ειδοποιήσεις όταν εμφανίζονται νέα ταιριαστά ακίνητα",
        ),
        tx(
          "Direct messaging with agencies and owners",
          "Απευθείας μηνύματα με μεσιτικά γραφεία και ιδιοκτήτες",
        ),
        tx(
          "Connect with verified professionals on demand",
          "Σύνδεση με πιστοποιημένους επαγγελματίες όποτε χρειαστεί",
        ),
      ],
      cta: tx("Sign up as a Buyer", "Εγγραφή ως αγοραστής"),
      Icon: Home,
    },
    {
      num: "02",
      tag: tx("Agencies", "Μεσιτικά γραφεία"),
      title: tx("Real estate agents and brokerages", "Μεσίτες και μεσιτικά γραφεία"),
      desc: tx(
        "Reach an international, qualified audience. Manage listings, leads, and conversations from one workspace.",
        "Φτάσε σε ένα διεθνές, ποιοτικό κοινό. Διαχειρίσου καταχωρήσεις, leads και συνομιλίες από έναν χώρο εργασίας.",
      ),
      points: [
        tx(
          "List properties with rich media and full visibility",
          "Καταχώρησε ακίνητα με πλούσιο υλικό και πλήρη προβολή",
        ),
        tx(
          "Receive leads pre-qualified by intent and budget",
          "Λάβε leads προ-αξιολογημένα κατά πρόθεση και προϋπολογισμό",
        ),
        tx(
          "One dashboard for inquiries across every listing",
          "Ένα dashboard για όλα τα αιτήματα ανά καταχώρηση",
        ),
        tx(
          "Stand out with a verified agency profile",
          "Ξεχώρισε με πιστοποιημένο προφίλ γραφείου",
        ),
      ],
      cta: tx("List your Properties", "Καταχώρησε τα ακίνητά σου"),
      Icon: Building,
    },
    {
      num: "03",
      tag: tx("Professionals", "Επαγγελματίες"),
      title: tx(
        "The professionals behind every transaction",
        "Οι επαγγελματίες πίσω από κάθε συναλλαγή",
      ),
      desc: tx(
        "Lawyers, notaries, architects, engineers, surveyors, tax advisors, mortgage brokers, interior designers, contractors, property managers, relocation consultants, and insurance specialists, in one trusted directory of vetted experts.",
        "Δικηγόροι, συμβολαιογράφοι, αρχιτέκτονες, μηχανικοί, τοπογράφοι, φοροτεχνικοί, μεσίτες δανείων, interior designers, εργολάβοι, διαχειριστές ακινήτων, σύμβουλοι μετεγκατάστασης και ασφαλιστές, σε έναν αξιόπιστο κατάλογο ελεγμένων ειδικών.",
      ),
      points: [
        tx("Be discovered by international buyers", "Ανακαλύψου από διεθνείς αγοραστές"),
        tx("Build a verified profile and reputation", "Φτιάξε πιστοποιημένο προφίλ και φήμη"),
        tx("Receive qualified leads directly", "Λάβε ποιοτικά leads απευθείας"),
        tx("Showcase expertise across 12+ categories", "Πρόβαλε εξειδίκευση σε 12+ κατηγορίες"),
      ],
      cta: tx("Join as a Professional", "Εγγραφή ως επαγγελματίας"),
      Icon: Briefcase,
    },
  ];

  const categories = [
    { icon: Scale, label: tx("Legal & Financial", "Νομικά & Χρηματοοικονομικά") },
    { icon: Ruler, label: tx("Technical & Planning", "Τεχνικά & Σχεδιασμός") },
    { icon: Building2, label: tx("Real Estate Services", "Υπηρεσίες ακινήτων") },
    { icon: HardHat, label: tx("Development & Construction", "Ανάπτυξη & Κατασκευή") },
    { icon: KeyRound, label: tx("Property Management", "Διαχείριση ακινήτων") },
    { icon: Wrench, label: tx("Maintenance & Operations", "Συντήρηση & Λειτουργία") },
    { icon: Camera, label: tx("Tech, Media & Innovation", "Τεχνολογία, Μέσα & Καινοτομία") },
    {
      icon: Sparkles,
      label: tx("Lifestyle & Personal Support", "Lifestyle & Προσωπική υποστήριξη"),
    },
  ];

  const faq = [
    {
      q: tx("Is GREECEVEST free for property buyers?", "Είναι το GREECEVEST δωρεάν για αγοραστές;"),
      a: tx(
        "Yes. Creating an account, browsing listed properties, and connecting with verified professionals is entirely free of charge for buyers and investors. Real estate professionals may access additional premium features through optional subscription plans.",
        "Ναι. Η δημιουργία λογαριασμού, η περιήγηση σε καταχωρημένα ακίνητα και η σύνδεση με πιστοποιημένους επαγγελματίες είναι δωρεάν για αγοραστές και επενδυτές. Οι επαγγελματίες ακινήτων μπορούν να αποκτήσουν πρόσβαση σε premium λειτουργίες μέσω προαιρετικών συνδρομών.",
      ),
    },
    {
      q: tx(
        "Are foreign nationals permitted to purchase property in Greece?",
        "Επιτρέπεται σε αλλοδαπούς να αγοράσουν ακίνητο στην Ελλάδα;",
      ),
      a: tx(
        "In most cases, yes. EU/EEA citizens face no restrictions. Non-EU nationals may purchase property freely in the majority of Greek regions, including Athens, Thessaloniki, and the most sought-after islands. Certain border areas may require additional governmental approvals, our verified legal professionals can advise on specific requirements.",
        "Στις περισσότερες περιπτώσεις, ναι. Πολίτες ΕΕ/ΕΟΧ δεν έχουν περιορισμούς. Πολίτες εκτός ΕΕ μπορούν να αγοράσουν ελεύθερα στις περισσότερες περιοχές, συμπεριλαμβανομένων Αθήνας, Θεσσαλονίκης και των πιο δημοφιλών νησιών. Ορισμένες παραμεθόριες περιοχές χρειάζονται πρόσθετες κρατικές εγκρίσεις, οι πιστοποιημένοι νομικοί μας μπορούν να σε καθοδηγήσουν.",
      ),
    },
    {
      q: tx(
        "How does GREECEVEST verify its professionals?",
        "Πώς πιστοποιεί το GREECEVEST τους επαγγελματίες;",
      ),
      a: tx(
        "Every professional on the platform undergoes a rigorous vetting process. We verify professional licenses, regulatory standing, qualifications, and relevant track records prior to approval. Ongoing client reviews and periodic re-verification ensure continued quality and accountability.",
        "Κάθε επαγγελματίας στην πλατφόρμα περνά από αυστηρή διαδικασία ελέγχου. Επαληθεύουμε άδειες, κανονιστική συμμόρφωση, προσόντα και ιστορικό πριν την έγκριση. Συνεχείς αξιολογήσεις πελατών και περιοδικός επανέλεγχος διασφαλίζουν διαρκή ποιότητα.",
      ),
    },
    {
      q: tx("What is the Greek Golden Visa programme?", "Τι είναι το πρόγραμμα Golden Visa;"),
      a: tx(
        "Greece's Golden Visa programme grants five-year renewable residency permits to non-EU nationals who invest in Greek real estate above the applicable threshold (currently €250,000 to €500,000 depending on property location). GREECEVEST connects you with experienced immigration lawyers who specialise in guiding investors through the full application process.",
        "Το πρόγραμμα Golden Visa χορηγεί πενταετή ανανεώσιμη άδεια διαμονής σε πολίτες εκτός ΕΕ που επενδύουν σε ελληνικό ακίνητο πάνω από το ισχύον όριο (σήμερα €250.000 έως €500.000 ανάλογα με την τοποθεσία). Το GREECEVEST σε συνδέει με έμπειρους δικηγόρους μετανάστευσης που εξειδικεύονται στη διαδικασία.",
      ),
    },
    {
      q: tx(
        "Is it possible to complete a property purchase remotely?",
        "Μπορεί να ολοκληρωθεί η αγορά εξ αποστάσεως;",
      ),
      a: tx(
        "Yes. While an in-person visit is recommended, many transactions are completed entirely remotely through power of attorney arrangements. GREECEVEST helps you identify professionals experienced in managing cross-border transactions on behalf of international clients.",
        "Ναι. Αν και η αυτοπρόσωπη επίσκεψη συνιστάται, πολλές συναλλαγές ολοκληρώνονται εξ αποστάσεως μέσω πληρεξουσίου. Το GREECEVEST σε βοηθά να εντοπίσεις επαγγελματίες με εμπειρία σε διασυνοριακές συναλλαγές για διεθνείς πελάτες.",
      ),
    },
    {
      q: tx(
        "What types of properties are available on the platform?",
        "Τι τύπους ακινήτων θα βρω στην πλατφόρμα;",
      ),
      a: tx(
        "The platform features a diverse portfolio including residential villas, apartments, townhouses, undeveloped land, commercial properties, and development projects across all major Greek regions, from metropolitan Athens and Thessaloniki to Santorini, Crete, Mykonos, Corfu, and beyond.",
        "Η πλατφόρμα διαθέτει ποικίλο χαρτοφυλάκιο: βίλες, διαμερίσματα, μεζονέτες, οικόπεδα, επαγγελματικά ακίνητα και αναπτυξιακά projects σε όλες τις μεγάλες ελληνικές περιοχές, από Αθήνα και Θεσσαλονίκη μέχρι Σαντορίνη, Κρήτη, Μύκονο, Κέρκυρα και άλλα.",
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative sm:min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt={tx(
            "Modern luxury villa with infinity pool overlooking the Aegean Sea",
            "Σύγχρονη βίλα πολυτελείας με πισίνα και θέα στο Αιγαίο",
          )}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.2] sm:leading-[1.1] tracking-tight">
            {/* <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] sm:leading-[1.1] tracking-tight [text-wrap:balance]"> */}
              {tx("Shaping the future of ", "Χτίζουμε το μέλλον της ")}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
                {tx("Greek real estate.", "ελληνικής αγοράς ακινήτων.")}
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            {/* <p className="mt-4 sm:mt-6 text-[0.95rem] sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed"> */}
              {tx(
                "One platform for buyers, sellers, owners, and every professional who serves them, from legal and finance to construction, management, and lifestyle.",
                "Μία πλατφόρμα για αγοραστές, πωλητές, ιδιοκτήτες και κάθε επαγγελματία που τους εξυπηρετεί, από νομικά και χρηματοοικονομικά μέχρι κατασκευή, διαχείριση και lifestyle.",
              )}
            </p>

            {/* Search Bar */}
            {/* <div className="mt-6 sm:mt-10 p-1.5 sm:p-2 bg-card rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch gap-1.5 sm:gap-2"> */}
            <div className="mt-10 p-2 bg-card rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 flex flex-col justify-center px-4 py-2.5 sm:py-3 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                  {tx("Location", "Τοποθεσία")}
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <Input
                    placeholder={tx("Athens, Crete, Mykonos...", "Αθήνα, Κρήτη, Μύκονος...")}
                    className="h-auto p-0 border-0 bg-transparent text-foreground placeholder:text-muted-foreground/70 font-medium text-sm focus-visible:ring-0 shadow-none"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center px-4 py-2.5 sm:py-3 border-b md:border-b-0 md:border-r border-border md:min-w-[140px]">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                  {tx("Property Type", "Τύπος ακινήτου")}
                </label>
                <Select>
                  <SelectTrigger className="h-auto p-0 border-0 bg-transparent text-foreground font-medium text-sm shadow-none focus:ring-0">
                    <SelectValue placeholder={tx("All Types", "Όλοι οι τύποι")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">{tx("Villa", "Βίλα")}</SelectItem>
                    <SelectItem value="apartment">{tx("Apartment", "Διαμέρισμα")}</SelectItem>
                    <SelectItem value="house">{tx("House", "Κατοικία")}</SelectItem>
                    <SelectItem value="land">{tx("Land", "Οικόπεδο")}</SelectItem>
                    <SelectItem value="commercial">{tx("Commercial", "Επαγγελματικό")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 flex flex-col justify-center px-4 py-2.5 sm:py-3 md:border-r border-border md:min-w-[140px]">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                  {tx("Max Budget", "Μέγιστος προϋπολογισμός")}
                </label>
                <Select>
                  <SelectTrigger className="h-auto p-0 border-0 bg-transparent text-foreground font-medium text-sm shadow-none focus:ring-0">
                    <SelectValue placeholder={tx("Any Price", "Οποιαδήποτε τιμή")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="250">{tx("Up to €250k", "Έως €250k")}</SelectItem>
                    <SelectItem value="500">{tx("Up to €500k", "Έως €500k")}</SelectItem>
                    <SelectItem value="1000">{tx("Up to €1M", "Έως €1M")}</SelectItem>
                    <SelectItem value="2000">{tx("Up to €2M", "Έως €2M")}</SelectItem>
                    <SelectItem value="any">{tx("Any", "Όλα")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <LocaleLink to="/properties" className="md:shrink-0 w-full md:w-auto">
                <Button
                  size="lg"
                  className="h-12 sm:h-12 md:h-full w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 md:px-10 py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                  {tx("Search", "Αναζήτηση")}
                </Button>
              </LocaleLink>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"> */}
              <LocaleLink to="/signup" className="w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-3.5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full transition-all shadow-lg"
                >
                  {tx("Sign Up Free", "Εγγραφή δωρεάν")}
                </Button>
              </LocaleLink>
              <LocaleLink to="/professionals" className="w-auto mb-1 sm:mb-0">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-3 sm:px-8 py-3.5 h-auto bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-md border border-primary-foreground/30 text-primary-foreground font-semibold rounded-full transition-all flex items-center justify-center gap-2 group"
                >
                  {tx("Browse Professionals", "Δες επαγγελματίες")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </LocaleLink>
            </div>

            {/* Trust Bar */}
            <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-primary-foreground/10 grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-4 sm:gap-x-12 sm:gap-y-6">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="p-2 bg-primary-foreground/5 rounded-lg shrink-0">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {tx("Verified agencies", "Πιστοποιημένα γραφεία")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="p-2 bg-primary-foreground/5 rounded-lg shrink-0">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {tx("8 Professional categories", "8 επαγγελματικές κατηγορίες")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <div className="p-2 bg-primary-foreground/5 rounded-lg shrink-0">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {tx("Listings across Greece", "Καταχωρήσεις σε όλη την Ελλάδα")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Everyone */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-background">
        <div aria-hidden="true" className="absolute -top-px left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 lg:h-20 block"
          >
            <path
              d="M0,0 C320,80 720,80 1080,40 C1260,20 1380,10 1440,0 L1440,0 L0,0 Z"
              className="fill-primary"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-7 md:gap-12 lg:gap-20 mb-16 lg:mb-20">
          {/* <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16 lg:mb-20"> */}
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                {tx("Who it's for", "Για ποιους είναι")}
              </span>
              {/* <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight"> */}
              <h2 className="mt-4 text-[28px] md:text-4xl sm:text-3xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
                {tx(
                  "Three audiences, one Greek property platform.",
                  "Τρία κοινά, μία πλατφόρμα για ελληνικά ακίνητα.",
                )}
              </h2>
            </div>
            <div className="lg:pt-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tx(
                  "Buyers, agents, and the wider professional network that supports Greek real estate. Each gets the tools and visibility they need, without leaving the platform.",
                  "Αγοραστές, μεσίτες και το ευρύτερο δίκτυο επαγγελματιών που στηρίζουν τα ελληνικά ακίνητα. Όλοι αποκτούν τα εργαλεία και την προβολή που χρειάζονται, χωρίς να φεύγουν από την πλατφόρμα.",
                )}
              </p>
            </div>
          </div>

          <div className="space-y-px border-y border-border">
            {audiences.map(({ num, tag, title, desc, points, cta, Icon }) => (
              <article
                key={num}
                className="group px-5 grid lg:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 py-10 lg:py-14 border-b border-border last:border-b-0 hover:bg-surface/60 transition-colors -mx-2 rounded-sm"
                // className="group grid md:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 py-10 lg:py-14 border-b border-border last:border-b-0 hover:bg-surface/60 transition-colors px-2 -mx-2 rounded-sm"
              >
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
                  <span className="text-5xl lg:text-6xl font-bold text-accent/30 tabular-nums leading-none">
                    {num}
                  </span>
                  <div className="md:mt-auto">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                      <Icon className="h-3 w-3" />
                      {tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 max-w-2xl">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {/* <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors"> */}
                    {title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{desc}</p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-foreground/75"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex md:items-center">
                  <Button
                    variant="outline"
                    className="group/btn rounded-full font-semibold border-foreground/15 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    {cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Point + Solution */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {tx("The Problem", "Το πρόβλημα")}
              </span>
              <h2 className="mt-3 text-[27px] leading-[1.2] sm:text-3xl md:text-4xl font-bold text-foreground">
              {/* <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground"> */}
                {tx(
                  "Greek Real Estate Shouldn't Feel Like a Maze",
                  "Η ελληνική αγορά ακινήτων δεν χρειάζεται να μοιάζει με λαβύρινθο",
                )}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {tx(
                  "Listings live on dozens of sites, professionals are scattered across word of mouth and directories, and every stage of a property journey, legal, technical, construction, management, asks you to start the search from scratch.",
                  "Οι καταχωρήσεις βρίσκονται σε δεκάδες sites, οι επαγγελματίες είναι διασκορπισμένοι σε στόμα-με-στόμα και καταλόγους, και κάθε στάδιο της διαδρομής ενός ακινήτου, νομικά, τεχνικά, κατασκευή, διαχείριση, σε αναγκάζει να ξεκινάς την αναζήτηση από την αρχή.",
                )}
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {tx(
                  "Whether you're buying, selling, renovating, renting out, or simply maintaining a property, the people you need are rarely in the same place.",
                  "Είτε αγοράζεις, πουλάς, ανακαινίζεις, νοικιάζεις ή απλά συντηρείς ένα ακίνητο, οι άνθρωποι που χρειάζεσαι σπάνια βρίσκονται στο ίδιο σημείο.",
                )}
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  tx(
                    "Listings and professionals scattered across dozens of channels",
                    "Καταχωρήσεις και επαγγελματίες διασκορπισμένοι σε δεκάδες κανάλια",
                  ),
                  tx(
                    "No reliable way to verify credentials or track records",
                    "Καμία αξιόπιστη επαλήθευση προσόντων ή ιστορικού",
                  ),
                  tx(
                    "Hard to find the right specialist for each stage",
                    "Δύσκολη εύρεση του κατάλληλου ειδικού για κάθε στάδιο",
                  ),
                  tx(
                    "Lack of transparency and accountability throughout",
                    "Έλλειψη διαφάνειας και λογοδοσίας σε όλη τη διαδρομή",
                  ),
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-destructive shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {tx("The Solution", "Η λύση")}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-foreground">
                {tx("GREECEVEST Brings It All Together", "Το GREECEVEST τα ενώνει όλα")}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {tx(
                  "One platform where you discover properties and connect with every expert involved in a Greek property journey, across all eight service categories.",
                  "Μία πλατφόρμα όπου ανακαλύπτεις ακίνητα και συνδέεσαι με κάθε ειδικό που εμπλέκεται στη διαδρομή ενός ελληνικού ακινήτου, σε όλες τις οκτώ κατηγορίες υπηρεσιών.",
                )}
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  tx(
                    "Curated properties in one searchable directory",
                    "Επιλεγμένα ακίνητα σε έναν ενιαίο κατάλογο αναζήτησης",
                  ),
                  tx(
                    "Eight categories of vetted professionals under one roof",
                    "Οκτώ κατηγορίες ελεγμένων επαγγελματιών σε ένα μέρος",
                  ),
                  tx(
                    "From legal and financial to construction, management, and lifestyle",
                    "Από νομικά και χρηματοοικονομικά μέχρι κατασκευή, διαχείριση και lifestyle",
                  ),
                  tx(
                    "End-to-end support, from first search to long-term ownership",
                    "Υποστήριξη από την πρώτη αναζήτηση έως τη μακροχρόνια κατοχή",
                  ),
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <LocaleLink to="/signup">
                <Button className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 self-start">
                  {tx("Sign Up Free", "Εγγραφή δωρεάν")}
                </Button>
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {tx("What You Can Do", "Τι μπορείς να κάνεις")}
          </span>
          <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.2]">
            {tx("Everything You Need, In One Place", "Όλα όσα χρειάζεσαι, σε ένα σημείο")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {tx(
              "Use the platform however suits you. Explore listings or connect directly with a verified expert.",
              "Χρησιμοποίησε την πλατφόρμα όπως σου ταιριάζει. Δες καταχωρήσεις ή συνδέσου απευθείας με πιστοποιημένο ειδικό.",
            )}
          </p>
          <div className="mt-14 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Compass,
                title: tx("Explore Properties", "Δες ακίνητα"),
                desc: tx(
                  "Browse curated Greek listings filtered by location, budget, and type.",
                  "Περιήγηση σε επιλεγμένες ελληνικές καταχωρήσεις φιλτραρισμένες κατά τοποθεσία, budget και τύπο.",
                ),
              },
              {
                icon: Users,
                title: tx("Find Professionals", "Βρες επαγγελματίες"),
                desc: tx(
                  "Eight categories of verified experts, from lawyers and notaries to architects, contractors, and property managers.",
                  "Οκτώ κατηγορίες πιστοποιημένων ειδικών, από δικηγόρους και συμβολαιογράφους έως αρχιτέκτονες, εργολάβους και διαχειριστές ακινήτων.",
                ),
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-card border border-border rounded-2xl p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-accent/40"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Categories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("Every Professional You Need", "Κάθε επαγγελματίας που χρειάζεσαι")}
            </span>
            <h2 className="mt-3 text-[28px] sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.2]">
              {tx(
                "Eight Categories, One Verified Network",
                "Οκτώ κατηγορίες, ένα πιστοποιημένο δίκτυο",
              )}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {tx(
                "From legal counsel and property management to construction, technology, and lifestyle support, GREECEVEST gathers every expert involved in a Greek property journey.",
                "Από νομική υποστήριξη και διαχείριση ακινήτων έως κατασκευή, τεχνολογία και lifestyle, το GREECEVEST συγκεντρώνει κάθε ειδικό σε μία διαδρομή ακινήτου.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(({ icon: Icon, label }) => (
              <LocaleLink
                key={label}
                to="/professionals"
                className="group flex flex-col items-center justify-center gap-2.5 p-4 min-h-[104px] rounded-xl border border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-foreground hover:shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <Icon className="h-5 w-5 transition-colors group-hover:text-accent" />
                <span className="text-[11px] font-semibold text-center leading-tight">{label}</span>
              </LocaleLink>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LocaleLink
              to="/professionals"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              {tx("Browse all categories", "Δες όλες τις κατηγορίες")}{" "}
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="sm:text-sm text-xs font-semibold text-accent uppercase tracking-wider">
              {/* <span className="text-sm font-semibold text-accent uppercase tracking-wider"> */}
                {tx("Featured Properties", "Επιλεγμένα ακίνητα")}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
              {/* <h2 className="mt-2 text-3xl font-bold text-foreground"> */}
                {tx("Handpicked for You", "Επιλεγμένα για σένα")}
              </h2>
            </div>
            <LocaleLink
              to="/properties"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              {tx("View all properties", "Δες όλα τα ακίνητα")} <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProperties.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <LocaleLink to="/properties">
              <Button variant="outline">{tx("View All Properties", "Δες όλα τα ακίνητα")}</Button>
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        headline={tx(
          "Ready to Start Your Greek Property Journey?",
          "Έτοιμος να ξεκινήσεις τη διαδρομή σου στα ελληνικά ακίνητα;",
        )}
        subheadline={tx(
          "Create your free account today and get instant access to verified properties and trusted professionals.",
          "Δημιούργησε τον δωρεάν λογαριασμό σου σήμερα και απόκτησε άμεση πρόσβαση σε πιστοποιημένα ακίνητα και έμπιστους επαγγελματίες.",
        )}
        ctaText={tx("Sign Up Free", "Εγγραφή δωρεάν")}
      />

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {tx("Frequently Asked Questions", "Συχνές ερωτήσεις")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              {tx("Valuable Information", "Χρήσιμες πληροφορίες")}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </>
  );
}
