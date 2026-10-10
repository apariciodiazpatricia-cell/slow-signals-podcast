# Research: Podcast Website (001-podcast-website)

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md)

All Technical Context unknowns resolved. Format: Decision / Rationale / Alternatives.

## 1. Rendering mode for Next.js

**Decision**: Next.js static export (`output: 'export'` in `next.config.ts`); every
route pre-rendered at build time into a static `out/` directory.

**Rationale**: User specified "Next.js with static site configuration"; constitution
Principle II mandates a static app with no backend server or runtime.

**Alternatives considered**:
- Server rendering (Node server) — rejected: violates constitution Principle II.
- Hybrid (some server routes) — rejected: no requirement needs a server.

**Gotchas confirmed (best practices for static export)**:
- Dynamic routes require `generateStaticParams()` (20 episode pages enumerated at
  build time).
- No middleware, ISR, server actions, or API routes are allowed.
- `next/image` must run with `unoptimized: true`; optimization happens on the
  source assets instead.
- `next/font` (self-hosted fonts) works and makes no external requests.

## 2. Language

**Decision**: TypeScript 5.x.

**Rationale**: Type-checks the embedded 20-episode dataset so missing/mistyped fields
fail the build (supports FR-003/FR-011 and Principle III gates). Next.js has
first-class TypeScript support.

**Alternatives considered**: JavaScript — simpler, but loses build-time validation
of the dataset (recorded in plan.md Complexity Tracking).

## 3. Styling approach

