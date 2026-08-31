"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./KataDisplay.module.css";

export default function KataDisplay({ katas }) {
  const [kata, setKata] = useState(null);
  const [topVisible, setTopVisible] = useState(true);
  const [bottomVisible, setBottomVisible] = useState(false);

  const topSentinelRef = useRef(null);
  const bottomSentinelRef = useRef(null);

  useEffect(() => {
    setKata(katas[Math.floor(Math.random() * katas.length)]);
  }, [katas]);

  useEffect(() => {
    if (!kata) return;

    const topEl = topSentinelRef.current;
    const bottomEl = bottomSentinelRef.current;
    if (!topEl || !bottomEl) return;

    const topObserver = new IntersectionObserver(
      ([entry]) => setTopVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    const bottomObserver = new IntersectionObserver(
      ([entry]) => setBottomVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 10% 0px" }
    );

    topObserver.observe(topEl);
    bottomObserver.observe(bottomEl);

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [kata]);

  const trainsVisible = bottomVisible && !topVisible;

  return (
    <main className={styles.page}>
      <img src="/ninefold-logo.png" alt="Ninefold" className={styles.logo} />
      <div ref={topSentinelRef} className={styles.topSentinel} />

      {kata && (
        <>
          <article className={styles.kata}>
            <h1 className={styles.title}>{kata.title}</h1>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: kata.html }}
            />
            <div ref={bottomSentinelRef} className={styles.bottomSentinel} />
          </article>

          {kata.cardText && (
            <section
              className={`${styles.trains} ${
                trainsVisible ? styles.trainsVisible : ""
              }`}
            >
              <p className={styles.trainsKicker}>What This Trains</p>
              <p className={styles.trainsText}>{kata.cardText}</p>
            </section>
          )}
        </>
      )}

      <footer className={styles.footer}>MentalFu</footer>
    </main>
  );
}
