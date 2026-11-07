export const AUTHOR_NAME = "Daniel Mark"

export const AUTHOR_INITIALS = "DM"

export const AUTHOR_ROLE = "Frontend engineer & consultant"

export const AUTHOR_TITLE = "Frontend engineer · Builder of Atlas"

export const CONTACT_EMAIL = "hello@thedanielmark.com"

export const CONTACT_MAILTO_URL = `mailto:${CONTACT_EMAIL}`

export const HOME_PATH = "/"

export const CONSULTING_PATH = "/consulting"

/**
 * Homepage section anchors. Section components render these ids, and every
 * link to them goes through `homeSectionHref` so the target is route-aware:
 * `/#agents` reaches the homepage section from any page, while a bare
 * `#agents` would resolve against whichever page is currently open.
 */
export const HOME_SECTION_IDS = {
  product: "product",
  getStarted: "get-started",
  capabilities: "capabilities",
  agents: "agents",
  proof: "proof",
} as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS]

export function homeSectionHref(id: HomeSectionId) {
  return `${HOME_PATH}#${id}`
}

export const AUTHOR_AVATAR_URL =
  "https://media.thedanielmark.com/authors/daniel-mark/avatar-83547525.jpg"

export const AUTHOR_SITE_URL = "https://www.thedanielmark.com"

export const ATLAS_PROJECT_URL = `${AUTHOR_SITE_URL}/projects/atlas`

export const SITE_NAME = "Atlas"

export const SITE_TAGLINE = "The frontend decisions are already made."

export const SITE_EYEBROW = "Open-source frontend foundation"

export const SITE_SUPPORTING =
  "Atlas is a forkable Next.js foundation where architecture, application infrastructure, testing, and delivery already work as one system, so your team can start with the product, not the setup."

export const PLATFORM_REPO_URL = "https://github.com/blitzcraftlabs/atlas"

export const SHOWCASE_REPO_URL = "https://github.com/blitzcraftlabs/atlas-showcase"

export const SHOWCASE_SITE_URL = "https://shipwithatlas.com"

export const PLATFORM_DOCS_URL = `${PLATFORM_REPO_URL}/tree/main/docs/public`

export const ARCHITECTURE_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/architecture.md`

export const CAPABILITIES_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/capabilities.md`

export const CI_WORKFLOWS_URL = `${PLATFORM_REPO_URL}/tree/main/.github/workflows`

export const AGENTS_MD_URL = `${PLATFORM_REPO_URL}/blob/main/AGENTS.md`

export const QUICK_START_CTA_LABEL = "Quick start guide"

export const SECONDARY_CTA_LABEL = "View the repository"

export const HEADER_PRIMARY_CTA_LABEL = "Work with me"

export const CONSULTING_CTA_LABEL = "Talk about your frontend"

export const EXPLORE_ATLAS_LABEL = "Explore Atlas"

export const SEE_HOW_I_WORK_LABEL = "See how I work"

export const SEE_ATLAS_LABEL = "See Atlas"

export const ATLAS_OVERVIEW_HASH = homeSectionHref(HOME_SECTION_IDS.capabilities)

/** Public CLI package — source of truth: the Atlas repository README "Quick start". */
export const NPM_PACKAGE_NAME = "@blitzcraftlabs/atlas"

export const NPM_PACKAGE_URL = `https://www.npmjs.com/package/${NPM_PACKAGE_NAME}`

export const QUICKSTART_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/quickstart.md`

export const GET_STARTED_HASH = homeSectionHref(HOME_SECTION_IDS.getStarted)

export const INSTALL_COMMAND = `pnpm dlx ${NPM_PACKAGE_NAME} init my-app`

export const PREREQUISITES = [
  { name: "Node.js", version: ">=22" },
  { name: "pnpm", version: ">=10" },
] as const

export interface QuickStartStep {
  index: string
  title: string
  description: string
  commands: string[]
}

export const QUICK_START_STEPS: QuickStartStep[] = [
  {
    index: "01",
    title: "Create",
    description: "Generate a source-owned Atlas workspace in my-app.",
    commands: [INSTALL_COMMAND],
  },
  {
    index: "02",
    title: "Install",
    description: "Move into the project and install dependencies.",
    commands: ["cd my-app", "pnpm install"],
  },
  {
    index: "03",
    title: "Run",
    description: "Start the dev server, then open http://localhost:3000.",
    commands: ["pnpm dev"],
  },
]

export const QUICK_START_SCRIPT = QUICK_START_STEPS.flatMap(
  (step) => step.commands
).join("\n")

/** Contributing to Atlas itself — not required to use Atlas. */
export const REPOSITORY_DEV_SCRIPT = [
  "git clone https://github.com/blitzcraftlabs/atlas.git",
  "cd atlas",
  "corepack enable",
  "pnpm install",
  "cp apps/web/.env.example apps/web/.env.local",
  "pnpm --filter @atlas/web dev",
].join("\n")

export interface NavLink {
  href: string
  label: string
  external?: boolean
  internal?: boolean
  /** Homepage section this link targets, when it is an in-page anchor. */
  sectionId?: HomeSectionId
}

/**
 * Single source for the desktop header and the mobile menu. Internal entries
 * are route-aware (`/#section`) so they work from every marketing page.
 */
