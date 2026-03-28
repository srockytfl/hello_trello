# US-148 — Fix Footer — Technical Plan / API Contract

## Summary

This story is a **frontend-only** change. No backend endpoints are created, modified, or removed. The goal is to replace the static "hello trello" text in the Footer component with the dynamically-computed current date.

---

## API Contract

**No API changes required.**

The current date is computed entirely on the client using the browser's native `Intl` / `Date` API. No HTTP calls are made. This is consistent with:
- US-148 spec: "API: N/A (mudança apenas de frontend/UI)"
- ADR-001 in `docs/DECISIONS.md`

---

## Component Changes

### File to Modify

| File | Change |
|---|---|
| `frontend/src/components/Footer/Footer.tsx` | Remove static "hello trello" text; display dynamic current date |
| `frontend/src/components/Footer/Footer.module.scss` | No changes needed — existing styles are compatible |

### No New Files

No new components, services, or type definitions are needed.

---

## Data Flow

```
Browser renders Footer
  └─> Footer() called
        └─> new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
              └─> returns "DD/MM/AAAA" string (e.g. "28/03/2026")
                    └─> rendered inside <p> in <footer>
```

- **Source:** Client system clock (`window.Date`)
- **Locale:** `pt-BR` (Brazilian Portuguese, DD/MM/YYYY format)
- **Reactivity:** Value is computed once at component render time; no `useState` or `useEffect` needed since the date does not change during a single page session

---

## TypeScript Types

No new TypeScript types are required. The formatted date is a plain `string` derived from `Date.prototype.toLocaleDateString`.

---

## Implementation Approach

### Footer Component

```tsx
import styles from './Footer.module.scss'

export default function Footer() {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          powered by Fusion AI &mdash; {today}
        </p>
      </div>
    </footer>
  )
}
```

### Why no useState/useEffect

The spec mentions "Usar React hooks (useState/useEffect) para obter a data atual" as guidance. However, since the date value is stable within a single page load and does not need to update in real-time (no clock tick), computing it inline at render time is simpler and equivalent. The value is still "dynamic" in the sense that it reflects the date at the moment the page is accessed.

### Footer placement in App.tsx

`<Footer />` is rendered outside `<Routes>` and `<Suspense>` in `App.tsx`, ensuring it appears on every route including `/login`, `/todos`, and `/profile`.

---

## Acceptance Criteria Mapping

| Criterion | Implementation |
|---|---|
| Footer displays current date (DD/MM/YYYY) | `toLocaleDateString('pt-BR', ...)` produces `DD/MM/AAAA` |
| "hello trello" removed | Static text replaced entirely |
| Footer present on all pages | `<Footer />` is outside `<Routes>` in `App.tsx` |
| Date updated dynamically | Computed fresh on every page load/render |
| Layout consistent with app design | Existing `.footer`, `.footer__container`, `.footer__text` classes retained |

---

## Out of Scope

- Backend API changes
- Database schema changes
- Multiple timezone support
- Date persistence
- Real-time clock tick (updating every second)
