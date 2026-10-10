import type { Host } from "@/data/types";
import styles from "./HostCard.module.css";

interface HostCardProps {
  host: Host;
}

/** One host credit: name, role, short biography (FR-005). */
export function HostCard({ host }: HostCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.role}>{host.role}</p>
      <h3 className={styles.name}>{host.name}</h3>
      <p className={styles.bio}>{host.bio}</p>
    </article>
  );
}
