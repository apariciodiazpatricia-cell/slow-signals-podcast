import type { Metadata } from "next";
import { FaqItem } from "@/components/FaqItem";
import { PageHeader } from "@/components/PageHeader";
import type { FAQItem } from "@/data/types";
import { faqItems } from "@/data/faq";
import { show } from "@/data/show";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Practical questions about ${show.name}: schedule, listening, and contact.`,
  openGraph: {
    title: `FAQ · ${show.name}`,
    description: `Practical questions about ${show.name}.`,
    type: "website",
  },
};

interface FaqGroup {
  category: string;
  items: FAQItem[];
}

/** Groups items by their optional category, preserving first-seen order. */
function groupByCategory(items: FAQItem[]): FaqGroup[] {
  const groups = new Map<string, FAQItem[]>();
  for (const item of items) {
    const key = item.category ?? "General";
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(key, [item]);
    }
  }
  return Array.from(groups, ([category, grouped]) => ({ category, items: grouped }));
}

export default function FaqPage() {
  const groups = groupByCategory(faqItems);

  return (
    <div className="container section">
      <PageHeader
        overline="Support"
        title="Frequently asked questions"
        description="Everything visitors usually want to know before pressing play."
      />

      {groups.map((group) => {
        const headingId = `faq-${group.category.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <section
            key={group.category}
            className={styles.group}
            aria-labelledby={headingId}
          >
            <h2 id={headingId} className={styles.groupTitle}>
              {group.category}
            </h2>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
