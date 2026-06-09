# Tools Haven

Free online utility tools - text editing, calculators, developer tools, and Czech local data.

> **Project status:** Active development. Live at [tools-haven.com](https://tools-haven.com).

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [URL Structure](#url-structure)
- [Tools](#tools)
- [i18n](#i18n)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Contributing](#contributing)

---

## About

Tools Haven is a multilingual utility website (Czech-first, Slovak in progress) providing free online tools. Users can work with their data without worrying about it being stored, tracked, or sold - everything runs in memory and is discarded immediately after the result is returned.

The project is also a personal portfolio piece built around a deliberate architectural principle: a single extensible platform on which new tools can be added without changing the core. Rather than maintaining multiple small projects, Tools Haven serves as a living demonstration of full-stack architecture, TypeScript discipline, i18n design, and production deployment - all in one place that grows over time.

---

## Tech Stack

| Layer                    | Technology                                            |
| ------------------------ | ----------------------------------------------------- |
| Runtime                  | Node.js 20+ (CI on Node 24)                           |
| Framework                | Express 4                                             |
| Language                 | TypeScript 5 (NodeNext modules)                       |
| Templates                | Pug                                                   |
| Validation               | Zod 3                                                 |
| i18n                     | i18next + i18next-http-middleware + i18next-fs-backend |
| Unit / integration tests | Vitest + Supertest                                    |
| E2E tests                | Playwright                                            |
| Linting                  | ESLint 9 flat config                                  |
| Formatting               | Prettier + @prettier/plugin-pug                       |
| CI                       | GitHub Actions                                        |
| Hosting                  | Rosti.cz                                              |

---

## Project Structure

```
Tools-Haven/
├── src/
│   ├── app.ts                          # Express app - middleware stack, router registration
│   ├── server.ts                       # HTTP server, graceful shutdown, process handlers
│   ├── config/
│   │   ├── env.ts                      # Environment variable validation via Zod
│   │   └── i18n.ts                     # i18next initialisation
│   ├── middleware/
│   │   ├── error-handler.ts            # Global error handler (4-param Express middleware)
│   │   ├── locals.ts                   # res.locals defaults + nonce generation for CSP
│   │   └── not-found.ts                # 404 handler
│   ├── modules/
│   │   ├── core/
│   │   │   ├── core.routes.ts          # Mounts lang router + site-level routes
│   │   │   ├── site.controller.ts      # getSitemap, getRobots, getAllTools
│   │   │   ├── health/                 # GET /health - JSON status endpoint
│   │   │   ├── home/                   # GET /:lang and GET /:lang/faq
│   │   │   └── legal/                  # GET /:lang/contact, /privacy, /terms
│   │   └── tools/
│   │       ├── lang.router.ts          # Validates :lang param, mounts category routers
│   │       ├── text/
│   │       │   ├── text.routes.ts
│   │       │   ├── pocet-znaku/        # Character / word / sentence / line / normostrana counter
│   │       │   └── prevod-velikosti-znaku/ # Case converter
│   │       ├── developer/
│   │       │   ├── developer.routes.ts
│   │       │   └── json-validator/     # JSON validator, formatter and minifier
│   │       ├── health/
│   │       │   ├── health.routes.ts
│   │       │   └── bmi/                # Adult BMI calculator (WHO classification)
│   │       └── local/
│   │           ├── local.routes.ts
│   │           └── inflation-calculator/ # Czech inflation calculator - real CPI + custom rate + CAGR
│   └── shared/
│       ├── data/
│       │   ├── faq.ts                  # Shared FAQ items
│       │   ├── tools.ts                # Tool registry - single source of truth for all tool metadata
│       │   └── tools/czech/
│       │       └── cpi.ts              # CPI monthly and yearly data (1997-present)
│       ├── types/
│       │   ├── errors.ts               # AppError class, HttpStatus constants, isAppError guard
│       │   ├── faq.ts                  # FaqItem interface
│       │   ├── seo.ts                  # SeoInput and SeoMeta interfaces
│       │   ├── supportedLocale.ts      # SupportedLocale type + supportedLocales array
│       │   └── toolDetails.ts          # ToolsDetails interface
│       └── utils/
│           ├── buildToolPath.ts        # Derives /${lang}${categoryPath}/${slug[lang]}
│           ├── buildToolSeoInput.ts    # Builds SeoInput from tool + lang
│           ├── catchAsync.ts           # Wrapper for async Express handlers
│           ├── findTools.ts            # findToolById() + findToolBySlug()
│           └── seoMeta.ts              # buildSeoMeta() - builds meta/OG/JSON-LD per page
├── locales/
│   ├── cs/
│   │   ├── common.json                 # Nav, footer, layout, cookie, legal, home, faq strings
│   │   └── tools.json                  # Tool-specific strings
│   └── sk/
│       ├── common.json                 # Slovak translations
│       └── tools.json                  # Slovak tool strings
├── views/
│   ├── layouts/
│   │   └── main.pug                    # Shared layout - header, nav, footer, cookie banner
│   ├── partials/
│   │   ├── ad-slot.pug                 # Google AdSense slot (dev placeholder when no client ID)
│   │   ├── nav.pug                     # Site navigation with dropdowns
│   │   ├── tool-faq.pug                # Tool FAQ accordion
│   │   ├── tool-header.pug             # Tool breadcrumb + title + description
│   │   └── tool-related.pug            # Related tools grid
│   └── pages/
│       ├── core/
│       │   ├── home.pug
│       │   ├── vsechny-nastroje.pug
│       │   ├── info/faq.pug
│       │   └── legal/
│       └── tools/
│           ├── tools.pug               # Shared category index page
│           ├── text/
│           ├── developer/
│           ├── health/
│           └── local/
├── public/
│   ├── css/main.css                    # Monochrome design system
│   ├── images/
│   └── js/
│       ├── main.js                     # Mobile nav, cookie banner, copy button
│       └── tools/
├── tests/
│   └── e2e/                            # Playwright end-to-end tests (planned)
├── .env.example
├── .github/workflows/ci.yml
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
# Clone the repository
git clone https://github.com/torres-christopher/Tools-Haven.git
cd Tools-Haven

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
| `npm run build`        | Compile TypeScript to dist/                      |
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

`.env.example`:

```bash
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
SITE_NAME=Tools Haven
GTM_CONTAINER_ID=           # Google Tag Manager - leave empty for local dev
ADSENSE_CLIENT_ID=          # Google AdSense - leave empty for local dev
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## URL Structure

All pages are served under a language prefix. The root `/` redirects to `/:lang` based on the `Accept-Language` header, falling back to `/cs`.

```
GET /                    redirect to /:lang
GET /:lang               homepage
GET /:lang/tools         all tools
GET /:lang/faq           FAQ
GET /:lang/contact       contact
GET /:lang/privacy       privacy policy
GET /:lang/terms         terms of use
GET /sitemap.xml         dynamic sitemap
GET /robots.txt          dynamic robots.txt
GET /health              JSON status endpoint

Tool routes:
  /:lang/text/:slug
  /:lang/developer/:slug
  /:lang/health/:slug
  /:lang/local/:slug
```

Supported locales: `cs`, `sk`. Slovak tools are currently disabled pending translations.

---

## Tools

### Live

| Tool                   | URL                               | Category  |
| ---------------------- | --------------------------------- | --------- |
| Pocet znaku            | `/cs/text/pocet-znaku`            | Text      |
| Prevod velikosti znaku | `/cs/text/prevod-velikosti-znaku` | Text      |
| JSON validator         | `/cs/developer/json-validator`    | Developer |
| BMI kalkulacka         | `/cs/health/bmi-kalkulacka`       | Health    |
| Inflacni kalkulacka    | `/cs/local/inflacni-kalkulacka`   | Local     |

---

## i18n

The project uses i18next with two namespaces:

- `tools` (default) - tool-specific strings; no prefix needed in tool views: `t('pocetZnaku.statRaw')`
- `common` - shared UI strings; prefix required in all other templates: `t('common:nav.allTools')`

Translation files live in `locales/{lang}/common.json` and `locales/{lang}/tools.json`.

---

## Testing

| Type              | Tool               | Location                                               |
| ----------------- | ------------------ | ------------------------------------------------------ |
| Unit tests        | Vitest             | Co-located next to the file under test (`*.test.ts`)   |
| Integration tests | Vitest + Supertest | Co-located next to the route file (`*.routes.test.ts`) |
| E2E tests         | Playwright         | `tests/e2e/`                                           |

```bash
# All unit and integration tests
npm test

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e
```

### Current Coverage

| Module                    | Unit tests | Integration tests |
| ------------------------- | ---------- | ----------------- |
| `shared/utils/seoMeta.ts` | ✓          | -                 |
| `pocet-znaku`             | ✓          | ✓                 |
| `prevod-velikosti-znaku`  | ✓          | ✓                 |
| `json-validator`          | ✓          | ✓                 |
| `bmi`                     | ✓          | ✓                 |
| `inflation-calculator`    | ✓          | ✓                 |
| `health` endpoint         | -          | ✓                 |

---

## CI/CD

GitHub Actions runs on every pull request and push to `main`.

### Pipeline steps

1. Checkout repository
2. Setup Node 24
3. `npm ci`
4. `npm run lint`
5. `npm run typecheck`
6. `npm test`
7. `npm run build`

GitHub repository variables: `NODE_ENV`, `PORT`, `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`, `SITE_NAME`, `SITE_URL`, `GTM_CONTAINER_ID`
GitHub secrets: `ADSENSE_CLIENT_ID`, `ROSTI_DEPLOY_SSH_KEY`

### Branch strategy

| Branch      | Purpose                           |
| ----------- | --------------------------------- |
| `main`      | Stable, protected, PRs only       |
| `feature/*` | New functionality                 |
| `fix/*`     | Bug fixes                         |
| `chore/*`   | Config, tooling, non-code changes |

### Deployment

Hosted on Rosti.cz. Deployed via SFTP/SSH using an internal deployment reference document.

---

## Contributing

This is a personal portfolio project and is not currently open to external contributions.

---

## Licence

MIT