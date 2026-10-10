<!--
Sync Impact Report
==================
- Version change: 1.0.0 -> 2.0.0
  Rationale: MAJOR - principles redefined for a static web app scope; the
  Test-First, Media Reliability, and Observability & Simplicity principles were
  removed or redefined (backward-incompatible governance change).
- Modified principles:
  - I. Spec-First -> I. Spec-First (retained, trimmed to bare minimum)
  - II. Independent User Stories -> II. Static & Simple (renamed/redefined)
  - III. Test-First (NON-NEGOTIABLE) -> III. Quality Baseline (redefined: full TDD
    mandate replaced with a minimal, testable static-app quality floor)
  - IV. Media Reliability -> REMOVED (out of scope for a static web app)
  - V. Observability & Simplicity -> REMOVED (simplicity folded into II)
- Added sections: none
- Removed sections: Core Principles IV and V
- Templates requiring updates:
  - .specify/templates/tasks-template.md - ✅ updated (test-first mandate relaxed to
    Quality Baseline wording; former Principle V task retargeted to Principle III)
  - .opencode/commands/speckit.tasks.md - ✅ updated (same re-sync)
  - .specify/templates/plan-template.md - ✅ reviewed; "Constitution Check" gate is
    generic and filled at /speckit.plan runtime; still aligned
  - .specify/templates/spec-template.md - ✅ reviewed; mandatory sections align with
    Principles I & II; no edit needed
  - .specify/templates/checklist-template.md - ✅ reviewed; generic sample items
  - .specify/templates/constitution-template.md - ✅ unchanged (kept as generic
    template for future projects)
  - .opencode/commands/*.md (others) - ✅ reviewed; generic constitution references,
    no outdated agent-specific guidance
  - README.md / docs/quickstart.md - ⚠ pending; do not exist yet. When created they
    MUST reference Principles I-III
  - mi-podcast/.specify/** and mi-podcast/.opencode/** - ⚠ pending; nested duplicate
    spec-kit scaffold with its own UNFILLED constitution and pre-amendment templates;
    decide whether to delete it or propagate this constitution manually
- Follow-up TODOs: none (ratification date remains 2026-10-02, original adoption)
-->

# mi-podcast Constitution

## Core Principles

### I. Spec-First

- Every feature MUST start with a specification at `specs/<branch>/spec.md`
  (`/speckit.specify`) and a plan (`/speckit.plan`) before implementation begins.
- The spec is the source of truth: when code and spec disagree, the spec wins until
  it is formally amended through `/speckit.clarify` or `/speckit.constitution`.

**Rationale**: Written specs keep agent-driven work from drifting from intent.

### II. Static & Simple

- The project MUST remain a static web app: HTML, CSS, JavaScript, and static assets
  served from a static host. No backend server, database, or server-side runtime MAY
  be introduced without a constitution amendment.
- New dependencies, frameworks, or build tooling MUST be justified by a current
  requirement (YAGNI); the justification MUST be recorded in plan.md's Complexity
  Tracking table.

**Rationale**: A minimal stack keeps hosting, security, and maintenance trivial.

### III. Quality Baseline

- Every user story MUST have a defined verification step, and the P1 (MVP) journey
  MUST be verified working before merge.
- Pages MUST load without console errors, MUST render responsively on mobile
  widths, and MUST be keyboard-operable with alt text on content images (basic
  accessibility).
- Automated tests, when the plan puts them in scope, MUST pass; when written first
  they MUST fail before implementation (Red -> Green).

**Rationale**: A small, testable floor catches the failures that matter for a static
site without imposing full TDD ceremony.

## Additional Constraints

- Everything committed is public: the repository and shipped bundle MUST NOT contain
  secrets, API keys, or private URLs. Browser-side network calls MUST use public
  endpoints only.
- Images and other assets MUST be compressed and lazy-loaded; each page MUST stay
  within the page-weight budget recorded in plan.md (default: 500 KB).
- The site MUST work without JavaScript errors on the latest two major versions of
  Chrome, Firefox, Safari, and Edge.

## Development Workflow

- Feature work MUST follow the spec-kit loop: `/speckit.specify` -> `/speckit.clarify`
  -> `/speckit.plan` -> `/speckit.tasks` -> implementation -> `/speckit.analyze`
  before merge.
- plan.md MUST pass the Constitution Check gate (Principles I-III) before Phase 0
  research proceeds. Violations MUST be justified in Complexity Tracking or the plan
  MUST be revised; they MUST NOT be silently waived.
- Reviews MUST verify compliance with this constitution. A CRITICAL violation blocks
  merge until the spec, plan, or code is corrected - never by reinterpreting the
  principle.
- Work MUST be committed after each task or logical group, and each user story MUST
  reach its checkpoint before work starts on the next story.

## Governance

- This constitution supersedes all other practices when they conflict; when in doubt,
  the stricter principle applies.
- Amendments MUST be made via `/speckit.constitution`, MUST include this Sync Impact
  Report, and MUST propagate to dependent templates (plan, spec, tasks, commands) in
  the same change.
- **Versioning policy** (semantic versioning): MAJOR - principles removed or
  redefined backward-incompatibly; MINOR - new principle/section added or materially
  expanded; PATCH - clarifications, wording, non-semantic refinements.
- **Compliance review**: every spec, plan, task list, and code review MUST be checked
  against this constitution. Violations are CRITICAL and require fixing the artifact;
  changing a principle requires an explicit amendment, never informal ignoring.

**Version**: 2.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
