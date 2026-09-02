import NavBar from "./NavBar";
import ProofSnippet from "./ProofSnippet";
import styles from "./WhyPage.module.css";

export default function WhyPage({ katas }) {
  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1 className={styles.heroLine}>
            There&rsquo;s a kind of person nothing seems to rattle.
          </h1>
          <p className={styles.heroSub}>
            Not because less happens to them. Because something underneath
            got stronger, quietly, before anyone was watching.
          </p>
        </section>

        <section className={styles.valley}>
          <p>
            Everyone can tell when someone has an edge — a calm under
            pressure most people don&rsquo;t have, a way of moving through a
            hard day like it&rsquo;s nothing. It isn&rsquo;t luck, and it
            isn&rsquo;t a personality someone was born with.
          </p>
          <p className={styles.valleyPunch}>
            It&rsquo;s trained, the same way anything worth having gets
            trained.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>The Practice</p>
          <p>
            MentalFu is a daily practice. One short passage — a Kata —
            delivered once a day, read in a few minutes, gone for good after
            that. No archive. No account to make. No app to manage.
          </p>
          <p>Come back tomorrow and there&rsquo;s a new one. That&rsquo;s the whole mechanic.</p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>How It Works</p>
          <p>
            Nobody walks into a dojo and leaves a black belt. Nobody sits
            down at a piano once and plays. The mind isn&rsquo;t any
            different — it&rsquo;s trained the same unglamorous way anything
            else worth having gets trained: one rep, repeated, long before it
            looks like anything.
          </p>
          <p>
            MentalFu isn&rsquo;t therapy and it isn&rsquo;t a course.
            It&rsquo;s a dojo — a structured, repeatable practice built for
            one purpose: training you to see your own blind spots and
            actually do something about them, the same way physical training
            builds one specific muscle instead of vaguely hoping the whole
            body improves.
          </p>
          <p className={styles.blockPunch}>
            Reading about discipline changes nothing. Doing the rep does.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>See For Yourself</p>
          <p className={styles.proofIntro}>Don&rsquo;t take our word for it.</p>
          <ProofSnippet katas={katas} />
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>No Catch</p>
          <p>
            No ads. No email required. No account, no upsell, nothing
            waiting to be sold to you later.
          </p>
          <p>
            This page and the daily Kata are free — not a trial, not a
            funnel, not a free sample of something paid. If that feels like
            it must have a catch, it doesn&rsquo;t. That&rsquo;s the whole
            point.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>Who This Is For</p>
          <p>
            This is for the people tired of the grind who can&rsquo;t quite
            name why. For the ones who&rsquo;ve read the books, done the
            programs, and still feel the hamster wheel turning underneath
            them. For anyone who suspects, even quietly, that the real work
            has always been on the inside — and that the outside tends to
            follow once that changes.
          </p>
        </section>

        <section className={styles.warning}>
          <p className={styles.warningEyebrow}>A Note Before You Enter the Dojo</p>
          <p>
            This isn&rsquo;t a quick fix, a get-rich plan, or a place to pick
            up manipulation techniques dressed up as self-improvement.
          </p>
          <p>
            If that&rsquo;s what you&rsquo;re after, there are a thousand
            places selling it. This isn&rsquo;t one of them, and we&rsquo;d
            rather you leave now than waste your time on something that was
            never built for that.
          </p>
          <p className={styles.warningPunch}>
            This is a place to train, not a place to win faster.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>The Path Ahead</p>
          <p>
            This is where it starts. Stay with it, and there&rsquo;s more
            underneath — a longer path, further belts, a deeper practice.
          </p>
          <p>
            None of that matters today. Today there&rsquo;s just one Kata,
            and one decision: show up again tomorrow, or don&rsquo;t.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>Origin</p>
          <p>
            MentalFu comes from one person&rsquo;s forty-plus years of
            reading, testing, and living this material — not a team, not a
            formula, not a committee&rsquo;s idea of what should work.
          </p>
          <p className={styles.blockPunch}>Just what actually did.</p>
        </section>

        <section className={styles.cta}>
          <a href="/" className={styles.ctaButton}>
            Start Today&rsquo;s Kata
          </a>
          <p className={styles.ctaSub}>No signup. No cost. Just today&rsquo;s Kata.</p>
        </section>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
