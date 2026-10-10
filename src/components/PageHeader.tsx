import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  /** Eyebrow text rendered above the title (e.g. "Catalog"). */
  overline: string;
  /** The page's single h1. */
  title: string;
  /** Optional supporting sentence. */
  description?: string;
}

/** Shared page masthead: guarantees one h1 and a consistent header rhythm (FR-009). */
export function PageHeader({ overline, title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className="overline">{overline}</p>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
