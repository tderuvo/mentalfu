import { getBeltColors } from "@/lib/beltColors";
import styles from "./NavBar.module.css";

export default function NavBar({ belt }) {
  const { bg, text } = getBeltColors(belt);

  return (
    <nav
      className={styles.nav}
      style={{
        background: bg,
        color: text,
        borderBottomColor: `${text}22`,
      }}
    >
      <a href="/" className={styles.logoLink} aria-label="MentalFu — home">
        <img src="/ninefold-logo.png" alt="" className={styles.logo} />
      </a>
      <a href="/why" className={styles.link} style={{ color: text }}>
        Why MentalFu
      </a>
    </nav>
  );
}
