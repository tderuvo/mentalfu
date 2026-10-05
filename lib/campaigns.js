// Campaign-specific hero copy for the /start acquisition page.
//
// /start reads utm_campaign from the URL. If it matches a key below, that
// entry's copy replaces the default hero; otherwise DEFAULT_HERO is used.
// Adding a campaign = adding one entry here. No new page, no new logic.
//
//   /start?utm_source=nokings&utm_medium=qr&utm_campaign=seattle_2026
//                                                         ^^^^^^^^^^^^
//                                                         matches the key
//
// Fields:
//   headline     — required. The big hero line.
//   subheadline  — required. The line underneath it.
//   workout      — optional. A kata slug (folder name in content/katas/).
//                  When set, START A WORKOUT goes straight to that kata
//                  (/workout/<slug>) instead of a random one.
//
// Keys are matched case-insensitively.

export const DEFAULT_HERO = {
  headline: "Train your mind.",
  subheadline: "You work out your body. MentalFu gives your mind a place to train.",
};

export const CAMPAIGNS = {
  seattle_2026: {
    headline: "The world is loud.",
    subheadline: "Train the mind that has to live in it.",
  },

  dodge_punch: {
    headline: "Life throws punches.",
    subheadline: "Train your mind to handle them.",
  },
};

export function getCampaignHero(campaign) {
  if (!campaign) return DEFAULT_HERO;
  const entry = CAMPAIGNS[campaign.trim().toLowerCase()];
  return entry ? { ...DEFAULT_HERO, ...entry } : DEFAULT_HERO;
}
