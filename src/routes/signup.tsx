import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import logoIcon from "@/assets/logo-icon.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up | GREECEVEST" },
      {
        name: "description",
        content:
          "Create your GREECEVEST account to access verified properties, connect with trusted professionals, and start your Greek property journey.",
      },
    ],
  }),
  component: SignupPage,
});

export function SignupPage() {
  const [role, setRole] = useState<"user" | "professional">("user");

  return (
    <div className="md:min-h-screen min-h-[calc(100vh-90px)] flex items-center justify-center bg-gradient-to-br from-accent/20 via-primary/10 to-accent/30 px-4 py-12">
    {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-primary/10 to-accent/30 px-4 py-12"> */}
      <div className="w-full max-w-5xl grid md:grid-cols-5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left, Form */}
        {/* <div className="md:col-span-3 bg-card p-10 md:p-14 flex flex-col justify-center"> */}
        <div className="md:col-span-3 bg-card p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center">
          <Link to="/" className="mb-10 block">
            <img src={logoIcon} alt="Greecevest" className="h-12 w-auto" />
          </Link>

          <h1 className="text-3xl font-bold text-foreground">Join Greecevest</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us who you are, we'll tailor your experience.
          </p>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`rounded-xl border-2 p-5 text-center transition-all ${
                  role === "user"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div
                  className={`mx-auto mb-2 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    role === "user" ? "border-accent" : "border-muted-foreground/40"
                  }`}
                >
                  {role === "user" && <div className="h-2 w-2 rounded-full bg-accent" />}
                </div>
                <Label className="text-sm font-medium cursor-pointer">
                  I'm looking for property or professionals
                </Label>
              </button>
              <button
                type="button"
                onClick={() => setRole("professional")}
                className={`rounded-xl border-2 p-5 text-center transition-all ${
                  role === "professional"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div
                  className={`mx-auto mb-2 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    role === "professional" ? "border-accent" : "border-muted-foreground/40"
                  }`}
                >
                  {role === "professional" && <div className="h-2 w-2 rounded-full bg-accent" />}
                </div>
                <Label className="text-sm font-medium cursor-pointer">
                  I'm a professional offering services
                </Label>
              </button>
            </div>

            <Button className="w-full h-11 bg-accent text-white hover:bg-accent/90 rounded-full text-base font-semibold">
              Start Your Journey →
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right, Value Panel */}
        <div className="md:col-span-2 bg-primary text-primary-foreground p-7 xl:p-12 flex-col justify-center hidden md:flex">
          <h2 className="xl:text-2xl text-xl font-bold mb-3 leading-tight">
            Your Entire Greek Property Journey. In one Platform.
          </h2>
          <p className="text-sm leading-relaxed text-primary-foreground/80 mb-8">
            Properties, professionals, and guidance, all in one place. Whether you're buying a
            holiday home, relocating, or investing, we make Greek real estate simple.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                1
              </span>
              <div>
                <div className="font-semibold text-primary-foreground">Discover Properties</div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">
                  Browse curated listings across Greece.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                2
              </span>
              <div>
                <div className="font-semibold text-primary-foreground">
                  Connect with Professionals
                </div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">
                  Agents, lawyers, architects & engineers.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div>
                <div className="font-semibold text-primary-foreground">Learn & Decide</div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">
                  Guides on taxes, residency & legal steps.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
