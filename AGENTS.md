# Repository instructions

This is a Nuxt 4 landing page deployed to Cloudflare Pages.

## Tooling

- Use pnpm 11; never npm or yarn.
- Install with `pnpm install --frozen-lockfile`.
- Run `pnpm lint`, `pnpm test`, and `pnpm build` before opening a PR.
- Use conventional commit messages and feature branches; never push directly to `main`.

## Project conventions

- Follow the global TypeScript, Vue/Nuxt, and Weburz CTO guidelines.
- Keep components stateless where practical and put shared behavior in composables.
- Use arrow functions and reusable `Intl.DateTimeFormat` instances.
- Do not hand-edit generated files. Lockfile changes must come from pnpm.
- Keep visual changes aligned with `designs/design.pen`.
- Runtime configuration is documented in `.env.example`; never commit `.env` files.

## Structure

- `app/`: pages, components, composables, plugins, and styles.
- `server/`: API routes, middleware, and utilities.
- `tests/`: Vitest tests.
- `.github/workflows/qa.yml`: pull-request and main-branch checks.
