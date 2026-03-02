/**
 * Centralized color palette — US-10
 * Primary pink applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_PINK: '#FF69B4',       // main pink — WCAG AA compliant on dark backgrounds
  PRIMARY_PINK_HOVER: '#E05A9E', // darker tone for hover / active states
  PRIMARY_PINK_DARK: '#C44D8A',  // extra-dark variant (e.g. pressed state)
} as const;
