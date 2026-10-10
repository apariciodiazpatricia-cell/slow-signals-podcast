import Link from "next/link";
import styles from "./not-found.module.css";

const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/** Friendly 404 with working navigation back to every page (FR-012). */
export default function NotFound() {
  return (
    <div className="container section">
      <p className="overline">Error 404</p>
      <h1 className={styles.title}>This signal got lost.</h1>
      <p className={styles.description}>
        The page you were looking for does not exist — the episode may have moved,
        or the address may be misspelled. Everything else is one click away.
      </p>
      <ul className={styles.links}>
        {ROUTES.map((route) => (
          <li key={route.href}>
            <Link href={route.href} className={styles.link}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
