/**
 * Centralized color palette — US-1
 * Primary blue applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_BLUE: '#3B82F6',       // main blue — WCAG AA compliant on dark backgrounds
  PRIMARY_BLUE_HOVER: '#2563EB', // darker tone for hover / active states
  PRIMARY_BLUE_DARK: '#1D4ED8',  // extra-dark variant (e.g. pressed state)
} as const;
