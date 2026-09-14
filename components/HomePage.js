import NavBar from "./NavBar";
import styles from "./HomePage.module.css";

const REPS = [
  { label: "THINK", line: "Challenge an assumption." },
  { label: "WRITE", line: "Get what's in your head out where you can see it." },
  { label: "CHOOSE", line: "See how you respond when there's no perfect answer." },
  { label: "NOTICE", line: "Catch something your mind normally does automatically." },
  { label: "CHALLENGE", line: "Do something differently today." },
  { label: "RESET", line: "Stop. Reorient. Start again." },
];

const CATEGORIES = [
  {
    label: "Train The Mind",
    line: "Short daily exercises that shape how you think, feel, and respond.",
    image: "/category-train-the-mind.png",
  },
  {
    label: "Exercise The Brain",
    line: "Quick challenges — memory, logic, pattern, focus — that give your brain something to actually do.",
    image: "/category-exercise-the-brain.png",
  },
  {
    label: "Support A Healthy Brain",
    line: "Small daily check-ins — hydration, movement, sleep — that take care of the machinery underneath it all.",
    image: "/category-support-a-healthy-brain.png",
  },
];

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <img
            src="/hero-workout.png"
            alt="A person mid-workout, headband on, focused"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroWordmark}>MENTALFU</p>
            <h1 className={styles.heroHeadline}>KungFu for your mind.</h1>
            <p className={styles.heroSub}>
              Your body isn&rsquo;t the only thing that needs training. Build
              a stronger, sharper, more resilient mind&mdash;one Kata at a
              time.
            </p>
            <a href="/workout" className={styles.cta}>
              Free Workout
            </a>
            <p className={styles.heroNote}>No account. No signup. Just train.</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>A Gym Isn&rsquo;t One Machine.</p>
          <p className={styles.lead}>
            MentalFu trains three things at once, every day.
          </p>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className={styles.categoryCard}>
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt=""
                    className={styles.categoryImage}
                  />
                ) : (
                  <div className={styles.categoryImage} aria-hidden="true" />
                )}
                <p className={styles.categoryLabel}>{cat.label}</p>
                <p className={styles.categoryLine}>{cat.line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>Your Mind Needs Reps Too.</p>
          <p className={styles.lead}>
            You train your body through repetition, resistance and variety.
            Why would your mind be any different?
          </p>
          <p className={styles.lead}>
            MentalFu Katas are short daily exercises designed to make you
            think, notice, question, choose, write, challenge, imagine and
            act.
          </p>
          <p className={styles.punch}>
            Show up. Do the work in front of you. No spotting, no skipped
            sets.
          </p>
          <div className={styles.repsGrid}>
            {REPS.map((rep) => (
              <div key={rep.label} className={styles.repCard}>
                <p className={styles.repLabel}>{rep.label}</p>
                <p className={styles.repLine}>{rep.line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.dark}`}>
          <p className={styles.eyebrow}>Today&rsquo;s Kata Shows Up. You Do It.</p>
          <ul className={styles.maybeList}>
            <li>Maybe it&rsquo;s a question.</li>
            <li>Maybe it&rsquo;s a challenge.</li>
            <li>Maybe you&rsquo;ll write something down.</li>
            <li>Maybe you&rsquo;ll confront something you&rsquo;ve been avoiding.</li>
            <li>Maybe you&rsquo;ll think it&rsquo;s ridiculously easy.</li>
          </ul>
          <p className={styles.punch}>Good.</p>
          <p className={styles.lead}>
            Life doesn&rsquo;t ask which mental muscle you&rsquo;d like to use
            today either.
          </p>
          <a href="/workout" className={styles.cta}>
            See Today&rsquo;s Workout
          </a>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>What Are You Training For?</p>
          <p className={styles.lead}>
            Confidence. Focus. Discipline. Relationships. Resilience. Money.
            Self-control. Peace. Courage. Change.
          </p>
          <p className={styles.lead}>
            Whatever brought you here, bring it into the gym.
          </p>
          <ul className={styles.someoneList}>
            <li>Someone just got divorced.</li>
            <li>Someone hates their job.</li>
            <li>Someone can&rsquo;t stop worrying.</li>
            <li>Someone wants to make more money.</li>
            <li>Someone is furious with somebody.</li>
            <li>Someone feels stuck.</li>
            <li>Someone simply wants an edge.</li>
          </ul>
          <p className={styles.punch}>Come train.</p>
        </section>

        <section className={`${styles.section} ${styles.dark}`}>
          <p className={styles.eyebrow}>One Kata. Today. That&rsquo;s the Whole Program.</p>
          <p className={styles.lead}>
            No backlog. No losing your place. No falling behind.
          </p>
          <p className={styles.punch}>
            Show up. Do the work in front of you. Come back tomorrow for the
            next one.
          </p>
        </section>

        <section className={`${styles.section} ${styles.mantra}`}>
          <p className={styles.mantraLine}>Show up.</p>
          <p className={styles.mantraLine}>Do the work.</p>
          <p className={styles.mantraLine}>Come back tomorrow.</p>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>
            You Don&rsquo;t Get Strong by Understanding Push-Ups.
          </p>
          <p className={styles.punch}>You get strong by doing them.</p>
          <p className={styles.lead}>
            MentalFu works the same way. Understanding a habit doesn&rsquo;t
            break it. Doing the work does.
          </p>
          <p className={styles.punch}>The mind changes through practice.</p>
        </section>

        <section className={`${styles.section} ${styles.dark}`}>
          <p className={styles.eyebrow}>Your First Workout Starts Now.</p>
          <ol className={styles.steps}>
            <li>Click Free Workout.</li>
            <li>Do today&rsquo;s Kata.</li>
            <li>Come back tomorrow.</li>
          </ol>
          <p className={styles.punch}>That&rsquo;s it.</p>
          <p className={styles.lead}>
            No account required. No equipment required. No experience
            required.
          </p>
          <a href="/workout" className={styles.cta}>
            Free Workout
          </a>
        </section>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
