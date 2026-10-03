# Reference examples

> Minimal patterns you can copy when building on Atlas.

This generated consumer ships the starter `/examples` route group. It does **not** include the
Atlas `apps/reference` evaluation harness.

## Purpose

The `/examples` route group is intentionally small:

- **Data fetching** — React Query hooks, query key factories, loading/empty/error/success states
- **Forms** — Zod validation, `useZodForm`, and server field error mapping

Delete `app/examples/`, `features/examples/`, and `app/api/examples/` when you start building
your product.

## Routes

| Page | Route | What it shows |
| -------- | ---------------- | ---------------------------------------------------------- |
| Overview | `/examples` | Links to reference pages |
| Data states | `/examples/data` | Mode switching via `?mode=success\|empty\|error\|slow` |
| Forms | `/examples/form` | Create item with client + server validation |

## API

In-memory mock routes (reset on server restart):

- `GET /api/examples/items?mode=...`
- `POST /api/examples/items`
- `PATCH /api/examples/items/[id]`

## Settings, CRUD, and diagnostics

Do not copy `apps/reference` into this repository. For production-shaped settings,
permission-aware CRUD, and platform diagnostics, follow
[reference-patterns.md](reference-patterns.md). Scaffold structure with:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate feature <name> --query --mutation --form --tests
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate page settings
```

Simulated authentication, reset endpoints, and failure-injection controls stay confined to the Atlas
repository's development-only reference harness. They are not an enablement target.

## Related docs

- [API & data fetching](api.md)
- [Testing](testing.md)
- [Folder structure](folder-structure.md)
- [Consumer tooling](consumer-tooling.md)
