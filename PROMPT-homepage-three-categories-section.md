# Claude Code Prompt — Add the "Three Categories" Section to the Homepage

*Paste this into a Claude Code session running in the `mentalfu` project root. First step of two — this adds the section with placeholder graphics; the real images swap in afterward without any further code changes, as long as the placeholder's dimensions are kept.*

## Context

`components/HomePage.js` + `components/HomePage.module.css` render the live homepage. Current section order: Hero → "Your Mind Needs Reps Too" (the six-card REPS grid) → "Today's Kata Shows Up" → "What Are You Training For?" → "One Kata. Today." → the mantra section → "You Don't Get Strong by Understanding Push-Ups" → "Your First Workout Starts Now" → footer.

This adds one new section, placed right after the hero and before "Your Mind Needs Reps Too" — introducing MentalFu's three simultaneous daily training categories (Train The Mind / Exercise The Brain / Support A Healthy Brain) before anything else on the page implies MentalFu is only one kind of exercise.

**Do not touch:** any existing section, `app/workout/page.js`, `components/KataDisplay.js`, `NavBar.js`. This only inserts one new section and its styles.

## Task 1 — Add the new section to `components/HomePage.js`

Add this constant near the existing `REPS` array at the top of the file:

```js
const CATEGORIES = [
  {
    label: "Train The Mind",
    line: "Short daily exercises that shape how you think, feel, and respond.",
  },
  {
    label: "Exercise The Brain",
    line: "Quick challenges — memory, logic, pattern, focus — that give your brain something to actually do.",
  },
  {
    label: "Support A Healthy Brain",
    line: "Small daily check-ins — hydration, movement, sleep — that take care of the machinery underneath it all.",
  },
];
```

Then insert this new `<section>` immediately after the closing `</section>` of the hero, and immediately before the `<section className={\`${styles.section} ${styles.light}\`}>` that starts with "Your Mind Needs Reps Too":

```jsx
<section className={`${styles.section} ${styles.light}`}>
  <p className={styles.eyebrow}>A Gym Isn&rsquo;t One Machine.</p>
  <p className={styles.lead}>
    MentalFu trains three things at once, every day.
  </p>
  <div className={styles.categoryGrid}>
    {CATEGORIES.map((cat) => (
      <div key={cat.label} className={styles.categoryCard}>
        <div className={styles.categoryImage} aria-hidden="true" />
        <p className={styles.categoryLabel}>{cat.label}</p>
        <p className={styles.categoryLine}>{cat.line}</p>
      </div>
    ))}
  </div>
</section>
```

## Task 2 — Add the styles to `components/HomePage.module.css`

Append this block. Nothing existing in the file needs to change.

```css
.categoryGrid {
  width: 100%;
  max-width: 960px;
  margin: 2.5rem auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.categoryCard {
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.5rem;
  text-align: left;
}

.categoryImage {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, var(--gold-lt) 0%, var(--gold) 100%);
  /* PLACEHOLDER — step two swaps this div for:
     <img src="/category-train-the-mind.png" alt="" className={styles.categoryImage} />
     (one filename per category). Keep the same aspect-ratio and margin-bottom
     so the swap is drop-in with no layout changes. */
}

.categoryLabel {
  font-family: var(--sans);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--black);
  margin-bottom: 0.5rem;
}

.categoryLine {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--mid);
}

@media (max-width: 700px) {
  .categoryGrid {
    grid-template-columns: 1fr;
  }
}
```

## What changed and why

- **Placement:** right after the hero, before any section that (currently) implies MentalFu is a single kind of exercise. Everything after this point now reads as detail on top of an already-stated holistic claim, instead of contradicting it later.
- **The placeholder is a gradient tile, not a broken `<img>`.** An `<img>` with no real file yet shows a broken-image icon in every browser; a solid gradient box gives the "give the site some color" effect you're after immediately, and holds the exact size/position the real graphic will drop into.
- **The swap-in step later is genuinely a one-line change per category** — replace the `<div className={styles.categoryImage} />` with an `<img className={styles.categoryImage} src="..." alt="..." />`, same class, same aspect ratio, no CSS or layout edits needed.
- **Copy is a first pass**, written to match the existing homepage's voice and sentence rhythm — easy to swap out independently of the layout/graphics work.
- **Layout reuses the existing card pattern** (border, radius, padding) from the "Your Mind Needs Reps Too" REPS cards rather than introducing a new visual language — three columns instead of six, one row on desktop, single column on mobile below 700px.

## Acceptance checklist

- [ ] New section appears directly after the hero, before "Your Mind Needs Reps Too"
- [ ] Three cards render: Train The Mind, Exercise The Brain, Support A Healthy Brain
- [ ] Each card shows a colored placeholder tile above its label and line — no broken image icons
- [ ] Three columns on desktop, one column on mobile (below ~700px)
- [ ] All other sections on the homepage are unchanged
