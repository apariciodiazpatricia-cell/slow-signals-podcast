import { show } from "@/data/show";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.name}>{show.name}</p>
          <p className={styles.tagline}>{show.tagline}</p>
        </div>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {show.name}. All episodes are fictional demo
          content.
        </p>
      </div>
    </footer>
  );
}
