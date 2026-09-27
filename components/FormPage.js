import NavBar from "./NavBar";
import { FORM_ICONS } from "./FormIcons";
import styles from "./FormPage.module.css";

// Section 2 list items are either a plain string, or an array of
// segments (strings and { strong: "word" } objects) for the rare case
// where one word within the sentence needs emphasis.
function renderListItem(item) {
  if (typeof item === "string") return item;
  return item.map((chunk, i) =>
    typeof chunk === "string" ? chunk : <strong key={i}>{chunk.strong}</strong>
  );
}

// Section 1's body is a small sequence of typed blocks so the content
// stays plain data — { p: "..." } for an ordinary paragraph, or
// { punch: "..." } for a short line that should stand out the way
// Training Floor's Lantern/Compass/Sword/Armor copy already does.
function SectionBody({ blocks }) {
  return blocks.map((block, i) =>
    block.punch ? (
      <p key={i} className={styles.punch}>
        {block.punch}
      </p>
    ) : (
      <p key={i}>{block.p}</p>
    )
  );
}

// The closing "principle" section's body is the same typed-block idea,
// with a couple more types to cover how different Forms close (see the
// comment in lib/forms.js next to FORMS for what each type means).
function PrincipleBody({ blocks }) {
  return blocks.map((block, i) => {
    if (block.sub) return <p key={i} className={styles.principleSub}>{block.sub}</p>;
    if (block.punch) return <p key={i} className={styles.principlePunch}>{block.punch}</p>;
    if (block.lead) return <p key={i} className={styles.principleClosingLead}>{block.lead}</p>;
    if (block.closing) return <p key={i} className={styles.principleClosing}>{block.closing}</p>;
    return <p key={i} className={styles.principleTransition}>{block.p}</p>;
  });
}

// Shared template for every Mental Form of Strength's own page
// (/training-floor/[form]). Content lives in lib/forms.js — this
// component only knows how to lay it out, so adding Compass, Sword or
// Armor later is a matter of adding a data entry, not building a new
// page.
export default function FormPage({ form }) {
  const Icon = FORM_ICONS[form.icon];

  return (
    <>
      <NavBar />
      <main className={styles.page} style={{ "--formAccent": form.accent }}>
        <section className={styles.hero}>
          {Icon && (
            <span className={styles.heroIcon} aria-hidden="true">
              <Icon />
            </span>
          )}
          <p className={styles.eyebrow}>{form.hero.eyebrow}</p>
          <h1 className={styles.title}>{form.hero.title}</h1>
          <p className={styles.statement}>{form.hero.statement}</p>
          <p className={styles.intro}>{form.hero.intro}</p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>{form.section1.title}</h2>
            <SectionBody blocks={form.section1.body} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>{form.section2.title}</h2>
            <ul className={styles.signsList}>
              {form.section2.items.map((item, i) => (
                <li key={i}>{renderListItem(item)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionInnerWide}>
            <h2 className={styles.sectionTitle}>{form.section3.title}</h2>
            <div className={styles.abilityGrid}>
              {form.section3.abilities.map((ability) => (
                <div key={ability.name} className={styles.abilityItem}>
                  <p className={styles.abilityName}>{ability.name}</p>
                  <p className={styles.abilityDescription}>
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.principle}>
          <div className={styles.principleInner}>
            <h2 className={styles.principleStatement}>
              {form.principle.statement}
            </h2>
            <PrincipleBody blocks={form.principle.body} />
          </div>
        </section>

        <div className={styles.backLinkWrap}>
          <a href="/training-floor" className={styles.backLink}>
            &larr; Back to the Training Floor
          </a>
        </div>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
