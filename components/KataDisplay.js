"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import styles from "./KataDisplay.module.css";

export default function KataDisplay({ katas }) {
  const [kata, setKata] = useState(null);
  const [topVisible, setTopVisible] = useState(true);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [printDate, setPrintDate] = useState("");

  const topSentinelRef = useRef(null);
  const bottomSentinelRef = useRef(null);

  useEffect(() => {
    setKata(katas[Math.floor(Math.random() * katas.length)]);
    setPrintDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
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
    <>
      <NavBar belt={kata?.beltStage} />
      <main className={styles.page}>
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

            <button
              type="button"
              onClick={() => window.print()}
              className={styles.printButton}
            >
              Print This Kata
            </button>
          </>
        )}

        <footer className={styles.footer}>MentalFu</footer>
      </main>

      {kata && (
        <section className={styles.printSheet} aria-hidden="true">
          <div className={styles.printHead}>
            <span className={styles.printWordmark}>MentalFu</span>
            <span className={styles.printDate}>{printDate}</span>
          </div>

          <h1 className={styles.printTitle}>{kata.title}</h1>

          {kata.cardText && (
            <p className={styles.printTrains}>{kata.cardText}</p>
          )}

          <div
            className={styles.printBody}
            dangerouslySetInnerHTML={{ __html: kata.html }}
          />

          <div className={styles.printNotes}>
            <p className={styles.printNotesLabel}>Notes</p>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.printLine} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
