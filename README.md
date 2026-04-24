# Playwright Assignment — SauceDemo

End-to-end test for the SauceDemo built with Playwright.

## Stack & conventions

- **Page Object Model** — pages under `src/pages/`, each extends `BasePage`.
- **Fixtures** — `src/fixtures/pages.fixture.ts` exposes page objects to tests, keeping specs lean (DRY).
- **Authentication strategy** — a dedicated `setup` project logs in once and persists `storageState` to `playwright/.auth/user.json`. All test projects depend on `setup` and start already authenticated, so specs focus only on what they assert.
- **Secrets via `dotenv`** — all credentials and URLs live in `.env` (gitignored). A typed `env` module validates required variables at startup.

## Project layout

```
.
├── playwright.config.ts        
├── .env.example                 
├── src/
│   ├── config/env.ts            
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts
│   └── fixtures/
│       └── pages.fixture.ts     
└── tests/
    ├── auth.setup.ts            
    └── cart.spec.ts             
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
npm run test:headed      # headed mode
npm run test:ui          # Playwright UI
npm run report           # open last HTML report
```
