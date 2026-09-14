# Claude Code Prompt — Print Kata Tweaks (margins, red rule, notebook-blue lines)

*Paste this into a Claude Code session running in the `mentalfu` project root. This is a follow-up to the "Print This Kata" feature — CSS-only fix, no changes to `KataDisplay.js` or `globals.css` needed.*

## Context / what's actually wrong

The printout came out with almost no margin (under 0.25" on the edges). The likely cause: the previous CSS set whitespace via an `@page { margin: ... }` rule, but `@page` margins aren't reliably honored across every browser/OS/printer-driver combination — when it's ignored, you're left with only the printer's own hardware-minimum margin, which is exactly the sub-0.25" result you saw. The fix below stops depending on `@page` for spacing entirely: `@page` is set to `margin: 0` (a flat, predictable starting point) and all the actual whitespace is created with real `padding` on the printed content itself, which browsers do reliably respect. This is the standard fix for this exact problem.

## Task — Replace the `@media print { ... }` block in `components/KataDisplay.module.css`

Everything outside this block (`.printButton`, the base `.printSheet { display: none; }`, and all the screen styles) stays exactly as-is. Replace only the `@media print { ... }` block with:

```css
@media print {
  @page {
    size: letter;
    margin: 0;
  }

  .page {
    display: none !important;
  }

  .printSheet {
    display: block;
    width: 100%;
    padding: 1in 1in 1in 1.5in;
    color: #111;
    background: #fff;
  }

  .printSheet::before {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 1.1in;
    width: 2px;
    background: #C0392B;
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
    border-bottom: 1.6px solid #1E88C7;
  }
}
```

## What changed and why

- **`@page { margin: 0 }` + `padding: 1in 1in 1in 1.5in` on `.printSheet`.** This is the actual fix for the margin bug — real content padding instead of an `@page` margin the browser was apparently ignoring. Right and bottom get a full 1", left gets 1.5" (comfortably over your "at least 1 inch" ask, with the extra quarter-inch reserved for the red rule and its gap from the text).
- **The red vertical rule is `.printSheet::before`** — a single CSS pseudo-element, no changes to `KataDisplay.js` needed. It's `position: fixed`, which in a print context repeats on every physical page rather than only appearing once — so a Kata long enough to spill onto a second sheet still gets the rule down the left side of both pages. It sits 1.1" from the page edge, inside the 1.5" left margin, leaving roughly a third of an inch of breathing room before the actual text starts — same relationship real loose-leaf paper has between its red margin line and the ruled writing area.
- **Notes lines switched from a 1px `#ccc` hairline to a 1.6px solid `#1E88C7`** — a clear notebook blue instead of a near-invisible grey, and thick enough to read as a deliberate rule rather than a rendering artifact.
- **`.printSheet` no longer relies on the browser's print-margin default at all** — between `@page { margin: 0 }` and its own padding, the whitespace is now fully self-contained in the page's own CSS, which should print consistently regardless of what a given browser's print dialog defaults to.

## Acceptance checklist

- [ ] Left margin measures roughly 1.5" from the paper edge to the start of the body text; right, top, and bottom measure roughly 1"
- [ ] A solid red vertical rule runs down the page inside the left margin, clearly visible, not touching the body text
- [ ] If the print preview shows more than one page for a longer Kata, the red rule appears on every page, not just the first
- [ ] The 8 notes lines are a clearly visible solid blue, noticeably thicker than the previous grey line
- [ ] Everything else on the printed page (wordmark, date, serif title, body copy, "Notes" label) is unchanged from the previous version
- [ ] The on-screen `/workout` page is completely unaffected — this is a print-only change
