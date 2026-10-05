"use client";

import { getCampaignHero } from "@/lib/campaigns";
import { useUtms, withUtms } from "@/lib/utm";
import styles from "./StartPage.module.css";

function workoutHref(hero, utms) {
  return withUtms(hero.workout ? `/workout/${hero.workout}` : "/workout", utms);
}

// START A WORKOUT link for anywhere on /start — honours a campaign's
// optional `workout` kata and carries UTMs.
export function StartWorkoutLink({ children, ...props }) {
  const [utms] = useUtms();
  return (
    <a href={workoutHref(getCampaignHero(utms.utm_campaign), utms)} {...props}>
      {children}
    </a>
  );
}

// Hero for /start. Copy comes from lib/campaigns.js via utm_campaign. The
// headline stays invisible (space reserved) until the URL has been read, so
// a campaign visitor never sees the default copy flash and then swap.
export default function StartHero() {
  const [utms, ready] = useUtms();
  const hero = getCampaignHero(utms.utm_campaign);

  return (
    <section className={styles.hero}>
      <img
        src="/start-hero.jpg"
        alt="A person mid-workout, headband on, focused"
        className={styles.heroImage}
        fetchPriority="high"
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p className={styles.heroWordmark}>MENTALFU</p>
        <div className={ready ? styles.heroCopyReady : styles.heroCopyPending}>
          <h1 className={styles.heroHeadline}>{hero.headline}</h1>
          <p className={styles.heroSub}>{hero.subheadline}</p>
        </div>
        <noscript>
          <style>{`.${styles.heroCopyPending}{visibility:visible}`}</style>
        </noscript>

        <div className={styles.heroActions}>
          <a href={workoutHref(hero, utms)} className={styles.cta}>
            Start a Workout
          </a>
          <a href="#join" className={styles.ctaSecondary}>
            Join the Dojo
          </a>
        </div>
        <a href="#what-is-mentalfu" className={styles.textLink}>
          What is MentalFu?
        </a>
      </div>
    </section>
  );
}
