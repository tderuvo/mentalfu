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
          <p className={styles.eyebrow}>You Don&rsquo;t Pick the Workout.</p>
          <p className={styles.lead}>You get today&rsquo;s Kata.</p>
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
          <p className={styles.eyebrow}>This Isn&rsquo;t Another Self-Help Library.</p>
          <p className={styles.lead}>
            You don&rsquo;t need another 300 videos saved for later.
          </p>
          <p className={styles.lead}>
            You don&rsquo;t need another book sitting half-read beside your
            bed.
          </p>
          <p className={styles.lead}>
            And you don&rsquo;t need 47 exercises to choose from.
          </p>
          <p className={styles.punch}>You get one.</p>
          <p className={styles.punch}>Today&rsquo;s Kata.</p>
          <p className={styles.punch}>Do it.</p>
          <p className={styles.lead}>Tomorrow we&rsquo;ll give you another one.</p>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>
            You Don&rsquo;t Get Strong by Understanding Push-Ups.
          </p>
          <p className={styles.punch}>You get strong by doing them.</p>
          <p className={styles.lead}>MentalFu works the same way.</p>
          <ul className={styles.someoneList}>
            <li>Reading about gratitude isn&rsquo;t gratitude.</li>
            <li>Understanding self-control isn&rsquo;t self-control.</li>
            <li>
              Knowing you compare yourself to others doesn&rsquo;t mean
              you&rsquo;ll stop.
            </li>
            <li>Knowing you should let go doesn&rsquo;t mean you can.</li>
          </ul>
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
