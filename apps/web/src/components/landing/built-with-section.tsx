import { ArrowUpRight } from "lucide-react"

import { cn } from "@atlas/ui"

import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  BUILT_WITH_PRODUCTS,
  type BuiltWithProduct,
} from "@/lib/marketing/content/products"

function BuiltWithLogoCell({ product }: { product: BuiltWithProduct }) {
  const cellClassName = cn(
    "atlas-built-with__cell",
    product.logoVariant &&
      `atlas-built-with__cell--${product.logoVariant}`,
    product.href && "atlas-built-with__cell--link"
  )

  const statusClassName = cn(
    "atlas-built-with__status",
    product.status === "built-from-atlas"
      ? "atlas-built-with__status--built"
      : "atlas-built-with__status--migrated"
  )

  const content = (
    <>
      <div className="atlas-built-with__logo-stage">
        <div className="atlas-built-with__logo-wrap">
          <img
            className="atlas-built-with__logo"
            src={product.logoSrc}
            alt={product.logoAlt}
            loading="lazy"
            decoding="async"
          />
          {product.showName ? (
            <span className="atlas-built-with__logo-name">{product.name}</span>
          ) : null}
        </div>
      </div>
      <p className={statusClassName}>
        <span>{product.statusLabel}</span>
        {product.href ? (
          <ArrowUpRight
            className="atlas-built-with__status-arrow"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
      </p>
    </>
  )

  if (product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cellClassName}
        aria-label={`${product.name} — ${product.statusLabel}`}
      >
        {content}
      </a>
    )
  }

  return <article className={cellClassName}>{content}</article>
}

export function BuiltWithSection() {
  return (
    <section
      className="atlas-section atlas-section--surface"
      aria-labelledby="built-with-heading"
    >
      <div className="atlas-marketing__gutter atlas-built-with">
        <div className="atlas-built-with__intro">
          <SectionEyebrow>Built with Atlas</SectionEyebrow>
          <h2 id="built-with-heading" className="atlas-section__title">
            One foundation.
            <br />
            Different products.
          </h2>
          <p className="atlas-section__body">
            Atlas has been used across knowledge products, developer
            infrastructure, and production applications—without forcing them
            into the same product shape.
          </p>
        </div>

        <div className="atlas-built-with__showcase">
          <div className="atlas-built-with__grid">
            {BUILT_WITH_PRODUCTS.map((product) => (
              <BuiltWithLogoCell key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
