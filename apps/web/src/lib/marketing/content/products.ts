export type BuiltWithProductStatus = "built-from-atlas" | "migrated-toward-atlas"

export type BuiltWithLogoVariant = "mark" | "wordmark" | "badge"

export interface BuiltWithProduct {
  name: string
  status: BuiltWithProductStatus
  statusLabel: string
  logoSrc: string
  logoAlt: string
  /** Show the product name beside the mark when the logo alone is not a full wordmark. */
  showName?: boolean
  /** Tunes optical sizing inside the shared logo stage. */
  logoVariant?: BuiltWithLogoVariant
  href?: string
}

export const BUILT_WITH_PRODUCT_LOGO_DIR = "/marketing/product-logos"

export const BUILT_WITH_PRODUCTS = [
  {
    name: "Aviatopia",
    status: "built-from-atlas",
    statusLabel: "Built from Atlas",
    logoSrc: `${BUILT_WITH_PRODUCT_LOGO_DIR}/aviatopia.svg`,
    logoAlt: "Aviatopia",
    showName: true,
    logoVariant: "mark",
    href: "https://aviatopia.com/",
  },
  {
    name: "Ax402",
    status: "built-from-atlas",
    statusLabel: "Built from Atlas",
    logoSrc: `${BUILT_WITH_PRODUCT_LOGO_DIR}/ax402.svg`,
    logoAlt: "Ax402",
    logoVariant: "wordmark",
    href: "https://ax402.io/",
  },
  {
    name: "xGas Station",
    status: "built-from-atlas",
    statusLabel: "Built from Atlas",
    logoSrc: `${BUILT_WITH_PRODUCT_LOGO_DIR}/xgas-station.svg`,
    logoAlt: "xGas Station",
    showName: true,
    logoVariant: "mark",
    href: "https://xgas.axlabs.net/",
  },
  {
    name: "GitMyABI",
    status: "migrated-toward-atlas",
    statusLabel: "Migrated toward Atlas",
    logoSrc: `${BUILT_WITH_PRODUCT_LOGO_DIR}/gitmyabi.png`,
    logoAlt: "GitMyABI",
    logoVariant: "badge",
    href: "https://gitmyabi.com/",
  },
] as const satisfies readonly BuiltWithProduct[]
