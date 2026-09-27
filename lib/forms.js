// Data for each Mental Form of Strength's dedicated page
// (/training-floor/[form]). Rendered by components/FormPage.js, the
// shared template every Form's page uses. Only "lantern" is populated
// for now — Compass, Sword and Armor will be added here later, and
// each will automatically get a page at /training-floor/<slug> with no
// changes needed to the template or the routing.
//
// Section 1 ("why") and Section 2 ("signs") bodies are arrays of typed
// blocks/segments rather than raw JSX so this file stays plain data:
//   section1.body:  [{ p: "..." }, { punch: "..." }, ...]
//   section2.items: ["...", ["... ", { strong: "you" }, " ..."], ...]
//
// principle.body follows the same typed-block idea, since different
// Forms close on slightly different rhetorical shapes (Lantern ends on
// a single short "But first: <closing>"; Compass has an extra bolded
// question in the middle of its transition paragraph):
//   { sub: "..." }    — the bold line directly under the big statement
//   { p: "..." }      — an ordinary transition paragraph
//   { punch: "..." }  — a bolded, standalone line within the transition
//   { lead: "..." }   — a small uppercase label right before the close
//   { closing: "..." } — the final, accent-colored closing line

export const FORMS = {
  lantern: {
    slug: "lantern",
    name: "Lantern",
    accent: "#C9A84C",
    icon: "lantern",

    metaDescription:
      "Lantern is the MentalFu Mental Form of Strength for awareness, perception, pattern recognition and self-inquiry.",

    hero: {
      eyebrow: "Lantern",
      title: "See Clearly",
      statement:
        "Train your ability to notice what’s happening — around you, inside you, and in the patterns that shape how you experience life.",
      intro:
        "Before you can change something, choose something, or move through something, you have to be able to see it. Lantern training develops awareness — of your thoughts, reactions, assumptions, patterns and the things you may normally move past without noticing.",
    },

    section1: {
      title: "Why Train Your Lantern?",
      body: [
        { p: "Most of us move through a surprising amount of life on autopilot." },
        {
          p: "We react before we understand why. We repeat patterns without noticing them. We make assumptions that feel like facts. We inherit ideas about success, relationships, ourselves and the world — and eventually forget where those ideas came from.",
        },
        {
          p: "None of this means something is wrong with you. It’s simply difficult to examine something while you’re inside it.",
        },
        { punch: "Lantern training helps you notice." },
        {
          p: "The goal isn’t to judge every thought or analyze yourself all day. It’s to become better at recognizing what’s happening while it’s happening.",
        },
        {
          p: "Because once you can see something clearly, you have more choices about what to do with it.",
        },
      ],
    },

    section2: {
      title: "You Might Want to Train Your Lantern If…",
      items: [
        "You keep finding yourself in the same situations or patterns.",
        "Something triggers a stronger reaction than you expected.",
        "You sometimes react first and understand why later.",
        "You catch yourself assuming you know what someone else is thinking.",
        [
          "You’re questioning whether something you want is actually what ",
          { strong: "you" },
          " want.",
        ],
        "You notice that old beliefs still influence new situations.",
        "You want to become better at recognizing your own blind spots.",
        "You’d like more space between what happens and how you respond.",
      ],
    },

    section3: {
      title: "What Are You Actually Training?",
      abilities: [
        {
          name: "Awareness",
          description:
            "Noticing thoughts, emotions, reactions and circumstances as they’re happening.",
        },
        {
          name: "Perception",
          description:
            "Getting better at distinguishing what happened from the story your mind immediately tells about what happened.",
        },
        {
          name: "Pattern Recognition",
          description:
            "Seeing recurring behaviors, assumptions and reactions that can otherwise become invisible through repetition.",
        },
        {
          name: "Self-Inquiry",
          description:
            "Learning to become curious about your own thinking rather than automatically believing or fighting every thought.",
        },
      ],
    },

    principle: {
      statement: "You Can’t Train What You Can’t See.",
      body: [
        {
          sub: "Lantern doesn’t tell you what to think. It helps you get better at seeing what’s already there.",
        },
        {
          p: "What you do with that information may lead you toward another Mental Form — perhaps Compass to decide what matters, Sword to take action, or Armor to handle what comes next.",
        },
        { lead: "But first:" },
        { closing: "Turn on the light." },
      ],
    },
  },

  compass: {
    slug: "compass",
    name: "Compass",
    accent: "#1C7ED6",
    icon: "compass",

    metaDescription:
      "Compass is the MentalFu Mental Form of Strength for values, direction, prioritization and alignment.",

    hero: {
      eyebrow: "Compass",
      title: "Find Direction",
      statement:
        "Train your ability to decide what matters, choose where you’re going and keep your actions aligned with what you actually want.",
      intro:
        "Seeing clearly is important. But sooner or later, you have to choose a direction. Compass training helps you examine what matters to you, separate your priorities from everyone else’s, and make more deliberate choices about where you put your time, energy and attention.",
    },

    section1: {
      title: "Why Train Your Compass?",
      body: [
        { p: "Life gives us plenty of directions to travel." },
        {
          p: "Family has ideas about what you should do. Culture has ideas. Friends have ideas. Employers have ideas. Advertising has plenty of ideas.",
        },
        {
          p: "And sometimes the loudest voice is simply momentum — continuing in a direction because you’ve already been heading that way.",
        },
        { punch: "Compass training helps you choose." },
        {
          p: "The goal isn’t to discover one perfect purpose or create an elaborate life plan. It’s to become better at recognizing what matters to you, deciding where you want to put your energy, and noticing when your actions have drifted away from your priorities.",
        },
        {
          p: "You don’t need to know exactly where life is going. But it helps to know which way you’re facing.",
        },
      ],
    },

    section2: {
      title: "You Might Want to Train Your Compass If…",
      items: [
        "You’re busy, but you’re not sure the things keeping you busy actually matter to you.",
        "You have several possible directions and keep struggling to choose one.",
        "You’re pursuing goals because they seem like what you’re supposed to want.",
        "You say something is important, but your time and attention keep going somewhere else.",
        "You frequently compare your progress with other people’s lives.",
        "You’ve achieved something you wanted and wondered, “Is this it?”",
        "You know something needs to change, but you’re not sure what you want instead.",
        "You want your decisions to reflect your priorities rather than the pressure of the moment.",
      ],
    },

    section3: {
      title: "What Are You Actually Training?",
      abilities: [
        {
          name: "Values",
          description: "Getting clearer about what genuinely matters to you.",
        },
        {
          name: "Direction",
          description:
            "Turning what matters into a sense of where you want to go next.",
        },
        {
          name: "Prioritization",
          description:
            "Distinguishing what deserves your time, attention and energy from everything competing for them.",
        },
        {
          name: "Alignment",
          description:
            "Noticing whether the way you’re actually living matches the direction you say you want to travel.",
        },
      ],
    },

    principle: {
      statement: "You Don’t Need The Whole Map. You Need A Direction.",
      body: [
        {
          sub: "Compass doesn’t tell you where to go. It trains you to become better at choosing your own direction.",
        },
        {
          p: "Lantern may help you see that you’ve been traveling toward something you never consciously chose. Compass lets you ask:",
        },
        { punch: "Where do I want to go from here?" },
        {
          p: "Once you’ve chosen, Sword can help you move, Armor can help you handle what pushes back, and Lantern can help you notice when it’s time to reconsider.",
        },
        { closing: "Choose your direction." },
      ],
    },
  },

  armor: {
    slug: "armor",
    name: "Armor",
    accent: "#3FA34D",
    icon: "armor",

    metaDescription:
      "Armor is the MentalFu Mental Form of Strength for resilience, emotional regulation, boundaries and response control.",

    hero: {
      eyebrow: "Armor",
      title: "Handle The Hit",
      statement:
        "Train your ability to handle pressure, setbacks and difficult moments without letting them take over.",
      intro:
        "Life is going to throw things at you. A difficult conversation. A rejection. A mistake. A bad day. A thought that won’t leave you alone. Armor training develops your ability to take the hit, regain your footing and choose what happens next.",
    },

    section1: {
      title: "Why Train Your Armor?",
      body: [
        { p: "You can’t control everything that reaches you." },
        {
          p: "People disappoint you. Plans fall apart. Stress builds. Criticism lands. Your own thoughts can sometimes hit harder than anything coming from the outside.",
        },
        { punch: "Armor training helps you withstand the impact." },
        {
          p: "The goal isn’t to become emotionless, invulnerable or unaffected by life.",
        },
        {
          p: "It’s to become better at handling what comes at you without every hit deciding what happens next.",
        },
        { p: "Strong Armor doesn’t make you harder." },
        { punch: "It makes you harder to knock off course." },
      ],
    },

    section2: {
      title: "You Might Want to Train Your Armor If…",
      items: [
        "One negative thought can hijack the next twenty minutes.",
        "Criticism stays with you longer than you’d like.",
        "Difficult people easily pull you into their fights.",
        "A setback can derail your entire day.",
        "You struggle to maintain boundaries when someone pushes against them.",
        "Stress makes it difficult to think clearly.",
        "You replay uncomfortable conversations long after they’re over.",
        "You want more space between taking a hit and reacting to it.",
      ],
    },

    section3: {
      title: "What Are You Actually Training?",
      abilities: [
        {
          name: "Resilience",
          description:
            "Recovering your footing after something knocks you off balance.",
        },
        {
          name: "Emotional Regulation",
          description:
            "Staying capable of choosing your response when emotions run high.",
        },
        {
          name: "Boundaries",
          description:
            "Protecting your time, attention and well-being when something pushes against them.",
        },
        {
          name: "Response Control",
          description:
            "Creating enough space between what happens and what you do next.",
        },
      ],
    },

    principle: {
      statement: "You Can’t Stop Every Hit. You Can Train How You Take It.",
      body: [
        {
          sub: "Armor isn’t about becoming impossible to hurt. It’s about becoming more capable when something hurts.",
        },
        {
          p: "Sometimes Lantern helps you see what’s happening. Compass reminds you where you want to go. Sword helps you act.",
        },
        { p: "Armor helps you stay standing when life pushes back." },
        { closing: "Take the hit. Find your footing. Continue." },
      ],
    },
  },

  sword: {
    slug: "sword",
    name: "Sword",
    accent: "#D6423E",
    icon: "sword",

    metaDescription:
      "Sword is the MentalFu Mental Form of Strength for initiative, courage, discipline and follow-through.",

    hero: {
      eyebrow: "Sword",
      title: "Take Action",
      statement:
        "Train your ability to move, commit and follow through — especially when thinking about it would be easier.",
      intro:
        "Knowing what matters isn’t the same as doing something about it. Sword training develops the mental strengths that turn intention into movement: courage, discipline, initiative and follow-through.",
    },

    section1: {
      title: "Why Train Your Sword?",
      body: [
        { p: "Most of us don’t suffer from a shortage of things we could do." },
        {
          p: "We know we should make the call. Start the project. Have the conversation. Go for the opportunity. Practice the skill. Finish what we started.",
        },
        { p: "And yet knowing doesn’t always become doing." },
        { punch: "Sword training helps you move." },
        {
          p: "The goal isn’t constant hustle, aggression or forcing yourself through everything.",
        },
        {
          p: "It’s becoming better at taking deliberate action when action is called for — even when it’s uncomfortable, uncertain or easier to put off.",
        },
        { p: "A strong Sword isn’t about dominating anything." },
        { punch: "It’s about closing the distance between intention and action." },
      ],
    },

    section2: {
      title: "You Might Want to Train Your Sword If…",
      items: [
        "You spend more time thinking about doing something than doing it.",
        "You keep waiting until you feel completely ready.",
        "You start things enthusiastically but struggle to follow through.",
        "Fear of getting it wrong keeps you from beginning.",
        "You know the next step but keep avoiding it.",
        "You procrastinate on conversations or decisions you know need to happen.",
        "Motivation disappears before the work is finished.",
        "You want to become someone who can reliably turn intention into movement.",
      ],
    },

    section3: {
      title: "What Are You Actually Training?",
      abilities: [
        {
          name: "Initiative",
          description:
            "Taking the first step instead of waiting for the perfect moment.",
        },
        {
          name: "Courage",
          description:
            "Moving toward something worthwhile even when discomfort or uncertainty comes with it.",
        },
        {
          name: "Discipline",
          description:
            "Acting on what matters even when motivation isn’t cooperating.",
        },
        {
          name: "Follow-Through",
          description:
            "Staying with an action long enough for intention to become something real.",
        },
      ],
    },

    principle: {
      statement: "Knowing Isn’t Doing.",
      body: [
        {
          sub: "Sword trains the moment when thought becomes movement.",
        },
        {
          p: "Lantern can help you see what’s happening. Compass can help you choose where you’re going. Armor can help you withstand what pushes back.",
        },
        { p: "But eventually, you have to move." },
        { closing: "Take the step." },
      ],
    },
  },
};

export function getAllFormSlugs() {
  return Object.keys(FORMS);
}

export function getFormBySlug(slug) {
  return FORMS[slug] || null;
}
