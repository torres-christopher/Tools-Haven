# Tools Haven

Free online tools to edit text, convert data and other Czech specific services.
This is a part of a school project.

> **Project status:** Active development. Deployment pending.

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Tools](#tools)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Contributing](#contributing)

---

## About

Tools Haven is a (Czech-dominant) website providing free online utility tools. The goal is to offer a quality alternative to foreign tools with a focus on Czech local data (Czech National Bank rates, ARES company registry, public holidays) and user privacy.

Data entered into tools is never stored or shared with third parties. Files uploaded for processing are handled in server memory and deleted immediately after the result is returned.

---

## Tech Stack

| Layer                    | Technology                      |
| ------------------------ | ------------------------------- |
| Runtime                  | Node.js 20+ (CI on Node 24)     |
| Framework                | Express 4                       |
| Language                 | TypeScript 5 (NodeNext modules) |
| Templates                | Pug                             |
| Validation               | Zod                             |
| Unit / integration tests | Vitest + Supertest              |
| E2E tests                | Playwright                      |
| Linting                  | ESLint 9 flat config            |
| Formatting               | Prettier + @prettier/plugin-pug |
| CI                       | GitHub Actions                  |
| Hosting                  | Rosti.cz                        |

---

## Project Structure

```
Web-Services/
├── src/
│   ├── app.ts                          # Express app — middleware stack, router registration
│   ├── server.ts                       # HTTP server, graceful shutdown, process handlers
│   ├── config/
│   │   └── env.ts                      # Environment variable validation via Zod
│   ├── middleware/
│   │   ├── error-handler.ts            # Global error handler (4-param Express middleware)
│   │   ├── locals.ts                   # res.locals defaults for all views
│   │   └── not-found.ts               # 404 handler
│   ├── modules/
│   │   ├── core/
│   │   │   ├── core.routes.ts          # Mounts home, legal, health and site-level routes
│   │   │   ├── site.controller.ts      # getSitemap, getRobots, getAllTools
│   │   │   ├── health/                 # GET /health — JSON status endpoint
│   │   │   ├── home/                   # GET / and GET /faq
│   │   │   └── legal/                  # GET /kontakt, /ochrana-osobnich-udaju, /podminky-pouziti
│   │   └── tools/
│   │       ├── text/
│   │       │   ├── text.routes.ts      # Mounts text tool routers at /textove-nastroje
│   │       │   ├── pocet-znaku/        # Character / word / sentence / line / normostrana counter
│   │       │   └── prevod-velikosti-znaku/ # Uppercase / lowercase / title / sentence / reverse
│   │       ├── developer/
│   │       │   ├── developer.routes.ts # Mounts developer tool routers at /vyvojarske-nastroje
│   │       │   └── json-validator/     # JSON validator, formatter and minifier
│   │       ├── health/
│   │       │   ├── health.routes.ts    # Mounts health tool routers at /zdravotni-nastroje
│   │       │   └── bmi/                # Adult BMI calculator (WHO classification)
│   │       └── czech/
│   │           ├── czech.routes.ts     # Mounts czech tool routers at /ceske-nastroje
│   │           └── inflation-calculator/ # Czech inflation calculator — real CPI + custom rate
│   └── shared/
│       ├── data/
│       │   ├── faq.ts                  # Shared FAQ items (e.g. aiTransparencyFaq)
│       │   ├── tools.ts                # Tool registry — single source of truth for all tool metadata
│       │   └── tools/
│       │       └── czech/
│       │           └── cpi.ts          # ČSÚ CPI monthly and yearly data (1997–present)
│       ├── types/
│       │   ├── errors.ts               # AppError class, HttpStatus constants, isAppError guard
│       │   ├── faq.ts                  # FaqItem interface
│       │   ├── seo.ts                  # SeoInput and SeoMeta interfaces
│       │   └── toolDetails.ts          # ToolsDetails interface
│       └── utils/
│           ├── catchAsync.ts           # Wrapper for async Express handlers
│           └── seoMeta.ts              # buildSeoMeta() — builds meta/OG/JSON-LD per page
├── views/
│   ├── layouts/
│   │   └── main.pug                    # Shared layout — header, nav, footer, cookie banner
│   ├── partials/
│   │   ├── ad-slot.pug                 # Google AdSense slot (dev placeholder when no client ID)
│   │   ├── nav.pug                     # Site navigation with dropdowns
│   │   ├── tool-faq.pug               # Tool FAQ accordion
│   │   ├── tool-header.pug            # Tool breadcrumb + title + description
│   │   └── tool-related.pug           # Related tools grid
│   └── pages/
│       ├── core/
│       │   ├── home.pug               # Homepage — hero, featured tools, features, FAQ teaser
│       │   ├── vsechny-nastroje.pug   # All tools page — grouped by category
│       │   ├── info/
│       │   │   └── faq.pug            # Full FAQ page
│       │   └── legal/
│       │       ├── contact.pug        # Contact page with Formspree form
│       │       ├── privacy.pug        # Privacy policy (GDPR)
│       │       └── terms.pug          # Terms of use
│       └── tools/
│           ├── tools.pug              # Shared category index page
│           ├── text/
│           │   ├── pocet-znaku.pug
│           │   └── prevod-velikosti-znaku.pug
│           ├── developer/
│           │   └── json-validator.pug
│           ├── health/
│           │   └── bmi.pug
│           └── czech/
│               └── inflation-calculator.pug
├── public/
│   ├── css/
│   │   └── main.css                   # Monochrome design system
│   ├── images/
│   │   └── favicon.ico
│   └── js/
│       ├── main.js                    # Mobile nav, cookie banner, copy button, Formspree redirect
│       └── tools/
│           ├── json-validator.js      # Ace editor integration, no-JS fallback
│           ├── pocet-znaku.js         # Live stat card recalculation on input
│           └── prevod-velikosti-znaku.js # Live case conversion on button click
├── tests/
│   └── e2e/                           # Playwright end-to-end tests (planned)
├── .editorconfig
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions — lint, typecheck, test, build
├── .gitignore
├── .prettierrc
├── .vscode/
│   └── settings.json
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Getting Started

### Requirements

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository, Web-Services is a project name
git clone https://github.com/torres-christopher/Tools-Haven.git
cd Web-Services

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env as needed

# Start the development server
npm run dev
```

The server runs at `http://localhost:3000`.

---

## Scripts

| Script                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Development server with auto-restart (tsx watch) |
| `npm run build`        | Compile TypeScript → dist/                       |
| `npm start`            | Run the compiled production build                |
| `npm run typecheck`    | Type-check without emitting files                |
| `npm test`             | Run all unit and integration tests               |
| `npm run test:watch`   | Tests in watch mode                              |
| `npm run test:e2e`     | Run Playwright end-to-end tests                  |
| `npm run lint`         | ESLint check                                     |
| `npm run lint:fix`     | ESLint with auto-fix                             |
| `npm run format`       | Prettier formatting (src + views)                |
| `npm run format:check` | Prettier check without writing                   |

---

## Configuration

All environment variables are validated at startup via Zod. If a required variable is missing the app crashes immediately with a clear error message rather than failing silently later.

See `.env.example` for the full list:

```bash
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
SITE_NAME=Web Services
GA_MEASUREMENT_ID=        # Google Tag Manager — leave empty for local dev
ADSENSE_CLIENT_ID=        # Google AdSense — leave empty for local dev
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Environment variables in CI are stored as GitHub Actions secrets and variables — never hardcoded in the workflow YAML.

---

## Tools

### Live

| Tool                   | Route                                      | Category  |
| ---------------------- | ------------------------------------------ | --------- |
| Počet znaků            | `/textove-nastroje/pocet-znaku`            | Text      |
| Převod velikosti znaků | `/textove-nastroje/prevod-velikosti-znaku` | Text      |
| JSON validátor         | `/vyvojarske-nastroje/json-validator`      | Developer |
| BMI kalkulačka         | `/zdravotni-nastroje/bmi-kalkulacka`       | Health    |
| Inflační kalkulačka    | `/ceske-nastroje/inflacni-kalkulacka`      | Czech     |

### Planned

See [tools-list.md](./tools-list.md) for the full planned tool list organised by category.

---

## Testing

The project uses a three-layer testing approach:

| Type              | Tool               | Location                                               |
| ----------------- | ------------------ | ------------------------------------------------------ |
| Unit tests        | Vitest             | Co-located next to the file under test (`*.test.ts`)   |
| Integration tests | Vitest + Supertest | Co-located next to the route file (`*.routes.test.ts`) |
| E2E tests         | Playwright         | `tests/e2e/`                                           |

Unit and integration tests live alongside the code they test inside `src/`. Playwright tests live in `tests/e2e/` and are excluded from Vitest.

### Running Tests

```bash
# All unit and integration tests
npm test

# Watch mode during development
npm run test:watch

# End-to-end tests
npm run test:e2e
```

### Current Coverage

| Module                    | Unit tests | Integration tests |
| ------------------------- | ---------- | ----------------- |
| `shared/utils/seoMeta.ts` | ✓          | —                 |
| `pocet-znaku`             | ✓          | ✓                 |
| `prevod-velikosti-znaku`  | ✓          | ✓                 |
| `json-validator`          | ✓          | ✓                 |
| `bmi`                     | ✓          | ✓                 |
| `inflation-calculator`    | ✓          | ✓                 |
| `health` endpoint         | —          | ✓                 |

---

## CI/CD

GitHub Actions runs on every pull request and push to `main`.

### CI Pipeline (`.github/workflows/ci.yml`)

Steps in order:

1. Checkout repository
2. Setup Node 24
3. `npm ci` — clean install from lockfile
4. `npm run lint` — ESLint check
5. `npm run typecheck` — TypeScript type check
6. `npm test` — all unit and integration tests
7. `npm run build` — confirm production build compiles

Environment variables are injected from GitHub Actions secrets and variables.

### Branch Strategy

| Branch      | Purpose                                  |
| ----------- | ---------------------------------------- |
| `main`      | Stable code, protected, only accepts PRs |
| `feature/*` | New functionality                        |
| `fix/*`     | Bug fixes                                |
| `chore/*`   | Config, tooling, non-code changes        |

Direct pushes to `main` are blocked by branch protection rules. Every change goes through a pull request and CI must be green before merging.

### Deployment

Hosted on Rosti.cz. Deployment is triggered automatically on merge to `main` via the Rosti GitHub Actions workflow. The app runs on port 8080 in production.

---

## Contributing

This is a personal portfolio project and is not currently open to external contributions.

---

## Licence

MIT
