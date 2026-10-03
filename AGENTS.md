# Atlas — Agent Guide

This is **shipwithatlas-bootstrap**, an Atlas application generated from Atlas 1.2.2.

Product code lives in this repository. Atlas does not host the application. Discover project state
from the published CLI — do not assume Atlas monorepo workspaces such as the evaluation harness or
CLI source package exist here.

Detailed workflow: [docs/how-we-build/agents.md](docs/how-we-build/agents.md)

---

## Discover the current project

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 context
pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json
```

`atlas context` resolves the project contract, ownership manifest, generators, Doctor
capabilities, upgrade semantics, validation commands, and documentation references.

---

## Structural scaffolding

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate list --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate feature <name> [--query] [--mutation] [--form] [--tests]
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate page <route>
```

Product logic inside generated shells is normal source editing.

---

## Validate architecture

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor
pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor --json
```

Then run standard engineering validation:

```bash
pnpm lint && pnpm typecheck && pnpm test
```

`atlas doctor` checks Atlas-specific contract and architecture drift. It does not replace lint,
typecheck, tests, or build. See [doctor.md](docs/how-we-build/doctor.md).

Additional checks when relevant: `pnpm build`, `pnpm validate:env`, Playwright E2E — see
`validation.recommended` in `pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json`. Maintainer-only Atlas repo commands
(`pnpm template:check`, `pnpm governance:check`, `pnpm docs:check`) are not part of this
workspace.

---

## Upgrades and migrations

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 upgrade --to <version> --dry-run --json
```

Treat `merge-required`, `manual-review`, and `security-critical` conflicts as blocking for
silent auto-resolution. See [upgrades.md](docs/how-we-build/upgrades.md).

---

## Optional tooling

The default generated baseline is Doctor, lint, typecheck, tests, and production build.

Heavier quality tooling is opt-in and consumer-owned after enablement:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable list --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable storybook --dry-run
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable storybook
```

See [consumer tooling](docs/how-we-build/consumer-tooling.md). Published Atlas 1.1.0 does **not**
include `atlas enable`. Invoke a CLI release that contains the command (`pnpm dlx @blitzcraftlabs/atlas@1.2.2`); that
CLI version may differ from `platform.baseline.atlasVersion`. `atlas upgrade` does not install
optional tooling. Enablement skips customized files instead of overwriting them.

---

## Documentation

Canonical conventions in this repository:

| Topic | Location |
| ----------------- | -------------------------------------------------------------------------- |
| Agent workflow | [docs/how-we-build/agents.md](docs/how-we-build/agents.md) |
| Atlas CLI | [docs/how-we-build/cli.md](docs/how-we-build/cli.md) |
| Consumer tooling | [docs/how-we-build/consumer-tooling.md](docs/how-we-build/consumer-tooling.md) |
| Reference patterns | [docs/how-we-build/reference-patterns.md](docs/how-we-build/reference-patterns.md) |
| Project contract | [docs/how-we-build/atlas-contract.md](docs/how-we-build/atlas-contract.md) |
| Authorization | [docs/how-we-build/authorization.md](docs/how-we-build/authorization.md) |
| API & React Query | [docs/how-we-build/api.md](docs/how-we-build/api.md) |
| Testing | [docs/how-we-build/testing.md](docs/how-we-build/testing.md) |

Public Atlas docs: https://github.com/blitzcraftlabs/atlas/blob/main/docs/public/README.md

---

## Workspace map

```
shipwithatlas-bootstrap/
├── apps/web/           # Product application
├── packages/ui/        # @atlas/ui source
├── packages/consent/   # @atlas/consent source
├── packages/config/    # shared lint/ts/jest config
├── openapi/            # OpenAPI specification
└── docs/how-we-build/  # Architecture documentation
```

This generated consumer does **not** include the Atlas evaluation harness or the published CLI
source workspace. Simulated authentication, reset endpoints, and failure-injection controls from the
Atlas reference harness are not part of this workspace.

---

## When to stop and ask

- Ownership is ambiguous (synced vs independent vs product-owned)
- Doctor reports architectural conflict on consumer-owned paths
- Upgrade dry-run contains `merge-required` or `manual-review` items
- Change touches shared infrastructure (`packages/ui`, core `lib/`) without clear scope
- Generator cannot represent the required structural shape

---

## Vendor adapters

Cursor rules/skills are optional conveniences (`pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable cursor`). They must delegate to this
guide and the CLI. Generic `AGENTS.md`-compatible agents are the portable path.

---

## Judgment rules (brief)

- Prefer existing Atlas components and nearby patterns
- No raw `fetch()` in UI layers — use `@/lib/api`
- No direct `process.env` in application code — use `@/config`
- No cross-feature imports — extract to `lib/` if needed
- No business logic in `app/` route files
- Preserve accessibility and responsive layout
- Keep changes focused — no unrelated refactors
