export const AUTHOR_NAME = "Daniel Mark"

export const AUTHOR_INITIALS = "DM"

export const AUTHOR_ROLE = "Frontend engineer & consultant"

export const AUTHOR_TITLE = "Frontend engineer · Builder of Atlas"

export const CONTACT_EMAIL = "hello@thedanielmark.com"

export const CONTACT_MAILTO_URL = `mailto:${CONTACT_EMAIL}`

export const CONSULTING_PATH = "/consulting"

export const AUTHOR_AVATAR_URL =
  "https://media.thedanielmark.com/authors/daniel-mark/avatar-83547525.jpg"

export const AUTHOR_SITE_URL = "https://www.thedanielmark.com"

export const ATLAS_PROJECT_URL = `${AUTHOR_SITE_URL}/projects/atlas`

export const SITE_NAME = "Atlas"

export const SITE_TAGLINE = "The frontend decisions are already made."

export const SITE_EYEBROW = "Open-source frontend foundation"

export const SITE_SUPPORTING =
  "Atlas is a forkable Next.js foundation where architecture, application infrastructure, testing, and delivery already work as one system—so your team can start with the product, not the setup."

export const PLATFORM_REPO_URL = "https://github.com/blitzcraftlabs/atlas"

export const SHOWCASE_REPO_URL = "https://github.com/blitzcraftlabs/atlas-showcase"

export const REFERENCE_APP_URL = "https://shipwithatlas.com/demo"

export const SHOWCASE_SITE_URL = "https://shipwithatlas.com"

export const PLATFORM_DOCS_URL = `${PLATFORM_REPO_URL}/tree/main/docs/public`

export const ARCHITECTURE_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/architecture.md`

export const CAPABILITIES_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/capabilities.md`

export const CI_WORKFLOWS_URL = `${PLATFORM_REPO_URL}/tree/main/.github/workflows`

export const AGENTS_MD_URL = `${PLATFORM_REPO_URL}/blob/main/AGENTS.md`

export const PRIMARY_CTA_LABEL = "Explore the reference app"

export const SECONDARY_CTA_LABEL = "View the repository"

export const HEADER_PRIMARY_CTA_LABEL = "Work with me"

export const CONSULTING_CTA_LABEL = "Talk about your frontend"

export const EXPLORE_ATLAS_LABEL = "Explore Atlas"

export const SEE_HOW_I_WORK_LABEL = "See how I work"

export const SEE_ATLAS_LABEL = "See Atlas"

export const ATLAS_OVERVIEW_HASH = "#capabilities"

export const QUICK_START_COMMAND =
  "corepack enable && pnpm install && pnpm validate:env && pnpm dev"

export interface NavLink {
  href: string
  label: string
  external?: boolean
  internal?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { href: "#product", label: "Overview" },
  { href: "#capabilities", label: "Architecture" },
  { href: "#agents", label: "Agents" },
  { href: PLATFORM_DOCS_URL, label: "Docs", external: true },
]

export const FOOTER_TAGLINE =
  "An open-source frontend foundation for teams that want the recurring decisions already made."

export const UI_PACKAGE_URL = `${PLATFORM_REPO_URL}/tree/main/packages/ui`

export const MIT_LICENSE_URL = `${PLATFORM_REPO_URL}/blob/main/LICENSE`

export interface FooterNavGroup {
  title: string
  links: NavLink[]
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { href: REFERENCE_APP_URL, label: "Reference application", external: true },
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
      { href: MIT_LICENSE_URL, label: "MIT License", external: true },
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
    label: "Reference application",
    description: "Live demo exercising Atlas patterns",
    href: REFERENCE_APP_URL,
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
      "Accessibility, logging, analytics, testing, and CI are part of the foundation from day one—not work deferred until launch.",
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
