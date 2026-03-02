/**
 * Centralized color palette — US-4
 * Primary orange applied to buttons, icons and highlighted elements.
 * CSS custom properties mirror these values in styles.scss (--blue / --blue-dark).
 */
export const COLORS = {
  PRIMARY_ORANGE: '#FF9500',       // main orange — WCAG AA compliant on dark backgrounds
  PRIMARY_ORANGE_HOVER: '#E68500', // darker tone for hover / active states
  PRIMARY_ORANGE_DARK: '#CC7A00',  // extra-dark variant (e.g. pressed state)
} as const;
