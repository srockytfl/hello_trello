/**
 * Centralized color palette — US-10
 * Primary pink applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_BLUE: '#FF69B4',       // hot pink — WCAG AA compliant on dark backgrounds
  PRIMARY_BLUE_HOVER: '#e05599', // darker tone for hover / active states
  PRIMARY_BLUE_DARK: '#c03d7d',  // extra-dark variant (e.g. pressed state)
} as const;
