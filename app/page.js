"use client";
import { useState, useEffect } from "react";

/* ─── Tokens ─────────────────────────────────────────────────── */
const WHITE  = "#FFFFFF";
const OFF    = "#F9F8F6";
const STONE  = "#F2F0EC";
const BORDER = "#E8E5E0";
const MUTED  = "#9B9690";
const MID    = "#6B6860";
const DARK   = "#2C2A27";
const BLACK  = "#141210";
const GOLD   = "#C9A84C";
const GOLDLT = "#E8C96A";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', -apple-system, sans-serif";

/* ─── Data ───────────────────────────────────────────────────── */
const books = [
  {
    num: "01", title: "Stop the Loop",
    subtitle: "A Practical Guide to Ending Rumination",
    hook: "Break the cycle of overthinking without fighting your mind.",
    full: "Most people try to stop rumination by thinking harder. That makes it worse. This book shows you a different move — one that works with the brain's own architecture, not against it.",
    spine: BLACK, cover: "#1C1A18", accent: GOLD, label: "Rumination",
  },
  {
    num: "02", title: "The Energy Leak",
    subtitle: "How Certain People Quietly Drain Your Life",
    hook: "Recognize the invisible patterns that cost you your focus.",
    full: "It's not always the loud people who drain you. Often it's a quiet, slow leak — invisible until you're empty. This book names the patterns so you can finally see them.",
    spine: "#2D3A2E", cover: "#3A4A3B", accent: "#7FAF80", label: "Relationships",
  },
  {
    num: "03", title: "Unnecessary",
    subtitle: "The Hidden Trick to Breaking Habits Effortlessly",
    hook: "Stop reinforcing what you're trying to escape.",
    full: "Willpower is a limited resource. This book replaces it with something better — a shift in how you see the habit itself. When something feels pointless, you stop doing it.",
    spine: "#2A2035", cover: "#342843", accent: "#A78BFA", label: "Habits",
  },
  {
    num: "04", title: "Clarity First",
    subtitle: "How to Think Clean in a Noisy World",
    hook: "Remove mental fog and make better decisions fast.",
    full: "Clarity isn't a personality trait. It's a state you can create deliberately. This book gives you the conditions for clear thinking — so the right answers come faster and stick.",
    spine: "#1A2A35", cover: "#1E3344", accent: "#60A5FA", label: "Decisions",
  },
  {
    num: "05", title: "The Inner Dojo",
    subtitle: "Daily Practices for Mental Strength",
    hook: "Train your mind like a skill, not a philosophy.",
    full: "A daily system for staying sharp, steady, and clear-headed. Not a morning routine. Not a meditation habit. A real training practice — short, repeatable, and built to last.",
    spine: "#2A1A10", cover: "#3A2218", accent: "#FB923C", label: "Daily Practice",
  },
];

const stats = [
  { n: "5", label: "Books in the series" },
  { n: "1", label: "Core system" },
  { n: "3", label: "Frameworks" },
  { n: "∞", label: "Applications" },
];

const ticker = [
  "Stop the Loop", "·", "The Energy Leak", "·",
  "Unnecessary", "·", "Clarity First", "·", "The Inner Dojo", "·",
  "Kung Fu for Your Mind", "·", "MentalFu Press", "·",
];

const manifesto = [
  { line: "You don't fix the mind by fighting it.", em: false },
  { line: "You train it.", em: true },
  { line: "Small shifts create more change than dramatic decisions.", em: false },
  { line: "Clarity isn't an achievement. It's a practice.", em: false },
  { line: "Momentum follows clarity, not the other way around.", em: true },
  { line: "The work is quiet. The results are not.", em: false },
];

