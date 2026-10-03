# shipwithatlas

Public source for [shipwithatlas.com](https://shipwithatlas.com) — the marketing site for
[Atlas](https://github.com/blitzcraftlabs/atlas), built as a genuine Atlas consumer workspace.

- **[blitzcraftlabs/atlas](https://github.com/blitzcraftlabs/atlas)** — the open-source frontend platform (CLI, contracts, generators, upgrades).
- **blitzcraftlabs/shipwithatlas** (this repository) — the production website that dogfoods Atlas.

Generated from Atlas **1.2.2** via the published npm CLI (`@blitzcraftlabs/atlas`). Your application
code lives here; Atlas does not host this deployment.

## Requirements

- Node.js **22+**
- pnpm **10+**

## Installation

```bash
pnpm install
```

Copy environment variables when you need analytics, auth, or other integrations:

```bash
cp apps/web/.env.example apps/web/.env.local
```

## Development

```bash
pnpm dev
```

The marketing site is served from `apps/web` (default Next.js app on port 3000).

## Production build

```bash
pnpm build
pnpm start
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Atlas Doctor

Pin the same Atlas version as `atlas.config.json`:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor
pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json
```

Doctor validates architecture contracts, boundaries, and upgrade evidence for this consumer.

## Repository structure

| Path | Purpose |
|------|---------|
| `apps/web/` | Next.js App Router application (`shipwithatlas.com`) |
| `apps/web/src/components/landing/` | Homepage sections |
| `apps/web/src/components/marketing/` | Shared marketing chrome, diagrams, and interactions |
| `apps/web/src/lib/marketing/` | Marketing copy, fixtures, and Shiki highlighting |
| `packages/ui/` | Atlas source-owned design system (`@atlas/ui`) |
| `packages/consent/` | Consent primitives used by the web app |
| `docs/how-we-build/` | Consumer documentation shipped with Atlas |

Marketing-specific styling lives in `apps/web/src/app/atlas-marketing.css` and is scoped under
`.atlas-marketing` so it does not override shared Atlas UI tokens globally.

## Contributing

Issues and pull requests are welcome. Keep marketing changes in `apps/web` unless you are extending
shared Atlas packages intentionally. Run the quality checks above before opening a PR.

## License

Apache-2.0 — see [LICENSE](LICENSE).
