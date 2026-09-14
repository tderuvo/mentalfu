# Claude Code Prompt — MentalFu Homepage Redesign

*Paste this into a Claude Code session (or VS Code Copilot/agent) running in the `mentalfu` project root.*

## Context

This is a Next.js (App Router) project. Relevant existing files:

- `app/page.js` — currently renders the daily Kata directly (`<KataDisplay katas={katas} />`) at the site root `/`. This needs to move.
- `app/why/page.js` + `components/WhyPage.js` — the existing "Why MentalFu" page. Leave as-is.
- `app/try-the-field/` — a separate, unrelated experimental page. Do not touch.
- `components/NavBar.js` — current nav: logo → `/`, "Why MentalFu" → `/why`. Uses `getBeltColors(belt)` for theming.
- `components/KataDisplay.js` + `KataDisplay.module.css` — the actual daily-Kata rendering component. Reuse as-is, don't rewrite its internals.
- `lib/katas.js` — exports `getAllKatas()`, already used by both `app/page.js` and `app/why/page.js`.
- Hero image has already been placed at `public/hero-workout.png` — use this path directly, no need to source or copy it.

## Task 1 — Move the existing Kata display to its own route

Create `app/workout/page.js` with the same logic currently in `app/page.js`:

```js
import { getAllKatas } from "@/lib/katas";
import KataDisplay from "@/components/KataDisplay";

export const metadata = {
  title: "Today's Workout — MentalFu",
  description: "Your daily mental workout.",
};

export default function Workout() {
  const katas = getAllKatas();
  return <KataDisplay katas={katas} />;
}
```

Keep `KataDisplay` and its CSS module untouched — this is a pure relocation, not a rewrite.

## Task 2 — Build the new marketing homepage at `app/page.js`

Replace the current contents of `app/page.js` (which just renders `KataDisplay`) with a new landing page component. Create `components/HomePage.js` (+ `HomePage.module.css`) and have `app/page.js` render it, following the same pattern as `app/why/page.js` → `WhyPage`.

Design direction (important — follow closely):
- Premium modern fitness-brand aesthetic — think Nike, not Wikipedia. Enormous typography, athletic photography, lots of negative space, strong sense of movement, short copy blocks, repeated CTA buttons.
- Martial-arts DNA comes through in language only (KungFu references, "Kata," headband imagery in the hero photo) — do NOT add temple/brush-lettering/samurai/bamboo/gong visual motifs. Keep the rest of the visual system feeling like a contemporary gym/fitness brand, not a themed dojo site.
- One continuous scroll, no heavy navigation. Minimal, single-line nav (see Task 3).
- Do not explain Terrain Sculpting, belt levels, Stoicism/Buddhism/Jung/psychology influences, or "Tony's Story" on this page. This page's only job is to make trying one free workout irresistible.

Page sections, in order, with the copy to use verbatim (adjust markup/emphasis as needed for a real layout, but keep the actual words):

### 1. Hero
Full-width hero using `public/hero-workout.png` as the background/feature image.

```
MENTALFU
KungFu for your mind.
Your body isn't the only thing that needs training.
Build a stronger, sharper, more resilient mind—one Kata at a time.

[ FREE WORKOUT ]

No account. No signup. Just train.
```
The "Free Workout" button and the small line beneath it are both part of the hero.

### 2. What a "workout" means
```
YOUR MIND NEEDS REPS TOO.

You train your body through repetition, resistance and variety.
Why would your mind be any different?

MentalFu Katas are short daily exercises designed to make you think, notice,
question, choose, write, challenge, imagine and act.
```
Below the copy, six small workout-type cards/icons, in this order:

| Label | Line |
|---|---|
| THINK | Challenge an assumption. |
| WRITE | Get what's in your head out where you can see it. |
| CHOOSE | See how you respond when there's no perfect answer. |
| NOTICE | Catch something your mind normally does automatically. |
| CHALLENGE | Do something differently today. |
| RESET | Stop. Reorient. Start again. |

### 3. The variety itself as a selling point
```
YOU DON'T PICK THE WORKOUT.

You get today's Kata.

Maybe it's a question.
Maybe it's a challenge.
Maybe you'll write something down.
Maybe you'll confront something you've been avoiding.
Maybe you'll think it's ridiculously easy.

Good.

Life doesn't ask which mental muscle you'd like to use today either.

[ SEE TODAY'S WORKOUT ]
```

### 4. "What are you training for?"
```
WHAT ARE YOU TRAINING FOR?

Confidence. Focus. Discipline. Relationships. Resilience. Money.
Self-control. Peace. Courage. Change.

Whatever brought you here, bring it into the gym.

Someone just got divorced.
Someone hates their job.
Someone can't stop worrying.
Someone wants to make more money.
Someone is furious with somebody.
Someone feels stuck.
Someone simply wants an edge.

Come train.
```

### 5. Differentiation
```
THIS ISN'T ANOTHER SELF-HELP LIBRARY.

You don't need another 300 videos saved for later.
You don't need another book sitting half-read beside your bed.
And you don't need 47 exercises to choose from.

You get one.

Today's Kata.

Do it.

Tomorrow we'll give you another one.
```

### 6. The gym philosophy
```
YOU DON'T GET STRONG BY UNDERSTANDING PUSH-UPS.

You get strong by doing them.

MentalFu works the same way.

Reading about gratitude isn't gratitude.
Understanding self-control isn't self-control.
Knowing you compare yourself to others doesn't mean you'll stop.
Knowing you should let go doesn't mean you can.

The mind changes through practice.
```

### 7. How easy it is to start
```
YOUR FIRST WORKOUT STARTS NOW.

1. Click Free Workout.
2. Do today's Kata.
3. Come back tomorrow.

That's it.

No account required. No equipment required. No experience required.

[ FREE WORKOUT ]
```

Every "Free Workout" / "See Today's Workout" button on this page links to `/workout` (the route created in Task 1).

## Task 3 — Update the nav

In `components/NavBar.js`, keep the existing "Why MentalFu" → `/why` link, and add a new "Workout" link → `/workout`, positioned before "Why MentalFu" (workout is the primary CTA-adjacent link). Keep the logo link pointing at `/` (the new homepage). Preserve the existing `getBeltColors` theming — apply it to the new link the same way the existing link is styled. Target nav should read, left to right: logo → Workout → Why MentalFu.

## Task 4 — CTA links

Confirm every instance of "Free Workout" and "See Today's Workout" on the new homepage (Task 2, sections 1, 3, and 7) is an `<a href="/workout">` (or Next.js `<Link href="/workout">`) — not a dead button, not a scroll anchor.

## Task 5 — Hero image

Already staged at `public/hero-workout.png` (copied in ahead of this prompt). Reference it directly in the hero section, e.g. `<img src="/hero-workout.png" ... />` or as a CSS `background-image`. No further sourcing needed.

## Acceptance checklist

- [ ] `/workout` renders exactly what `/` used to render (today's Kata via `KataDisplay`)
- [ ] `/` renders the new marketing homepage, not the Kata
- [ ] `/why` is untouched and still works
- [ ] Nav shows: logo → Workout → Why MentalFu
- [ ] All "Free Workout" / "See Today's Workout" CTAs link to `/workout`
- [ ] Hero section uses `public/hero-workout.png`
- [ ] No Japanese-temple/samurai/bamboo visual motifs anywhere on the new homepage
- [ ] No mention of Terrain Sculpting, belts, or philosophical influences on the homepage
