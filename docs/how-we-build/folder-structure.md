# Folder structure

> Where code lives in this generated consumer workspace.

This document describes **shipwithatlas**, not the Atlas platform monorepo. The Atlas
evaluation harness (`apps/reference`) and CLI source (`packages/cli`) are not part of this
repository.

## Workspace layout

```
shipwithatlas/
├── apps/
│   └── web/                    # Product application (@atlas/web)
│       ├── src/
│       │   ├── app/            # Next.js App Router pages & routes
│       │   ├── components/     # Shared app-level components
│       │   ├── features/       # Product + example feature modules
│       │   ├── lib/            # Shared utilities & infrastructure
│       │   ├── providers/      # React context providers
│       │   └── schemas/        # Zod validation schemas
│       ├── e2e/                # Playwright E2E tests
│       └── scripts/            # Build & validation scripts
├── packages/
│   ├── ui/                     # Shared UI component library
│   ├── consent/                # Optional consent package
│   └── config/                 # Shared ESLint / TypeScript / Jest config
├── docs/
│   ├── how-we-build/           # Architecture documentation
│   └── adr/                    # Architecture Decision Records
├── openapi/                    # OpenAPI specification
└── .github/workflows/ci.yml    # Consumer-owned GitHub-hosted quality baseline
```

`atlas init` writes `.github/workflows/ci.yml`. It is not Atlas maintainer CI. Optional
workflows (performance, security) are added only through `atlas enable`.

## `apps/web/src/app/`

Next.js App Router pages and API routes.

**Rules:**

- Pages and layouts only — no business logic
- Use route groups `(folder)` for shared layouts
- API routes can use `fetch()` directly (they are API boundaries)
- Do not put reusable components here

Starter `app/examples/` routes are removable pattern pages. See [examples.md](examples.md).

## `apps/web/src/features/`

Product feature modules. Use `atlas generate feature` for structural shells. Do not import across
features; extract shared code to `src/lib/`.

## `packages/ui`

Source-owned design system. Storybook, visual regression, and Playwright story tests are **not**
installed by default. Enable them with `atlas enable storybook` (and `atlas enable visual` if
you want screenshot baselines).

See [consumer-tooling.md](consumer-tooling.md) and [architecture-ownership.md](architecture-ownership.md).
