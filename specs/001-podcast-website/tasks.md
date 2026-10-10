---

description: "Task list template for feature implementation"
---

# Tasks: Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Per constitution Principle III (Quality Baseline), every user story MUST have a verification step. Include test tasks when the plan puts tests in scope (write them FIRST and confirm they FAIL), and always include a manual verification task for the P1 journey.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project at repository root: `src/`, `public/` (Next.js static export per plan.md)
- Feature docs: `specs/001-podcast-website/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js static-export scaffold: package.json, tsconfig.json, next.config.ts (output: 'export', images unoptimized), .eslintrc.json, .eslintignore, next-env.d.ts, npm scripts (dev/build/lint/typecheck/preview)
- [x] T002 [P] Create design tokens and base stylesheet in src/styles/tokens.css and src/styles/globals.css (colors, type scale, spacing, WCAG AA contrast pairs)
- [x] T003 [P] Create app shell in src/app/layout.tsx (skip-to-content link, header/nav/main/footer landmarks, self-hosted fonts, base metadata; placeholder nav replaced in T010)
- [x] T004 [P] Add static assets in public/ (favicon.svg, show-art.svg SVG placeholders — kept vector for page-weight budget)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer and shared shell that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create src/data/episodes.ts with 20 typed Episode records (slugs episode-01..episode-20, weekly dates 2026-05-22 → 2026-10-02, episode 20 isFeatured)
- [x] T006 [P] Create src/data/show.ts (Show: name, tagline, description, ≥1 contactLink)
- [x] T007 [P] Create src/data/hosts.ts (≥1 Host: name, role, bio)
- [x] T008 [P] Create src/data/faq.ts (≥6 FAQ items: question, answer, category)
- [x] T009 Add src/data/invariants.ts with build-time checks (exactly 20 episodes, unique numbers/slugs, exactly one featured, 7-day date cadence, non-empty fields) and getFeaturedEpisode(); wired into episodes.ts
- [x] T010 Create src/components/Navigation.tsx and src/components/Footer.tsx and rewire src/app/layout.tsx per contracts/pages.md navigation contract (all 4 routes, current-page indication)
- [x] T011 Run red baseline gates: npm run lint, npm run typecheck, npm run build — record failures as the red state (Principle III)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Discover the show from the landing page (Priority: P1) 🎯 MVP

**Goal**: Elegant landing page with show identity and exactly one featured episode

**Independent Test**: quickstart.md V1 — open `/` on desktop + mobile widths; show identity, one featured episode with 5 fields, working navigation

### Verification for User Story 1 (write FIRST) ⚠️

> **NOTE**: Establish the red baseline FIRST — V1 must fail before implementation

- [x] T012 [US1] Establish V1 red baseline against specs/001-podcast-website/quickstart.md (document which checks fail before landing work starts)

### Implementation for User Story 1

- [x] T013 [P] [US1] Create src/components/Hero.tsx and src/components/Hero.module.css (show name as h1 + tagline above the fold)
- [x] T014 [P] [US1] Create src/components/FeaturedEpisode.tsx and src/components/FeaturedEpisode.module.css (Featured badge, number, title, description, publish date, duration from getFeaturedEpisode())
- [x] T015 [US1] Compose landing page src/app/page.tsx from Hero + FeaturedEpisode with CTAs to /episodes, /about, /faq and per-page metadata
- [x] T016 [US1] Style landing for cohesive elegant look and 360px responsiveness in src/app/page.tsx, src/components/Hero.module.css, src/components/FeaturedEpisode.module.css (FR-009)
- [x] T017 [US1] Verify V1 scenario per specs/001-podcast-website/quickstart.md (all 4 checks + zero console errors) and run gates (npm run lint, npm run typecheck, npm run build) — MVP checkpoint

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Browse the full episode catalog (Priority: P2)

**Goal**: All 20 episodes listed newest-first with reachable detail views

**Independent Test**: quickstart.md V2/V3 — exactly 20 entries with 5 fields, details within 2 interactions, unknown slug → friendly 404

### Verification for User Story 2 (write FIRST) ⚠️

- [x] T018 [US2] Establish V2/V3 red baseline against specs/001-podcast-website/quickstart.md before catalog work starts

### Implementation for User Story 2

- [x] T019 [P] [US2] Create src/components/EpisodeCard.tsx and src/components/EpisodeList.tsx (number, title, shortDescription, publishDate, duration; newest first)
- [x] T020 [US2] Build catalog page src/app/episodes/page.tsx rendering exactly 20 episodes from src/data/episodes.ts
- [x] T021 [US2] Build episode detail route src/app/episodes/[slug]/page.tsx with generateStaticParams() pre-rendering all 20 slugs and full description display
- [x] T022 [P] [US2] Create friendly not-found view src/app/not-found.tsx with working navigation (FR-012)
- [x] T023 [US2] Verify V2/V3 per specs/001-podcast-website/quickstart.md including FR-011 landing/catalog consistency, then run gates

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Learn who is behind the show (Priority: P3)

**Goal**: About page with show description, host bios, working contact links

**Independent Test**: quickstart.md V4 — description, hosts with name/role/bio, links resolve

### Verification for User Story 3 (write FIRST) ⚠️

- [x] T024 [US3] Establish V4 red baseline against specs/001-podcast-website/quickstart.md before About work starts

### Implementation for User Story 3

- [x] T025 [P] [US3] Create src/components/HostCard.tsx and src/components/HostCard.module.css (name, role, bio)
- [x] T026 [US3] Build src/app/about/page.tsx (show description from src/data/show.ts, HostCards from src/data/hosts.ts, contact/social links)
- [x] T027 [US3] Verify V4 per specs/001-podcast-website/quickstart.md including link checks, then run gates

**Checkpoint**: At this point, User Stories 1-3 should all be independently functional

---

## Phase 6: User Story 4 - Find answers in the FAQ (Priority: P4)

**Goal**: FAQ page with ≥6 questions and readable answers

**Independent Test**: quickstart.md V5 — ≥6 questions, answers visible/openable, long answers scroll at 360px

### Verification for User Story 4 (write FIRST) ⚠️

- [x] T028 [US4] Establish V5 red baseline against specs/001-podcast-website/quickstart.md before FAQ work starts

### Implementation for User Story 4

- [x] T029 [P] [US4] Create src/components/FaqItem.tsx and src/components/FaqItem.module.css (accessible expandable Q&A, keyboard operable)
- [x] T030 [US4] Build src/app/faq/page.tsx rendering ≥6 items from src/data/faq.ts, grouped sensibly
- [x] T031 [US4] Verify V5 per specs/001-podcast-website/quickstart.md, then run gates

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 Add per-route metadata and Open Graph tags across src/app/page.tsx, src/app/episodes/page.tsx, src/app/about/page.tsx, src/app/faq/page.tsx
- [x] T033 [P] Accessibility audit: visible focus styles, landmarks, alt text on content images in src/app/layout.tsx and src/components/
- [x] T034 [P] Performance pass: page weight ≤500KB, compressed lazy-loaded images in public/ and next.config.ts (SC-006)
- [x] T035 [P] Responsive pass at 360px across src/app/ and src/components/ (SC-005)
- [x] T036 Run full quickstart V1–V6 on the production build (npm run build && npm run preview) and record results in tasks.md notes
- [x] T037 [P] Create README.md at repository root with setup, run, and verification instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories proceed in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational - no dependencies on other stories
- **User Story 2 (P2)**: Starts after Foundational - independent; shares nav/layout from Foundational
- **User Story 3 (P3)**: Starts after Foundational - independent
- **User Story 4 (P4)**: Starts after Foundational - independent

### Within Each User Story

- Verification/red-baseline tasks come FIRST (constitution Principle III)
- Components before pages
- Page complete before running verification-pass task
- Story checkpoint before moving to next priority

### Parallel Opportunities

- Phase 1: T002 ∥ T003 ∥ T004 (different files)
- Phase 2: T006 ∥ T007 ∥ T008 (different data files)
- Phase 3: T013 ∥ T014 (different component files)
- Phase 4: T019 ∥ T022 (different files)
- Phase 5: T025 independent
- Phase 6: T029 independent
- Phase 7: T033 ∥ T034 ∥ T035 ∥ T037 (disjoint files)

---

## Parallel Example: User Story 1

```bash
# Launch both landing components together:
Task: "Create src/components/Hero.tsx and src/components/Hero.module.css"
Task: "Create src/components/FeaturedEpisode.tsx and src/components/FeaturedEpisode.module.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently — pause for localhost review
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → **localhost review pause** (MVP)
3. Add User Story 2 → test independently
4. Add User Story 3 → test independently
5. Add User Story 4 → test independently
6. Polish phase → full quickstart run

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verification tasks run before implementation and again after (Principle III)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Progress Log

