# Data Model: Podcast Website (001-podcast-website)

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md)

All entities are static, embedded content (no database, no mutations, no state
transitions). Invariants are enforced at build time (see research.md §4).

## Entities

### Episode

One catalog entry of the show (data-model source of truth: `src/data/episodes.ts`).

| Field | Type | Rules |
|-------|------|-------|
| number | integer | 1–20, unique; ordering key (20 = newest) |
| slug | string | unique, kebab-case, stable (e.g. `episode-20`); route key for `/episodes/[slug]` |
| title | string | required, non-empty |
| shortDescription | string | required; ≤ ~160 chars (list/card display) |
| fullDescription | string | required; multi-paragraph (detail view) |
| publishDate | ISO date (YYYY-MM-DD) | required; ep-20 = 2026-10-02, weekly cadence backwards → ep-1 = 2026-05-22 |
| durationMinutes | integer | required, > 0; displayed as "X min" |
| isFeatured | boolean | exactly ONE episode true (defaults to episode 20) |

**Validation (build-time invariants)**:

1. Exactly 20 episodes exist (FR-003, FR-008).
2. Numbers 1–20 each appear exactly once; slugs are unique.
3. Exactly one `isFeatured: true` (FR-002).
4. publishDate strictly decreases with number, in 7-day steps.
5. All required fields non-empty; shortDescription within length bound.
6. Rendered data comes only from this module (FR-011 — landing featured episode and
   catalog entry MUST match).

**State transitions**: none — content is immutable between builds.

### Show

The podcast itself (`src/data/show.ts`).

| Field | Type | Rules |
|-------|------|-------|
| name | string | required; rendered as site title + `h1` on landing |
| tagline | string | required; short, displayed with name (SC-001) |
| description | string | required; long form, used on About page |
| contactLinks | array of { label, url } | ≥ 1 entry; URLs must be reachable (FR-005) |

Relationships: Show 1 — * Episode; Show 1 — * Host.

### Host

A person credited on the show (`src/data/hosts.ts`).

| Field | Type | Rules |
|-------|------|-------|
| name | string | required |
| role | string | required (e.g. "Host & Producer") |
| bio | string | required; short paragraph |

Relationships: Hosts belong to the Show; displayed on About (FR-005). ≥ 1 host.

### FAQ Item

One question/answer pair (`src/data/faq.ts`).

| Field | Type | Rules |
|-------|------|-------|
| question | string | required, non-empty |
| answer | string | required; may be long — must render scrollably (US4 scenario 3) |
| category | string | optional grouping label |

Relationships: ≥ 6 items for the FAQ page (FR-006); display order = file order or
explicit order field.

## Consistency rule (FR-011)

`getFeaturedEpisode()` derives from the same episodes array the catalog renders:
featured episode on `/` and its entry in `/episodes` are byte-identical in content.
