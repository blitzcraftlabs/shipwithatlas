import { ArrowUpRight } from "lucide-react"

import { cn } from "@atlas/ui"

import { SectionLabel } from "@/components/marketing/section-label"
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

export function BuiltWithSection() {
  return (
    <section
      className="bp-section bp-section--accent bp-products"
      aria-labelledby="built-with-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-section-head--split">
          <div>
            <SectionLabel index="04">Built with Atlas</SectionLabel>
            <h2 id="built-with-heading" className="bp-h2">
              One foundation.
              {" "}<br />
              Different products.
            </h2>
          </div>
          <p className="bp-lead">
            Atlas has been used across knowledge products, developer
            infrastructure, and production applications without forcing them
            into the same product shape.
          </p>
        </header>

        <ul className="bp-products__grid">
          {BUILT_WITH_PRODUCTS.map((product) => (
            <ProductCell key={product.name} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
