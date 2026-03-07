# US-114 Spec – Rosa

## Overview
Rebrand the Hello Trello application with a pink color scheme across all visual components.

## Functional Requirements

### 1. Color Palette
Define a primary pink color and derive secondary shades for different UI elements:
- **Primary Pink:** `#E91E63` (Material Design pink)
- **Light Pink:** `#F48FB1` (lighter variant for backgrounds)
- **Dark Pink:** `#C2185B` (darker variant for hover/active states)
- **Text on Pink:** `#FFFFFF` (white for contrast) or `#212121` (dark for light backgrounds)

### 2. Components to Update

#### Frontend Styles (Angular 17)
- **Global styles** (`frontend/src/styles.scss`): Update all color variables and utility classes
- **Button components** (`src/app/components/`): Primary and secondary buttons in pink
- **Card/Container components**: Background colors in light pink with proper contrast
- **Form elements**: Inputs, checkboxes, and toggles with pink accent colors
- **Headers/Navigation**: Background and text colors aligned to pink theme
- **Icons**: Stroke and fill colors in pink where applicable

#### Page Title
- Update `<title>` tag in `frontend/src/index.html` to "Rosa"
- Update any heading text displaying the app name to "Rosa"

#### Favicon
- Create or update favicon at `frontend/src/assets/favicon.ico` with pink color
- Update favicon references in `index.html` to ensure proper loading

### 3. Accessibility Requirements
- Ensure WCAG AA contrast compliance (4.5:1 for normal text, 3:1 for large text)
- Test text colors on pink backgrounds for readability
- Maintain focus indicators for keyboard navigation

### 4. Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design must work on mobile (320px), tablet (768px), and desktop (1024px+)

## Technical Implementation Details

### CSS Architecture
1. Define color variables in a centralized location (e.g., `_variables.scss`)
2. Use SCSS mixins for consistent button and component styling
3. Leverage Angular's component encapsulation where necessary

### Angular Components
- Update component `styles` or `styleUrls` to apply pink theme
- If using component-level styling, ensure consistency with global styles
- Update any hardcoded color values in component templates

### Testing Requirements
- Visual regression testing to compare before/after
- Cross-browser testing on major browsers
- Mobile responsiveness testing
- Contrast checking with accessibility tools (axe, Lighthouse)

## Success Criteria
1. All primary UI elements display pink colors consistently
2. Page title displays "Rosa" in browser tab
3. Favicon is visible and pink in color
4. No contrast violations (WCAG AA minimum)
5. All interactive elements remain functional
6. Responsive design works on all breakpoints
