# Claude Code Prompt — Print This Kata

*Paste this into a Claude Code session running in the `mentalfu` project root. Adds a quiet "Print This Kata" button to `/workout` that produces a black-ink, journal-page printout of the current Kata — separate from the on-screen "gym card" look, styled to sit in a binder.*

## Context

`components/KataDisplay.js` + `components/KataDisplay.module.css` render the on-screen Kata (the bordered white card on a `--stone` background from the last pass). This adds a second, print-only version of the same content that only appears when the browser's print dialog is triggered — the screen version is hidden during print, and vice versa. No new dependencies, no backend, no account — this is a CSS + `window.print()` feature.

**Do not touch:** `app/why/page.js`, `components/WhyPage.js`/`.module.css`, `lib/katas.js`, `app/workout/page.js`. The scroll-triggered "What This Trains" reveal and random Kata selection in `KataDisplay.js` stay exactly as they are — this only adds to that file, nothing is removed.

**Design intent — read before implementing:** the printed page should NOT look like the on-screen card (bold uppercase Inter, gold accents, shadow). It's a different object with different values: black ink only (nothing burns a color cartridge on a daily practice sheet), generous margins, a classic serif headline (`var(--serif)`, i.e. Playfair Display, already loaded site-wide) instead of the screen's heavy uppercase sans, and an extra-wide left margin to keep text clear of a 3-ring hole punch. Think "page from a journal," not "printout of a webpage."

## Task 1 — Hide the site nav when printing

In `app/globals.css`, append:

```css
@media print {
  nav {
    display: none !important;
  }
}
```

This is global (not scoped to `/workout`) — hiding the sticky nav on print is correct for any page, not just this one.

## Task 2 — Add print state, the print button, and the print-only markup to `components/KataDisplay.js`

Full updated file:

```js
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
```

Two changes from the current file: a `printButton` after the "What This Trains" section (only renders when `kata` is set, same as everything else on the page), and a `printSheet` section rendered as a sibling of `<main>` — not nested inside it, on purpose (see Task 3 note on why).

## Task 3 — Append the print styles to `components/KataDisplay.module.css`

Add this block at the end of the existing file. Nothing in the file's current contents needs to change.

```css
.printButton {
  display: block;
  margin: 2rem auto 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 0.4rem 0.2rem;
  transition: color 0.2s ease;
}

.printButton:hover {
  color: var(--dark);
}

.printSheet {
  display: none;
}

@media print {
  @page {
    size: letter;
    margin: 0.85in 0.85in 0.85in 1.3in;
  }

  .page {
    display: none !important;
  }

  .printSheet {
    display: block;
    width: 100%;
    color: #111;
    background: #fff;
  }

  .printHead {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.75rem;
  }

  .printWordmark {
    font-family: var(--sans);
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #555;
  }

  .printDate {
    font-family: var(--sans);
    font-size: 0.8rem;
    color: #555;
  }

  .printTitle {
    font-family: var(--serif);
    font-weight: 600;
    font-size: 1.7rem;
    line-height: 1.3;
    color: #000;
    margin-bottom: 0.5rem;
  }

  .printTrains {
    font-family: var(--sans);
    font-style: italic;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 1.5rem;
  }

  .printBody {
    font-family: var(--sans);
    font-size: 0.95rem;
    line-height: 1.7;
    color: #111;
  }

  .printBody p {
    margin-bottom: 1rem;
  }

  .printBody em {
    font-style: italic;
    color: #000;
  }

  .printNotes {
    margin-top: 2.5rem;
    break-inside: avoid;
  }

  .printNotesLabel {
    font-family: var(--sans);
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 0.75rem;
  }

  .printLine {
    height: 0.4in;
    border-bottom: 1px solid #ccc;
  }
}
```

## What changed and why

- **`printSheet` is a sibling of `<main>`, not nested inside it.** `.page` gets `display: none !important` on print. If the print content lived inside `.page`, it would get hidden along with everything else — `display: none` on a parent hides descendants regardless of their own `display` value. Keeping them as siblings lets one hide while the other shows.
- **Print typography deliberately breaks from the screen redesign.** The screen Kata card uses heavy uppercase Inter and a gold-bordered badge — that's gym-signage energy, right for a lit screen. The printed page uses `var(--serif)` (Playfair Display) for the title and plain-weight `var(--sans)` for the body, both already loaded site-wide, nothing new to fetch. It should read like a page from a journal someone already owns, not like a webpage that happened to get sent to a printer.
- **Left margin is 1.3in vs. 0.85in on the other three sides** — that's the punch margin. Wide enough that a standard 3-ring hole punch won't go through the title or body text.
- **`printDate` is computed once, on load, from the visitor's local clock** — it's "the date this was printed," not a date stored anywhere. Reprinting the same Kata later (a page refresh will hand back a different random Kata, per the existing behavior) just prints with that day's date.
- **No belt/number citation line yet** — deliberately left out per your note that you haven't settled on the numbering scheme. The `printHead` and `printNotes` blocks are isolated enough that adding a citation line later (e.g. under the notes) is a small, contained change whenever you're ready.
- **8 ruled lines in Notes**, each `0.4in` tall with a light `#ccc` bottom border — inside your 5–10 range, sized for actual handwriting rather than crammed.
- **`.printNotes { break-inside: avoid }`** stops the ruled-lines block from splitting across a page break if a longer Kata pushes it close to the bottom of the page.
- **One thing no CSS can fully control:** some browsers can add their own print header/footer (page title, URL, page number) via the print dialog's own settings, off by default in most current browsers. Nothing in this page's markup can force that off — it's a print-dialog setting, not a page setting.

## Acceptance checklist

- [ ] "Print This Kata" appears as a small, quiet text button below "What This Trains" (or below the Kata body if a given Kata has no `cardText`) — not styled as a prominent CTA
- [ ] Clicking it opens the browser print dialog via `window.print()`
- [ ] The print preview shows the journal-page layout (serif title, plain body, ruled notes) — not the on-screen gold/gym card
- [ ] The site nav does not appear in the print preview, on `/workout` or any other page
- [ ] The printed date matches today's date
- [ ] Left margin is visibly wider than the other three margins in the print preview
- [ ] 8 ruled lines appear under "Notes," evenly spaced, not split across a page break
- [ ] The on-screen `/workout` page is completely unchanged in appearance and behavior aside from the new button
