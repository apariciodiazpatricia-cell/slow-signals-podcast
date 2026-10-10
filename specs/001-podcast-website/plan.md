# Implementation Plan: Podcast Website

**Branch**: `001-podcast-website` (feature directory; repository has no git branch yet) | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

**Note**: Filled by the `/speckit.plan` command per `.specify/templates/plan-template.md`.

## Summary

Build an elegant, distinctive podcast website with four pages — a landing page with
one featured episode, an Episodes catalog of exactly 20 mocked episodes, an About
page, and a FAQ page — using Next.js in static-export mode with data embedded in the
codebase. No database, no external feed. Mobile-first responsive layout with
keyboard accessibility, delivered as pure static files.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js (App Router), static export

**Primary Dependencies**: Next.js + React; styling via CSS Modules and CSS custom
properties (no additional UI framework)

**Storage**: N/A — no database; all 20 mocked episodes are embedded as typed data in
the repository

**Testing**: Lint + typecheck + production build as automated gates; manual
verification scenarios in quickstart.md (verification task required per user story
per Constitution Principle III; separate unit/e2e frameworks deferred as YAGNI for v1)

**Target Platform**: Static file hosting; latest two major versions of Chrome,
Firefox, Safari, Edge; responsive from 360px mobile to desktop

**Project Type**: static web application

**Performance Goals**: every page readable within 2s on a typical 4G mobile
connection (SC-006); total page weight budget 500 KB per page (constitution default)

**Constraints**: no secrets in repo or bundle; only public endpoints (none needed
for v1); keyboard-operable pages with alt text on content images; exactly 20 mocked
episodes, exactly one featured; zero feed/API calls; zero console errors

**Scale/Scope**: 4 pages + 20 per-episode detail routes + not-found page; single
repository; content language English

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Gates derived from `.specify/memory/constitution.md` v2.0.0:

- **I. Spec-First** — **PASS**: `spec.md` exists and is the source of truth; this
  plan traces every FR. Implementation MUST NOT begin before this plan and tasks.md.
- **II. Static & Simple** — **PASS**: Next.js configured with static export
  (`output: 'export'`): no server runtime, no database, no server-side data access.
  All episode data is embedded. The Next.js framework dependency is justified by the
  user's explicit stack decision (recorded in Complexity Tracking below).
- **III. Quality Baseline** — **PASS**: quickstart.md defines a verification step for
  every user story; P1 journey is verified before merge; requirements cover
  console-error-free rendering, 360px responsiveness, keyboard operation, and alt
  text. Generated tasks MUST include these verification tasks.

Additional Constraints check: page-weight budget (500 KB) recorded in Technical
Context; no secrets (all content fictional); assets compressed and lazy-loaded —
**PASS**.

Violations: none.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md                  # This file
├── research.md              # Phase 0 output
├── data-model.md            # Phase 1 output
├── quickstart.md            # Phase 1 validation guide
├── contracts/
│   └── pages.md             # Phase 1 UI/route contracts
├── checklists/
│   └── requirements.md      # Spec quality checklist
└── tasks.md                 # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Shared shell: Navigation, Footer, metadata
│   ├── layout.module.css    # Header/wordmark styles (no inline styles)
│   ├── page.tsx             # Landing (hero + featured episode)
│   ├── page.module.css      # Landing CTA styles
│   ├── not-found.tsx        # Friendly 404 (FR-012) + not-found.module.css
│   ├── episodes/
│   │   ├── page.tsx         # Full catalog, newest first (FR-003)
│   │   └── [slug]/page.tsx  # Episode details, pre-rendered (FR-004) + page.module.css
│   ├── about/page.tsx       # Show + hosts + links (FR-005) + page.module.css
│   └── faq/page.tsx         # Q&A list grouped by category (FR-006) + page.module.css
├── components/              # Navigation, Footer, Hero, FeaturedEpisode,
│                            # EpisodeCard, EpisodeList, HostCard, FaqItem,
│                            # PageHeader — each with its own .module.css
├── data/                    # episodes.ts, show.ts, hosts.ts, faq.ts (typed,
│                            # single source — FR-011), types.ts, invariants.ts
├── lib/                     # format.ts — shared date/duration/number
│                            # formatting (DRY across all episode surfaces)
└── styles/                  # tokens.css (design tokens), globals.css

public/                      # favicon.svg, show-art.svg (SVG = compressed by
                             # construction, lazy-loaded via next/image)

Config at root: package.json, tsconfig.json, next.config.ts (output: 'export',
trailingSlash: true), eslint config
```

**Structure Decision**: Single project at the repository root — a Next.js static
export app (`src/app` App Router). No backend directory exists because the
constitution mandates a static app. `trailingSlash: true` makes every route export
as a directory with `index.html` (e.g. `out/episodes/index.html`), so the catalog
page no longer collides with the `out/episodes/` detail-route directory on plain
static hosts. An earlier nested `mi-podcast/mi-podcast/` duplicate scaffold was
audited on 2026-10-10 and confirmed absent (no duplicate/temporary files remain).

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Next.js + React framework dependency (Principle II justification — not a gate violation) | User explicitly selected Next.js with static-export configuration as the stack for this feature | Plain HTML/CSS/JS would be dependency-free but contradicts the user's stated stack decision |
| TypeScript as project language (Principle II justification) | Type-checked embedded episode data prevents FR-003/FR-011 field-consistency defects at build time | Plain JavaScript is simpler but loses build-time validation of the 20-episode dataset |

**Post-design re-evaluation** (after research.md, data-model.md, contracts/,
quickstart.md): **PASS** — static export confirmed, data remains embedded, no
dependencies beyond Next.js/React/TypeScript/CSS Modules (all justified above), no
server or feed integrations introduced, and quickstart.md covers a verification
scenario for every user story.

**Final re-evaluation (2026-10-10, after US2–US4 implementation)**: **PASS** — all
four user stories are implemented against the same embedded dataset; the only
configuration addition is `trailingSlash: true` (no new dependency; recorded in
research.md §10 as a portability requirement of the static export). All quality
gates (`npm run lint`, `npm run typecheck`, `npm run build`) exit 0 with zero
warnings; the production export was verified in-browser against quickstart V1–V6.