- 2026-10-02 — Phases 1–3 complete (T001–T017). **MVP (US1) reached; PAUSED for
  localhost review before continuing with US2–US4.**
  - Red baseline (T012): before implementation no landing route existed and V1
    could not pass; first `npm run lint` run failed on the wordmark `<a href>`
    (fixed via `next/link`), typecheck and build passed after the fix.
  - Gates green: `npm run lint` ✓, `npm run typecheck` ✓, `npm run build` ✓
    (Next.js 15.5.27 static export; `/` first load 107 kB — under 500 KB budget).
  - V1 verified in browser at http://localhost:3000:
    - name + tagline above the fold ✓, single h1 ✓, skip link ✓
    - exactly one featured card: badge "Featured · Episode 20", title,
      "October 2, 2026", "42 min", description ✓ (FR-002, FR-011)
    - nav Home/Episodes/About/FAQ present, Home marked aria-current ✓
    - 360px viewport (iframe emulation): no horizontal overflow, narrow
      media queries active, featured card intact ✓ (SC-005)
    - zero console errors (only React DevTools info notice) ✓
  - Note: nav links to /episodes, /about, /faq currently 404 — routes are
    delivered by US2/US3/US4 (pending).

- 2026-10-10 — Phases 4–7 complete (T018–T037). **US2, US3 and US4 delivered;
  all four user stories + polish now green.**
  - Red baselines (T018/T024/T028): before implementation `/episodes`, `/about`,
    `/faq` returned the static-export 404 and the V2–V5 scenarios could not pass.
  - Implementation: `src/app/episodes/page.tsx` (20 cards, newest first),
    `src/app/episodes/[slug]/page.tsx` (generateStaticParams for all 20 slugs,
    generateMetadata, older/newer adjacency links), `src/app/about/page.tsx`
    (premise + hosts + contact links + show-art.svg with descriptive alt),
    `src/app/faq/page.tsx` (8 items grouped into 3 categories via native
    `<details>`), `src/app/not-found.tsx` (friendly 404 + working nav, FR-012).
    New components: EpisodeCard, EpisodeList, HostCard, FaqItem, PageHeader.
  - DRY refactor: `src/lib/format.ts` (formatPublishDate/formatDuration/
    formatEpisodeNumber) replaces the local formatDate copy in FeaturedEpisode;
    inline `style` objects in layout.tsx/page.tsx moved to CSS Modules
    (layout.module.css, page.module.css).
  - Audit fix (portability): `trailingSlash: true` added to next.config.ts —
    without it `out/episodes.html` collided with the `out/episodes/` detail
    directory and extension-less URLs returned 500/404 on plain static hosts.
  - Content fix: FAQ "download" answer rewritten — it promised download links
    that the spec explicitly puts out of scope (no real audio).
  - Verification on the production export (`npm run build && npm run preview`):
    V1–V6 pass — 20/20 catalog entries with all five fields, newest first
    (2026-10-02 → 2026-05-22); featured episode byte-identical between `/` and
    its catalog card (FR-011); unknown slug → custom 404 with working nav
    (HTTP 404 status); hosts + 3 contact links resolve; FAQ 8 items / 3
    categories, answers toggle via keyboard-operable `<details>`.
  - Quality gates green: `npm run lint` ✓, `npm run typecheck` ✓,
    `npm run build` ✓ (27 static pages; first load 103–109 kB, transfer per
    page 8–206 kB — all under the 500 kB budget, SC-006).
  - Zero console errors/warnings on every route; Lighthouse desktop on `/`,
    `/episodes/`, `/about/`, `/faq/`, `/episodes/episode-20/`: Accessibility,
    Best Practices and SEO = 100, zero failed audits; no horizontal scroll at
    360 px on any route (SC-005).
  - Cleanup: stale `tsconfig.tsbuildinfo` removed; no duplicate or nested
    scaffold directories found (the `mi-podcast/mi-podcast/` duplicate noted in
    plan.md no longer exists).
