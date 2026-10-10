import styles from "./FaqItem.module.css";

interface FaqItemProps {
  question: string;
  answer: string;
}

/**
 * One expandable question/answer pair.
 * Uses native <details>/<summary>: keyboard-operable and announced correctly
 * by screen readers with zero JavaScript (FR-006, FR-010).
 */
export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <li className={styles.item}>
      <details className={styles.details}>
        <summary className={styles.question}>{question}</summary>
        <p className={styles.answer}>{answer}</p>
      </details>
    </li>
  );
}
