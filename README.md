# alaa-elnily-task

Multi-step security system bundle builder — React 18 + Tailwind CSS v3 + Express API.

---

## Quick start

```bash
# 1. Install root (React + Tailwind + concurrently)
npm install

# 2. Install API deps
cd server && npm install && cd ..

# 3. Run both together
npm run dev
```

| Server | URL |
|--------|-----|
| React app | http://localhost:3000 |
| Express API | http://localhost:4000 |

### Frontend only (no API needed — auto-fallbacks to bundled JSON)
```bash
npm start
```

### API only
```bash
cd server && npm start
```

---

## API reference

Base: `http://localhost:4000/api`

| Method | Route | Returns |
|--------|-------|---------|
| GET | `/api/health` | `{ status, timestamp }` |
| GET | `/api/catalog` | Full catalog (steps + config) |
| GET | `/api/steps` | All 4 steps |
| GET | `/api/steps/:id` | Single step (e.g. `cameras`) |
| GET | `/api/products` | All products flat with `stepId` |
| GET | `/api/products/:id` | Single product |
| GET | `/api/config` | Shipping / financing / guarantee |

---

## View switcher

A switcher at the top of the page toggles between:

- **Frame 1735** — the desktop target: two-column layout (builder left, sticky review panel right), horizontal product cards
- **Frame 1736** — the wide showcase: full-width builder with 5-column vertical cards, review panel below the accordion

---

## Stack

- React 18 (CRA)
- Tailwind CSS v3 — utility classes only, zero CSS modules
- Express 4 + CORS — JSON API served from `server/products.json`
- localStorage — "Save my system for later" persists and restores full configuration
- concurrently — single `npm run dev` boots API + React together

## Architecture

```
src/
  hooks/
    useCatalog.js       fetches /api/catalog, falls back to local JSON
    useSelections.js    all quantity/variant state + totals + save/restore
  components/
    ViewSwitcher.jsx    F1735 ↔ F1736 toggle bar
    AccordionStep.jsx   4-step accordion (open = blue card, closed = flat row)
    ProductCard.jsx     F1735 (horizontal) + F1736 (vertical) exports
    QuantityStepper.jsx card size (plain) + review size (circle buttons)
    ReviewPanel.jsx     F1735 (sticky side) + F1736 (full-width below) exports
  data/
    products.json       local fallback mirror of server/products.json
server/
  index.js             Express API
  products.json        canonical data source
```

## Key decisions

- `useCatalog` tries the API first with graceful fallback — UI never breaks if server is off
- Variant quantities keyed by variant ID — switching color preserves other variants in review panel
- Both frame layouts share the same state — switching views doesn't reset selections
- `npm run dev` with concurrently + CRA proxy means zero CORS config in dev
