import NavBar from "./NavBar";
import ProofSnippet from "./ProofSnippet";
import styles from "./WhyPage.module.css";

export default function WhyPage({ katas }) {
  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>An Announcement</p>
          <h1 className={styles.heroLine}>
            Introducing the First Gymnasium Ever Built for the Mind.
          </h1>
          <p className={styles.heroSub}>
            Not a blog. Not a course. Not another app promising to make you
            smarter. A place to train the one thing every other kind of
            success quietly depends on — and it takes less time each morning
            than brushing your teeth.
          </p>
        </section>

        <section className={styles.valley}>
          <p>
            For as long as gymnasiums have existed, one fact has never needed
            defending: the body does not improve by reading about exercise.
            It improves by lifting the weight — today, and tomorrow, and the
            day after that, whether or not you feel like it.
          </p>
          <p>Strangely, we have never built the equivalent for the mind.</p>
          <p>
            We own the books on discipline and open them once. We listen to
            podcasts about resilience while sitting motionless on a couch.
            Somewhere underneath, most of us already know that understanding
            an idea and living by it are two entirely different achievements
            — and that almost nothing has ever been built to close the
            distance between them.
          </p>
          <p className={styles.valleyPunch}>
            MentalFu was built to close it.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>Not an Article. A Gym.</p>
          <p>
            You are not here to read something and move on, the way you
            would with a blog post. You are here to train, the way you would
            at a gym — except the equipment is a single short passage, called
            a Kata, delivered once a day. It takes a few minutes to read.
            Then it is gone. There is no archive to browse, no backlog to
            feel guilty about, no account to create first. You do the rep, or
            you don&rsquo;t, and tomorrow there is a new one waiting either
            way.
          </p>
          <p className={styles.blockPunch}>
            That is the entire apparatus. It is deliberately this small, for
            the same reason a barbell is deliberately just a bar and some
            plates: the mechanism doesn&rsquo;t need to be complicated to
            work. It needs to be repeated.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>Problems as Old as Civilization</p>
          <p>
            Fatigue. Comparison. Self-doubt. The particular exhaustion of
            caring what other people think. None of these are new.
            Philosophers were writing about them in Athens. Monks were
            training against them in silence centuries before that. Every
            generation since has produced someone who worked out, in their
            own words, how to stand steady against one of these forces — and
            then died, and left the answer scattered across a book most
            people will never open, in a language most people will never
            read.
          </p>
          <p>
            MentalFu is not a new idea. It is the oldest ideas that actually
            held up, tested against three thousand years of human beings
            failing and occasionally succeeding at the same handful of
            problems — put in front of you, one at a time, in the time it
            takes to drink your coffee.
          </p>
          <p className={styles.blockPunch}>
            This is not a gym to make you smarter. Intelligence was never the
            problem. This is a gym to make you steadier — which, it turns
            out, was the problem the whole time.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>See For Yourself</p>
          <p className={styles.proofIntro}>
            We could fill the rest of this page with claims about what
            training here will do for you. We would rather you found out
            directly. Below is today&rsquo;s Kata — the exact one a member
            would receive this morning. Read it. That is the entire pitch.
          </p>
          <ProofSnippet katas={katas} />
        </section>

        <section className={styles.block}>
          <p className={styles.eyebrow}>What This Costs You</p>
          <p>
            Nothing. No membership fee, no email address, no account, no free
            trial that quietly becomes a paid one next month.
          </p>
          <p className={styles.blockPunch}>
            We built it this way for a specific reason: anything that has to
            hook you first, to sell you later, has already told you it
            doesn&rsquo;t fully believe in itself. We do. So there is no
            catch to disclose, because there isn&rsquo;t one.
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

        <section className={styles.imageHero}>
          <img
            src="/why-hero.png"
            alt="A lone figure standing firm, arms raised in triumph against a breaking storm"
            className={styles.heroImage}
          />
          <div className={styles.heroImageOverlay}>
            <p className={styles.heroCaption}>Start Your Warrior Journey Today</p>
            <a href="/" className={styles.beginButton}>
              Begin
            </a>
          </div>
        </section>

        <footer className={styles.footer}>MentalFu</footer>
      </main>
    </>
  );
}
