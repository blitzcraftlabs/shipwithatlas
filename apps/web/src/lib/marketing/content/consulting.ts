export const CONSULTING_SCENARIOS = [
  {
    id: "new-foundation",
    heading: "Starting from scratch",
    copy:
      "Design and implement a frontend foundation for a new product with clear boundaries, shared infrastructure, typed contracts, reusable UI, testing, and delivery conventions from day one.",
    technical: "Architecture · Next.js · Design systems · CI",
  },
  {
    id: "migration",
    heading: "Your frontend is getting harder to change",
    copy:
      "Audit the current architecture, identify where ownership and infrastructure have drifted, and migrate the codebase toward clearer boundaries without requiring a full rewrite.",
    technical: "Architecture audits · Migrations · Platform cleanup",
  },
  {
    id: "agent-gates",
    heading: "AI is increasing output faster than consistency",
    copy:
      "Encode repository conventions, reference implementations, ownership rules, and verification gates so engineers and coding agents can move quickly without bypassing the architecture.",
    technical: "Agent context · Repository rules · Quality gates",
  },
] as const

export const CONSULTING_HELP_AREAS = [
  {
    title: "Frontend architecture",
    description:
      "Define application boundaries, ownership rules, shared infrastructure, and conventions that remain understandable as the product and team grow.",
  },
  {
    title: "Design systems & frontend platforms",
    description:
      "Build reusable UI and application infrastructure without turning the design system into a disconnected component library.",
  },
  {
    title: "Modernization & migrations",
    description:
      "Untangle existing Next.js and React applications incrementally instead of rewriting healthy product code.",
  },
  {
    title: "AI-assisted engineering",
    description:
      "Give coding agents the repository context, reference implementations, and verification gates required to work inside the architecture instead of around it.",
  },
] as const

export const CONSULTING_WORK_STAGES = [
  {
    index: "01",
    title: "Understand",
    description:
      "Review the codebase, product constraints, engineering workflow, and the recurring problems slowing the team down.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Define the target architecture, ownership boundaries, migration path, and the conventions that should become repository rules.",
  },
  {
    index: "03",
    title: "Implement",
    description:
      "Work alongside the team to introduce the architecture incrementally, ship product changes, and leave the system easier to extend than before.",
  },
] as const
