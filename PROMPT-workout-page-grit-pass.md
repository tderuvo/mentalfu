# Claude Code Prompt — Workout (Kata) Page Visual Pass

*Paste this into a Claude Code session running in the `mentalfu` project root. Visual-only change — no content, copy, or logic changes.*

## Context

`/workout` (`app/workout/page.js` → `components/KataDisplay.js` + `components/KataDisplay.module.css`) currently runs its own bespoke design system, separate from the rest of the site: `Fraunces` for the title, `Lora` (often italic) for the body and the "What This Trains" kicker, a hardcoded cream background (`#FAF6F0`), and hardcoded greige text colors. None of those values exist in `app/globals.css`, which defines the actual site tokens (`--white`, `--off`, `--stone`, `--border`, `--muted`, `--mid`, `--dark`, `--black`, `--accent`, `--gold`, `--gold-lt`, `--sans: 'Inter'`, `--serif: 'Playfair Display'`) and which `HomePage.module.css` and `NavBar.module.css` already consume correctly.

Goal: bring `/workout` onto the same token system as the rest of the site, and shift its look from "contemplative reading page" to "workout card" — clutter-free for a different reason. Before, clutter-free meant a quiet room for reading. Now it means a laminated WOD card on a gym wall: no distractions because the page has one job, not because it's trying to calm you down.

**Do not touch:** `app/why/page.js`, `components/WhyPage.js`, `components/WhyPage.module.css` — its "proof card" section still uses `Fraunces`/`Lora` deliberately and is out of scope. Do not remove the Google Fonts `<link>` in `app/layout.js` — `Fraunces` and `Lora` are still in active use there.

**Do not touch:** `KataDisplay.js` (the component logic — scroll-triggered "What This Trains" reveal, random Kata selection) or `lib/katas.js`. This is a CSS-only pass on `components/KataDisplay.module.css`.

## Task — Replace `components/KataDisplay.module.css` in full

```css
.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--stone);
  padding: 2.25rem 1.5rem 2.5rem;
}

.kata {
  flex: 1;
  width: 100%;
  max-width: 620px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(20, 18, 16, 0.04), 0 12px 28px rgba(20, 18, 16, 0.05);
  padding: 2.5rem 2rem;
  animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.title {
  font-family: var(--sans);
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(1.4rem, 4.5vw, 2rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--black);
  text-align: center;
  margin-bottom: 2.25rem;
}

.body {
  font-family: var(--sans);
  font-weight: 400;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--dark);
}

.body p {
  margin-bottom: 1.5rem;
}

.body p:last-child {
  margin-bottom: 0;
}

.body em {
  font-style: normal;
  font-weight: 600;
  color: var(--black);
}

.topSentinel,
.bottomSentinel {
  width: 100%;
  height: 1px;
}

.trains {
  width: 100%;
  max-width: 620px;
  margin-top: 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.trainsVisible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.trainsKicker {
  display: inline-block;
  font-family: var(--sans);
  font-weight: 800;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dark);
  background: rgba(201, 168, 76, 0.14);
  border: 1px solid var(--gold);
  border-radius: 3px;
  padding: 0.3rem 0.7rem;
  margin-bottom: 0.75rem;
}

.trainsText {
  font-family: var(--sans);
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--mid);
}

@media (prefers-reduced-motion: reduce) {
  .trains {
    transition: none;
  }
}

.footer {
  flex-shrink: 0;
  margin-top: 2.5rem;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@media (min-width: 640px) {
  .page {
    padding: 3rem 2rem 3rem;
  }

  .kata {
    padding: 3rem 2.5rem;
  }

  .body {
    font-size: 1.125rem;
  }
}
```

## What changed and why

- **Page background → `var(--stone)`, card → `var(--white)` with a border and soft shadow.** This is the card framing: the page canvas is a neutral stone tone, the Kata itself sits on a distinct white card with a visible edge — reads as a laminated card on a wall, not text floating in empty space.
- **Title: `Fraunces` → `var(--sans)` (Inter), weight 800, uppercase.** Matches the same heavy-Inter treatment the homepage headlines already use, instead of a separate literary serif. Kata titles are short (`A Thought Is Not a Fact`, `Rest Is Not a Failure of Discipline`) so uppercase reads clean, not cramped.
- **Body: `Lora` italic → `var(--sans)` regular.** Plain Inter reads like instructions on a card. `em` inside the Kata body switches from italic to bold-weight for the same reason — bold reads as "this is the point," italic read as "linger here."
- **"What This Trains" kicker → a stamped badge** (bordered chip, gold-tinted background, bold uppercase) instead of a faint italic aside. Same information, now reads as a tag stamped on the card rather than a whispered footnote.
- **Animation tightened**: 0.6s ease drift → 0.35s with the same easing curve the homepage's `.fade-up` class uses (`cubic-bezier(0.16, 1, 0.3, 1)`), plus a slight scale-in. The card should land, not dissolve into view. This also makes `/workout`'s motion feel like the same brand as the homepage instead of a separate one.
- **Everything else — layout width (620px), single-column structure, the scroll-triggered "What This Trains" reveal, footer wordmark — is unchanged.** This is a type/color/motion pass, not a layout rebuild.

## Acceptance checklist

- [ ] `/workout` no longer references `Fraunces` or `Lora` anywhere
- [ ] Kata title, body, and all other page text use `var(--sans)` / site color tokens, not hardcoded hex values
- [ ] The Kata renders as a bordered/shadowed card on a `--stone` background, not text on a flat cream field
- [ ] `/why` and `WhyPage.module.css` are untouched
- [ ] `app/layout.js` font `<link>` is untouched (Fraunces/Lora still load for `/why`'s proof card)
- [ ] `KataDisplay.js` logic (random Kata pick, scroll-triggered "What This Trains" reveal) is unchanged
- [ ] Page still reads cleanly at mobile width (single column, no overflow)
