# Quickstart: Podcast Website (001-podcast-website)

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md)

Validation/run guide for the feature. Implementation details live in plan.md;
contracts in [contracts/pages.md](./contracts/pages.md); data rules in
[data-model.md](./data-model.md).

## Prerequisites

- Node.js 20+ and npm
- No database, no API keys, no environment secrets (constitution: nothing to
  configure)

## Setup & run

```bash
npm install          # install dependencies
npm run dev          # dev server → http://localhost:3000
npm run lint         # automated gate 1
npm run typecheck    # automated gate 2 (tsc --noEmit)
npm run build        # automated gate 3 → static export into out/
npm run preview      # serve the static build locally for final checks
```

All three gates MUST exit 0 before a story checkpoint is claimed (Constitution
Principle III).

## Verification scenarios

Run against the production build (`npm run build && npm run preview`) unless noted.

### V1 — Landing page (US1 / P1) 🎯 MVP

1. Open `/` → podcast name and tagline visible without scrolling.
2. Exactly ONE episode block marked "Featured", showing number, title, description,
   publish date, duration.
3. Navigation offers Episodes, About, FAQ; current page indicated.
4. DevTools responsive mode at 360px → no horizontal scrolling; menu usable by
   keyboard (Tab reaches every control, Enter activates).

**Expected**: all pass, console free of errors. This is the MVP gate — verify before
any other story is merged.

### V2 — Episode catalog (US2 / P2)

1. Open `/episodes` → exactly 20 entries, newest first (episode 20 at top with
   date 2026-10-02, episode 1 at bottom with 2026-05-22).
2. Each entry shows number, title, short description, publish date, duration.
3. From any page, reach any episode's detail within two clicks (nav → episode).
4. Featured episode's fields on `/` match its catalog entry exactly (FR-011).

### V3 — Episode details (US2)

1. Open any `/episodes/<slug>` → full description plus all core fields.
2. Enter an unknown slug (e.g. `/episodes/nope`) → friendly not-found view with
   working navigation (FR-012).

### V4 — About page (US3 / P3)

1. Open `/about` → show description present.
2. Every host shows name, role, bio.
3. Click each contact/social link → link resolves (no dead links).

### V5 — FAQ page (US4 / P4)

1. Open `/faq` → at least 6 questions listed, sensibly grouped/ordered.
2. Open/read each answer → full answer visible.
3. At 360px width, longest answer scrolls readably without being cut off.

### V6 — Quality baseline (Constitution III + Additional Constraints)

1. Walk all routes with keyboard only: reach and activate nav links and FAQ items.
2. Spot-check content images: each has descriptive alt text.
3. DevTools network transfer per page ≤ 500 KB; images lazy-loaded.
4. Browser console: zero errors on every route.
5. Latest-two-major versions of Chrome/Firefox/Safari/Edge render all pages.

## Pass criteria

Every scenario above passes on the static build; any failure blocks the
corresponding story checkpoint and must be fixed before moving on (spec.md Success
Criteria SC-001–SC-007).
