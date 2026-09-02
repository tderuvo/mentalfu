export const BELT_COLORS = {
  White:  { bg: "#FFFFFF", text: "#111111" },
  Yellow: { bg: "#F5C518", text: "#111111" },
  Orange: { bg: "#F58220", text: "#111111" },
  Green:  { bg: "#2E8B3D", text: "#FFFFFF" },
  Blue:   { bg: "#2E6DE0", text: "#FFFFFF" },
  Purple: { bg: "#7B2FBE", text: "#FFFFFF" },
  Brown:  { bg: "#6B4423", text: "#FFFFFF" },
  Red:    { bg: "#D62828", text: "#FFFFFF" },
  Black:  { bg: "#111111", text: "#FFFFFF" },
};

// belt_stage frontmatter looks like "White (Begin)" — we only need the first word.
export function getBeltColors(beltStage) {
  if (!beltStage) return BELT_COLORS.White;
  const key = beltStage.trim().split(/\s+/)[0];
  return BELT_COLORS[key] || BELT_COLORS.White;
}
