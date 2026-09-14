"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import styles from "./KataDisplay.module.css";

export default function KataDisplay({ kata }) {
  const [topVisible, setTopVisible] = useState(true);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [printDate, setPrintDate] = useState("");
  const [copied, setCopied] = useState(false);

  const topSentinelRef = useRef(null);
  const bottomSentinelRef = useRef(null);

  useEffect(() => {
    setPrintDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  useEffect(() => {
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

  const handlePrint = () => window.print();

  const copyShareLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — nothing further to do
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: kata.title, url });
      } catch (err) {
        if (err?.name === "AbortError") return;
        copyShareLink(url);
      }
      return;
    }

    copyShareLink(url);
  };

  return (
    <>
      <NavBar belt={kata.beltStage} />
      <main className={styles.page}>
        <div ref={topSentinelRef} className={styles.topSentinel} />

        <article className={styles.kata}>
          <header className={styles.header}>
            <h1 className={styles.title}>{kata.title}</h1>
            <div className={styles.headerActions}>
              {kata.cardText && (
                <a
                  href="#what-this-trains"
                  className={styles.iconButton}
                  aria-label="What This Trains"
                  title="What This Trains"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </a>
              )}
              <div className={styles.shareWrap}>
                <button
                  type="button"
                  onClick={handleShare}
                  className={styles.iconButton}
                  aria-label={copied ? "Link copied" : "Share This Move"}
                  title={copied ? "Link copied" : "Share This Move"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
                {copied && (
                  <span className={styles.copiedTag} role="status" aria-live="polite">
                    Link copied
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className={styles.iconButton}
                aria-label="Print this Kata"
                title="Print this Kata"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
              </button>
            </div>
          </header>
          <div className={styles.content}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: kata.html }}
            />
            <div ref={bottomSentinelRef} className={styles.bottomSentinel} />
          </div>
        </article>

        {kata.cardText && (
          <section
            id="what-this-trains"
            className={`${styles.kata} ${styles.trainsCard} ${
              trainsVisible ? styles.trainsVisible : ""
            }`}
          >
            <header className={styles.header}>
              <h2 className={styles.title}>What This Trains</h2>
            </header>
            <div className={styles.content}>
              <p className={styles.trainsText}>{kata.cardText}</p>
            </div>
          </section>
        )}

        <footer className={styles.footer}>MentalFu</footer>
      </main>

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
    </>
  );
}
