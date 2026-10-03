# Consumer tooling

> Optional development and quality tooling for generated Atlas applications.

The default `atlas init` baseline is practical: Doctor, lint, typecheck, unit tests, production
build, and local Lighthouse/bundle commands. Heavier tooling is **opt-in** through `atlas enable`.
Atlas publishing, release rehearsal, internal governance, and BlitzCraft runners stay
maintainer-only.

## Default baseline (always present)

| Capability | How |
| ---------------------- | ------------------------------------------------------------ |
| Atlas Doctor | `pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor` |
| Lint / typecheck / test / build | `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` |
| Consumer GitHub CI | `.github/workflows/ci.yml` (GitHub-hosted Ubuntu) |
| Local performance | `pnpm perf:lhci`, `pnpm perf:analyze` (no CI workflows) |
| OpenAPI client | `pnpm api:gen` |

Playwright E2E scripts exist on `@atlas/web` but are omitted from default CI until you install
browsers and run the app.

## Opt-in capabilities

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable list --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable <id> --dry-run --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable <id>
```

| Id | What it adds | Notes |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `docs` | Consumer AGENTS.md and workflow docs | Already generated at init; use to adopt on existing apps |
| `storybook` | `.storybook`, interaction + axe tests | Heavier; restore UI scripts/devDependencies |
| `visual` | Playwright screenshot baselines + Docker comparison CI | Requires `storybook`. Compare only in `mcr.microsoft.com/playwright:v<playwright-version>-noble` via `pnpm --filter @atlas/ui test:visual:docker`. Do not recapture on a laptop. |
| `perf-ci` | Lighthouse + bundle GitHub workflows | Local perf commands already exist |
| `security` | `pnpm audit` script + workflow | Not Gitleaks/SBOM/governance. High/critical findings fail unless a documented advisory/version/path exception matches every finding path. |
| `updates` | Dependabot for npm and Actions | Consumer-owned; swap for Renovate if you want |
| `coverage` | Critical-subsystem coverage floors | Auth, API, UI form infrastructure |
| `hooks` | Husky + lint-staged | No Docker/Gitleaks requirement |
| `cursor` | Cursor rule + skill adapters | Delegates to AGENTS.md and this CLI |
| `docker` | Compose scaffold and infra example | Dockerfile and `.dockerignore` already ship with `atlas init`. Atlas needs no database by default |

After `storybook`, install Playwright browsers for interaction and accessibility tests:

```bash
pnpm install
pnpm --filter @atlas/ui exec playwright install
```

After `visual`, shipped PNG baselines are compared only inside
`mcr.microsoft.com/playwright:v<playwright-version>-noble`:

```bash
pnpm --filter @atlas/ui build-storybook
pnpm --filter @atlas/ui test:visual:docker
```

Host Chromium will not match those PNGs (font metrics differ). Do not use `--update-snapshots` to
silence a host or CI failure. To recapture after an intentional UI change, run the generated
**Update Visual Baselines** workflow (or `node packages/ui/scripts/run-visual-in-playwright-docker.mjs --update`),
review every PNG, then commit. The comparison workflow never updates snapshots.

The Docker Compose capability is opt-in. Root `Dockerfile` and `.dockerignore` already ship with
`atlas init` and use `pnpm install --frozen-lockfile`. Commit `pnpm-lock.yaml` before building the
image. Customized Dockerfiles are never overwritten by `atlas upgrade`. Lighthouse CI accepts an
optional `LHCI_GITHUB_APP_TOKEN` secret. The generated Lighthouse workflow installs Chrome and
sets `CHROME_PATH`. Local `pnpm perf:lhci` needs Chrome or Chromium on `PATH` or `CHROME_PATH`.

Enablement **does not overwrite customized files**. Existing destinations that differ from the
packaged asset are reported as `conflict` and left untouched. Identical files are skipped.
`package.json` scripts and devDependencies are merged only when the key is absent or already
matches.

## Existing-consumer adoption

Published Atlas **1.1.0 does not contain** `atlas enable`. Optional tooling is not installed by
`atlas upgrade --to 1.1.0` or any same-version upgrade. Enable commands pin `pnpm dlx @blitzcraftlabs/atlas@1.2.2` — a CLI
release that includes `enable`, which may differ from `platform.baseline.atlasVersion` used for
Doctor and generate (`pnpm dlx @blitzcraftlabs/atlas@1.2.2`).

1. Optionally apply platform upgrades with a supported `atlas upgrade --to <platform-version>` using
   whatever CLI you already use for Doctor. That step does not add Storybook, coverage, or other
   opt-in files.
2. `pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable docs --dry-run --json` — replace `AGENTS.md` (and related workflow docs)
   only when the file is an unmodified copy shipped by a known published CLI. Customized docs and
   any other content are reported as `conflict` and left untouched.
3. Enable each extra capability you want. Review conflicts before deleting or merging files.
4. Run `pnpm install` after enables that add dependencies (Storybook, hooks).
5. Run the capability's `validationCommand` from `enable list --json`. File presence is not
   proof that the tool works.
6. Re-run `pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor --json` and `pnpm lint && pnpm typecheck && pnpm test`.

## Maintainer-only (not offered here)

- Atlas npm publication and release rehearsal
- BlitzCraft / self-hosted runner profiles
- `pnpm governance:check`, `pnpm docs:check`, `pnpm template:check`
- Gitleaks history fixtures and workflow-pin enforcement used in the Atlas repo
- The entire `apps/reference` harness

## Related docs

- [Agent workflow](agents.md)
- [Testing](testing.md)
- [Reference patterns](reference-patterns.md)
- [Upgrades](upgrades.md)
