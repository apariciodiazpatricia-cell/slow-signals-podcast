// Build-time invariants — data-model.md "Validation (build-time invariants)".
// Violations throw during module load, failing `next build` and `next dev`.

import type { Episode } from "./types";

export function assertEpisodeInvariants(episodes: Episode[]): void {
  const fail = (msg: string): never => {
    throw new Error(`[data invariants] ${msg}`);
  };

  // 1. Exactly 20 episodes (FR-003, FR-008)
  if (episodes.length !== 20) {
    fail(`expected exactly 20 episodes, found ${episodes.length}`);
  }

  // 2. Numbers 1–20 unique; slugs unique
  const numbers = new Set(episodes.map((e) => e.number));
  if (numbers.size !== 20) fail("episode numbers must be unique (1–20)");
  for (let n = 1; n <= 20; n++) {
    if (!numbers.has(n)) fail(`episode number ${n} missing`);
  }
  const slugs = new Set(episodes.map((e) => e.slug));
  if (slugs.size !== 20) fail("episode slugs must be unique");

  // 3. Exactly one featured episode (FR-002)
  const featured = episodes.filter((e) => e.isFeatured);
  if (featured.length !== 1) {
    fail(`expected exactly 1 featured episode, found ${featured.length}`);
  }

  // 4. publishDate strictly decreases with number, 7-day steps
  const sorted = [...episodes].sort((a, b) => b.number - a.number);
  for (let i = 1; i < sorted.length; i++) {
    const newer = Date.parse(sorted[i - 1].publishDate);
    const older = Date.parse(sorted[i].publishDate);
    const day = 24 * 60 * 60 * 1000;
    if (!(newer > older)) {
      fail(`publish dates must strictly decrease (ep ${sorted[i - 1].number} → ${sorted[i].number})`);
    }
    if (Math.round((newer - older) / day) !== 7) {
      fail(`publish dates must follow a 7-day cadence (ep ${sorted[i - 1].number} → ${sorted[i].number})`);
    }
  }

  // 5. Required fields non-empty
  for (const e of episodes) {
    if (!e.title.trim()) fail(`episode ${e.number}: empty title`);
    if (!e.shortDescription.trim()) fail(`episode ${e.number}: empty shortDescription`);
    if (!e.fullDescription.trim()) fail(`episode ${e.number}: empty fullDescription`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.publishDate)) {
      fail(`episode ${e.number}: publishDate must be YYYY-MM-DD`);
    }
    if (!(e.durationMinutes > 0)) fail(`episode ${e.number}: durationMinutes must be > 0`);
    if (!/^[a-z0-9-]+$/.test(e.slug)) fail(`episode ${e.number}: slug must be kebab-case`);
  }
}

/** Single source for the featured episode (FR-011: landing === catalog). */
export function getFeaturedEpisode(episodes: Episode[]): Episode {
  const featured = episodes.find((e) => e.isFeatured);
  if (!featured) throw new Error("[data invariants] no featured episode");
  return featured;
}
