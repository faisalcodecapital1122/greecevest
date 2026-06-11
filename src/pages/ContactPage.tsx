import { Mail, Phone, MapPin, Clock, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Footer } from "@/components/Footer";
import { useTx } from "@/i18n/locale";

export function ContactPage() {
  const tx = useTx();

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {tx("Contact Us", "Επικοινωνία")}
          </span>
          {/* <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight"> */}
          <h1 className="mt-3 md:text-4xl text-3xl lg:text-5xl font-extrabold leading-tight">
            {tx("We're Here to ", "Είμαστε εδώ για να ")}
            <span className="text-accent">{tx("Help", "βοηθήσουμε")}</span>
          </h1>
          {/* <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto"> */}
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {tx(
              "Whether you have a question about properties or need to connect with one of our eight categories of verified professionals, reach out today.",
              "Είτε έχεις απορία για ακίνητα είτε θέλεις να συνδεθείς με μία από τις οκτώ κατηγορίες πιστοποιημένων επαγγελματιών, επικοινώνησε σήμερα.",
            )}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {/* <h2 className="text-3xl font-bold text-foreground"> */}
              <h2 className="md:text-3xl text-2xl font-bold text-foreground">
                {tx("Send us a message", "Στείλε μας μήνυμα")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {tx(
                  "Fill out the form and we'll get back to you within 24 hours.",
                  "Συμπλήρωσε τη φόρμα και θα σου απαντήσουμε εντός 24 ωρών.",
                )}
              </p>

              <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{tx("Full Name", "Ονοματεπώνυμο")}</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      required
                      placeholder={tx("Your name", "Το όνομά σου")}
                      className="h-11 focus-visible:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{tx("Email", "Email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="your@email.com"
                      className="h-11 focus-visible:ring-accent/50"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {tx("Phone", "Τηλέφωνο")}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({tx("optional", "προαιρετικό")})
                      </span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+30 XXX XXX XXXX"
                      className="h-11 focus-visible:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">{tx("I am a...", "Είμαι...")}</Label>
                    <Select name="role">
                      <SelectTrigger id="role" className="h-11 focus:ring-accent/50">
                        <SelectValue placeholder={tx("Select your role", "Επίλεξε ρόλο")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">
                          {tx("Buyer / Investor", "Αγοραστής / Επενδυτής")}
                        </SelectItem>
                        <SelectItem value="owner">
                          {tx("Property Owner", "Ιδιοκτήτης ακινήτου")}
                        </SelectItem>
                        <SelectItem value="professional">
                          {tx("Professional", "Επαγγελματίας")}
                        </SelectItem>
                        <SelectItem value="other">{tx("Other", "Άλλο")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{tx("Message", "Μήνυμα")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder={tx(
                      "Tell us about your project or question...",
                      "Πες μας για το έργο ή την απορία σου...",
                    )}
                    rows={6}
                    className="focus-visible:ring-accent/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
                >
                  {tx("Send Message", "Αποστολή μηνύματος")}
                </Button>
              </form>
            </div>

            <aside className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 h-fit">
            {/* <aside className="bg-primary text-primary-foreground rounded-2xl p-8 h-fit"> */}
              <h3 className="text-xl font-bold">
                {tx("Contact Information", "Στοιχεία επικοινωνίας")}
              </h3>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a
                      href="mailto:info@greecevest.gr"
                      className="text-sm text-primary-foreground/80 hover:text-accent"
                    >
                      info@greecevest.gr
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tx("Phone", "Τηλέφωνο")}</p>
                    <p className="text-sm text-primary-foreground/80">+30 210 XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{tx("Address", "Διεύθυνση")}</p>
                    <p className="text-sm text-primary-foreground/80">
                      {tx("Athens, Greece", "Αθήνα, Ελλάδα")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">
                      {tx("Response Time", "Χρόνος απόκρισης")}
                    </p>
                    <p className="text-sm text-primary-foreground/80">
                      {tx("We respond within 24 hours", "Απαντάμε εντός 24 ωρών")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/15">
                <p className="text-sm font-semibold text-primary-foreground/80">
                  {tx("Follow us", "Ακολούθησέ μας")}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-md bg-primary-foreground/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-md bg-primary-foreground/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
