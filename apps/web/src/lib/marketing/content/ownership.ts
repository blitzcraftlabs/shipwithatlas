export type OwnershipAction = "KEEP" | "REPLACE" | "EXTEND" | "CHANGE" | "EDIT"

export interface OwnershipActionRow {
  action: OwnershipAction
  target: string
  detail: string
}

export const OWNERSHIP_ACTION_ROWS: OwnershipActionRow[] = [
  {
    action: "KEEP",
    target: "packages/ui",
    detail: "Shared primitives",
  },
  {
    action: "REPLACE",
    target: "Authentication provider",
    detail: "Bring your own auth integration",
  },
  {
    action: "EXTEND",
    target: "Feature management",
    detail: "Attach your own monitoring or flagging stack",
  },
  {
    action: "CHANGE",
    target: ".github/workflows",
    detail: "Vercel, AWS, self-hosted, or your preferred delivery path",
  },
  {
    action: "EDIT",
    target: "AGENTS.md",
    detail: "Your team's conventions",
  },
]

export const OWNERSHIP_METADATA_ITEMS = [
  { id: "repository", label: "Your repository" },
  { id: "integrations", label: "Replaceable integrations" },
  { id: "dependency", label: "No hosted dependency" },
] as const
