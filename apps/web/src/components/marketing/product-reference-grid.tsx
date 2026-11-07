import { ArrowUpRight } from "lucide-react"

import { cn } from "@atlas/ui"

import {
  BUILT_WITH_PRODUCTS,
  type BuiltWithProduct,
} from "@/lib/marketing/content/products"

function hostname(href: string) {
  return new URL(href).hostname.replace(/^www\./, "")
}

function ProductCell({ product }: { product: BuiltWithProduct }) {
  const isBuilt = product.status === "built-from-atlas"
  const cellClassName = cn(
    "bp-products__cell",
    product.logoVariant && `bp-products__cell--${product.logoVariant}`,
    product.href && "bp-products__cell--link"
  )

  const content = (
    <>
      <span className="bp-products__stage">
        <img
          className="bp-products__logo"
          src={product.logoSrc}
          alt={product.logoAlt}
          loading="lazy"
          decoding="async"
        />
        {product.showName ? (
          <span className="bp-products__name">{product.name}</span>
        ) : null}
      </span>
      <span className="bp-products__meta">
        <span
          className={cn(
            "bp-products__status",
            isBuilt ? "bp-products__status--built" : "bp-products__status--migrated"
          )}
        >
          {product.statusLabel}
        </span>
        {product.href ? (
          <span className="bp-products__host">
            {hostname(product.href)}
            <ArrowUpRight
              className="bp-products__arrow"
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        ) : null}
      </span>
    </>
  )

  if (product.href) {
    return (
      <li>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cellClassName}
          aria-label={`${product.name}, ${product.statusLabel} (opens in a new tab)`}
        >
          {content}
        </a>
      </li>
    )
  }

  return <li className={cellClassName}>{content}</li>
}

/**
 * Products built from, or migrated toward, Atlas. Shared by the homepage
 * "Built with Atlas" sheet and the consulting page's reference work.
 */
export function ProductReferenceGrid({
  className,
  "aria-label": ariaLabel,
}: {
  className?: string
  "aria-label"?: string
}) {
  return (
    <ul className={cn("bp-products__grid", className)} aria-label={ariaLabel}>
      {BUILT_WITH_PRODUCTS.map((product) => (
        <ProductCell key={product.name} product={product} />
      ))}
    </ul>
  )
}
