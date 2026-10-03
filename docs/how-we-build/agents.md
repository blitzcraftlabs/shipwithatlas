# Atlas agent workflow

> **Canonical workflow for humans and coding agents in a generated Atlas consumer.**

This file is generated for a consumer workspace. It is not the Atlas platform monorepo guide.

Coding agents must use the same executable contracts as humans: project contract, CLI generators,
Doctor, upgrade planning, and standard engineering validation. Vendor-specific guidance (Cursor
rules, skills) is a thin adapter — never an alternate architecture.

See also: [Atlas CLI](cli.md), [Atlas Doctor](doctor.md), [Upgrades](upgrades.md),
[Consumer tooling](consumer-tooling.md), [Architecture ownership](architecture-ownership.md).

---

## Source-of-truth hierarchy

When guidance conflicts, resolve in this order:

1. `atlas.config.json` / resolved Atlas project contract (`@atlas/project`)
2. Atlas CLI generators and command metadata
3. `atlas doctor` diagnostics
4. `atlas upgrade` plans and migration metadata
5. ADRs and canonical documentation in `docs/how-we-build/` and `docs/adr/`
6. `AGENTS.md` workflow and judgment guidance
7. Vendor-specific adapters (for example `.cursor/rules`, `.cursor/skills`)

If a Cursor rule contradicts Doctor or the resolved project contract, the Cursor rule is wrong.

---

## Generic agent entry point

Start from repository root **`AGENTS.md`**, then:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json
```

Do **not** run `pnpm --filter @blitzcraftlabs/atlas build` or a workspace-linked `atlas` binary —
those commands exist only in the Atlas platform checkout. This generated consumer invokes the
published CLI.

Nested `AGENTS.md` files (for example under `apps/web/`) scope local application constraints.
They do not replace the root workflow.

---

## Discover → Plan → Implement → Validate → Review

### Discover

1. Read root `AGENTS.md` and this document.
2. Run `pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json`.
3. Inspect relevant ADRs and `docs/how-we-build/` references returned by context.
4. Inspect nearby examples under `apps/web/src/app/examples/` before inventing patterns.
5. For settings, permission-aware CRUD, and diagnostics recipes, see [reference-patterns.md](reference-patterns.md).

### Plan

| Category | Approach |
| ---------------------- | ----------------------------------------------------------- |
| Structural scaffolding | Use `atlas generate` when a generator exists |
| Product logic | Normal source editing in consumer-owned surfaces |
| Optional quality tooling | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable <capability>` — never a silent upgrade write |
| Ownership boundaries | Contract + manifest + Doctor — not duplicated prose |
| Validation | Doctor + lint + typecheck + tests (+ build/E2E when needed) |

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate list --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable list --json
```

### Implement

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate feature <name> [--query] [--mutation] [--form] [--tests]
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate page <route>
```

Then implement product behavior in generated shells.

Do not overwrite independent or consumer-owned files based on assumptions. `atlas enable` skips
customized destinations and reports conflicts.

### Validate

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor --json
pnpm lint && pnpm typecheck && pnpm test
```

Run additional checks from `atlas context --json` → `validation.recommended` when your change
requires them. That list is filtered to commands this workspace actually owns.

Doctor validates Atlas architecture. It does not replace lint, typecheck, tests, or build.

### Review

Before claiming completion:

- Contract and ownership compliance
- No unintended generated drift
- Doctor result (if architecture-sensitive)
- Test evidence for the change scope

---

## Responding to Doctor diagnostics

| Class | Examples | Agent behavior |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| Mechanical / local | Stale generated OpenAPI client | Run canonical generator (`pnpm api:gen`); rerun Doctor |
| Architectural conflict | Ownership or boundary violation | Do not overwrite consumer-owned files; inspect contract/docs; surface conflict |
| Consumer / product decision | Independent wiring differs from baseline | Do not normalize automatically |
| Unknown / unsafe | Ambiguous ownership | Stop and ask for human judgment |

**Do not** encode “always fix every Doctor diagnostic.” Auto-fix only when remediation is
deterministic and inside authorized change scope.

---

## Upgrade and migration workflow

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 upgrade --to <version> --dry-run --json
```

Do not infer blocking from `category` alone. The upgrade command decides whether an upgrade is
safe, blocked, manual, or actionable from plan items (`conflict`), result `status`, and
unresolved migration or package work.

Optional tooling (Storybook, visual tests, performance CI, security workflows, Dependabot, coverage
floors, Git hooks, Cursor adapters, Docker) is **not** applied by `atlas upgrade`. Adopt those
with `pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable <capability>` after reviewing the dry-run.

See [upgrades.md](upgrades.md) and [consumer-tooling.md](consumer-tooling.md).

---

## Machine interfaces summary

| Need | Command |
| -------------------- | -------------------------------------------------------------- |
| Resolved project state | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json` |
| Generator inventory | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate list --json` |
| Architecture validation | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor --json` |
| Upgrade planning | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 upgrade --to <version> --dry-run --json` |
| Optional tooling | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable list --json` |

Do not scrape Markdown or CLI help prose for critical structural state when these commands exist.
