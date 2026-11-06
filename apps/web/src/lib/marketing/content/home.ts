/**
 * Homepage content.
 *
 * Every terminal transcript, path, and rule below is copied from a real Atlas
 * 1.3.2 workspace (this repository) or from running the published CLI against
 * it. When Atlas changes, re-run the commands and update the output here rather
 * than editing it by hand.
 */

export type TerminalLineTone =
  | "command"
  | "output"
  | "muted"
  | "heading"
  | "success"
  | "error"
  | "action"
  | "gap";

export interface TerminalLine {
  tone: TerminalLineTone;
  text: string;
}

export interface TerminalTranscript {
  id: string;
  title: string;
  lines: TerminalLine[];
}

const cmd = (text: string): TerminalLine => ({ tone: "command", text });
const out = (text: string): TerminalLine => ({ tone: "output", text });
const muted = (text: string): TerminalLine => ({ tone: "muted", text });
const heading = (text: string): TerminalLine => ({ tone: "heading", text });
const ok = (text: string): TerminalLine => ({ tone: "success", text });
const err = (text: string): TerminalLine => ({ tone: "error", text });
const action = (text: string): TerminalLine => ({ tone: "action", text });
const gap: TerminalLine = { tone: "gap", text: "" };

/** `atlas init my-app --dry-run`, Atlas 1.3.2. Absolute project root omitted. */
export const INIT_TRANSCRIPT: TerminalTranscript = {
  id: "init",
  title: "~/code",
  lines: [
    cmd("pnpm dlx @blitzcraftlabs/atlas init my-app --dry-run"),
    heading("Atlas init dry run."),
    muted("Atlas version: 1.3.2"),
    out("Actions:"),
    action("- create: my-app (Materialize 423 packaged bootstrap files)"),
    action(
      "- create: atlas.config.json (Generate Atlas project contract and platform.baseline checksums)"
    ),
    action("- create: package.json (Generate consumer workspace manifest)"),
    muted(
      "- skip: pnpm-lock.yaml (Left absent until the consumer runs pnpm install; Atlas does not fabricate a lockfile)"
    ),
    action("- create: AGENTS.md (Generate consumer agent guidance for the published CLI)"),
  ],
};

/** `atlas generate feature invoices --query --mutation --dry-run`, Atlas 1.3.2. */
export const GENERATE_TRANSCRIPT: TerminalTranscript = {
  id: "generate",
  title: "~/code/my-app",
  lines: [
    cmd("atlas generate feature invoices --query --mutation --dry-run"),
    heading("Atlas generator dry run"),
    muted("Generator: feature"),
    muted("Target root: apps/web/src/features/invoices"),
    gap,
    out("Planned actions:"),
    action("  create apps/web/src/features/invoices/components/InvoicesFeature.tsx"),
    action("  create apps/web/src/features/invoices/index.ts"),
    action("  create apps/web/src/features/invoices/keys.ts"),
    action("  create apps/web/src/features/invoices/queries.ts"),
    action("  create apps/web/src/features/invoices/mutations.ts"),
  ],
};

/** `atlas doctor` against this repository, Atlas 1.3.2. Blank lines between checks collapsed. */
export const DOCTOR_TRANSCRIPT: TerminalTranscript = {
  id: "doctor",
  title: "~/code/my-app",
  lines: [
    cmd("atlas doctor"),
    heading("Atlas Doctor"),
    gap,
    ok("Project contract"),
    ok("Workspace structure"),
    ok("Architecture boundaries"),
    ok("Dependency declarations"),
    ok("Generated OpenAPI"),
    ok("Template infrastructure sync"),
    ok("Upgrade baseline"),
    ok("Atlas version"),
    ok("Atlas manifest alignment"),
    gap,
    out("9 checks passed · 0 warnings · 0 errors"),
  ],
};

/** ESLint against the boundary fixture that ships in every workspace. */
export const LINT_TRANSCRIPT: TerminalTranscript = {
  id: "lint",
  title: "~/code/my-app/apps/web",
  lines: [
    cmd("pnpm eslint --no-ignore src/components/eslint-boundaries/prohibited-fetch.ts"),
    muted("src/components/eslint-boundaries/prohibited-fetch.ts"),
    err(
      "  1:6  error  Direct fetch() calls are not allowed. Use the central API client from @/lib/api instead. This ensures consistent error handling, correlation ID propagation, and retry logic."
    ),
    muted("@atlas-doctor:ATLAS_BOUNDARY_RAW_NETWORK  no-restricted-syntax"),
  ],
};

export interface WorkspaceTreeEntry {
  /** Display path, already indented with tree glyphs. */
  path: string;
  note?: string;
}

/** Top of a freshly generated workspace. */
export const WORKSPACE_TREE: WorkspaceTreeEntry[] = [
  { path: "my-app/" },
  { path: "├── apps/web/", note: "the Next.js app" },
  { path: "│   └── src/" },
  { path: "│       ├── app/", note: "routes stay thin" },
  { path: "│       ├── features/", note: "one folder per feature" },
  { path: "│       ├── lib/api/", note: "the only code that calls the network" },
  { path: "│       ├── lib/authz/", note: "permissions and policies" },
  { path: "│       └── config/", note: "validated env, read nowhere else" },
  { path: "├── packages/ui/", note: "@atlas/ui components" },
  { path: "├── packages/consent/", note: "cookie consent" },
  { path: "├── packages/config/", note: "ESLint, TypeScript, Jest presets" },
  { path: "├── openapi/", note: "API contract; client types come from it" },
  { path: "├── docs/how-we-build/", note: "the conventions, written down" },
  { path: "├── .github/workflows/ci.yml" },
  { path: "├── AGENTS.md" },
  { path: "└── atlas.config.json", note: "version baseline and checksums" },
];

