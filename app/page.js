"use client";
import { useState } from "react";

/* ─── Design tokens ─────────────────────────────────────────── */
const WHITE  = "#FFFFFF";
const OFF    = "#F9F8F6";
const STONE  = "#F2F0EC";
const BORDER = "#E8E5E0";
const MUTED  = "#9B9690";
const MID    = "#6B6860";
const DARK   = "#2C2A27";
const BLACK  = "#141210";
const GOLD   = "#C9A84C";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', -apple-system, sans-serif";

/* ─── Data ───────────────────────────────────────────────────── */
const books = [
  {
    num: "01",
    title: "Stop the Loop",
    subtitle: "A Practical Guide to Ending Rumination",
    hook: "Break the cycle of overthinking without fighting your mind. Learn to step outside the loop instead of trying to outthink it.",
    spine: BLACK,
    cover: "#1C1A18",
    accent: GOLD,
    label: "Rumination",
  },
  {
    num: "02",
    title: "The Energy Leak",
    subtitle: "How Certain People Quietly Drain Your Life",
    hook: "Recognize the invisible patterns that cost you your focus, calm, and clarity — and quietly take them back.",
    spine: "#2D3A2E",
    cover: "#3A4A3B",
    accent: "#7FAF80",
    label: "Relationships",
  },
  {
    num: "03",
    title: "Unnecessary",
    subtitle: "The Hidden Trick to Breaking Habits Effortlessly",
    hook: "Stop reinforcing what you're trying to escape. The most effective way to break a habit is to make it feel pointless.",
    spine: "#2A2035",
    cover: "#342843",
    accent: "#A78BFA",
    label: "Habits",
  },
  {
    num: "04",
    title: "Clarity First",
    subtitle: "How to Think Clean in a Noisy World",
    hook: "Remove mental fog and make better decisions fast. Clarity isn't a gift — it's a practice anyone can learn.",
    spine: "#1A2A35",
    cover: "#1E3344",
    accent: "#60A5FA",
    label: "Decision-making",
  },
  {
    num: "05",
    title: "The Inner Dojo",
    subtitle: "Daily Practices for Mental Strength",
    hook: "Train your mind like a skill, not a philosophy. A daily system for staying sharp, steady, and clear-headed.",
    spine: "#2A1A10",
    cover: "#3A2218",
    accent: "#FB923C",
    label: "Daily Practice",
  },
];

const frameworks = [
  {
    abbr: "T",
    word: "Thought",
    color: "#2C2A27",
    desc: "Every reaction starts with a thought. Most pass through unnoticed — but some catch and loop. The first skill is awareness: seeing the thought before it becomes a storm.",
  },
  {
    abbr: "E",
    word: "Emotion",
    color: "#5A4A3A",
    desc: "Emotions are data, not commands. They tell you something is happening. MentalFu teaches you to read them without being ruled by them.",
  },
  {
    abbr: "A",
    word: "Action",
    color: BLACK,
    desc: "Action is where your life is actually built. When you interrupt the T→E path with awareness, you reclaim choice. That gap is where the training lives.",
  },
];

const manifesto = [
  { line: "You don't fix the mind by fighting it.", em: false },
  { line: "You train it.", em: true },
  { line: "Small shifts create more change than dramatic decisions.", em: false },
  { line: "Clarity isn't an achievement. It's a practice.", em: false },
  { line: "Momentum follows clarity, not the other way around.", em: true },
  { line: "The work is quiet. The results are not.", em: false },
];

