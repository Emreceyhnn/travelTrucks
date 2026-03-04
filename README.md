# TravelTrucks

A production-grade camper rental web application built with React 19, TypeScript, Redux Toolkit, and Material UI. Users can browse the camper catalog, filter by equipment and vehicle type, view detailed specs, read reviews, and submit a booking request.

---

## Live Demo

> Deploy URL will be available after first production build. Run `npm run build` and host the `/dist` folder on any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

## Lighthouse Audit — March 4, 2026

Captured with **Lighthouse 13.0.1** on **HeadlessChromium 144** — Emulated Desktop, Custom Throttling.

| Category       | Score |
| -------------- | ----- |
| Performance    | 95    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 75    |

### Core Web Vitals

| Metric                         | Value | Status            |
| ------------------------------ | ----- | ----------------- |
| First Contentful Paint (FCP)   | 0.7 s | Good              |
| Largest Contentful Paint (LCP) | 6.9 s | Needs Improvement |
| Total Blocking Time (TBT)      | 10 ms | Good              |
| Cumulative Layout Shift (CLS)  | 0.006 | Good              |
| Speed Index (SI)               | 1.1 s | Good              |

### Key Findings

**Performance (Score: 95)**

| Finding                  | Estimated Savings |
| ------------------------ | ----------------- |
| Improve image delivery   | 6,042 KiB         |
| Render-blocking requests | 260 ms            |
| Reduce unused JavaScript | 80 KiB            |
| Total network payload    | 8,101 KiB         |

- LCP at **6.9 s** is the primary bottleneck — driven by the large hero background image (`bgImage.webp`) loaded via CSS `background-image` which is not prioritized by the browser's preload scanner.
- 2 long main-thread tasks detected.
- Network payload is dominated by unoptimized gallery images served from the external MockAPI.

**Accessibility (Score: 100)**

- Fully passes all automated checks.
- One manual category flagged: **background and foreground color contrast ratio** needs verification in edge-case states (e.g. ghost buttons over dark backgrounds).
- 10 additional items require manual accessibility review per WCAG guidelines.

**Best Practices (Score: 100)**

- All Trust & Safety checks pass.
- **Recommended hardening for production deployment:**
  - Add a strong **Content Security Policy (CSP)** header.
  - Enable **HSTS** (`Strict-Transport-Security`).
  - Set **Cross-Origin-Opener-Policy (COOP)** header.
  - Set **X-Frame-Options** or CSP `frame-ancestors` to prevent clickjacking.
  - Enable **Trusted Types** for DOM XSS mitigation.

**SEO (Score: 75)**

- Structured data is valid.
- Missing: `<meta name="description">` tags on individual pages.
- Missing: Open Graph / Twitter Card meta tags.
- `<title>` tags are present but not per-page specific.

---

## Tech Stack

| Layer             | Technology                 | Version     |
| ----------------- | -------------------------- | ----------- |
| UI Framework      | React                      | 19.2        |
| Language          | TypeScript                 | 5.9         |
| Component Library | MUI (Material UI)          | 7.3         |
| Styling Engine    | Emotion                    | 11.14       |
| State Management  | Redux Toolkit              | 2.11        |
| Routing           | React Router DOM           | 7.13        |
| HTTP Client       | Axios                      | 1.13        |
| Notifications     | react-hot-toast            | 2.6         |
| Build Tool        | Vite                       | 7.3         |
| Linting           | ESLint + typescript-eslint | 9.39 / 8.48 |

---

## Project Structure

```
travelTrucks/
├── public/
│   └── bgImage.webp           # Hero background image (static asset)
├── src/
│   ├── assets/                # Imported static assets (icons, images)
│   ├── components/
│   │   ├── Header/            # Global navigation header
│   │   └── Loader/            # Global loading spinner
│   ├── lib/
│   │   └── type/              # Centralised TypeScript type declarations
│   │       ├── camper.d.ts        # Domain models: Camper, CamperReview, etc.
│   │       ├── catalog.d.ts       # CatalogPageState, CatalogPageActions, CatalogPageProps
│   │       └── camperDetail.d.ts  # CamperDetailPageState, CamperDetailPageActions, BookingFormData
│   ├── pages/
│   │   ├── HomePage/
│   │   │   └── HomePage.tsx       # Hero section — navigate to catalog
│   │   ├── CatalogPage/
│   │   │   ├── CatalogPage.tsx    # Page root — owns fetch logic and state
│   │   │   ├── CamperCard.tsx     # Presentational card (receives state via props)
│   │   │   └── FilterPanel.tsx    # Filter sidebar (receives actions via props)
│   │   └── CamperDetailPage/
│   │       ├── CamperDetailPage.tsx  # Page root — owns fetch logic and state
│   │       ├── CamperFeatures.tsx    # Vehicle specs tab (props only)
│   │       ├── CamperReviews.tsx     # Reviews tab (props only)
│   │       └── BookingForm.tsx       # Booking form (calls actions on submit)
│   ├── redux/
│   │   └── store.ts               # Redux store configuration
│   ├── services/
│   │   └── api.ts                 # Axios instance + typed API calls
│   ├── theme.ts                   # MUI custom theme (palette, typography)
│   ├── App.tsx                    # Root component — routing + lazy loading
│   ├── main.tsx                   # React DOM entry point
│   └── index.css                  # Global CSS reset / baseline
├── index.html                     # Vite HTML entry point
├── vite.config.ts                 # Vite config with manual chunk splitting
├── tsconfig.app.json              # App TypeScript config
├── tsconfig.node.json             # Node/Vite TypeScript config
├── eslint.config.js               # ESLint flat config
└── package.json
```

