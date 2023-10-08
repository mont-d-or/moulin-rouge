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

Make sure the server is up and running, then run:

    pnpm playwright test

Options:
- `--trace on` to get details about failing execution.
- `--ui` to run the test from the UI and generate execution video.

### Generate new playwright tests

    pnpm dlx playwright codegen

### Update browsers after playwright update

    pnpm exec playwright install

### Update local pnpm version

    pnpm add -g @pnpm/exe

