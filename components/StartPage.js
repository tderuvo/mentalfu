import NavBar from "./NavBar";
import StartHero, { StartWorkoutLink } from "./StartHero";
import KitSignup from "./KitSignup";
import UtmLink from "./UtmLink";
import { FORM_ICONS } from "./FormIcons";
import { FORMS } from "@/lib/forms";
import styles from "./StartPage.module.css";

// Campaign front door: QR codes, flyers and ads all land here. Hero copy is
// chosen by utm_campaign (lib/campaigns.js); everything else is shared.

const FORM_ORDER = ["lantern", "compass", "armor", "sword"];

export default function StartPage() {
  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <StartHero />

        <section id="what-is-mentalfu" className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>What Is MentalFu?</p>
          <p className={styles.lead}>
            Your body needs training to stay strong, capable and ready.
          </p>
          <p className={styles.punch}>Your mind is no different.</p>
          <p className={styles.lead}>
            MentalFu is a gym for the mind &mdash; short workouts designed to
            train different forms of mental strength.
          </p>

          <ul className={styles.formGrid}>
            {FORM_ORDER.map((slug) => {
              const form = FORMS[slug];
              const Icon = FORM_ICONS[form.icon];
              return (
                <li key={slug}>
                  <UtmLink
                    href={`/training-floor/${slug}`}
                    className={styles.formCard}
                    style={{ "--form-accent": form.accent }}
                  >
                    <Icon className={styles.formIcon} aria-hidden="true" />
                    <span className={styles.formName}>{form.name}</span>
                    <span className={styles.formTitle}>{form.hero.title}</span>
                  </UtmLink>
                </li>
              );
            })}
          </ul>

          <UtmLink href="/training-floor" className={styles.floorLink}>
            Explore the Training Floor &rarr;
          </UtmLink>
        </section>

        <KitSignup />

        <section className={`${styles.section} ${styles.dark}`}>
          <p className={styles.eyebrow}>Your First Workout Starts Now.</p>
          <p className={styles.lead}>
            No account. No equipment. A few minutes.
          </p>
          <StartWorkoutLink className={styles.cta}>Start a Workout</StartWorkoutLink>
        </section>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
