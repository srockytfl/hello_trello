/**
 * Centralized color palette — US-7
 * Primary yellow applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_BLUE: '#FFD700',       // main yellow — WCAG AA compliant on dark backgrounds
  PRIMARY_BLUE_HOVER: '#E6C200', // darker tone for hover / active states
  PRIMARY_BLUE_DARK: '#B8960C',  // extra-dark variant (e.g. pressed state)
} as const;
