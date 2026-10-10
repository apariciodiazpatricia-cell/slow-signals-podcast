# UI Contracts: Podcast Website (001-podcast-website)

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md)

This is a static application: there are no backend APIs or external interfaces.
The contracts below are the page/route contracts the UI MUST honor.

## Route contract

| Route | Page | Required data (minimum) | Key states |
|-------|------|--------------------------|------------|
| `/` | Landing | show name, tagline, exactly ONE featured episode with number, title, description, publish date, duration (FR-002) | unknown route → not-found view |
| `/episodes` | Catalog | exactly 20 episodes, newest → oldest, showing number, title, short description, publish date, duration (FR-003) | missing optional field renders without layout damage (edge case) |
| `/episodes/[slug]` | Episode detail | full fields + full description for the matching episode (FR-004) | unknown slug → not-found view (FR-012) |
| `/about` | About | show description; each host name/role/bio; ≥ 1 working contact/social link (FR-005) | dead link fails scenario (US3.3) |
| `/faq` | FAQ | ≥ 6 questions with full answers openable/readable in place (FR-006) | long answer scrolls readably (US4.3) |
| any other path | Not-found | friendly message + working navigation to all four pages (FR-012) | never a blank/broken page |

## Navigation contract

- Navigation is present on EVERY route and links to `/`, `/episodes`, `/about`,
  `/faq` (FR-007).
- The current page is visually indicated in the navigation.
- On mobile widths the menu is operable by keyboard and touch (FR-010, SC-005).
- Every page reaches every other page within one interaction; any episode detail is
  reachable within two interactions from any page (SC-002).

## Data consistency contract (FR-011)

- Exactly one data module defines episodes; the landing featured episode and its
  catalog/detail entries are rendered from it and MUST match on all shared fields.
- Featured flag: exactly one episode at any time (build fails otherwise).

## Presentation contract

- Design tokens (colors, type scale, spacing) are shared: no page may look unstyled
  or inconsistent (FR-009).
- Content images carry descriptive alt text; landmark elements (`header`, `nav`,
  `main`, `footer`) present on each page (FR-010).
- Color contrast meets WCAG 2.1 AA (research.md §9).

## Performance contract

- Each page ≤ 500 KB transferred (plan Technical Context budget) and readable
  within 2s on simulated 4G (SC-006).
- Zero visible errors and zero console errors on all routes (Quality Baseline).

## Browser contract

- Latest two major versions of Chrome, Firefox, Safari, Edge; layouts hold from
  360px width upward (SC-005).
