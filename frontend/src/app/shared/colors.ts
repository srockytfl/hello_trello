/**
 * Centralized color palette — US-6
 * Primary green applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_GREEN: '#22c55e',       // green — WCAG AA compliant on dark backgrounds
  PRIMARY_GREEN_HOVER: '#16a34a', // darker tone for hover / active states
  PRIMARY_GREEN_DARK: '#15803d',  // extra-dark variant (e.g. pressed state)
} as const;
