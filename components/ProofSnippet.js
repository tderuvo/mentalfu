"use client";

import { useEffect, useState } from "react";
import styles from "./WhyPage.module.css";

export default function ProofSnippet({ katas }) {
  const [kata, setKata] = useState(null);

  useEffect(() => {
    if (katas && katas.length) {
      setKata(katas[Math.floor(Math.random() * katas.length)]);
    }
  }, [katas]);

  if (!kata) return null;

  return (
    <div className={styles.proofCard}>
      <h3 className={styles.proofTitle}>{kata.title}</h3>
      <div
        className={styles.proofBody}
        dangerouslySetInnerHTML={{ __html: kata.html }}
      />
      <a href="/" className={styles.proofLink}>
        Read today&rsquo;s Kata &rarr;
      </a>
    </div>
  );
}
