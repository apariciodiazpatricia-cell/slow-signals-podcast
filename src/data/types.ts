// Entity types — data-model.md (static content, no state transitions).

export interface Episode {
  /** 1–20, unique; ordering key (20 = newest) */
  number: number;
  /** unique kebab-case route key, e.g. "episode-20" */
  slug: string;
  title: string;
  /** ≤ ~160 chars (list/card display) */
  shortDescription: string;
  /** multi-paragraph detail view */
  fullDescription: string;
  /** YYYY-MM-DD; ep-20 = 2026-10-02, weekly backwards → ep-1 = 2026-05-22 */
  publishDate: string;
  /** > 0; displayed as "X min" */
  durationMinutes: number;
  /** exactly one episode across the catalog is true */
  isFeatured: boolean;
}

export interface Show {
  name: string;
  tagline: string;
  description: string;
  contactLinks: { label: string; url: string }[];
}

export interface Host {
  name: string;
  role: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
