export const AUTHOR_NAME = "Daniel Mark";

export const AUTHOR_ROLE = "Frontend engineer & consultant";

export const CONTACT_EMAIL = "hello@thedanielmark.com";

export const CONTACT_MAILTO_URL = `mailto:${CONTACT_EMAIL}`;

export const CONSULTING_PATH = "/consulting";

export const AUTHOR_AVATAR_URL =
  "https://media.thedanielmark.com/authors/daniel-mark/avatar-83547525.jpg";

export const AUTHOR_SITE_URL = "https://www.thedanielmark.com";

export const SITE_NAME = "Atlas";

export const SITE_TAGLINE = "The frontend decisions are already made.";

export const SITE_EYEBROW = "Open-source Next.js foundation";

export const SITE_SUPPORTING =
  "Atlas generates a Next.js workspace with the API layer, auth, configuration, observability, tests, and CI already set up and agreeing with each other. It lands in your repository as ordinary source code you can read, change, or delete.";

export const PLATFORM_REPO_URL = "https://github.com/blitzcraftlabs/atlas";

export const PLATFORM_DOCS_URL = `${PLATFORM_REPO_URL}/tree/main/docs/public`;

export const ARCHITECTURE_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/architecture.md`;

export const CI_WORKFLOWS_URL = `${PLATFORM_REPO_URL}/tree/main/.github/workflows`;

export const HEADER_PRIMARY_CTA_LABEL = "Work with me";

export const CONSULTING_CTA_LABEL = "Talk about your frontend";

export const SEE_ATLAS_LABEL = "See Atlas";

/** Public CLI package. Source of truth: the Atlas repository README "Quick start". */
export const NPM_PACKAGE_NAME = "@blitzcraftlabs/atlas";

export const NPM_PACKAGE_URL = `https://www.npmjs.com/package/${NPM_PACKAGE_NAME}`;

export const QUICKSTART_DOCS_URL = `${PLATFORM_REPO_URL}/blob/main/docs/public/quickstart.md`;

export const GET_STARTED_HASH = "#get-started";

export const INSTALL_COMMAND = `pnpm dlx ${NPM_PACKAGE_NAME} init my-app`;

export const PREREQUISITES = [
  { name: "Node.js", version: ">=22" },
  { name: "pnpm", version: ">=10" },
] as const;

export interface QuickStartStep {
  index: string;
  title: string;
  description: string;
  commands: string[];
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
];

export const QUICK_START_SCRIPT = QUICK_START_STEPS.flatMap((step) => step.commands).join("\n");

/** Contributing to Atlas itself. Not required to use Atlas. */
export const REPOSITORY_DEV_SCRIPT = [
  "git clone https://github.com/blitzcraftlabs/atlas.git",
  "cd atlas",
  "corepack enable",
  "pnpm install",
  "cp apps/web/.env.example apps/web/.env.local",
  "pnpm --filter @atlas/web dev",
].join("\n");

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  internal?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/#workspace", label: "Workspace" },
  { href: "/#cli", label: "CLI" },
  { href: "/#guardrails", label: "Guardrails" },
  { href: "/#get-started", label: "Get started" },
  { href: PLATFORM_DOCS_URL, label: "Docs", external: true },
];

export const FOOTER_TAGLINE =
  "An open-source Next.js foundation. Generated into your repository, maintained in the open.";

export const UI_PACKAGE_URL = `${PLATFORM_REPO_URL}/tree/main/packages/ui`;

export const LICENSE_URL = `${PLATFORM_REPO_URL}/blob/main/LICENSE`;

export const LICENSE_LABEL = "Apache 2.0 license";

export interface FooterNavGroup {
  title: string;
  links: NavLink[];
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { href: NPM_PACKAGE_URL, label: "npm package", external: true },
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
      { href: LICENSE_URL, label: LICENSE_LABEL, external: true },
    ],
  },
];