export const NAV_LINKS: NavLink[] = [
  {
    href: homeSectionHref(HOME_SECTION_IDS.product),
    label: "Overview",
    sectionId: HOME_SECTION_IDS.product,
  },
  {
    href: homeSectionHref(HOME_SECTION_IDS.getStarted),
    label: "Get started",
    sectionId: HOME_SECTION_IDS.getStarted,
  },
  {
    href: homeSectionHref(HOME_SECTION_IDS.capabilities),
    label: "Architecture",
    sectionId: HOME_SECTION_IDS.capabilities,
  },
  {
    href: homeSectionHref(HOME_SECTION_IDS.agents),
    label: "Agents",
    sectionId: HOME_SECTION_IDS.agents,
  },
  { href: PLATFORM_DOCS_URL, label: "Docs", external: true },
]

/** Header actions, shared by the desktop header and the mobile menu. */
export const HEADER_ACTIONS = {
  repository: { href: PLATFORM_REPO_URL, label: "View repository", external: true },
  consulting: { href: CONSULTING_PATH, label: HEADER_PRIMARY_CTA_LABEL, internal: true },
} as const satisfies Record<string, NavLink>

export const FOOTER_TAGLINE =
  "An open-source frontend foundation for teams that want the recurring decisions already made."

export const UI_PACKAGE_URL = `${PLATFORM_REPO_URL}/tree/main/packages/ui`

export const LICENSE_URL = `${PLATFORM_REPO_URL}/blob/main/LICENSE`

export interface FooterNavGroup {
  title: string
  links: NavLink[]
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { href: QUICKSTART_DOCS_URL, label: "Quick start", external: true },
      { href: ARCHITECTURE_DOCS_URL, label: "Architecture", external: true },
      { href: UI_PACKAGE_URL, label: "UI", external: true },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: PLATFORM_DOCS_URL, label: "Documentation", external: true },
      { href: PLATFORM_REPO_URL, label: "GitHub", external: true },
      { href: CI_WORKFLOWS_URL, label: "CI workflows", external: true },
    ],
  },
  {
    title: "Project",
    links: [
      { href: CONSULTING_PATH, label: "Consulting", internal: true },
      { href: LICENSE_URL, label: "Apache 2.0 License", external: true },
    ],
  },
]

export const PROOF_LINKS = [
  {
    label: "Repository",
    description: "Source, contracts, examples, and quality gates",
    href: PLATFORM_REPO_URL,
  },
  {
    label: "Architecture documentation",
    description: "System design, conventions, and decisions",
    href: ARCHITECTURE_DOCS_URL,
  },
  {
    label: "CI workflows",
    description: "Lint, typecheck, tests, build, and E2E gates",
    href: CI_WORKFLOWS_URL,
  },
] as const

export const PRODUCT_PROPERTIES = [
  {
    index: "01",
    title: "Coherent by default",
    icon: "layers" as const,
    description:
      "UI, data, auth, errors, observability, and product state follow one shared set of conventions.",
  },
  {
    index: "02",
    title: "Production included",
    icon: "shield-check" as const,
    description:
      "Accessibility, logging, analytics, testing, and CI are part of the foundation from day one, not work deferred until launch.",
  },
  {
    index: "03",
    title: "Fully yours",
    icon: "git-fork" as const,
    description:
      "Fork the codebase, remove the examples, replace integrations, and evolve the architecture with your product.",
  },
] as const

export const AGENT_BENEFITS = [
  "Explicit ownership boundaries in AGENTS.md",
  "Predictable feature-module paths for every task",
  "Reference implementations to copy from",
  "Verification gates that catch drift before merge",
] as const

/** Hero copy for the blueprint design direction. No em dashes in marketing copy. */
export const HERO_LEAD =
  "Atlas generates a production-ready Next.js workspace with architecture, authentication, API integration, configuration, testing, and CI already in place. Every file is source in your repository, yours to read, change, and ship."