---

## Architecture

### Page Architecture Pattern

Every page follows a strict unidirectional data flow:

```
Page (owns state + fetch)
  │
  ├── PageState  ──► Child Components (read-only)
  └── PageActions ──► Child Components (call to trigger parent update)
```

**Rules enforced across the codebase:**

- Each page has a single root state (`PageState`) and a `PageActions` object.
- State and actions are passed down via props — never via context or global mutation.
- Child components **never fetch independently** and **never mutate state directly**.
- All type contracts live in `src/lib/type/*.d.ts` — no inline `any`.
- Actions are wrapped with `useCallback` to prevent unnecessary re-renders.
- Fetch logic lives exclusively in page-level components.

### State Management

Redux Toolkit is used for **cross-page persistent state** (e.g. favourites list) only. Local page state (loading, error, data) is managed with `useState` inside the page component.

### Code Splitting

Three manual chunks are configured in `vite.config.ts`:

```
vendor-react   → react, react-dom, react-router-dom
vendor-mui     → @mui/material, @mui/icons-material, @emotion/*
vendor-redux   → @reduxjs/toolkit, react-redux
```

All pages are lazy-loaded via `React.lazy()` + `Suspense`, ensuring the initial bundle does not include page-level code.

### API Layer

```
Base URL: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
```

| Function             | Method | Endpoint       | Description                             |
| -------------------- | ------ | -------------- | --------------------------------------- |
| `getCampers(params)` | GET    | `/campers`     | Paginated list with server-side filters |
| `getCamperById(id)`  | GET    | `/campers/:id` | Single camper detail                    |

Filter params: `page`, `limit`, `location`, `form`, `AC`, `transmission`, `kitchen`, `TV`, `bathroom`.

---

## Domain Model

```ts
interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: "alcove" | "fullyIntegrated" | "panelTruck";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid";
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: CamperGalleryImage[];
  reviews: CamperReview[];
}
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Starts the Vite dev server. Open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
```

Output is in the `/dist` folder. Chunks are automatically split per the `vite.config.ts` manual chunk configuration.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Performance Optimization Roadmap

Based on the Lighthouse audit, the following improvements are prioritised:

### High Impact

| Action                                                                        | Target Metric |
| ----------------------------------------------------------------------------- | ------------- |
| Add `<link rel="preload">` for hero image (`bgImage.webp`) in `index.html`    | LCP           |
| Serve gallery images via a CDN with auto-compression (e.g. Cloudinary, imgix) | LCP, Payload  |
| Convert external MockAPI gallery images to WebP at the source                 | Payload       |
| Lazy-load gallery images below the fold with `loading="lazy"`                 | LCP, FCP      |

### Medium Impact

| Action                                                      | Target Metric |
| ----------------------------------------------------------- | ------------- |
| Remove render-blocking third-party scripts                  | FCP, SI       |
| Add per-page `<title>` and `<meta name="description">` tags | SEO           |
| Add Open Graph meta tags for social sharing                 | SEO           |

### Low Impact / Hardening

| Action                                               | Target Metric  |
| ---------------------------------------------------- | -------------- |
| Add CSP header                                       | Best Practices |
| Add HSTS header                                      | Best Practices |
| Add COOP header                                      | Best Practices |
| Verify color contrast ratios in all component states | Accessibility  |

---

## Pages

### `/` — Home Page

Full-viewport hero section with background image and CTA button navigating to the catalog.

### `/catalog` — Catalog Page

- Left sidebar: `FilterPanel` — location input + vehicle type + equipment checkboxes.
- Right content: paginated list of `CamperCard` components.
- "Load More" pagination — appends next page to existing list.
- Server-side filtering via query params.

### `/catalog/:id` — Camper Detail Page

- Gallery viewer (image list).
- Tab navigation: **Features** | **Reviews**.
- `CamperFeatures`: vehicle dimensions, engine, transmission, and equipment icons.
- `CamperReviews`: reviewer name, star rating, comment.
- `BookingForm`: name, email, date, comment — submission triggers `actions.submitBooking`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Follow the page architecture pattern (see **Architecture** section above).
4. All new types must live in `src/lib/type/*.d.ts`.
5. No `any` types. No fake or mocked fetch logic in components.
6. Run `npm run lint` before opening a PR.
7. Open a pull request against `main`.

---

## License

This project is for educational and portfolio purposes.
