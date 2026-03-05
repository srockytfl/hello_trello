/**
 * Centralized color palette — US-4 (updated to pink in US-10)
 * Primary pink applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_ORANGE: '#FF69B4',       // pink — WCAG AA compliant on dark backgrounds
  PRIMARY_ORANGE_HOVER: '#E65EA2', // darker tone for hover / active states
  PRIMARY_ORANGE_DARK: '#CC5490',  // extra-dark variant (e.g. pressed state)
} as const;
