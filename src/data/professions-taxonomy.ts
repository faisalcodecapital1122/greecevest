// Real Estate Professional Taxonomy (A–H)
// Used by the Professionals page to render grouped categories and specializations.

export type Profession = {
  value: string; // stable id, matches ProfessionalData.profession (lowercased)
  en: string;
  el: string;
  description?: { en: string; el: string };
  specializations: { en: string; el: string }[];
};

export type ProfessionGroup = {
  id: string;
  en: string;
  el: string;
  icon: string; // lucide-react icon name
  professions: Profession[];
};

export const PROFESSION_GROUPS: ProfessionGroup[] = [
  {
    id: "a",
    icon: "Scale",
    en: "A. Legal & Financial",
    el: "Α. Νομικοί & Οικονομικοί",
    professions: [
      {
        value: "lawyer",
        en: "Lawyers",
        el: "Δικηγόροι",
        description: {
          en: "Full legal support for property transactions, ownership, and compliance.",
          el: "Πλήρης νομική υποστήριξη για συναλλαγές, ιδιοκτησία και συμμόρφωση.",
        },
        specializations: [
          { en: "Purchase/sale agreements & conveyancing", el: "Συμβόλαια αγοραπωλησίας" },
          {
            en: "Title & encumbrance checks (Land Registry/Cadastre)",
            el: "Έλεγχοι τίτλων & βαρών (Υποθηκοφυλακείο/Κτηματολόγιο)",
          },
          { en: "Golden Visa representation", el: "Εκπροσώπηση Golden Visa" },
          { en: "Inheritance & succession for property", el: "Κληρονομικά & διαδοχή ακινήτων" },
          {
            en: "Post-sale legal advisory and disputes",
            el: "Μετα-πωλητική νομική συμβουλευτική & διαφορές",
          },
        ],
      },
      {
        value: "notary",
        en: "Notaries",
        el: "Συμβολαιογράφοι",
        description: {
          en: "State-authorized officials who validate and certify legal acts.",
          el: "Κρατικά εξουσιοδοτημένοι λειτουργοί που επικυρώνουν νομικές πράξεις.",
        },
        specializations: [
          { en: "Contract authentication & deed drafting", el: "Σύνταξη & επικύρωση συμβολαίων" },
          { en: "Deed registration coordination", el: "Συντονισμός μεταγραφής" },
          { en: "Powers of attorney", el: "Πληρεξούσια" },
          {
            en: "Official witnessing of real estate transfers",
            el: "Επίσημη μαρτυρία μεταβιβάσεων",
          },
        ],
      },
      {
        value: "mortgage broker",
        en: "Mortgage Brokers / Loan Advisors",
        el: "Σύμβουλοι Στεγαστικών Δανείων",
        description: {
          en: "Arrange and advise on real estate financing options.",
          el: "Διαμεσολάβηση και συμβουλές για χρηματοδότηση ακινήτων.",
        },
        specializations: [
          { en: "Bank comparison & loan structuring", el: "Σύγκριση τραπεζών & δόμηση δανείου" },
          { en: "Pre-approval & documentation prep", el: "Προέγκριση & προετοιμασία εγγράφων" },
          {
            en: "Refinancing and rate negotiation",
            el: "Αναχρηματοδότηση & διαπραγμάτευση επιτοκίου",
          },
          { en: "Cross-border borrower guidance", el: "Καθοδήγηση διασυνοριακών δανειοληπτών" },
        ],
      },
      {
        value: "accountant",
        en: "Accountants / Accounting Firms",
        el: "Λογιστές / Λογιστικά Γραφεία",
        description: {
          en: "Handle accounting, payroll, and tax for individuals and companies.",
          el: "Λογιστική, μισθοδοσία και φορολογικά για ιδιώτες και εταιρείες.",
        },
        specializations: [
          {
            en: "Bookkeeping & financial statements",
            el: "Τήρηση βιβλίων & οικονομικές καταστάσεις",
          },
          { en: "VAT & tax filings (E1/E2/E3/E9)", el: "ΦΠΑ & φορολογικές δηλώσεις (Ε1/Ε2/Ε3/Ε9)" },
          { en: "Payroll & social contributions", el: "Μισθοδοσία & εισφορές" },
          { en: "Company formation & compliance", el: "Σύσταση & συμμόρφωση εταιρειών" },
          { en: "Non-resident & investor taxation", el: "Φορολογία μη-κατοίκων & επενδυτών" },
        ],
      },
      {
        value: "banking advisor",
        en: "Banking Advisors",
        el: "Τραπεζικοί Σύμβουλοι",
        description: {
          en: "Advise on property-related banking products and investments.",
          el: "Συμβουλές για τραπεζικά προϊόντα σχετικά με ακίνητα.",
        },
        specializations: [
          { en: "Mortgage & credit facilities", el: "Στεγαστικά & πιστωτικές διευκολύνσεις" },
          { en: "Private banking & wealth", el: "Private banking & διαχείριση πλούτου" },
          { en: "Foreign currency accounts", el: "Λογαριασμοί ξένου νομίσματος" },
          { en: "Investment product selection", el: "Επιλογή επενδυτικών προϊόντων" },
        ],
      },
      {
        value: "insurance agent",
        en: "Insurance Agents / Brokers",
        el: "Ασφαλιστικοί Πράκτορες",
        description: {
          en: "Risk coverage for properties, projects, and owners.",
          el: "Κάλυψη κινδύνων για ακίνητα, έργα και ιδιοκτήτες.",
        },
        specializations: [
          {
            en: "Home & commercial property insurance",
            el: "Ασφάλιση κατοικίας & επαγγελματικών χώρων",
          },
          {
            en: "Construction/renovation & liability cover",
            el: "Κατασκευή/ανακαίνιση & αστική ευθύνη",
          },
          { en: "Mortgage protection policies", el: "Προστασία στεγαστικού δανείου" },
          { en: "Claims handling & renewals", el: "Διαχείριση αποζημιώσεων & ανανεώσεις" },
        ],
      },
      {
        value: "investment consultant",
        en: "Investment Consultants",
        el: "Επενδυτικοί Σύμβουλοι",
        description: {
          en: "Advise on real estate and portfolio investments.",
          el: "Συμβουλές για επενδύσεις σε ακίνητα και χαρτοφυλάκια.",
        },
        specializations: [
          { en: "Deal sourcing & due diligence", el: "Εντοπισμός deals & due diligence" },
          { en: "Risk & return analysis", el: "Ανάλυση κινδύνου & απόδοσης" },
          {
            en: "Portfolio strategy & diversification",
            el: "Στρατηγική χαρτοφυλακίου & διαφοροποίηση",
          },
          { en: "Capital gains & exit planning", el: "Σχεδιασμός εξόδου & υπεραξιών" },
        ],
      },
      {
        value: "golden visa consultant",
        en: "Golden Visa Consultants",
        el: "Σύμβουλοι Golden Visa",
        description: {
          en: "Guide foreign investors through Greece's residency-by-investment program.",
          el: "Καθοδήγηση ξένων επενδυτών στο πρόγραμμα Golden Visa.",
        },
        specializations: [
          { en: "Eligibility & route selection", el: "Επιλεξιμότητα & επιλογή διαδρομής" },
          { en: "Document preparation & filings", el: "Προετοιμασία εγγράφων & καταθέσεις" },
          { en: "Property investment coordination", el: "Συντονισμός επένδυσης σε ακίνητο" },
          { en: "Liaison with authorities", el: "Επικοινωνία με αρχές" },
        ],
      },
      {
        value: "currency exchange broker",
        en: "Currency Exchange Brokers",
        el: "Μεσίτες Συναλλάγματος",
        description: {
          en: "Manage large-value FX and international transfers for property deals.",
          el: "Διαχείριση συναλλάγματος & διεθνών μεταφορών για συναλλαγές ακινήτων.",
        },
        specializations: [
          { en: "Best-rate execution & hedging", el: "Εκτέλεση καλύτερης ισοτιμίας & hedging" },
          { en: "Regulatory KYC/AML handling", el: "Διαχείριση KYC/AML" },
          { en: "Rapid international transfers", el: "Ταχείες διεθνείς μεταφορές" },
          { en: "Corporate & HNW solutions", el: "Λύσεις για εταιρείες & HNW πελάτες" },
        ],
      },
      {
        value: "legal translator",
        en: "Legal Translators / Interpreters",
        el: "Νομικοί Μεταφραστές / Διερμηνείς",
        description: {
          en: "Translate legal and financial documents for cross-border transactions.",
          el: "Μετάφραση νομικών & οικονομικών εγγράφων.",
        },
        specializations: [
          { en: "Certified translations (GR/EN etc.)", el: "Επίσημες μεταφράσεις" },
          { en: "Real-time interpretation (notary, court)", el: "Διερμηνεία σε πραγματικό χρόνο" },
          { en: "Apostille-ready documents", el: "Έγγραφα έτοιμα για Apostille" },
          {
            en: "Contract & technical terminology accuracy",
            el: "Ακρίβεια τεχνικής/συμβατικής ορολογίας",
          },
        ],
      },
    ],
  },
  {
    id: "b",
    icon: "Ruler",
    en: "B. Technical & Planning",
    el: "Β. Τεχνικοί & Σχεδιασμός",
    professions: [
      {
        value: "civil engineer",
        en: "Civil Engineers",
        el: "Πολιτικοί Μηχανικοί",
        specializations: [
          { en: "Structural analysis & certification", el: "Στατική ανάλυση & πιστοποίηση" },
          { en: "Energy efficiency (KENAK) studies", el: "Μελέτες ενεργειακής απόδοσης (ΚΕΝΑΚ)" },
          { en: "Renovation & seismic inspections", el: "Ανακαίνιση & σεισμικοί έλεγχοι" },
          { en: "Pool structure design & permits", el: "Σχεδιασμός & άδειες πισίνας" },
        ],
      },
      {
        value: "architect",
        en: "Architects",
        el: "Αρχιτέκτονες",
        specializations: [
          { en: "Concept & architectural design", el: "Αρχιτεκτονικός σχεδιασμός" },
          { en: "Permit drawings & coordination", el: "Σχέδια αδειοδότησης" },
          { en: "Interior/exterior planning", el: "Εσωτερικός/εξωτερικός σχεδιασμός" },
          { en: "Bioclimatic & sustainable design", el: "Βιοκλιματικός σχεδιασμός" },
        ],
      },
      {
        value: "surveyor",
        en: "Surveyors (Topographers)",
        el: "Τοπογράφοι",
        specializations: [
          { en: "Topographic surveys & mapping", el: "Τοπογραφικές αποτυπώσεις" },
          {
            en: "Boundary staking & cadastral fixes",
            el: "Οριοθετήσεις & κτηματολογικές διορθώσεις",
          },
          { en: "Drone/GIS documentation", el: "Τεκμηρίωση με drone/GIS" },
          { en: "Plot division & consolidation", el: "Κατάτμηση & συνένωση οικοπέδων" },
        ],
      },
      {
        value: "property valuer",
        en: "Property Valuers / Appraisers",
        el: "Εκτιμητές Ακινήτων",
        specializations: [
          { en: "Market & comparative valuations", el: "Εκτιμήσεις αγοράς & συγκριτικές" },
          { en: "Bank loan appraisals", el: "Εκτιμήσεις για τράπεζες" },
          { en: "Investment yield analysis", el: "Ανάλυση επενδυτικής απόδοσης" },
          { en: "Valuation for tax/insurance", el: "Εκτίμηση για φορολογία/ασφάλιση" },
        ],
      },
      {
        value: "electrical mechanical engineer",
        en: "Electrical & Mechanical Engineers",
        el: "Ηλεκτρολόγοι & Μηχανολόγοι Μηχανικοί",
        specializations: [
          { en: "Electrical & lighting design", el: "Σχεδιασμός ηλεκτρολογικών & φωτισμού" },
          { en: "HVAC sizing & fire safety plans", el: "HVAC & σχέδια πυρασφάλειας" },
          { en: "Energy performance certification", el: "Πιστοποίηση ενεργειακής απόδοσης" },
          { en: "Systems inspection & commissioning", el: "Επιθεώρηση & commissioning συστημάτων" },
        ],
      },
      {
        value: "lighting designer",
        en: "Lighting Designers",
        el: "Σχεδιαστές Φωτισμού",
        specializations: [
          {
            en: "Architectural & decorative lighting",
            el: "Αρχιτεκτονικός & διακοσμητικός φωτισμός",
          },
          { en: "Façade/landscape illumination", el: "Φωτισμός όψεων & κήπου" },
          { en: "Smart lighting & controls", el: "Έξυπνος φωτισμός & έλεγχοι" },
          { en: "Photometric analysis & simulation", el: "Φωτομετρική ανάλυση & προσομοίωση" },
        ],
      },
    ],
  },
  {
    id: "c",
    icon: "Building2",
    en: "C. Real Estate Services",
    el: "Γ. Υπηρεσίες Ακινήτων",
    professions: [
      {
        value: "real estate agent",
        en: "Real Estate Agents / Brokers",
        el: "Μεσίτες Ακινήτων",
        specializations: [
          { en: "Sales & leasing representation", el: "Εκπροσώπηση πώλησης & μίσθωσης" },
          { en: "Buyer/seller negotiation", el: "Διαπραγμάτευση αγοραστή/πωλητή" },
          { en: "Golden Visa property sourcing", el: "Εύρεση ακινήτων για Golden Visa" },
          { en: "Market pricing & comps", el: "Τιμολόγηση αγοράς & συγκριτικά" },
          { en: "Transaction documentation coordination", el: "Συντονισμός εγγράφων συναλλαγής" },
        ],
      },
      {
        value: "relocation consultant",
        en: "Relocation Consultants",
        el: "Σύμβουλοι Μετεγκατάστασης",
        specializations: [
          { en: "Home search & lease setup", el: "Εύρεση κατοικίας & μίσθωση" },
          { en: "Visa/residence guidance", el: "Καθοδήγηση visa/διαμονής" },
          { en: "Schooling & local integration", el: "Σχολεία & ένταξη" },
          { en: "Utility & telecom setup", el: "Σύνδεση παροχών & τηλεπικοινωνιών" },
        ],
      },
      {
        value: "real estate marketing",
        en: "Real Estate Marketing & Branding Agencies",
        el: "Marketing & Branding Ακινήτων",
        specializations: [
          { en: "Property branding & positioning", el: "Branding & τοποθέτηση ακινήτου" },
          { en: "Social/SEO/ads lead generation", el: "Δημιουργία leads (Social/SEO/Ads)" },
          { en: "Photo/video/virtual content coordination", el: "Συντονισμός περιεχομένου" },
          { en: "Listing management & analytics", el: "Διαχείριση αγγελιών & analytics" },
        ],
      },
    ],
  },
  {
    id: "d",
    icon: "HardHat",
    en: "D. Development & Construction",
    el: "Δ. Ανάπτυξη & Κατασκευή",
    professions: [
      {
        value: "construction contractor",
        en: "Construction Contractors",
        el: "Εργολάβοι Κατασκευών",
        specializations: [
          { en: "General contracting & site supervision", el: "Γενική εργολαβία & επίβλεψη" },
          { en: "Procurement & scheduling", el: "Προμήθειες & χρονοπρογραμματισμός" },
          { en: "Permitting & quality control", el: "Αδειοδότηση & ποιοτικός έλεγχος" },
          { en: "Swimming pool construction", el: "Κατασκευή πισίνας" },
        ],
      },
      {
        value: "renovation specialist",
        en: "Renovation Specialists",
        el: "Ειδικοί Ανακαίνισης",
        specializations: [
          { en: "Interior/exterior remodeling", el: "Εσωτερική/εξωτερική ανακαίνιση" },
          { en: "Historic/heritage restoration", el: "Αναπαλαίωση διατηρητέων" },
          { en: "Energy retrofits & insulation", el: "Ενεργειακή αναβάθμιση & μόνωση" },
          { en: "Custom finishes & joinery", el: "Ειδικά φινιρίσματα & ξυλουργικά" },
        ],
      },
      {
        value: "electrician",
        en: "Electricians",
        el: "Ηλεκτρολόγοι",
        specializations: [
          { en: "Wiring, panels & protection", el: "Καλωδιώσεις, πίνακες & προστασία" },
          { en: "Lighting & power distribution", el: "Φωτισμός & διανομή ισχύος" },
          { en: "Smart home integration", el: "Ενσωμάτωση smart home" },
          { en: "Antenna/low-voltage cabling", el: "Καλωδιώσεις χαμηλής τάσης" },
        ],
      },
      {
        value: "plumber",
        en: "Plumbers",
        el: "Υδραυλικοί",
        specializations: [
          { en: "Water supply & drainage", el: "Ύδρευση & αποχέτευση" },
          { en: "Boilers & water heaters", el: "Λέβητες & θερμοσίφωνες" },
          { en: "Solar thermal systems", el: "Ηλιακά θερμικά συστήματα" },
          { en: "Pool & irrigation plumbing", el: "Υδραυλικά πισίνας & άρδευσης" },
        ],
      },
      {
        value: "hvac technician",
        en: "HVAC Technicians",
        el: "Τεχνικοί HVAC",
        specializations: [
          { en: "System sizing & installation", el: "Μελέτη & εγκατάσταση" },
          { en: "Maintenance & troubleshooting", el: "Συντήρηση & επίλυση βλαβών" },
          { en: "Indoor air quality optimization", el: "Βελτιστοποίηση ποιότητας αέρα" },
          { en: "Pool heating/dehumidification", el: "Θέρμανση πισίνας/αφύγρανση" },
        ],
      },
      {
        value: "painter",
        en: "Painters / Decorators",
        el: "Ελαιοχρωματιστές",
        specializations: [
          { en: "Surface prep & restoration", el: "Προετοιμασία & αποκατάσταση επιφανειών" },
          { en: "Interior painting & textures", el: "Εσωτερική βαφή & υφές" },
          { en: "Exterior/protective coatings", el: "Εξωτερικές/προστατευτικές βαφές" },
          { en: "Decorative plastering", el: "Διακοσμητικοί σοβάδες" },
        ],
      },
      {
        value: "interior designer",
        en: "Interior Designers",
        el: "Διακοσμητές Εσωτερικών Χώρων",
        specializations: [
          { en: "Space planning & concepts", el: "Σχεδιασμός χώρου & concept" },
          { en: "Material & furniture selection", el: "Επιλογή υλικών & επίπλων" },
          { en: "Lighting & color schemes", el: "Φωτισμός & χρωματικοί συνδυασμοί" },
          { en: "Staging for sale/rent", el: "Staging για πώληση/ενοικίαση" },
        ],
      },
      {
        value: "landscape designer",
        en: "Landscape Designers / Gardeners",
        el: "Αρχιτέκτονες Τοπίου / Κηπουροί",
        specializations: [
          { en: "Garden/landscape design", el: "Σχεδιασμός κήπου/τοπίου" },
          { en: "Irrigation & outdoor lighting", el: "Άρδευση & εξωτερικός φωτισμός" },
          { en: "Poolside landscaping", el: "Διαμόρφωση γύρω από πισίνα" },
          { en: "Seasonal care & pruning", el: "Εποχιακή φροντίδα & κλάδεμα" },
        ],
      },
      {
        value: "furniture supplier",
        en: "Furniture Suppliers",
        el: "Προμηθευτές Επίπλων",
        specializations: [
          { en: "Custom furniture & sourcing", el: "Επί παραγγελία έπιπλα" },
          { en: "Outdoor furniture solutions", el: "Έπιπλα εξωτερικού χώρου" },
          { en: "Logistics & installation", el: "Logistics & τοποθέτηση" },
          { en: "After-sales support", el: "Υποστήριξη μετά την πώληση" },
        ],
      },
      {
        value: "smart home technician",
        en: "Smart Home Technicians",
        el: "Τεχνικοί Smart Home",
        specializations: [
          { en: "Automation hubs & scenes", el: "Hubs αυτοματισμού & σενάρια" },
          { en: "Smart lighting/HVAC control", el: "Έξυπνος φωτισμός/HVAC" },
          { en: "Security & access integration", el: "Ασφάλεια & έλεγχος πρόσβασης" },
          { en: "Voice assistant & app setup", el: "Voice assistant & εφαρμογές" },
        ],
      },
      {
        value: "artisan",
        en: "Artisans / Specialty Contractors",
        el: "Τεχνίτες / Ειδικοί Εργολάβοι",
        specializations: [
          { en: "Stone/marble & metalwork", el: "Πέτρα/μάρμαρο & μεταλλικές κατασκευές" },
          { en: "Carpentry & joinery", el: "Ξυλουργικά" },
          { en: "Traditional Greek detailing", el: "Παραδοσιακές λεπτομέρειες" },
          { en: "Custom decorative finishes", el: "Διακοσμητικά φινιρίσματα" },
        ],
      },
      {
        value: "aluminum glass contractor",
        en: "Aluminum & Glass Systems",
        el: "Συστήματα Αλουμινίου & Γυαλιού",
        specializations: [
          { en: "Aluminum doors, windows, shutters", el: "Πόρτες, παράθυρα, ρολά αλουμινίου" },
          { en: "Glass façades, curtain walls, skylights", el: "Όψεις γυαλιού & curtain walls" },
          {
            en: "Thermal-break and soundproof frames",
            el: "Θερμοδιακοπτόμενα & ηχομονωτικά κουφώματα",
          },
          {
            en: "Railings, partitions, glass balustrades",
            el: "Κάγκελα, χωρίσματα, υαλοπετάσματα",
          },
          { en: "Pergolas, shading, enclosures", el: "Πέργκολες, σκιάσεις, κλεισίματα" },
          { en: "Maintenance & replacement", el: "Συντήρηση & αντικαταστάσεις" },
        ],
      },
      {
        value: "construction project manager",
        en: "Construction Project Managers",
        el: "Project Managers Κατασκευών",
        specializations: [
          { en: "Project planning & reporting", el: "Σχεδιασμός έργου & reporting" },
          { en: "Cost control & procurement", el: "Έλεγχος κόστους & προμήθειες" },
          { en: "Contractor/vendor oversight", el: "Επίβλεψη εργολάβων" },
          { en: "HSE & quality assurance", el: "Υγεία/Ασφάλεια & ποιότητα" },
        ],
      },
      {
        value: "real estate developer",
        en: "Real Estate Developers",
        el: "Developers Ακινήτων",
        specializations: [
          { en: "Land acquisition & feasibility", el: "Απόκτηση γης & μελέτη σκοπιμότητας" },
          { en: "Design & permit coordination", el: "Συντονισμός σχεδιασμού & αδειών" },
          { en: "Financing & investor relations", el: "Χρηματοδότηση & επενδυτικές σχέσεις" },
          { en: "Construction & sales management", el: "Διαχείριση κατασκευής & πωλήσεων" },
        ],
      },
      {
        value: "antenna satellite installer",
        en: "Antenna & Satellite Installers (incl. Starlink)",
        el: "Εγκαταστάτες Κεραιών & Δορυφορικών (Starlink)",
        specializations: [
          { en: "Terrestrial/satellite antenna alignment", el: "Επίγειες/δορυφορικές κεραίες" },
          { en: "Starlink & satellite internet setup", el: "Εγκατάσταση Starlink" },
          { en: "Signal testing & troubleshooting", el: "Έλεγχος σήματος & βλαβών" },
          { en: "IPTV/multiswitch & cabling integration", el: "IPTV/multiswitch & καλωδιώσεις" },
        ],
      },
    ],
  },
  {
    id: "e",
    icon: "KeyRound",
    en: "E. Property Management",
    el: "Ε. Διαχείριση Ακινήτων",
    professions: [
      {
        value: "property manager",
        en: "Property Managers (Long-Term)",
        el: "Διαχειριστές Ακινήτων (Μακροπρόθεσμα)",
        specializations: [
          { en: "Tenant relations & rent collection", el: "Σχέσεις ενοικιαστών & εισπράξεις" },
          { en: "Preventive maintenance coordination", el: "Προληπτική συντήρηση" },
          { en: "Budgeting & owner reporting", el: "Προϋπολογισμός & αναφορές ιδιοκτήτη" },
          { en: "Compliance & insurance liaison", el: "Συμμόρφωση & ασφάλιση" },
        ],
      },
      {
        value: "short-term rental manager",
        en: "Short-Term Rental Managers",
        el: "Διαχειριστές Βραχυχρόνιας Μίσθωσης",
        specializations: [
          { en: "Guest communications & check-in", el: "Επικοινωνία & check-in" },
          { en: "Turnover cleaning & scheduling", el: "Καθαρισμοί & προγραμματισμός" },
          { en: "Dynamic pricing & listings", el: "Δυναμική τιμολόγηση & αγγελίες" },
          { en: "Issue resolution & reviews", el: "Επίλυση θεμάτων & κριτικές" },
        ],
      },
      {
        value: "facility management",
        en: "Facility Management Companies",
        el: "Εταιρείες Facility Management",
        specializations: [
          { en: "Maintenance programs & SLAs", el: "Προγράμματα συντήρησης & SLAs" },
          { en: "Energy monitoring & savings", el: "Παρακολούθηση ενέργειας" },
          { en: "Vendor & contract management", el: "Διαχείριση προμηθευτών & συμβάσεων" },
          { en: "Safety/compliance audits", el: "Έλεγχοι ασφαλείας/συμμόρφωσης" },
        ],
      },
      {
        value: "concierge",
        en: "Concierge / Guest Experience",
        el: "Concierge / Εμπειρία Επισκέπτη",
        specializations: [
          { en: "Itinerary & reservations", el: "Πρόγραμμα & κρατήσεις" },
          { en: "Transport & logistics", el: "Μεταφορά & logistics" },
          { en: "Personal errands & shopping", el: "Προσωπικές αγορές" },
          { en: "VIP hosting & in-villa services", el: "Υπηρεσίες VIP & εντός βίλας" },
        ],
      },
    ],
  },
  {
    id: "f",
    icon: "Wrench",
    en: "F. Maintenance & Operations",
    el: "ΣΤ. Συντήρηση & Λειτουργία",
    professions: [
      {
        value: "handyman",
        en: "Maintenance Technicians / Handymen",
        el: "Τεχνικοί Συντήρησης",
        specializations: [
          {
            en: "Basic plumbing/electrical/carpentry",
            el: "Βασικά υδραυλικά/ηλεκτρικά/ξυλουργικά",
          },
          { en: "Appliance installation/repair", el: "Εγκατάσταση/επισκευή συσκευών" },
          { en: "Preventive inspections", el: "Προληπτικοί έλεγχοι" },
          { en: "Minor renovations & fixtures", el: "Μικρές ανακαινίσεις" },
        ],
      },
      {
        value: "cleaning service",
        en: "Cleaning & Turnover Services",
        el: "Καθαρισμός & Turnover",
        specializations: [
          { en: "Routine & deep cleaning", el: "Τακτικός & γενικός καθαρισμός" },
          { en: "Linen/laundry management", el: "Λευκά είδη & πλυντήριο" },
          { en: "Rental changeover service", el: "Αλλαγή μεταξύ ενοικιάσεων" },
          { en: "Eco/hypoallergenic methods", el: "Οικολογικές μέθοδοι" },
        ],
      },
      {
        value: "security installer",
        en: "Security & Alarm Installers",
        el: "Εγκαταστάτες Συναγερμού & Ασφάλειας",
        specializations: [
          { en: "CCTV/IP cameras & NVRs", el: "CCTV/IP κάμερες & NVR" },
          { en: "Intrusion alarms (wired/wireless)", el: "Συναγερμοί ασφαλείας" },
          { en: "Access control & smart locks", el: "Έλεγχος πρόσβασης & smart locks" },
          { en: "System maintenance & GDPR signage", el: "Συντήρηση & σήμανση GDPR" },
        ],
      },
      {
        value: "pest control",
        en: "Pest Control & Sanitation",
        el: "Απεντομώσεις & Απολυμάνσεις",
        specializations: [
          { en: "Insect & rodent control", el: "Έντομα & τρωκτικά" },
          { en: "Disinfection & sanitation", el: "Απολύμανση" },
          { en: "Outdoor pest management", el: "Εξωτερικός έλεγχος παρασίτων" },
          { en: "Compliance certification", el: "Πιστοποίηση συμμόρφωσης" },
        ],
      },
      {
        value: "waste management",
        en: "Waste Management & Recycling",
        el: "Διαχείριση Απορριμμάτων & Ανακύκλωση",
        specializations: [
          { en: "Scheduled collection & disposal", el: "Προγραμματισμένη αποκομιδή" },
          { en: "Recycling & sorting programs", el: "Προγράμματα ανακύκλωσης" },
          { en: "Hazardous/construction waste", el: "Επικίνδυνα/κατασκευαστικά απόβλητα" },
          { en: "Environmental reporting", el: "Περιβαλλοντικές αναφορές" },
        ],
      },
      {
        value: "drain cleaning",
        en: "Drain Cleaning & Unblocking",
        el: "Αποφράξεις",
        specializations: [
          { en: "High-pressure jetting & unclogging", el: "Υδροπίεση & ξεβουλώματα" },
          { en: "CCTV inspections & diagnostics", el: "Επιθεωρήσεις με CCTV" },
          { en: "Pit/septic pumping", el: "Άντληση βόθρων" },
          { en: "24/7 emergency response", el: "Επείγουσες παρεμβάσεις 24/7" },
        ],
      },
      {
        value: "elevator technician",
        en: "Elevator Technicians",
        el: "Τεχνικοί Ανελκυστήρων",
        specializations: [
          { en: "Installation & modernization", el: "Εγκατάσταση & εκσυγχρονισμός" },
          { en: "Routine servicing & safety checks", el: "Συντήρηση & έλεγχοι ασφαλείας" },
          { en: "Breakdown repairs", el: "Επισκευές βλαβών" },
          { en: "EN81 compliance & certifications", el: "Συμμόρφωση EN81" },
        ],
      },
      {
        value: "solar installer",
        en: "Smart Meter & Solar Panel Installers",
        el: "Εγκαταστάτες Φωτοβολταϊκών & Smart Meter",
        specializations: [
          { en: "Solar PV & battery storage", el: "Φωτοβολταϊκά & μπαταρίες" },
          { en: "Smart meters & data gateways", el: "Έξυπνοι μετρητές & gateways" },
          { en: "Grid-tie & backup integration", el: "Διασύνδεση δικτύου & backup" },
          { en: "Performance monitoring & O&M", el: "Παρακολούθηση & O&M" },
        ],
      },
    ],
  },
  {
    id: "g",
    icon: "Camera",
    en: "G. Tech, Media & Innovation",
    el: "Ζ. Tech, Media & Καινοτομία",
    professions: [
      {
        value: "photographer",
        en: "Photographers / Videographers",
        el: "Φωτογράφοι / Videographers",
        specializations: [
          { en: "Interior/exterior photography", el: "Φωτογράφιση εσωτερικών/εξωτερικών" },
          { en: "Drone/aerial footage", el: "Εναέρια λήψη με drone" },
          { en: "Video editing & color grading", el: "Μοντάζ & color grading" },
          { en: "360°/virtual tours content", el: "Περιεχόμενο 360°/virtual tours" },
        ],
      },
      {
        value: "virtual tour developer",
        en: "Virtual Tour & AR Developers",
        el: "Developers Virtual Tour & AR",
        specializations: [
          { en: "3D scanning & modeling", el: "3D σάρωση & μοντελοποίηση" },
          { en: "Interactive virtual tours", el: "Διαδραστικά virtual tours" },
          { en: "AR staging/visualization", el: "AR staging" },
          { en: "Web integration & hosting", el: "Ενσωμάτωση & hosting" },
        ],
      },
      {
        value: "drone service",
        en: "3D Mapping & Drone Services",
        el: "Χαρτογράφηση 3D & Υπηρεσίες Drone",
        specializations: [
          { en: "Photogrammetry & mapping", el: "Φωτογραμμετρία & χαρτογράφηση" },
          { en: "Progress & inspection footage", el: "Λήψεις προόδου & επιθεωρήσεων" },
          { en: "GIS/topographic deliverables", el: "GIS/τοπογραφικά παραδοτέα" },
          { en: "Aerial marketing videos", el: "Εναέρια videos marketing" },
        ],
      },
    ],
  },
  {
    id: "h",
    icon: "Sparkles",
    en: "H. Lifestyle & Personal Support",
    el: "Η. Lifestyle & Προσωπική Υποστήριξη",
    professions: [
      {
        value: "babysitter",
        en: "Babysitters / Nannies",
        el: "Babysitters / Νταντάδες",
        specializations: [
          { en: "Daily/hourly babysitting", el: "Καθημερινό/ωριαίο babysitting" },
          { en: "Infant/toddler care", el: "Βρεφονηπιακή φροντίδα" },
          { en: "Travel & bilingual support", el: "Ταξίδια & δίγλωσση υποστήριξη" },
          { en: "CPR/first-aid certified care", el: "Πιστοποίηση Α' βοηθειών" },
        ],
      },
      {
        value: "private chef",
        en: "Private Chefs / Cooks",
        el: "Private Chefs / Μάγειρες",
        specializations: [
          { en: "In-villa meal preparation", el: "Γεύματα εντός βίλας" },
          { en: "Event & villa catering", el: "Catering εκδηλώσεων & βιλών" },
          { en: "Special-diet menus", el: "Μενού ειδικής δίαιτας" },
          { en: "Cooking classes/demos", el: "Μαθήματα μαγειρικής" },
        ],
      },
      {
        value: "housekeeper",
        en: "Housekeepers / Maids",
        el: "Οικιακοί Βοηθοί",
        specializations: [
          { en: "Daily/deep cleaning", el: "Καθημερινός/γενικός καθαρισμός" },
          { en: "Linen & laundry service", el: "Λευκά είδη & πλύσιμο" },
          { en: "Inventory/restocking", el: "Απογραφή/ανεφοδιασμός" },
          { en: "Rental turnovers", el: "Turnover ενοικιάσεων" },
        ],
      },
      {
        value: "pet sitter",
        en: "Pet Sitters / Dog Walkers",
        el: "Pet Sitters / Dog Walkers",
        specializations: [
          { en: "Daily walks & feeding", el: "Βόλτες & ταΐσματα" },
          { en: "Overnight/in-home care", el: "Διανυκτέρευση/κατ' οίκον φροντίδα" },
          { en: "Vet appointment help", el: "Βοήθεια ραντεβού κτηνιάτρου" },
          { en: "Travel/relocation assistance", el: "Βοήθεια ταξιδιού/μετακόμισης" },
        ],
      },
      {
        value: "private driver",
        en: "Private Drivers / Chauffeurs",
        el: "Ιδιωτικοί Οδηγοί",
        specializations: [
          { en: "Airport/port transfers", el: "Μεταφορές αεροδρομίου/λιμανιού" },
          { en: "Daily commuting & errands", el: "Καθημερινές μετακινήσεις" },
          { en: "Private tours & events", el: "Ιδιωτικές περιηγήσεις & events" },
          { en: "VIP/concierge transport", el: "Μεταφορά VIP" },
        ],
      },
      {
        value: "personal trainer",
        en: "Personal Trainers / Yoga Instructors",
        el: "Personal Trainers / Yoga",
        specializations: [
          { en: "Personal training programs", el: "Προγράμματα προσωπικής εκγύμνασης" },
          { en: "Yoga/pilates instruction", el: "Yoga/Pilates" },
          { en: "Nutrition guidance", el: "Διατροφική καθοδήγηση" },
          { en: "Retreat & group sessions", el: "Retreats & ομαδικά μαθήματα" },
        ],
      },
      {
        value: "wellness therapist",
        en: "Wellness & Massage Therapists",
        el: "Θεραπευτές Wellness & Μασάζ",
        specializations: [
          { en: "Deep-tissue/sports massage", el: "Deep-tissue/αθλητικό μασάζ" },
          { en: "Aromatherapy/reflexology", el: "Αρωματοθεραπεία/ρεφλεξολογία" },
          { en: "Lymphatic/detox treatments", el: "Λεμφική παροχέτευση/detox" },
          { en: "Couples or group sessions", el: "Ζευγαριών ή ομαδικά" },
        ],
      },
      {
        value: "event planner",
        en: "Event Planners / Wedding Coordinators",
        el: "Διοργανωτές Εκδηλώσεων & Γάμων",
        specializations: [
          { en: "Venue/vendors coordination", el: "Συντονισμός χώρου/προμηθευτών" },
          { en: "Timeline & logistics", el: "Χρονοδιάγραμμα & logistics" },
          { en: "Budget & contracts", el: "Προϋπολογισμός & συμβόλαια" },
          { en: "Entertainment sourcing", el: "Εύρεση ψυχαγωγίας" },
        ],
      },
      {
        value: "movers",
        en: "Movers & Logistics Providers",
        el: "Μετακομίσεις & Logistics",
        specializations: [
          { en: "Packing/moving services", el: "Συσκευασία/μετακόμιση" },
          { en: "Short/long-term storage", el: "Αποθήκευση" },
          { en: "Furniture assembly", el: "Συναρμολόγηση επίπλων" },
          { en: "International moves", el: "Διεθνείς μετακομίσεις" },
        ],
      },
      {
        value: "yacht charter",
        en: "Boat & Yacht Charter Providers",
        el: "Ενοικίαση Σκαφών & Yachts",
        specializations: [
          { en: "Day cruises & island-hopping", el: "Ημερήσιες κρουαζιέρες" },
          { en: "Crewed/bareboat charters", el: "Με πλήρωμα/bareboat" },
          { en: "Marina logistics & fueling", el: "Logistics μαρίνας & καύσιμα" },
          { en: "Onboard catering options", el: "Catering εντός σκάφους" },
        ],
      },
      {
        value: "water sports instructor",
        en: "Water Sports & Diving Instructors",
        el: "Εκπαιδευτές Θαλάσσιων Σπορ & Καταδύσεων",
        specializations: [
          { en: "Scuba/snorkel instruction", el: "Scuba/snorkel" },
          { en: "SUP/kayak lessons & rentals", el: "SUP/kayak" },
          { en: "Water ski/wakeboard intro", el: "Θαλάσσιο σκι/wakeboard" },
          { en: "Safety & equipment care", el: "Ασφάλεια & εξοπλισμός" },
        ],
      },
      {
        value: "hospitality staff",
        en: "Event & Hospitality Support Staff",
        el: "Προσωπικό Εκδηλώσεων & Φιλοξενίας",
        specializations: [
          { en: "Waiters/bartenders", el: "Σερβιτόροι/bartenders" },
          { en: "Setup/logistics teams", el: "Ομάδες setup/logistics" },
          { en: "Cleaning/turnover crews", el: "Συνεργεία καθαρισμού" },
          { en: "Basic event security", el: "Βασική ασφάλεια εκδήλωσης" },
        ],
      },
      {
        value: "tour guide",
        en: "Private Tour Guides / Cultural Consultants",
        el: "Ιδιωτικοί Ξεναγοί",
        specializations: [
          { en: "Archaeological & city tours", el: "Αρχαιολογικές & city ξεναγήσεις" },
          { en: "Gastronomy & wine trails", el: "Γαστρονομία & κρασί" },
          { en: "Family/private itineraries", el: "Οικογενειακά/ιδιωτικά προγράμματα" },
          { en: "Museum/site interpretation", el: "Ξενάγηση μουσείων" },
        ],
      },
      {
        value: "catering",
        en: "Catering & Event Service Providers",
        el: "Catering & Υπηρεσίες Εκδηλώσεων",
        specializations: [
          { en: "Full-service catering", el: "Catering πλήρους εξυπηρέτησης" },
          { en: "Menu planning & prep", el: "Σχεδιασμός μενού" },
          { en: "Equipment/tableware rental", el: "Ενοικίαση εξοπλισμού" },
          { en: "On-site staff & cleanup", el: "Προσωπικό & καθαρισμός" },
        ],
      },
      {
        value: "vehicle rental",
        en: "Car, Scooter & Bike Rentals",
        el: "Ενοικιάσεις Αυτοκινήτων, Scooter & Ποδηλάτων",
        specializations: [
          { en: "Car/scooter/e-bike rentals", el: "Αυτοκίνητα/scooter/e-bike" },
          { en: "Villa/airport delivery & pickup", el: "Παράδοση σε βίλα/αεροδρόμιο" },
          { en: "Insurance & roadside help", el: "Ασφάλιση & οδική βοήθεια" },
          { en: "Owner fleet management", el: "Διαχείριση στόλου" },
        ],
      },
    ],
  },
];

export const ALL_PROFESSIONS: Profession[] = PROFESSION_GROUPS.flatMap((g) => g.professions);

export function findProfession(value: string): Profession | undefined {
  const v = value.toLowerCase().trim();
  return ALL_PROFESSIONS.find((p) => p.value === v);
}