/* ─── Sub-components ─────────────────────────────────────────── */
function BookCover({ book }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      {/* Book spine + cover */}
      <div style={{
        display: "flex",
        height: 260,
        borderRadius: "4px 8px 8px 4px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.12)"
          : "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.35s ease",
      }}>
        {/* Spine */}
        <div style={{
          width: 22,
          background: book.spine,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontSize: "0.55rem",
            fontFamily: SANS,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}>
            MentalFu
          </span>
        </div>

        {/* Cover face */}
        <div style={{
          flex: 1,
          background: book.cover,
          padding: "1.5rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle texture lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px)`,
          }} />
          {/* Accent bar */}
          <div style={{
            width: 28, height: 3,
            background: book.accent,
            borderRadius: 2,
            marginBottom: "0.75rem",
            position: "relative",
          }} />

          <div style={{ position: "relative" }}>
            <div style={{
              fontSize: "0.58rem", fontFamily: SANS, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: book.accent, marginBottom: "0.6rem",
            }}>
              {book.label}
            </div>
            <div style={{
              fontSize: "1.15rem", fontFamily: SERIF, fontWeight: 700,
              color: WHITE, lineHeight: 1.25, marginBottom: "0.4rem",
            }}>
              {book.title}
            </div>
            <div style={{
              fontSize: "0.65rem", fontFamily: SANS, fontWeight: 400,
              color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
            }}>
              {book.subtitle}
            </div>
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", position: "relative",
          }}>
            <div style={{
              fontSize: "0.55rem", fontFamily: SANS, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
            }}>
              MentalFu Press
            </div>
            <div style={{
              fontSize: "1.6rem", fontFamily: SERIF, fontWeight: 700,
              color: "rgba(255,255,255,0.07)", lineHeight: 1,
            }}>
              {book.num}
            </div>
          </div>
        </div>
      </div>

      {/* Book info below cover */}
      <div style={{ padding: "1.25rem 0.25rem 0" }}>
        <h3 style={{
          fontSize: "1rem", fontFamily: SERIF, fontWeight: 600,
          color: DARK, marginBottom: "0.4rem", lineHeight: 1.3,
        }}>
          {book.title}
        </h3>
        <p style={{
          fontSize: "0.82rem", fontFamily: SANS, color: MUTED,
          lineHeight: 1.6, marginBottom: "1rem",
        }}>
          {book.hook}
        </p>
        <button style={{
          background: "none",
          border: `1px solid ${BORDER}`,
          borderRadius: 4,
          padding: "0.5rem 1rem",
          fontSize: "0.75rem",
          fontFamily: SANS,
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: DARK,
          cursor: "pointer",
          transition: "all 0.18s",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = DARK;
            e.currentTarget.style.color = WHITE;
            e.currentTarget.style.borderColor = DARK;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = DARK;
            e.currentTarget.style.borderColor = BORDER;
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function MentalFuPage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => setNavScrolled(window.scrollY > 40);
  }

  function handleJoin(e) {
    e.preventDefault();
    if (email) setJoined(true);
  }

  return (
    <div style={{ fontFamily: SANS, background: WHITE, color: DARK }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "1.25rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{
          fontFamily: SERIF, fontWeight: 700, fontSize: "1.15rem",
          color: BLACK, letterSpacing: "-0.01em",
        }}>
          Mental<span style={{ color: GOLD }}>Fu</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[["About", "#philosophy"], ["Books", "#books"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontSize: "0.82rem", fontWeight: 500,
              color: MID, letterSpacing: "0.02em",
              transition: "color 0.15s",
            }}
              onMouseEnter={e => e.target.style.color = BLACK}
              onMouseLeave={e => e.target.style.color = MID}
            >
              {label}
            </a>
          ))}
          <a href="#subscribe" style={{
            fontSize: "0.78rem", fontWeight: 600,
            background: BLACK, color: WHITE,
            padding: "0.55rem 1.2rem", borderRadius: 4,
            letterSpacing: "0.04em",
            transition: "background 0.18s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
            onMouseLeave={e => e.currentTarget.style.background = BLACK}
          >
            Join the Dojo
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        background: OFF,
        display: "flex", alignItems: "center",
        padding: "10rem 2.5rem 6rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background kanji-style mark */}
        <div style={{
          position: "absolute", right: "6%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: SERIF, fontSize: "clamp(200px, 25vw, 340px)",
          fontWeight: 700, color: "rgba(0,0,0,0.03)",
          userSelect: "none", pointerEvents: "none",
          lineHeight: 1,
        }}>
          武
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            marginBottom: "2rem",
          }}>
            <div style={{ width: 24, height: 1, background: GOLD }} />
            <span style={{
              fontSize: "0.7rem", fontFamily: SANS, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD,
            }}>
              Kung Fu for Your Mind
            </span>
          </div>

          <h1 className="fade-up fade-up-d1" style={{
            fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.02em",
            color: BLACK, marginBottom: "1.75rem",
          }}>
            Train Your Mind<br />
            Like a Warrior.<br />
            <em style={{ fontStyle: "italic", color: MID }}>Live Like a Monk.</em>
          </h1>

          <p className="fade-up fade-up-d2" style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: MID, lineHeight: 1.75,
            maxWidth: 560, marginBottom: "2.75rem",
            fontWeight: 300,
          }}>
            Simple mental frameworks to eliminate overthinking, regain clarity, and build a life that feels like yours again.
          </p>

          <div className="fade-up fade-up-d3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#books" style={{
              display: "inline-block",
              background: BLACK, color: WHITE,
              padding: "0.9rem 2rem", borderRadius: 4,
              fontFamily: SANS, fontWeight: 600,
              fontSize: "0.88rem", letterSpacing: "0.04em",
              transition: "background 0.18s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
              onMouseLeave={e => e.currentTarget.style.background = BLACK}
            >
              Start Here
            </a>
            <a href="#philosophy" style={{
              display: "inline-block",
              border: `1px solid ${BORDER}`,
              color: DARK,
              padding: "0.9rem 2rem", borderRadius: 4,
              fontFamily: SANS, fontWeight: 500,
              fontSize: "0.88rem", letterSpacing: "0.04em",
              transition: "border-color 0.18s, color 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = DARK; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; }}
            >
              How It Works
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="fade-up fade-up-d4" style={{
            marginTop: "5rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{
              width: 1, height: 40,
              background: `linear-gradient(to bottom, transparent, ${MUTED})`,
            }} />
            <span style={{
              fontSize: "0.7rem", fontFamily: SANS, fontWeight: 500,
              color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── CORE IDEA / TEA MODEL ── */}
      <section style={{ padding: "7rem 2.5rem", background: WHITE }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: "5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{ width: 24, height: 1, background: BORDER }} />
              <span style={{
                fontSize: "0.7rem", fontFamily: SANS, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED,
              }}>
                The Framework
              </span>
            </div>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              color: BLACK, marginBottom: "1.25rem",
            }}>
              The TEA Model.
            </h2>
            <p style={{
              fontSize: "1rem", color: MID, lineHeight: 1.8, fontWeight: 300,
            }}>
              Most mental frameworks are complicated. MentalFu isn't. Everything starts with three things — and learning to see the gap between them is where the real training begins.
            </p>
          </div>

          {/* TEA cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: BORDER,
            borderRadius: 8, overflow: "hidden",
            marginBottom: "5rem",
          }}>
            {frameworks.map((f, i) => (
              <div key={f.abbr} style={{
                background: WHITE,
                padding: "2.5rem 2rem",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: f.color, color: WHITE,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: SERIF, fontWeight: 700, fontSize: "1.3rem",
                  marginBottom: "1.5rem",
                }}>
                  {f.abbr}
                </div>
                <h3 style={{
                  fontFamily: SERIF, fontWeight: 600, fontSize: "1.25rem",
                  color: BLACK, marginBottom: "0.75rem",
                }}>
                  {f.word}
                </h3>
                <p style={{
                  fontSize: "0.88rem", color: MID, lineHeight: 1.75, fontWeight: 300,
                }}>
                  {f.desc}
                </p>
                {i < 2 && (
                  <div style={{
                    marginTop: "1.5rem",
                    fontSize: "1.2rem", color: BORDER,
                    fontFamily: SANS,
                  }}>→</div>
                )}
              </div>
            ))}
          </div>

          {/* Gravity Wells */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                marginBottom: "1.5rem",
              }}>
                <div style={{ width: 24, height: 1, background: BORDER }} />
                <span style={{
                  fontSize: "0.7rem", fontFamily: SANS, fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED,
                }}>
                  Gravity Wells
                </span>
              </div>
              <h2 style={{
                fontFamily: SERIF, fontWeight: 700,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1.2, letterSpacing: "-0.02em",
                color: BLACK, marginBottom: "1.25rem",
              }}>
                Patterns that pull your life.
              </h2>
              <p style={{
                fontSize: "0.95rem", color: MID, lineHeight: 1.85, fontWeight: 300,
                marginBottom: "1rem",
              }}>
                A Gravity Well is any pattern — a relationship, a habit, a thought loop — that exerts invisible force on your decisions and energy. You don't see them clearly because you're inside them.
              </p>
              <p style={{
                fontSize: "0.95rem", color: MID, lineHeight: 1.85, fontWeight: 300,
              }}>
                MentalFu teaches you to name them, map them, and — when necessary — escape them. Not with willpower. With awareness and design.
              </p>
            </div>

            {/* Visual */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ position: "relative", width: 260, height: 260 }}>
                {[220, 160, 100, 50].map((size, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: size, height: size,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    border: `1px solid ${i === 0 ? BORDER : i === 1 ? "#D8D4CE" : i === 2 ? "#C8C2BA" : DARK}`,
                    opacity: i === 3 ? 1 : 0.6,
                  }} />
                ))}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 14, height: 14, borderRadius: "50%",
                  background: BLACK,
                }} />
                <div style={{
                  position: "absolute", bottom: -28, left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.7rem", fontFamily: SANS, fontWeight: 500,
                  color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  The pattern you're in
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{
        maxWidth: 1000, margin: "0 auto",
        height: 1, background: BORDER,
      }} />

      {/* ── BOOKS ── */}
      <section id="books" style={{ padding: "7rem 2.5rem", background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{ width: 24, height: 1, background: BORDER }} />
              <span style={{
                fontSize: "0.7rem", fontFamily: SANS, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED,
              }}>
                The Books
              </span>
            </div>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              color: BLACK, marginBottom: "1rem",
            }}>
              Short books. Real results.
            </h2>
            <p style={{
              fontSize: "1rem", color: MID, lineHeight: 1.8,
              fontWeight: 300, maxWidth: 520,
            }}>
              Each MentalFu book is focused, practical, and built around one problem. No padding. No filler. Just the framework and how to use it.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
            gap: "2.5rem",
          }}>
            {books.map(book => (
              <BookCover key={book.num} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="philosophy" style={{
        padding: "8rem 2.5rem",
        background: BLACK,
        position: "relative", overflow: "hidden",
      }}>
        {/* Background character */}
        <div style={{
          position: "absolute", right: "-2%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: SERIF, fontSize: "clamp(180px, 22vw, 320px)",
          fontWeight: 700, color: "rgba(255,255,255,0.03)",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>
          道
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            marginBottom: "3rem",
          }}>
            <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)" }} />
            <span style={{
              fontSize: "0.7rem", fontFamily: SANS, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              The Manifesto
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {manifesto.map(({ line, em }, i) => (
              <p key={i} style={{
                fontFamily: em ? SERIF : SANS,
                fontStyle: em ? "italic" : "normal",
                fontWeight: em ? 400 : 300,
                fontSize: em ? "clamp(1.4rem, 3vw, 2.2rem)" : "clamp(1rem, 2vw, 1.35rem)",
                color: em ? WHITE : "rgba(255,255,255,0.45)",
                lineHeight: 1.4,
                letterSpacing: em ? "-0.01em" : "0",
                paddingLeft: em ? 0 : "0.1rem",
              }}>
                {line}
              </p>
            ))}
          </div>

          <div style={{
            marginTop: "4rem", paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{
              fontSize: "0.88rem", fontFamily: SANS, fontWeight: 300,
              color: "rgba(255,255,255,0.3)", lineHeight: 1.8,
              maxWidth: 480,
            }}>
              MentalFu is not a mindfulness app. Not a meditation retreat. Not a course with 47 modules. It's a simple, repeatable system for people who want their mind to work better — starting today.
            </p>
          </div>
        </div>
      </section>

      {/* ── EMAIL SUBSCRIBE ── */}
      <section id="subscribe" style={{
        padding: "8rem 2.5rem",
        background: STONE,
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: BLACK, color: WHITE,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
            fontFamily: SERIF, fontWeight: 700, fontSize: "1rem",
          }}>
            道
          </div>

          <h2 style={{
            fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            lineHeight: 1.2, letterSpacing: "-0.02em",
            color: BLACK, marginBottom: "1rem",
          }}>
            Get Sharper Every Week.
          </h2>
          <p style={{
            fontSize: "1rem", color: MID, lineHeight: 1.8,
            fontWeight: 300, marginBottom: "2.5rem",
          }}>
            One short idea to help you think clearer and live lighter. No noise. No filler. Straight to the point.
          </p>

          {joined ? (
            <div style={{
              padding: "1.5rem 2rem",
              background: WHITE, borderRadius: 6,
              border: `1px solid ${BORDER}`,
            }}>
              <p style={{
                fontFamily: SERIF, fontWeight: 600, fontSize: "1.1rem",
                color: BLACK, marginBottom: "0.4rem",
              }}>
                You're in the dojo.
              </p>
              <p style={{ fontSize: "0.85rem", color: MUTED, fontWeight: 300 }}>
                First idea lands shortly. Keep your mind open.
              </p>
            </div>
          ) : (
            <form onSubmit={handleJoin} style={{
              display: "flex", gap: "0.75rem", flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: "1 1 260px",
                  padding: "0.85rem 1.25rem",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 4,
                  fontSize: "0.9rem",
                  fontFamily: SANS,
                  color: DARK,
                  background: WHITE,
                  outline: "none",
                  transition: "border-color 0.18s",
                }}
                onFocus={e => e.target.style.borderColor = DARK}
                onBlur={e => e.target.style.borderColor = BORDER}
              />
              <button type="submit" style={{
                padding: "0.85rem 1.75rem",
                background: BLACK, color: WHITE,
                border: "none", borderRadius: 4,
                fontSize: "0.85rem", fontFamily: SANS,
                fontWeight: 600, letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "background 0.18s",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#3D3B38"}
                onMouseLeave={e => e.currentTarget.style.background = BLACK}
              >
                Join the Dojo
              </button>
            </form>
          )}

          <p style={{
            marginTop: "1rem",
            fontSize: "0.72rem", fontFamily: SANS, fontWeight: 400,
            color: MUTED, letterSpacing: "0.02em",
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{
        padding: "3rem 2.5rem",
        background: WHITE,
        borderTop: `1px solid ${BORDER}`,
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem",
        }}>
          <a href="/" style={{
            fontFamily: SERIF, fontWeight: 700, fontSize: "1.1rem",
            color: BLACK, letterSpacing: "-0.01em",
          }}>
            Mental<span style={{ color: GOLD }}>Fu</span>
            <span style={{
              display: "block", fontSize: "0.65rem", fontFamily: SANS,
              fontWeight: 400, color: MUTED, letterSpacing: "0.1em",
              textTransform: "uppercase", marginTop: 2,
            }}>
              Kung Fu for Your Mind
            </span>
          </a>

          <nav style={{ display: "flex", gap: "2rem" }}>
            {[["About", "#philosophy"], ["Books", "#books"], ["Contact", "mailto:hello@mentalfu.com"]].map(([label, href]) => (
              <a key={label} href={href} style={{
                fontSize: "0.78rem", fontFamily: SANS, fontWeight: 500,
                color: MUTED, letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
                onMouseEnter={e => e.target.style.color = BLACK}
                onMouseLeave={e => e.target.style.color = MUTED}
              >
                {label}
              </a>
            ))}
          </nav>

          <p style={{
            fontSize: "0.72rem", fontFamily: SANS, color: MUTED, fontWeight: 300,
          }}>
            © {new Date().getFullYear()} MentalFu. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
