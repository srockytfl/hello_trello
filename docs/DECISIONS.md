# Architectural Decisions

## ADR-001 — Client-side date in Footer (US-148)

**Date:** 2026-03-28
**Status:** Accepted

### Context

The Footer component previously displayed the static string "hello trello". US-148 required replacing it with the current date.

### Decision

Use `new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })` inside the React component to generate the date string at render time on the client.

### Rationale

- No server round-trip is needed; the PRD explicitly states no additional HTTP calls should be made.
- The `Intl` API (via `toLocaleDateString`) is natively available in all target browsers (Chrome, Firefox, Safari, Edge).
- The value is stable within a single page load — no reactive state or side-effects are required.
- Using the user's local system time is acceptable because the PRD does not require server-authoritative time.

### Consequences

- The displayed date reflects the user's local system clock. If a user's clock is incorrect, the footer will show the wrong date.
- No additional npm dependencies are introduced.
- The footer renders correctly on all routes because `<Footer />` is placed outside `<Routes>` in `App.tsx`.