**Decision**: CSS Modules per component + global CSS custom properties ("design
tokens": colors, type scale, spacing) for the elegant, cohesive look.

**Rationale**: Zero additional dependencies (constitution Principle II / YAGNI);
tokens enforce the consistent typography/color/spacing required by FR-009 across all
four pages.

**Alternatives considered**:
- Tailwind CSS — fast, but adds a framework dependency not required by any
  current requirement.
- styled-components — runtime dependency, hydration cost, unnecessary for 4 pages.
- Single vanilla stylesheet — no scoping; drifts as pages grow.

## 4. Embedding the mock data

**Decision**: Typed TypeScript modules under `src/data/` (`episodes.ts`,
`show.ts`, `hosts.ts`, `faq.ts`) exporting the entities from data-model.md, with
build-time invariant checks (20 episodes, one featured, unique slugs).

**Rationale**: User said data is embedded and no feed is pulled; a typed module is
the single source of truth (FR-011) and gives build-time failures when invariants
break.

**Alternatives considered**:
- JSON files — untyped, invariants unchecked.
- MDX content files — richer prose, but adds a dependency and tooling for no
  current requirement (YAGNI).

## 5. Routing and episode details

**Decision**: App Router routes: `/`, `/episodes`, `/episodes/[slug]` (slug like
`episode-20`), `/about`, `/faq`, plus `not-found.tsx` for FR-012. Episode links are
plain `<a>`/`<Link>` navigations — deep-linkable and shareable.

**Rationale**: Satisfies SC-002 (any episode within two interactions from any page)
and keeps the not-found path a first-class, testable state.

**Alternatives considered**:
- Modal/expand-in-list details — rejected: not deep-linkable, weaker on mobile.
- Query-string detail (`/episodes?id=20`) — rejected: uglier URLs, same
  complexity.

## 6. Featured episode selection

**Decision**: `isFeatured: true` on episode 20 (the newest); the landing page reads
the single flagged episode from the data module. Selection is content, not logic —
changing it means editing data.

**Rationale**: Assumption recorded in the spec; exactly-one-featured is a
data-model invariant.

**Alternatives considered**: Hard-code "newest wins" logic — rejected: spec treats
the featured slot as hand-picked content (FR-011 consistency still holds).

## 7. Testing scope (Constitution Principle III)

**Decision**: In scope — ESLint, `tsc --noEmit`, and `next build` as automated
gates, plus the manual verification scenarios in quickstart.md (one per user story).
Out of scope for v1 — unit/e2e frameworks (Vitest/Playwright).

**Rationale**: Principle III requires a verification step per story and that tests,
when in scope, fail-first; it does not mandate a test framework. For a 4-page
static site, build gates + scripted manual verification give the coverage that
matters without a dependency the project does not yet need (YAGNI).

**Alternatives considered**: Playwright e2e suite — rejected for v1 as premature;
revisit if playback/search features arrive.

## 8. Assets, fonts, icons

**Decision**: Source images compressed (modern formats, ≤ target sizes) and
lazy-loaded; fonts self-hosted via `next/font`; icons inline SVG. Page-weight
budget 500 KB tracked in devtools per quickstart.

**Rationale**: Constitution Additional Constraints (compressed/lazy assets, budget)
and SC-006 (readable within 2s).

**Alternatives considered**: External font/CDN services — rejected: adds network
dependencies and potential tracking concerns for no benefit; icon packages —
rejected: extra dependency.

## 9. Accessibility baseline

**Decision**: Semantic HTML landmarks, one `h1` per page, visible focus styles,
skip-to-content link, WCAG 2.1 AA color contrast, alt text on all content images,
mobile menu operable by keyboard.

**Rationale**: FR-010, SC-005 (keyboard-only journeys, 360px width).

**Alternatives considered**: Component library with a11y built in — rejected:
dependency; native semantics cover the requirement.

## 10. Metadata (SEO/share basics)

**Decision**: Per-page `title` and `description` metadata plus Open Graph basics
and a favicon, generated by the framework.

**Rationale**: Spec assumption lists this as a standard expectation of a modern
site.

**Alternatives considered**: Full SEO tooling/sitemaps — out of scope for v1.

## 11. Hosting / deployment

**Decision**: Provider-agnostic static hosting; `next build` output (`out/`) is
deployable anywhere. Local build + static preview is the v1 validation path;
actual deployment is a separate feature.

**Rationale**: Spec does not require deployment; constitution prefers minimal
constraints.

**Alternatives considered**: Binding to one host (Vercel/Netlify/GH Pages) —
rejected: no requirement yet; would add vendor-specific config.

## 12. Static-host URL shape (`trailingSlash`)

**Decision**: `trailingSlash: true` in `next.config.ts`, so every route exports as
a directory with its own `index.html` (`out/episodes/index.html`,
`out/episodes/episode-20/index.html`, `out/404.html` at the root).

**Rationale**: With the default (`false`) Next emits `out/episodes.html` *next to*
the `out/episodes/` directory that holds the detail routes. Extension-less URLs
then resolve to the directory, which has no `index.html`: `npm run preview`
(`serve`) returned HTTP 500 and GitHub Pages returns 404 for a page that exists.
Directory-style URLs are served correctly by every static host (GitHub Pages,
Netlify, Cloudflare Pages, `serve`), which is what the provider-agnostic
deployment decision (§11) requires.

**Alternatives considered**:
- Keep `trailingSlash: false` and rely on host-level "clean URLs" (Netlify
  `cleanUrls`, Cloudflare auto) — rejected: not portable to arbitrary CDNs and
  broken by default with `serve` (the documented preview path).
- Renaming routes to avoid the collision (e.g. `/catalog`) — rejected: hides the
  portability bug instead of fixing it.

## 13. FAQ disclosure pattern

**Decision**: Native `<details>`/`<summary>` elements per question (keyboard
operable, screen-reader announced), grouped into `<section>`s by the optional
`category` field, with no client component and no JavaScript state.

**Rationale**: FR-006 requires answers "visible or openable directly on the page";
US4 scenario 3 requires long answers to scroll readably. Native disclosure gives
all of that, is deep-linkable and works on the static export with zero bundle cost.

**Alternatives considered**: Client-component accordion with `useState` — rejected:
adds hydration/JS for behavior the platform provides; all-answers-always-open —
rejected: makes the "find an answer within 10 seconds" goal (SC-007) harder on a
narrow screen.

## Open items

None — the user supplied the stack (Next.js static export, no database, embedded
data, responsive/mobile); all remaining unknowns above have recorded decisions.
