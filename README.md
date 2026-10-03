# shipwithatlas-bootstrap

This project was generated from Atlas 1.2.2.

The generated application stays in this repository. Atlas does not host your application.

## Getting started

```bash
pnpm install
pnpm dev
```

## Atlas CLI

Generated projects do not include an `atlas` package script. Pin the published CLI:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.2.2 doctor
pnpm dlx @blitzcraftlabs/atlas@1.2.2 context --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate list --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 upgrade --to <version> --dry-run --json
pnpm dlx @blitzcraftlabs/atlas@1.2.2 enable list --json
```

Optional Storybook, visual tests, performance CI, security auditing, Dependabot, coverage floors,
Git hooks, Cursor adapters, and Docker Compose are **opt-in**. See
`docs/how-we-build/consumer-tooling.md`. Enablement does not overwrite customized files.

Published Atlas 1.1.0 does **not** include `atlas enable`. Invoke a CLI release that contains the
command; that CLI version may differ from `platform.baseline.atlasVersion`. `atlas upgrade`
does not install optional tooling.

Existing apps generated from an older CLI should run `enable docs` only against a known unmodified
shipped `AGENTS.md` copy. Customized agent docs are left untouched.

## Continuous integration

`.github/workflows/ci.yml` is generated with this project and is source-owned afterward. It runs
on GitHub-hosted Ubuntu, needs no repository secrets, and does not use BlitzCraft infrastructure.
Replace it with your own GitHub, GitLab, Buildkite, or self-hosted pipeline if you prefer.

The default workflow is the supported quality baseline (Doctor, lint, typecheck, tests, production
build). It is not Atlas maintainer CI. Playwright E2E is omitted until you add browsers and a
running app. Commit `pnpm-lock.yaml` after `pnpm install` so `--frozen-lockfile` succeeds.

## Documentation

- Atlas public docs: https://github.com/blitzcraftlabs/atlas/blob/main/docs/public/README.md
- Atlas Doctor: https://github.com/blitzcraftlabs/atlas/blob/main/docs/how-we-build/doctor.md
- Consumer tooling: docs/how-we-build/consumer-tooling.md
- Reference patterns: docs/how-we-build/reference-patterns.md
