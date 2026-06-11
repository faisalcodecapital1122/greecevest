import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoIcon from "@/assets/logo-icon.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In | GREECEVEST" },
      {
        name: "description",
        content:
          "Log in to your GREECEVEST account to access saved properties, connect with professionals, and manage your Greek property journey.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  return (
    <div className="md:min-h-screen min-h-[calc(100vh-90px)] flex items-center justify-center bg-gradient-to-br from-accent/20 via-primary/10 to-accent/30 px-4 py-12">
    {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-primary/10 to-accent/30 px-4 py-12"> */}
      <div className="w-full max-w-5xl grid md:grid-cols-5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left, Form */}
        <div className="md:col-span-3 bg-card p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center">
        {/* <div className="md:col-span-3 bg-card p-10 md:p-14 flex flex-col justify-center"> */}
          <Link to="/" className="sm:mb-10 mb-7 block">
            <img src={logoIcon} alt="Greecevest" className="h-12 w-auto" />
          </Link>

          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Pick up where you left off.</p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-11 bg-muted/40 focus-visible:ring-accent/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="h-11 bg-muted/40 focus-visible:ring-accent/50"
              />
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-accent text-white hover:bg-accent/90 rounded-full text-base font-semibold mt-2"
            >
              Sign In to Your Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-accent hover:underline">
              Join Greecevest
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
