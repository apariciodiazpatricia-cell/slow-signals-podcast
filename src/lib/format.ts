// Shared presentation helpers (DRY).
// Date/duration formatting used by every surface that renders an episode
// (landing featured card, catalog card, episode detail) so the same field is
// never formatted twice in two different ways (FR-011).

/** Formats a YYYY-MM-DD string as e.g. "October 2, 2026" (UTC-safe). */
export function formatPublishDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** Formats a minute count as e.g. "42 min". */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/** Formats an episode number as a zero-padded two-digit string, e.g. "07". */
export function formatEpisodeNumber(number: number): string {
  return String(number).padStart(2, "0");
}
