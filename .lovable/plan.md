## Goal

Make the Greek version a true mirror of the English version: same routes, same components, same UX, with correct Greek copy throughout. Today the EL routes are hand-written variants that have drifted from EN (different UI, missing pages, stale copy).

## Strategy

Replace the per-route Greek rewrites with a **locale-aware approach**: the English route files become the single source of truth for layout and behavior, and copy is sourced from a translation map. The EL routes become thin wrappers that render the same components in Greek.

This eliminates drift permanently. Future UI changes to EN automatically apply to GR; only the translation file needs updating.

## Scope

### 1. Translation layer
- Create `src/i18n/dictionary.ts` with `en` and `el` keys for every user-facing string used by shared pages and components.
- Create `src/i18n/useLocale.ts` hook that infers locale from the route path (`/el/*` → `el`, otherwise `en`) and returns `{ locale, t, localePath }`.
- `localePath("/properties")` returns `/el/properties` when in Greek, `/properties` in English. Use everywhere for `<Link to>` and `useNavigate`.

### 2. Shared, locale-aware components
Refactor these to read strings via `t(...)` and route via `localePath(...)`:
- `Navbar` / `NavbarEl` → single `Navbar` (delete `NavbarEl`)
- `Footer` / `FooterEl` → single `Footer` (delete `FooterEl`)
- `CTABanner` / `CTABannerEl` → single `CTABanner` (delete `CTABannerEl`)
- `ProfessionalCard`, `PropertyCard`, `ProfessionTaxonomy`, `RegionCombobox` → locale-aware labels and links

### 3. Route parity
For every EN route, ensure the EL counterpart exists and renders the **same component tree**:

| EN | EL | Action |
|---|---|---|
| `index.tsx` | `el.index.tsx` | Rewrite EL to import and render the same `HomePage` component |
| `about-us.tsx` | `el.about-us.tsx` | Same |
| `contact-us.tsx` | `el.contact-us.tsx` | Same |
| `professionals.index.tsx` | `el.professionals.tsx` | Rewrite EL to render the same `ProfessionalsPage` component |
| `professionals.$id.tsx` | `el.professionals.$id.tsx` | **Create** |
| `properties.tsx` (layout) | `el.properties.tsx` (currently a page) | Convert EL to layout + index |
| `properties.index.tsx` | `el.properties.index.tsx` | **Create** |
| `properties.$id.tsx` | `el.properties.$id.tsx` | **Create** |
| `gigs.tsx`, `gigs.index.tsx`, `gigs.$id.tsx`, `gigs.post.tsx` | EL equivalents exist | Rewrite to share components |
| `agencies.$slug.tsx` | `el.agencies.$slug.tsx` | **Create** |
| `investment-map.tsx` | `el.investment-map.tsx` | **Create** |
| `login`, `signup`, `privacy-policy`, `terms`, `data-protection` | exist | Rewrite to share components |

### 4. Demo data
Extend `src/data/demo-data.ts` records so `title`/`description`/`location` carry both `en` and `el` variants (or add a parallel `…Translations` field). Cards pick the right one via `useLocale`.

### 5. SEO
Each EL route keeps its own `head()` with Greek title/description/OG tags (head is per-route, not derived from the shared component). Canonical and og:url use `/el/...` paths.

## Technical notes

- The translation dictionary is one flat TS file keyed by namespace: `nav.properties`, `home.hero.title`, `professionals.searchPlaceholder`, etc. No i18n library — keep it dependency-free.
- `useLocale` reads `useRouterState({ select: s => s.location.pathname })` to detect locale; pure function, no context provider needed.
- Shared page components live where the EN route currently defines them. If a route file inlines its component (most do), extract it into `src/pages/<Name>Page.tsx` so both `index.tsx` and `el.index.tsx` can import it. (Note: `src/pages/` here is a plain folder for shared page components — NOT a routing convention. All routing stays in `src/routes/`.)
- Greek-only routes that currently exist as separate implementations (`el.gigs.index.tsx` etc.) get replaced with the shared component + Greek `head()`.

## Out of scope

- No new features or visual redesign.
- No backend changes.
- Greek-only legal copy in `privacy-policy`, `terms`, `data-protection` stays as-is (already Greek-native, no EN equivalent to mirror beyond layout).

## Rollout

Given the size, I will execute in this order and check in after each phase so you can sanity-check before I continue:

1. **Phase 1** — i18n layer + shared Navbar/Footer/CTABanner + locale-aware cards.
2. **Phase 2** — Home, About, Contact parity.
3. **Phase 3** — Professionals (index + detail) parity.
4. **Phase 4** — Properties (layout + index + detail) parity.
5. **Phase 5** — Gigs parity + Agencies detail + Investment map.
6. **Phase 6** — Auth + legal pages cleanup, final QA pass.

Confirm and I'll start with Phase 1.
