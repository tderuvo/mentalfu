// Line-style icons for the four Mental Forms of Strength, matching the
// exact stroke conventions used on the Training Floor's brain map:
// viewBox 0 0 24 24, stroke="currentColor", strokeWidth 1.6, round
// caps/joins, no fill. Shared here so the Training Floor and every
// individual Form page (/training-floor/[form]) render the same icon.

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function LanternIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M9 3a3 3 0 0 1 6 0" />
      <rect x="7" y="6" width="10" height="11" rx="3" />
      <line x1="12" y1="9" x2="12" y2="14" />
      <line x1="9" y1="17" x2="15" y2="17" />
      <line x1="12" y1="17" x2="12" y2="20" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export function SwordIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <line x1="19" y1="5" x2="6" y2="18" />
      <line x1="4" y1="15" x2="9" y2="20" />
      <circle cx="4.3" cy="20.3" r="1" />
    </svg>
  );
}

export function ArmorIcon(props) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

export const FORM_ICONS = {
  lantern: LanternIcon,
  compass: CompassIcon,
  sword: SwordIcon,
  armor: ArmorIcon,
};
