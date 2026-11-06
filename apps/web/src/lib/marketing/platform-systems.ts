export interface PlatformSystemItem {
  title: string
  detail: string
}

export interface PlatformSystem {
  id: "build" | "ship" | "operate" | "scale"
  label: string
  message: string
  items: PlatformSystemItem[]
}

export const PLATFORM_SYSTEMS: PlatformSystem[] = [
  {
    id: "build",
    label: "Build",
    message: "The conventions needed to build product features already exist.",
    items: [
      { title: "Application shell", detail: "Layouts, providers, and composition slots" },
      { title: "UI system", detail: "Primitives, tokens, themes, and states" },
      { title: "Typed data", detail: "OpenAPI contracts through React Query hooks" },
      { title: "Forms", detail: "Schemas, client validation, server error mapping" },
      { title: "Auth", detail: "SSR-safe sessions and protected surfaces" },
      { title: "Feature architecture", detail: "Domain modules with clear ownership" },
    ],
  },
  {
    id: "ship",
    label: "Ship",
    message: "The repository contains the quality gates, not just application code.",
    items: [
      { title: "Linting", detail: "Boundary and accessibility rules in CI" },
      { title: "Type checking", detail: "Contract drift fails before merge" },
      { title: "Unit tests", detail: "Feature and package verification" },
      { title: "E2E", detail: "Critical path smoke coverage" },
      { title: "Build validation", detail: "Production composition checked on every PR" },
      { title: "Security checks", detail: "Audits and protected patterns" },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    message: "Production operation is part of the platform from the beginning.",
    items: [
      { title: "Observability", detail: "Normalized errors and correlation IDs" },
      { title: "Feature flags", detail: "Audience targeting and gradual release" },
      { title: "Kill switches", detail: "Emergency off without redeploying" },
      { title: "Analytics", detail: "Consent-gated product instrumentation" },
      { title: "Consent", detail: "Privacy controls wired into the shell" },
      { title: "Environment config", detail: "Validated, typed runtime settings" },
    ],
  },
  {
    id: "scale",
    label: "Scale",
    message: "The architecture remains understandable as the team and codebase grow.",
    items: [
      { title: "Ownership boundaries", detail: "Features own logic; routes stay thin" },
      { title: "Shared packages", detail: "UI and tooling extracted when reusable" },
      { title: "Documentation", detail: "How-we-build guides for humans and agents" },
      { title: "ADRs", detail: "Decision history that survives staffing changes" },
      { title: "Agent instructions", detail: "AGENTS.md encodes where code belongs" },
      { title: "Team workflows", detail: "Predictable extension without rediscovery" },
    ],
  },
]
