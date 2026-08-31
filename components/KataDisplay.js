"use client";

import { useEffect, useState } from "react";
import styles from "./KataDisplay.module.css";

export default function KataDisplay({ katas }) {
  const [kata, setKata] = useState(null);

  useEffect(() => {
    setKata(katas[Math.floor(Math.random() * katas.length)]);
  }, [katas]);

  return (
    <main className={styles.page}>
      <img src="/ninefold-logo.png" alt="Ninefold" className={styles.logo} />

      {kata && (
        <article className={styles.kata}>
          <h1 className={styles.title}>{kata.title}</h1>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: kata.html }}
          />
        </article>
      )}

      <footer className={styles.footer}>MentalFu</footer>
    </main>
  );
}
