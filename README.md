# Playwright Assignment — SauceDemo

End-to-end test for the SauceDemo cart workflow built with Playwright + TypeScript.

## Flow under test

1. User logs in on the login page (via a setup project, once per run).
2. User adds a product on the inventory page.
3. User navigates to the cart page and the product is verified to be present.

## Stack & conventions

- **TypeScript** — all variables explicitly typed; Playwright transpiles TS natively.
- **Page Object Model** — pages under `src/pages/`, each extends `BasePage`.
- **Fixtures** — `src/fixtures/pages.fixture.ts` exposes page objects to tests, keeping specs lean (DRY).
- **Authentication strategy** — a dedicated `setup` project logs in once and persists `storageState` to `playwright/.auth/user.json`. All test projects depend on `setup` and start already authenticated, so specs focus only on what they assert.
- **Secrets via `dotenv`** — all credentials and URLs live in `.env` (gitignored). A typed `env` module validates required variables at startup.

## Project layout

```
.
├── playwright.config.ts         # projects: setup -> chromium/firefox with storageState
├── .env.example                 # template for the real .env
├── src/
│   ├── config/env.ts            # typed, validated env loader (dotenv)
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts
│   └── fixtures/
│       └── pages.fixture.ts     # test + expect with page-object fixtures
└── tests/
    ├── auth.setup.ts            # one-time login -> storageState
    └── cart.spec.ts             # the workflow test
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env   # then edit if needed
```

## Run

```bash
npm test                 # all projects
npm run test:chromium    # Chromium only
npm run test:headed      # headed mode
npm run test:ui          # Playwright UI
npm run report           # open last HTML report
```
