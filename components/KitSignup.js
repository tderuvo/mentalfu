"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./KitSignup.module.css";

// ─────────────────────────────────────────────────────────────────────────
// KIT FORM EMBED GOES HERE
//
// Kit's JavaScript embed looks like this:
//
//   <script async data-uid="abc123def4" src="https://mentalfu.kit.com/abc123def4/index.js"></script>
//
// Copy its two values into KIT_EMBED below:
//   uid → the data-uid="..." value
//   src → the src="..." value
//
// Leave them empty and the section shows a placeholder email form that
// does not submit anywhere. Once filled in, the placeholder disappears and
// Kit's real form renders inside the same MentalFu-styled section.
//
// (A <script> tag pasted straight into JSX never runs in React, which is
// why the script is injected from these two values instead.)
// ─────────────────────────────────────────────────────────────────────────
const KIT_EMBED = {
  uid: "707a7c453c",
  src: "https://mentalfu.kit.com/707a7c453c/index.js",
};

// Attribution is left entirely to Kit. On submit, Kit's own script
// (f.convertkit.com/ckjs/ck.5.js) posts the page URL (document.location.href),
// its query string (document.location.search) and document.referrer with the
// form. /start never rewrites its URL, so the visitor's utm_* parameters are
// still in it at that moment. Nothing is added to or changed in Kit's form.

export default function KitSignup({
  heading = "Join the Dojo",
  copy = "Get MentalFu updates, new workouts and training alerts.",
  id = "join",
}) {
  const embedRef = useRef(null);
  const hasEmbed = Boolean(KIT_EMBED.uid && KIT_EMBED.src);

  useEffect(() => {
    const container = embedRef.current;
    if (!hasEmbed || !container) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_EMBED.uid;
    script.src = KIT_EMBED.src;
    // Same element Kit's snippet would be: Kit swaps this script for its form.
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [hasEmbed]);

  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.copy}>{copy}</p>

      {hasEmbed ? (
        <div ref={embedRef} className={styles.embed} />
      ) : (
        <PlaceholderForm />
      )}
    </section>
  );
}

// Stand-in until the Kit embed is configured. Looks like the real thing,
// stores nothing, sends nothing.
function PlaceholderForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="dojo-email" className={styles.srOnly}>
        Email address
      </label>
      <input
        id="dojo-email"
        type="email"
        name="email_address"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="Your email"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Join
      </button>
      {submitted && (
        <p className={styles.note} role="status">
          Signups open soon. Start a workout in the meantime.
        </p>
      )}
    </form>
  );
}