/* ─── Mini book cover component ───────────────────────────────── */
function MiniCover({ book, size = 1, rotate = 0, zIndex = 1 }) {
  const h = Math.round(200 * size);
  const w = Math.round(136 * size);
  return (
    <div style={{
      width: w, height: h, flexShrink: 0,
      borderRadius: "2px 5px 5px 2px",
      overflow: "hidden", display: "flex",
      transform: `rotate(${rotate}deg)`,
      zIndex,
      boxShadow: "0 12px 40px rgba(0,0,0,0.28), 0 3px 8px rgba(0,0,0,0.15)",
    }}>
      <div style={{ width: 16, background: book.spine, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)",
          fontSize: "0.45rem", fontFamily: SANS, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)" }}>MFU</span>
      </div>
      <div style={{ flex: 1, background: book.cover, padding: "1rem 0.85rem",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.025) 20px, rgba(255,255,255,0.025) 21px)` }} />
        <div style={{ position: "relative" }}>
          <div style={{ width: 20, height: 2.5, background: book.accent,
            borderRadius: 2, marginBottom: "0.5rem" }} />
          <div style={{ fontSize: `${0.72 * size}rem`, fontFamily: SERIF,
            fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>
            {book.title}
          </div>
        </div>
        <div style={{ fontSize: "0.45rem", fontFamily: SANS, fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", position: "relative" }}>
          MentalFu Press
        </div>
      </div>
    </div>
  );
}

/* ─── Full cover (books section) ──────────────────────────────── */
function BookCard({ book, featured = false }) {
  const [hovered, setHovered] = useState(false);
  if (featured) {
    return (
      <div style={{
        display: "grid", gridTemplateColumns: "auto 1fr",
        gap: "3.5rem", alignItems: "center",
        padding: "3.5rem", background: OFF,
        borderRadius: 12, border: `1px solid ${BORDER}`,
      }}>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "translateY(-6px) rotate(-1deg)" : "translateY(0) rotate(0deg)" }}>
          <MiniCover book={book} size={1.55} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.62rem", fontFamily: SANS, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD,
              background: `${GOLD}18`, padding: "0.3rem 0.7rem", borderRadius: 3 }}>
              Featured
            </span>
            <span style={{ fontSize: "0.62rem", fontFamily: SANS, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
              {book.label}
            </span>
          </div>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.15,
            letterSpacing: "-0.02em", color: BLACK, marginBottom: "0.5rem" }}>
            {book.title}
          </h3>
          <p style={{ fontSize: "0.95rem", fontFamily: SANS, color: MID,
            fontStyle: "italic", marginBottom: "1.25rem", fontWeight: 300 }}>
            {book.subtitle}
          </p>
          <p style={{ fontSize: "0.95rem", fontFamily: SANS, color: MID,
            lineHeight: 1.85, fontWeight: 300, maxWidth: 480, marginBottom: "2rem" }}>
            {book.full}
          </p>
          <button style={{ background: BLACK, color: WHITE, border: "none",
            borderRadius: 4, padding: "0.8rem 1.75rem", fontSize: "0.82rem",
            fontFamily: SANS, fontWeight: 600, letterSpacing: "0.06em",
            cursor: "pointer", transition: "background 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
            onMouseLeave={e => e.currentTarget.style.background = BLACK}>
            Read More
          </button>
        </div>
      </div>
    );
  }
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", cursor: "default" }}>
      <div style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        marginBottom: "1.25rem" }}>
        <MiniCover book={book} size={1.18} />
      </div>
      <span style={{ fontSize: "0.6rem", fontFamily: SANS, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase", color: book.accent,
        marginBottom: "0.35rem" }}>{book.label}</span>
      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.05rem",
        color: BLACK, lineHeight: 1.3, marginBottom: "0.4rem" }}>{book.title}</h3>
      <p style={{ fontSize: "0.8rem", fontFamily: SANS, color: MUTED,
        lineHeight: 1.65, marginBottom: "1rem", flex: 1 }}>{book.hook}</p>
      <button style={{ alignSelf: "flex-start", background: "none",
        border: `1px solid ${BORDER}`, borderRadius: 4, padding: "0.45rem 0.9rem",
        fontSize: "0.72rem", fontFamily: SANS, fontWeight: 500,
        letterSpacing: "0.06em", color: DARK, cursor: "pointer",
        transition: "all 0.18s" }}
        onMouseEnter={e => { e.currentTarget.style.background = DARK; e.currentTarget.style.color = WHITE; e.currentTarget.style.borderColor = DARK; }}
        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = DARK; e.currentTarget.style.borderColor = BORDER; }}>
        Learn More →
      </button>
    </div>
  );
}

/* ─── Ticker ─────────────────────────────────────────────────── */
function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div style={{ overflow: "hidden", background: BLACK, padding: "0.9rem 0",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", gap: "2.5rem", animation: "ticker 28s linear infinite",
        whiteSpace: "nowrap", width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontSize: "0.7rem", fontFamily: SANS, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: item === "·" ? GOLD : "rgba(255,255,255,0.3)" }}>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function MentalFuPage() {
  const [email, setEmail]     = useState("");
  const [joined, setJoined]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleJoin(e) {
    e.preventDefault();
    if (email) setJoined(true);
  }

  return (
    <div style={{ fontFamily: SANS, background: WHITE, color: DARK }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "1.1rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.2rem",
          color: BLACK, letterSpacing: "-0.01em", display: "flex",
          alignItems: "baseline", gap: "0.1rem" }}>
          Mental<span style={{ color: GOLD }}>Fu</span>
          <span style={{ fontSize: "0.6rem", fontFamily: SANS, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED,
            marginLeft: "0.6rem" }}>Press</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
          {[["About", "#philosophy"], ["Books", "#books"], ["Newsletter", "#subscribe"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: "0.8rem", fontWeight: 500,
              color: MID, letterSpacing: "0.02em", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = BLACK}
              onMouseLeave={e => e.target.style.color = MID}>{l}</a>
          ))}
          <a href="#subscribe" style={{ fontSize: "0.76rem", fontWeight: 600,
            background: BLACK, color: WHITE, padding: "0.55rem 1.25rem",
            borderRadius: 4, letterSpacing: "0.04em", transition: "background 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
            onMouseLeave={e => e.currentTarget.style.background = BLACK}>
            Join the Dojo
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", background: OFF,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center", gap: "0",
        paddingTop: "5rem", overflow: "hidden",
        position: "relative",
      }}>
        {/* Left */}
        <div style={{ padding: "5rem 3rem 5rem 5vw", maxWidth: 680, marginLeft: "auto" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            marginBottom: "2.25rem",
            border: `1px solid ${BORDER}`, borderRadius: 100,
            padding: "0.35rem 0.9rem 0.35rem 0.5rem",
            background: WHITE,
          }}>
            <span style={{ background: GOLD, color: WHITE, fontSize: "0.6rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.2rem 0.55rem", borderRadius: 100 }}>New</span>
            <span style={{ fontSize: "0.72rem", fontFamily: SANS, fontWeight: 500,
              color: MID, letterSpacing: "0.04em" }}>
              5-book series now available
            </span>
          </div>

          <h1 className="fade-up fade-up-d1" style={{
            fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
            lineHeight: 1.08, letterSpacing: "-0.025em",
            color: BLACK, marginBottom: "1.75rem",
          }}>
            Train Your Mind<br />
            Like a Warrior.<br />
            <em style={{ color: MID, fontWeight: 400 }}>Live Like a Monk.</em>
          </h1>

          <p className="fade-up fade-up-d2" style={{
            fontSize: "1.1rem", color: MID, lineHeight: 1.8,
            maxWidth: 500, marginBottom: "2.75rem", fontWeight: 300,
          }}>
            Simple mental frameworks to eliminate overthinking, regain clarity, and build a life that feels like yours again.
          </p>

          <div className="fade-up fade-up-d3" style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            <a href="#books" style={{ display: "inline-block",
              background: BLACK, color: WHITE, padding: "0.95rem 2.25rem",
              borderRadius: 4, fontFamily: SANS, fontWeight: 600,
              fontSize: "0.88rem", letterSpacing: "0.04em",
              transition: "background 0.18s", boxShadow: "0 4px 16px rgba(0,0,0,0.14)" }}
              onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
              onMouseLeave={e => e.currentTarget.style.background = BLACK}>
              Browse the Books
            </a>
            <a href="#philosophy" style={{ display: "inline-block",
              border: `1px solid ${BORDER}`, color: DARK,
              padding: "0.95rem 2.25rem", borderRadius: 4,
              fontFamily: SANS, fontWeight: 500, fontSize: "0.88rem",
              letterSpacing: "0.04em", transition: "border-color 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = DARK}
              onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
              How It Works
            </a>
          </div>

          {/* Stats row */}
          <div className="fade-up fade-up-d4" style={{
            display: "flex", gap: "2rem",
            paddingTop: "2rem", borderTop: `1px solid ${BORDER}`,
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: SERIF, fontWeight: 700,
                  fontSize: "1.6rem", color: BLACK, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 500,
                  color: MUTED, letterSpacing: "0.06em", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — book stack */}
        <div style={{
          height: "100vh", background: STONE,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Large watermark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: SERIF, fontSize: "clamp(180px, 20vw, 280px)",
            fontWeight: 700, color: "rgba(0,0,0,0.04)",
            userSelect: "none", pointerEvents: "none", lineHeight: 1,
          }}>武</div>

          {/* Stacked books */}
          <div style={{ position: "relative", width: 260, height: 420 }}>
            {/* Shadow books behind */}
            <div style={{ position: "absolute", top: 28, left: 28, opacity: 0.35 }}>
              <MiniCover book={books[2]} size={1.3} rotate={6} />
            </div>
            <div style={{ position: "absolute", top: 14, left: 14, opacity: 0.6 }}>
              <MiniCover book={books[1]} size={1.3} rotate={3} />
            </div>
            {/* Main front book */}
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <MiniCover book={books[0]} size={1.45} rotate={-1} zIndex={3} />
            </div>
          </div>

          {/* Floating label */}
          <div style={{
            position: "absolute", bottom: "10%", left: "50%",
            transform: "translateX(-50%)",
            background: WHITE, borderRadius: 100,
            padding: "0.6rem 1.4rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: "0.72rem", fontFamily: SANS, fontWeight: 600,
              color: DARK, letterSpacing: "0.04em" }}>
              MentalFu Press · 5-Book Series
            </span>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── FEATURED BOOK ── */}
      <section style={{ padding: "7rem 5vw", background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <span style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
                  Start Here
                </span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1.2, letterSpacing: "-0.02em", color: BLACK }}>
                The most-read book in the series.
              </h2>
            </div>
            <a href="#books" style={{ fontSize: "0.8rem", fontFamily: SANS,
              fontWeight: 500, color: MID, letterSpacing: "0.04em",
              borderBottom: `1px solid ${BORDER}`, paddingBottom: 2,
              transition: "color 0.15s, border-color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = BLACK; e.currentTarget.style.borderColor = BLACK; }}
              onMouseLeave={e => { e.currentTarget.style.color = MID; e.currentTarget.style.borderColor = BORDER; }}>
              View all books →
            </a>
          </div>
          <BookCard book={books[0]} featured />
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <div style={{
        background: BLACK, padding: "5rem 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: "-1%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: SERIF, fontSize: "clamp(160px, 20vw, 280px)",
          color: "rgba(255,255,255,0.025)", fontWeight: 700,
          userSelect: "none", lineHeight: 1,
        }}>"</div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
            color: WHITE, lineHeight: 1.45, letterSpacing: "-0.01em",
            marginBottom: "1.75rem" }}>
            "The goal isn't to quiet the mind. The goal is to stop being dragged around by it."
          </p>
          <span style={{ fontSize: "0.72rem", fontFamily: SANS, fontWeight: 600,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: GOLD }}>— MentalFu · Stop the Loop</span>
        </div>
      </div>

      {/* ── FRAMEWORK / TEA ── */}
      <section style={{ padding: "7rem 5vw", background: OFF }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "8rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 20, height: 1, background: BORDER }} />
                <span style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED }}>
                  The System
                </span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: BLACK, marginBottom: "1.25rem" }}>
                One framework.<br />Three levers.
              </h2>
              <p style={{ fontSize: "0.95rem", color: MID, lineHeight: 1.85,
                fontWeight: 300, marginBottom: "2rem" }}>
                MentalFu is built around the TEA model — a simple way to understand how your mind moves from trigger to result, and where to intervene.
              </p>
              <a href="#books" style={{ display: "inline-block",
                fontSize: "0.8rem", fontFamily: SANS, fontWeight: 500,
                color: DARK, borderBottom: `1px solid ${BORDER}`,
                paddingBottom: 2, letterSpacing: "0.04em",
                transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = DARK}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                See it in the books →
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { abbr: "T", word: "Thought", num: "01",
                  desc: "Every reaction starts here. Most thoughts pass unnoticed — but some catch and loop. Awareness is the first skill: seeing the thought before it becomes a storm." },
                { abbr: "E", word: "Emotion", num: "02",
                  desc: "Emotions are data, not commands. They signal that something is happening. MentalFu teaches you to read them clearly without being governed by them." },
                { abbr: "A", word: "Action", num: "03",
                  desc: "This is where your life is actually built. When you interrupt the T→E path with awareness, you reclaim choice. That gap is where all the training lives." },
              ].map((f, i) => (
                <div key={f.abbr} style={{
                  display: "grid", gridTemplateColumns: "64px 1fr",
                  gap: "1.5rem", padding: "2rem",
                  background: WHITE, borderRadius: 10,
                  border: `1px solid ${BORDER}`,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = DARK; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", flexDirection: "column",
                    alignItems: "center", paddingTop: "0.25rem" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: BLACK, color: WHITE,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: SERIF, fontWeight: 700, fontSize: "1.2rem",
                      marginBottom: "0.5rem",
                    }}>{f.abbr}</div>
                    {i < 2 && <div style={{ flex: 1, width: 1, background: BORDER, marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.6rem" }}>
                      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.2rem", color: BLACK }}>{f.word}</h3>
                      <span style={{ fontSize: "0.65rem", fontFamily: SANS, fontWeight: 600,
                        letterSpacing: "0.12em", color: MUTED }}>{f.num}</span>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: MID, lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL BOOKS ── */}
      <section id="books" style={{ padding: "7rem 5vw", background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 20, height: 1, background: BORDER }} />
                <span style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED }}>
                  The Full Collection
                </span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: 1.2, letterSpacing: "-0.02em", color: BLACK }}>
                Five books. One system.
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: MID, fontWeight: 300,
              maxWidth: 360, lineHeight: 1.7 }}>
              Each book targets one specific problem. Read them in any order. Apply them immediately.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: "3rem",
          }}>
            {books.map(b => <BookCard key={b.num} book={b} />)}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="philosophy" style={{
        padding: "8rem 5vw", background: BLACK,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: "-3%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: SERIF, fontSize: "clamp(180px, 22vw, 320px)",
          fontWeight: 700, color: "rgba(255,255,255,0.025)",
          userSelect: "none", lineHeight: 1,
        }}>道</div>

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "8rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.15)" }} />
                <span style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)" }}>The Manifesto</span>
              </div>
              <p style={{ fontSize: "0.85rem", fontFamily: SANS, fontWeight: 300,
                color: "rgba(255,255,255,0.28)", lineHeight: 1.85 }}>
                MentalFu is not a mindfulness app. Not a 47-module course. Not a philosophy. It's a repeatable system — built to be used, not admired.
              </p>
              <div style={{ marginTop: "2rem", paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <a href="#subscribe" style={{ display: "inline-block",
                  fontSize: "0.78rem", fontFamily: SANS, fontWeight: 600,
                  color: GOLDLT, letterSpacing: "0.06em",
                  borderBottom: `1px solid ${GOLD}44`, paddingBottom: 3,
                  transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = GOLDLT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}44`}>
                  Start training →
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {manifesto.map(({ line, em }, i) => (
                <div key={i} style={{
                  paddingBottom: "2rem",
                  borderBottom: i < manifesto.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <p style={{
                    fontFamily: em ? SERIF : SANS,
                    fontStyle: em ? "italic" : "normal",
                    fontWeight: em ? 400 : 300,
                    fontSize: em ? "clamp(1.5rem, 3vw, 2.2rem)" : "clamp(0.95rem, 2vw, 1.2rem)",
                    color: em ? WHITE : "rgba(255,255,255,0.38)",
                    lineHeight: 1.4, letterSpacing: em ? "-0.015em" : 0,
                  }}>{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section id="subscribe" style={{
        padding: "8rem 5vw", background: OFF,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 20, height: 1, background: GOLD }} />
            <span style={{ fontSize: "0.68rem", fontFamily: SANS, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
              The Weekly Dispatch
            </span>
          </div>

          <h2 style={{ fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: BLACK, marginBottom: "1.25rem" }}>
            Get Sharper<br />Every Week.
          </h2>
          <p style={{ fontSize: "1.05rem", color: MID, lineHeight: 1.8,
            fontWeight: 300, marginBottom: "2.75rem", maxWidth: 480 }}>
            One short idea every week — drawn from the MentalFu system. Practical. Pointed. Takes two minutes to read. Stays with you longer.
          </p>

          {joined ? (
            <div style={{ padding: "2rem 2.25rem", background: WHITE,
              borderRadius: 8, border: `1px solid ${BORDER}`,
              borderLeft: `3px solid ${GOLD}` }}>
              <p style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.15rem",
                color: BLACK, marginBottom: "0.5rem" }}>You're in the dojo.</p>
              <p style={{ fontSize: "0.85rem", color: MUTED, fontWeight: 300 }}>
                First dispatch lands shortly. No noise — just signal.
              </p>
            </div>
          ) : (
            <div>
              <form onSubmit={handleJoin} style={{
                display: "flex", gap: "0", borderRadius: 6,
                overflow: "hidden", border: `1px solid ${BORDER}`,
                background: WHITE, maxWidth: 480,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.2s",
              }}>
                <input type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ flex: 1, padding: "0.95rem 1.25rem",
                    border: "none", fontSize: "0.9rem",
                    fontFamily: SANS, color: DARK, background: "transparent",
                    outline: "none" }} />
                <button type="submit" style={{
                  padding: "0.95rem 1.6rem", background: BLACK, color: WHITE,
                  border: "none", fontSize: "0.82rem", fontFamily: SANS,
                  fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer",
                  whiteSpace: "nowrap", transition: "background 0.18s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
                  onMouseLeave={e => e.currentTarget.style.background = BLACK}>
                  Join the Dojo
                </button>
              </form>
              <p style={{ marginTop: "0.85rem", fontSize: "0.7rem",
                fontFamily: SANS, color: MUTED, letterSpacing: "0.02em" }}>
                No spam. One email per week. Unsubscribe in one click.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{
        background: BLACK, padding: "3.5rem 5vw",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: "2.5rem",
            marginBottom: "3rem" }}>
            <div>
              <a href="/" style={{ fontFamily: SERIF, fontWeight: 700,
                fontSize: "1.3rem", color: WHITE,
                display: "flex", alignItems: "baseline", gap: "0.1rem" }}>
                Mental<span style={{ color: GOLD }}>Fu</span>
                <span style={{ fontSize: "0.6rem", fontFamily: SANS, fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)", marginLeft: "0.6rem" }}>Press</span>
              </a>
              <p style={{ fontSize: "0.8rem", fontFamily: SANS, fontWeight: 300,
                color: "rgba(255,255,255,0.3)", marginTop: "0.5rem",
                letterSpacing: "0.02em" }}>
                Kung Fu for Your Mind
              </p>
            </div>

            <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.62rem", fontFamily: SANS, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)", marginBottom: "1rem" }}>Navigate</div>
                {[["About", "#philosophy"], ["Books", "#books"], ["Newsletter", "#subscribe"]].map(([l, h]) => (
                  <a key={l} href={h} style={{ display: "block", fontSize: "0.82rem",
                    fontFamily: SANS, fontWeight: 400,
                    color: "rgba(255,255,255,0.45)", marginBottom: "0.6rem",
                    transition: "color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = WHITE}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "0.62rem", fontFamily: SANS, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)", marginBottom: "1rem" }}>Books</div>
                {books.map(b => (
                  <a key={b.num} href="#books" style={{ display: "block", fontSize: "0.82rem",
                    fontFamily: SANS, fontWeight: 400,
                    color: "rgba(255,255,255,0.45)", marginBottom: "0.6rem",
                    transition: "color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = WHITE}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>
                    {b.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem", display: "flex",
            justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.72rem", fontFamily: SANS,
              color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
              © {new Date().getFullYear()} MentalFu Press. All rights reserved.
            </p>
            <a href="mailto:hello@mentalfu.com" style={{ fontSize: "0.72rem",
              fontFamily: SANS, color: "rgba(255,255,255,0.25)", fontWeight: 400,
              transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>
              hello@mentalfu.com
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
