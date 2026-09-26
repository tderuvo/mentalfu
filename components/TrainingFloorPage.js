import NavBar from "./NavBar";
import styles from "./TrainingFloorPage.module.css";

export default function TrainingFloorPage() {
  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1 className={styles.title}>What Do You Want To Train?</h1>
          <p className={styles.subtitle}>
            Your mind has different strengths. MentalFu organizes them into
            four Mental Forms of Strength. Explore each one and find the
            workouts that fit you.
          </p>
        </section>

        <section className={styles.brainStage}>
          <div className={styles.brainWrap}>
            <img
              src="/training-floor-brain.png"
              alt="A glowing brain representing the four Mental Forms of Strength"
              className={styles.brainImage}
            />
          </div>

          <div className={styles.lantern}>
            <span className={styles.lanternIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 3a3 3 0 0 1 6 0" />
                <rect x="7" y="6" width="10" height="11" rx="3" />
                <line x1="12" y1="9" x2="12" y2="14" />
                <line x1="9" y1="17" x2="15" y2="17" />
                <line x1="12" y1="17" x2="12" y2="20" />
                <line x1="10" y1="20" x2="14" y2="20" />
              </svg>
            </span>
            <span className={styles.lanternLabel}>Lantern</span>
            <span className={styles.lanternPrimary}>See Clearly</span>
            <p className={styles.lanternCopy}>
              Train awareness, perception and your ability to recognize
              what&rsquo;s really happening — inside and around you.
            </p>
            <a href="/training-floor/lantern" className={styles.lanternCta}>
              Explore Lantern →
            </a>
          </div>

          <div className={styles.compass}>
            <span className={styles.compassIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </span>
            <span className={styles.compassLabel}>Compass</span>
            <span className={styles.compassPrimary}>Find Direction</span>
            <p className={styles.compassCopy}>
              Train your ability to decide what matters, set your course and
              stay aligned with what you actually want.
            </p>
            <a href="/training-floor/compass" className={styles.compassCta}>
              Explore Compass →
            </a>
          </div>

          <div className={styles.sword}>
            <span className={styles.swordIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="5" x2="6" y2="18" />
                <line x1="4" y1="15" x2="9" y2="20" />
                <circle cx="4.3" cy="20.3" r="1" />
              </svg>
            </span>
            <span className={styles.swordLabel}>Sword</span>
            <span className={styles.swordPrimary}>Take Action</span>
            <p className={styles.swordCopy}>
              Train discipline, courage, initiative and follow-through. Turn
              insight into movement and make things happen.
            </p>
            <a href="/training-floor/sword" className={styles.swordCta}>
              Explore Sword →
            </a>
          </div>

          <div className={styles.armor}>
            <span className={styles.armorIcon} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
              </svg>
            </span>
            <span className={styles.armorLabel}>Armor</span>
            <span className={styles.armorPrimary}>Handle the Hit</span>
            <p className={styles.armorCopy}>
              Train resilience, boundaries and your ability to deal with
              life&rsquo;s challenges without losing yourself.
            </p>
            <a href="/training-floor/armor" className={styles.armorCta}>
              Explore Armor →
            </a>
          </div>

          <span className={styles.brainMarker} aria-hidden="true" />
          <span className={styles.compassMarker} aria-hidden="true" />
          <span className={styles.swordMarker} aria-hidden="true" />
          <span className={styles.armorMarker} aria-hidden="true" />
          <svg className={styles.connectorSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line
              x1="24"
              y1="24"
              x2="42"
              y2="30"
              stroke="var(--gold)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="76"
              y1="24"
              x2="58"
              y2="30"
              stroke="#1C7ED6"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className={styles.swordConnectorCompact}
              x1="24"
              y1="92"
              x2="42"
              y2="70"
              stroke="#D6423E"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className={styles.swordConnectorWide}
              x1="24"
              y1="73"
              x2="42"
              y2="70"
              stroke="#D6423E"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className={styles.armorConnectorCompact}
              x1="76"
              y1="92"
              x2="58"
              y2="70"
              stroke="#3FA34D"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className={styles.armorConnectorWide}
              x1="76"
              y1="73"
              x2="58"
              y2="70"
              stroke="#3FA34D"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </section>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
