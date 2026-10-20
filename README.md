# Q — Behavioral Finance Marketing Website

A high-performance marketing web experience for **Q**, built with the Next.js 14 App Router, React 18, and TypeScript in strict mode.

---

## 🏛 Architecture Overview

The codebase is organized into a modular, feature-driven structure under `src/`:

```
src/
├── app/                           # Next.js App Router (RSC by default)
│   ├── layout.tsx                 # Root layout with Manrope font via next/font, metadata, viewport
│   ├── page.tsx                   # Declarative composition of marketing sections
│   ├── not-found.tsx              # Branded 404 handler
│   ├── error.tsx                  # Client error boundary
│   ├── robots.ts                  # Static robots.txt generator
│   └── sitemap.ts                 # XML sitemap generator
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx             # Responsive glass navbar with scroll-hide & mobile drawer
│   │   ├── footer.tsx             # Canonical disclaimer and footer
│   │   ├── ambient-canvas.tsx     # Particle dust simulation with rAF lifecycle & reduced-motion fallback
│   │   ├── ambient-grid.tsx       # Perspective 3D grid with narrative act orientation
│   │   └── act-hud.tsx            # Scroll-driven narrative act tracker ("01 Chaos" - "08 Action")
│   │
│   ├── ui/
│   │   ├── cta-button.tsx         # Accessible magnetic conversion button
│   │   └── q-orb.tsx              # Reusable 3D concentric glowing Q Core Orb
│   │
│   └── sections/
│       ├── hero-flow/             # Act I-II: 3D transaction card morphing & kinetic typography
│       ├── score-simulator/       # Act II: Interactive force chips & dynamic wellness score algorithm
│       ├── rhythm-clock/          # Act II: 24h interactive SVG clock dial with touch/keyboard support
│       ├── personas-deck/         # Act II: 3D collectible identity cards with swipe gestures
│       ├── behavioral-fingerprint/# Act II: 4-layer harmonic Fourier SVG fingerprint
│       ├── pattern-banner/        # Act II: Dynamic harmonic wave background & reveal text
│       ├── spending-skyline/      # Act II: 30-day isometric spending skyline map & tooltip
│       ├── phone-experience/      # Act III: 3D phone model with scroll-driven yaw/pitch & 6 screens
│       ├── cooling-off-chamber/   # Act IV: 24h countdown timer, decision logic & vault animation
│       ├── subscription-leak/     # Act IV: Fluid subscription drain simulation & savings counter
│       ├── ai-diagnostics/        # Act V: Offline AI step execution & 24h category distribution
│       ├── privacy-architecture/  # Act VI: On-device encryption & animated cloud blocker
│       ├── expense-comparison/    # Act VII: Traditional tracker vs Q intelligence comparison
│       ├── pricing/               # Act VII: Monthly/Yearly pass toggle & plan pills
│       ├── faq/                   # Act VII: Accessible expandable accordion FAQ
│       └── final-cta/             # Act VIII: Orbiting Q Orb & conversion CTA
│
├── hooks/
│   ├── use-device-pointer.ts      # Pointer position & device orientation smoothing
│   ├── use-in-view.ts             # Typed IntersectionObserver hook with once-reveal support
│   ├── use-quality-level.ts       # Adaptive quality scaling (low, med, high)
│   └── use-reduced-motion.ts      # Hardware & OS prefers-reduced-motion hook
│
├── lib/
│   ├── constants.ts               # Domain datasets: transactions, metrics, personas, skyline days
│   ├── math.ts                    # Math utilities: clamp, lerp, smoothstep, deterministic RNG
│   ├── types.ts                   # Strict TypeScript domain models & component contracts
│   └── utils.ts                   # Class merging and formatting utilities
│
└── styles/
    └── globals.css                # CSS custom properties, glassmorphism tokens, and keyframes
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20+` (tested on Node v24)
- npm `9+` (tested on npm v11)

### Installation
```bash
npm install
```

### Environment Variables
This marketing site is completely client-independent and requires no private API keys or external secrets. All analytics and alpha signups link to the public Google Form alpha questionnaire.

An optional `.env.example` is provided for reference:
```bash
cp .env.example .env.local
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🧪 Testing & Verification Commands

| Command | Purpose |
| :--- | :--- |
| `npm run typecheck` | Strict TypeScript compiler check (`tsc --noEmit`) with 0 errors |
| `npm run lint` | ESLint verification with Next.js Core Web Vitals configuration |
| `npm test` | Runs the Vitest unit & integration test suite |
| `npm run build` | Builds optimized production static bundle (`next build`) |
| `npm run start` | Runs the production Next.js server locally |

---

## 🎨 Visual Fidelity & Accessibility

- **Preserved Design Identity:** Recreated every visual detail including glassmorphism gradients, 3D CSS perspective transforms, kinetic letter animations, and the signature 3D phone model.
- **Accessibility:** Semantic HTML elements (`<nav>`, `<main>`, `<footer>`, `<details>`, `<summary>`), ARIA slider role on the clock dial, keyboard navigation (arrow keys for the clock, Escape key to close mobile nav), and complete `prefers-reduced-motion` support.
- **Font Optimization:** Powered by `next/font/google` with self-hosted Manrope, zero cumulative layout shift (CLS), and no external render-blocking font stylesheet requests.