export interface IncludedItem {
  name: string;
  detail: string;
  path: string;
}

export const INCLUDED_ITEMS: IncludedItem[] = [
  {
    name: "API client",
    detail:
      "Types generated from your OpenAPI spec, normalized errors, retries, and a correlation ID on every request.",
    path: "src/lib/api",
  },
  {
    name: "Server state",
    detail: "TanStack Query with key factories and shared query patterns.",
    path: "src/lib/react-query",
  },
  {
    name: "Authentication",
    detail: "Google OAuth with PKCE, session refresh, and logout routes.",
    path: "src/lib/auth",
  },
  {
    name: "Authorization",
    detail: "Permission checks for the server and a <Can> component for the UI.",
    path: "src/lib/authz",
  },
  {
    name: "Security headers",
    detail: "A per-request CSP nonce and a default set of security headers.",
    path: "src/lib/security",
  },
  {
    name: "Configuration",
    detail: "Environment validated at build and boot, exposed through one typed facade.",
    path: "src/config",
  },
  {
    name: "Observability",
    detail: "Sentry, structured pino logging with request context, Web Vitals reporting.",
    path: "src/lib/logging",
  },
  {
    name: "Analytics and consent",
    detail: "GA and PostHog behind one adapter, gated by the consent package.",
    path: "src/lib/analytics",
  },
  {
    name: "Feature flags",
    detail: "Typed flag definitions, a provider, and a kill switch.",
    path: "src/lib/feature-flags",
  },
  {
    name: "Testing and CI",
    detail: "Jest, Testing Library, Playwright, Lighthouse CI, and a GitHub Actions pipeline.",
    path: ".github/workflows",
  },
];

export interface CliCommand {
  command: string;
  description: string;
}

export const CLI_COMMANDS: CliCommand[] = [
  { command: "atlas init <name>", description: "Create a new workspace." },
  {
    command: "atlas generate feature <name>",
    description: "Scaffold a feature module, with optional query, mutation, form, and test shells.",
  },
  { command: "atlas generate page <route>", description: "Add a thin App Router page." },
  {
    command: "atlas doctor",
    description: "Check the repository against the Atlas contract and its boundaries.",
  },
  {
    command: "atlas upgrade --to <version>",
    description: "Plan an upgrade, flagging files you changed that need a manual merge.",
  },
  {
    command: "atlas context --json",
    description: "Print the project contract in a form agents can read.",
  },
];

/** Excerpt of the generated AGENTS.md, "Judgment rules" and "When to stop and ask". */
export const AGENTS_EXCERPT = `## Judgment rules (brief)

- Prefer existing Atlas components and nearby patterns
- No raw \`fetch()\` in UI layers — use \`@/lib/api\`
- No direct \`process.env\` in application code — use \`@/config\`
- No cross-feature imports — extract to \`lib/\` if needed
- No business logic in \`app/\` route files
- Preserve accessibility and responsive layout

## When to stop and ask

- Ownership is ambiguous (synced vs independent vs product-owned)
- Upgrade dry-run contains \`merge-required\` or \`manual-review\` items`;


export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const HOME_FAQ: FaqEntry[] = [
  {
    id: "framework",
    question: "Is Atlas a framework?",
    answer:
      "No. Your app depends on Next.js, React, TanStack Query and the other libraries listed in package.json. @atlas/ui and @atlas/consent are workspace packages inside your repository, not dependencies from npm. The CLI is a dev tool you run with pnpm dlx.",
  },
  {
    id: "starter",
    question: "How is this different from create-next-app?",
    answer:
      "create-next-app gives you an empty Next.js project. Atlas gives you the parts most teams spend their first month on: the API layer, auth, env handling, error reporting, lint boundaries, tests, and CI, already configured to work together.",
  },
  {
    id: "keep",
    question: "Do I have to keep all of it?",
    answer:
      "No. It's your code. Swap the auth provider, drop the analytics adapter, rewrite the CI workflow. Upgrades flag the files you changed for a manual merge instead of overwriting them.",
  },
  {
    id: "upgrades",
    question: "How do upgrades work if I own the code?",
    answer:
      "atlas.config.json records a checksum for every file Atlas manages. atlas upgrade --dry-run compares them and splits the changes into files it can update safely and files you edited, which you merge by hand.",
  },
  {
    id: "backend",
    question: "Does it need a particular backend?",
    answer:
      "No. Atlas is frontend only. Point the OpenAPI spec at whatever you run, regenerate the types with pnpm api:gen, and the client follows.",
  },
  {
    id: "existing",
    question: "Can I move an existing app onto it?",
    answer:
      "Yes, gradually. Centralize network calls first, then config, then adopt the lint boundaries one at a time. GitMyABI is being migrated this way.",
  },
];
