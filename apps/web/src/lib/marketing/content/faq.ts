export interface FaqItem {
  id: string
  question: string
  paragraphs: readonly string[]
}

export const FAQ_ITEMS = [
  {
    id: "framework",
    question: "Is Atlas a framework?",
    paragraphs: [
      "No. Atlas is a frontend foundation built from standard tools such as Next.js, React, TypeScript, Tailwind, TanStack Query, and the surrounding ecosystem.",
      "There is no Atlas runtime your product depends on. The architecture, conventions, tooling, and reference implementations become part of your own codebase.",
    ],
  },
  {
    id: "starter",
    question: "Why not just start with create-next-app or another starter?",
    paragraphs: [
      "A starter gives you a project. Atlas gives you the recurring engineering decisions around that project.",
      "That includes application boundaries, API contracts, data-fetching conventions, forms, authentication patterns, observability, testing, CI, agent context, and the rules that keep those pieces working together as the codebase grows.",
    ],
  },
  {
    id: "everything",
    question: "Do we have to use everything Atlas includes?",
    paragraphs: [
      "No. Atlas is opinionated, but it is not immutable.",
      "Keep the pieces that earn their place, replace integrations that do not fit your product, and remove capabilities you do not need. The goal is to start from a coherent system rather than assemble one from zero.",
    ],
  },
  {
    id: "backend",
    question: "Can Atlas work with our existing backend?",
    paragraphs: [
      "Yes. Atlas is frontend-first, not backend-specific.",
      "It integrates with backend systems through explicit API boundaries and typed contracts. Your backend can be Node.js, Go, Java, .NET, Python, or something else entirely as long as the frontend has a stable interface to work against.",
    ],
  },
  {
    id: "migrate",
    question: "Can we migrate an existing frontend toward Atlas?",
    paragraphs: [
      "Yes. Atlas does not require every project to begin as a fresh repository.",
      "Teams can adopt the architecture incrementally: establish boundaries, centralize data access, move toward shared UI and validation patterns, introduce quality gates, and replace inconsistent conventions over time.",
      "GitMyABI is one example of a product being migrated toward Atlas conventions.",
    ],
  },
  {
    id: "replaceable",
    question: "Are Atlas integrations replaceable?",
    paragraphs: [
      "Yes.",
      "Atlas makes explicit choices so teams do not have to make the same choices repeatedly, but those integrations live in code you own. Analytics, observability, authentication providers, feature-management adapters, and other infrastructure can be replaced when your requirements change.",
    ],
  },
  {
    id: "agents",
    question: "How does Atlas work with coding agents?",
    paragraphs: [
      "The repository carries the engineering context with it.",
      "Architecture rules, ownership boundaries, reference implementations, prohibited patterns, and verification commands are documented for coding agents inside the codebase. That means switching between agents does not require switching engineering standards.",
    ],
  },
  {
    id: "what-ships",
    question: "What actually ships with Atlas?",
    paragraphs: [
      "Atlas includes the frontend architecture and the infrastructure around it: shared UI, forms and validation, typed API contracts, server-state conventions, authentication patterns, security controls, feature management, observability, analytics, environment validation, testing, CI, performance tooling, and agent context.",
    ],
  },
  {
    id: "production",
    question: "Has Atlas been used in real products?",
    paragraphs: [
      "Yes. Atlas has been used as the foundation for multiple production applications, and other applications have been migrated toward its conventions.",
      "The products shown above demonstrate different product shapes built on the same underlying engineering foundation.",
    ],
  },
] as const satisfies readonly FaqItem[]
