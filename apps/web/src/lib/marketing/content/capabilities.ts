import {
  AGENTS_MD_URL,
  CI_WORKFLOWS_URL,
  PLATFORM_REPO_URL,
} from "@/lib/marketing/constants"

import type { Capability } from "./types"

const REPO = PLATFORM_REPO_URL

export const ATLAS_CAPABILITIES: Capability[] = [
  {
    id: "application-architecture",
    title: "Application architecture",
    descriptor: "feature modules · ownership boundaries",
    source: "atlas/",
    sourceHref: `${REPO}/tree/main`,
    explanation:
      "Atlas is not just a bundle of libraries. It encodes a coherent frontend architecture: thin Next.js App Router routes, feature modules that own domain logic with no cross-feature imports, shared infrastructure in lib/, reusable primitives in packages/ui, and shared tooling in packages/.",
    included: [
      "Thin App Router routes in apps/web/src/app/",
      "Feature modules with no cross-feature imports",
      "Shared infrastructure in apps/web/src/lib/",
      "Reusable primitives in packages/ui/",
      "Shared ESLint & TypeScript config in packages/",
      "Turborepo + pnpm workspaces",
    ],
    snippet: {
      id: "app-architecture",
      label: "Repository layout",
      filename: "atlas/",
      language: "markdown",
      copyable: false,
      highlightedLines: [4, 5, 8, 9, 10],
      sourceHref: `${REPO}/tree/main`,
      code: `atlas/
├── apps/web/src/
│   ├── app/              # Routes & layouts — thin pages only
│   ├── features/         # Domain modules — no cross-feature imports
│   ├── lib/              # API, auth, telemetry, shared infra
│   └── schemas/          # Zod validation
├── packages/
│   ├── ui/               # Reusable primitives (@atlas/ui)
│   └── config/           # ESLint, TypeScript, shared tooling
├── openapi/              # API contract
├── turbo.json            # Turborepo task pipelines
├── pnpm-workspace.yaml   # pnpm workspaces
└── AGENTS.md             # Ownership boundaries`,
    },
  },
  {
    id: "ui-system",
    title: "UI system",
    descriptor: "primitives · tokens · themes",
    source: "packages/ui/src/",
    sourceHref: `${REPO}/tree/main/packages/ui`,
    explanation:
      "A shared @atlas/ui package ships accessible primitives, form components, and theme utilities—composed by product code, not rebuilt per feature.",
    included: [
      "Shared @atlas/ui package with accessible primitives",
      "Theme boot script and dark-mode support",
      "Dialogs, sheets, menus, and data tables",
      "Loading / empty / error state components",
      "Storybook for component exploration",
    ],
    snippet: {
      id: "ui-exports",
      label: "Package exports",
      filename: "packages/ui/src/index.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3, 4, 5],
      sourceHref: `${REPO}/tree/main/packages/ui/src/index.ts`,
      code: `export * from "./components/button"
export * from "./components/dialog"
export * from "./components/form"
export * from "./components/data-table"
export * from "./components/empty-state"
export * from "./components/theme-provider"
// Tailwind v4 tokens, variants, and app-state primitives`,
    },
  },
  {
    id: "forms-validation",
    title: "Forms & validation",
    descriptor: "React Hook Form · Zod",
    source: "packages/ui/src/hooks/use-zod-form",
    sourceHref: `${REPO}/tree/main/packages/ui/src/hooks`,
    explanation:
      "useZodForm wires React Hook Form to Zod schemas. Shared field primitives and applyServerFieldErrors map server validation to accessible form messages.",
    included: [
      "Shared FormField primitives",
      "Client/server schema alignment",
      "Accessible labels and messages",
    ],
    snippet: {
      id: "zod-form",
      label: "Form setup",
      filename: "apps/web/src/app/examples/form/page.tsx",
      language: "tsx",
      highlightedLines: [1, 3, 4],
      sourceHref: `${REPO}/tree/main/apps/web/src/app/examples/form`,
      code: `const form = useZodForm(createItemSchema, {
  defaultValues: { title: "", description: "" },
});

<FormField name="title" render={({ field }) => (
  <FormItem>
    <FormLabel>Title</FormLabel>
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />
  </FormItem>
)} />`,
    },
  },
  {
    id: "api-contracts",
    title: "API contracts",
    descriptor: "OpenAPI · generated types",
    source: "openapi/openapi.json",
    sourceHref: `${REPO}/tree/main/openapi`,
    explanation:
      "OpenAPI is the contract boundary. Generated TypeScript types replace hand-written response shapes and catch drift at compile time.",
    included: [
      "openapi-typescript generation",
      "Typed API client helpers",
      "Contract-first feature modules",
    ],
    snippet: {
      id: "openapi-types",
      label: "Generated types",
      filename: "apps/web/src/lib/api/contracts/schema.ts",
      language: "typescript",
      highlightedLines: [3, 4, 5],
      sourceHref: `${REPO}/tree/main/openapi`,
      code: `// Generated from openapi/openapi.json
import type { components } from "./schema"

export type ExampleItem = components["schemas"]["ExampleItem"]
export type ExampleItemsListResponse =
  components["schemas"]["ExampleItemsListResponse"]`,
    },
  },
  {
    id: "server-state",
    title: "Server state",
    descriptor: "TanStack Query · cache conventions",
    source: "apps/web/src/lib/react-query/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/react-query`,
    explanation:
      "TanStack Query hooks use centralized query key factories, standardized retries, cache invalidation conventions, and optimistic update support.",
    included: [
      "createQueryKeys factories",
      "Normalized API client",
      "Feature-scoped query hooks",
    ],
    snippet: {
      id: "query-hook",
      label: "Feature query",
      filename: "apps/web/src/features/examples/hooks.ts",
      language: "typescript",
      highlightedLines: [2, 3, 4],
      sourceHref: `${REPO}/tree/main/apps/web/src/features`,
      code: `export function useExampleItems(mode: ExampleMode = "success") {
  return useQuery({
    queryKey: exampleItemsKeys.list({ mode }),
    queryFn: async () => {
      return apiGet<ExampleItemsListResponse>(
        \`/api/examples/items?mode=\${mode}\`,
        { skipAuth: true }
      );
    },
  });
}`,
    },
  },
  {
    id: "error-handling",
    title: "Error handling",
    descriptor: "normalized · traceable",
    source: "apps/web/src/lib/api/errors",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/api/errors`,
    explanation:
      "ApiError normalizes failures into user-safe messages with correlation IDs and server field errors—wired to notifications without leaking internals.",
    included: [
      "Structured ApiError type",
      "Correlation ID propagation",
      "Notification helpers",
    ],
    snippet: {
      id: "api-error",
      label: "Error normalization",
      filename: "apps/web/src/lib/api/errors/api-error.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3, 4],
      sourceHref: `${REPO}/tree/main/apps/web/src/lib/api/errors`,
      code: `export class ApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly correlationId?: string
  readonly fieldErrors?: Record<string, string[]>
}`,
    },
  },
  {
    id: "authentication",
    title: "Authentication",
    descriptor: "OAuth · PKCE · server sessions",
    source: "apps/web/src/lib/auth/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/auth`,
    explanation:
      "OAuth 2.0 with PKCE exchanges tokens server-side. Sessions persist in httpOnly cookies with server and client session APIs—Google provider included as reference.",
    included: [
      "Server-side token exchange",
      "httpOnly session cookies",
      "Client/server session helpers",
    ],
    snippet: {
      id: "oauth-route",
      label: "OAuth callback",
      filename: "apps/web/src/app/api/auth/google/callback/route.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/app/api/auth/google`,
      code: `// OAuth 2.0 + PKCE — tokens never reach the client
const tokens = await exchangeCodeForTokens(code, codeVerifier)
const session = await createServerSession(tokens)
setSessionCookie(response, session)`,
    },
  },
  {
    id: "security-controls",
    title: "Security controls",
    descriptor: "CSP · headers · redaction",
    source: "apps/web/src/lib/security/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/security`,
    explanation:
      "Per-request CSP nonces, baseline security headers, and sensitive-data redaction are part of the application infrastructure—not optional add-ons.",
    included: [
      "CSP generation with nonces",
      "HSTS production option",
      "Log redaction for secrets/PII",
    ],
    snippet: {
      id: "csp-builder",
      label: "CSP builder",
      filename: "apps/web/src/lib/security/csp.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/lib/security`,
      code: `export function buildCSP(nonce: string): string {
  return [
    \`default-src 'self'\`,
    \`script-src 'self' 'nonce-\${nonce}'\`,
    \`style-src 'self' 'nonce-\${nonce}'\`,
  ].join("; ")
}`,
    },
  },
  {
    id: "feature-management",
    title: "Feature management",
    descriptor: "flags · guards · kill switches",
    source: "apps/web/src/lib/feature-flags/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/feature-flags`,
    explanation:
      "Typed feature flags with UI guards and kill switches separate deployment from release. Default and PostHog adapters ship in the foundation.",
    included: [
      "Typed FeatureFlags constants",
      "FeatureProvider + useFeature",
      "Kill switch support",
    ],
    snippet: {
      id: "feature-flags",
      label: "Flag definitions",
      filename: "apps/web/src/lib/feature-flags/flags.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/lib/feature-flags`,
      code: `export const FeatureFlags = {
  EXAMPLE_FEATURE: "example_feature",
  KILL_EXAMPLE_FEATURE: "kill_example_feature",
} as const;

export type FeatureFlagKey =
  (typeof FeatureFlags)[keyof typeof FeatureFlags]`,
    },
  },
  {
    id: "observability",
    title: "Observability",
    descriptor: "Sentry · traces · Web Vitals",
    source: "apps/web/src/lib/telemetry/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/telemetry`,
    explanation:
      "Sentry captures structured errors with request correlation IDs. Web Vitals collection and batched telemetry transport run with environment-aware configuration.",
    included: [
      "Structured logging with Pino",
      "Sentry error tracking on client and server",
      "Web Vitals telemetry endpoint",
      "Batched telemetry transport",
    ],
    snippet: {
      id: "telemetry-init",
      label: "Telemetry setup",
      filename: "apps/web/src/lib/telemetry/client.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/lib/telemetry`,
      code: `initSentry({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
})`,
    },
  },
  {
    id: "analytics",
    title: "Analytics",
    descriptor: "provider adapters · PostHog · GA",
    source: "apps/web/src/lib/analytics/",
    sourceHref: `${REPO}/tree/main/apps/web/src/lib/analytics`,
    explanation:
      "A central analytics abstraction with PostHog and Google Analytics adapters keeps application code vendor-agnostic. Noop behavior when disabled.",
    included: [
      "AnalyticsProvider wrapper",
      "PostHog adapter",
      "Google Analytics adapter",
    ],
    snippet: {
      id: "analytics-adapter",
      label: "Adapter interface",
      filename: "apps/web/src/lib/analytics/types.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3, 4],
      sourceHref: `${REPO}/tree/main/apps/web/src/lib/analytics`,
      code: `export interface AnalyticsAdapter {
  track(event: string, properties?: Record<string, unknown>): void
  identify(userId: string, traits?: Record<string, unknown>): void
  page(name?: string, properties?: Record<string, unknown>): void
}`,
    },
  },
  {
    id: "consent",
    title: "Consent",
    descriptor: "optional · analytics-aware",
    source: "packages/consent/",
    sourceHref: `${REPO}/tree/main/packages/consent`,
    explanation:
      "The optional @atlas/consent package provides cookie consent UI and analytics integration—disabled unless explicitly enabled. Not a certified CMP.",
    included: [
      "Cookie consent banner",
      "Analytics consent gating",
      "Theme integration",
    ],
    snippet: {
      id: "consent-config",
      label: "Consent setup",
      filename: "apps/web/src/lib/consent/config.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/packages/consent`,
      code: `export const consentConfig = {
  enabled: env.NEXT_PUBLIC_CONSENT_ENABLED,
  vendors: ["analytics", "functional"],
} satisfies ConsentConfig`,
    },
  },
  {
    id: "environment-configuration",
    title: "Environment configuration",
    descriptor: "typed · validated · separated",
    source: "apps/web/src/env/",
    sourceHref: `${REPO}/tree/main/apps/web/src/env`,
    explanation:
      "Schema-driven environment configuration separates public and server values. pnpm validate:env catches misconfiguration at build time—not in production.",
    included: [
      "Zod-validated env schemas",
      "Public/server separation",
      "Build-time validation script",
    ],
    snippet: {
      id: "env-schema",
      label: "Server env schema",
      filename: "apps/web/src/schemas/env/server-runtime-config.ts",
      language: "typescript",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/schemas/env`,
      code: `export const ServerEnvSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
  SENTRY_DSN: z.string().url().optional(),
}`,
    },
  },
  {
    id: "testing",
    title: "Testing",
    descriptor: "Jest · RTL · MSW · Playwright",
    source: "apps/web/src/test/",
    sourceHref: `${REPO}/tree/main/apps/web/src/test`,
    explanation:
      "Jest with React Testing Library, MSW network mocking, and Playwright E2E ship with renderWithProviders, fixtures, and accessibility-first query conventions.",
    included: [
      "renderWithProviders helper",
      "MSW handlers and fixtures",
      "Playwright E2E in apps/web/e2e/",
    ],
    snippet: {
      id: "test-render",
      label: "Component test",
      filename: "apps/web/src/features/examples/example.test.tsx",
      language: "tsx",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/apps/web/src/test`,
      code: `it("renders the item list", async () => {
  renderWithProviders(<ExampleList />, { handlers: exampleHandlers })
  expect(await screen.findByRole("list")).toBeInTheDocument()
})`,
    },
  },
  {
    id: "accessibility-baseline",
    title: "Accessibility baseline",
    descriptor: "semantic · keyboard · linted",
    source: "packages/ui/src/components/",
    sourceHref: `${REPO}/tree/main/packages/ui`,
    explanation:
      "Components orient toward accessible primitives with keyboard and focus conventions. jsx-a11y ESLint rules and Storybook a11y review tooling provide a baseline—not WCAG certification.",
    included: [
      "Semantic Radix primitives",
      "Focus-visible conventions",
      "jsx-a11y ESLint errors",
    ],
    snippet: {
      id: "a11y-dialog",
      label: "Accessible dialog",
      filename: "packages/ui/src/components/dialog.tsx",
      language: "tsx",
      highlightedLines: [1, 2, 3],
      sourceHref: `${REPO}/tree/main/packages/ui/src/components`,
      code: `<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent aria-describedby="dialog-description">
    <DialogTitle>Confirm action</DialogTitle>
  </DialogContent>
</Dialog>`,
    },
  },
  {
    id: "ci-quality-gates",
    title: "CI & quality gates",
    descriptor: "lint · types · tests · build · E2E",
    source: ".github/workflows/ci.yml",
    sourceHref: CI_WORKFLOWS_URL,
    explanation:
      "GitHub-hosted runners run validate:env, format, lint, typecheck, tests, build, Playwright E2E, docs checks, and Gitleaks. Self-hosted runner profile supported; docs-only changes skip heavy jobs.",
    included: [
      "Husky pre-commit hooks",
      "Changesets + Renovate",
      "Docs link validation",
    ],
    snippet: {
      id: "ci-pipeline",
      label: "CI pipeline",
      filename: ".github/workflows/ci.yml",
      language: "yaml",
      highlightedLines: [1, 2, 3, 4, 5, 6, 7, 8],
      sourceHref: CI_WORKFLOWS_URL,
      code: `- run: pnpm install --frozen-lockfile
- run: pnpm validate:env
- run: pnpm format:check
- run: pnpm lint
- run: pnpm typecheck
- run: pnpm test
- run: pnpm build
- run: pnpm e2e`,
    },
  },
  {
    id: "performance-tooling",
    title: "Performance tooling",
    descriptor: "Lighthouse · bundle analysis",
    source: "tools/perf/",
    sourceHref: `${REPO}/tree/main/tools/perf`,
    explanation:
      "Opt-in Lighthouse CI workflows and bundle analysis via perf:enable and the Next.js bundle analyzer—available when teams want performance budgets, not forced by default.",
    included: [
      "lighthouserc.json budgets",
      "Bundle analyzer command",
      "perf:enable workflow setup",
    ],
    snippet: {
      id: "lighthouse-config",
      label: "Lighthouse CI",
      filename: "lighthouserc.json",
      language: "json",
      highlightedLines: [2, 3, 4],
      sourceHref: `${REPO}/blob/main/lighthouserc.json`,
      code: `{
  "ci": {
    "collect": { "numberOfRuns": 3 },
    "assert": { "preset": "lighthouse:recommended" }
  }
}`,
    },
  },
  {
    id: "agent-context",
    title: "Agent context",
    descriptor: "instructions · patterns · verification",
    source: "AGENTS.md",
    sourceHref: AGENTS_MD_URL,
    explanation:
      "AGENTS.md, Cursor rules, and feature-building skills give contributors and coding agents the same architecture map, ownership boundaries, and verification commands.",
    included: [
      "Repository map in AGENTS.md",
      "Cursor .cursor/rules/",
      "build-atlas-feature skill",
    ],
    snippet: {
      id: "agents-boundaries",
      label: "Ownership boundaries",
      filename: "AGENTS.md",
      language: "markdown",
      highlightedLines: [1, 2, 3, 4],
      sourceHref: AGENTS_MD_URL,
      code: `| apps/web/src/app/      | Routes, layouts        |
| apps/web/src/features/ | Domain logic, feature UI |
| packages/ui/           | Reusable primitives    |
| apps/web/src/lib/      | Shared infrastructure  |

Do not move code into a shared package unless
it is genuinely reusable across applications.`,
    },
  },
]

export const CAPABILITIES_COUNT = ATLAS_CAPABILITIES.length
