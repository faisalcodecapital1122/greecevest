import { Link, useRouterState } from "@tanstack/react-router";
import { forwardRef } from "react";

export type Locale = "en" | "el";

/** Detect current locale from the URL pathname. /el or /el/... => "el", everything else => "en". */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/el" || pathname.startsWith("/el/") ? "el" : "en";
}

/** Pick the right variant for the current locale: tx("Hello", "Γεια"). */
export function useTx(): <T>(en: T, el: T) => T {
  const locale = useLocale();
  return <T,>(en: T, el: T): T => (locale === "el" ? el : en);
}

/** Build a locale-prefixed path. lp("/properties") => "/el/properties" in Greek, "/properties" in English. */
export function useLp(): (path: string) => string {
  const locale = useLocale();
  return (path: string) => {
    if (locale !== "el") return path;
    if (path === "/") return "/el";
    return `/el${path}`;
  };
}

/** Pure helpers (no hooks) for callers outside React. */
export function localizePath(path: string, locale: Locale): string {
  if (locale !== "el") return path;
  if (path === "/") return "/el";
  return `/el${path}`;
}

/** Drop-in replacement for <Link> that auto-prefixes /el when the user is on the Greek side. */
export const LocaleLink = forwardRef<HTMLAnchorElement, any>(function LocaleLink(
  { to, ...rest }: any,
  ref,
) {
  const lp = useLp();
  return <Link ref={ref} {...(rest as any)} to={lp(to) as any} />;
}) as unknown as typeof Link;

