# Moulin Rouge project


## Development

Based on vitejs + reactjs + typescript.

### Requirements

- node 18.11.0 (`nvm install v18.11.0`)
- pnpm (see [related instructions](https://pnpm.io/installation))
- playwright browsers: `npx playwright install`

### Run dev server

    pnpm run dev

### Run unit tests

    pnpm test

### Run Playwright tests

    pnpm dlx playwright test

Use option `--trace on` to get details about failing execution.

### Generate new playwright tests

    pnpm dlx playwright codegen
