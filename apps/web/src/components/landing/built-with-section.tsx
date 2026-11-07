import { ProductReferenceGrid } from "@/components/marketing/product-reference-grid"
import { SectionLabel } from "@/components/marketing/section-label"

export function BuiltWithSection() {
  return (
    <section
      className="bp-section bp-section--accent bp-products"
      aria-labelledby="built-with-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-products__head">
          <div className="bp-products__title">
            <SectionLabel index="04">Built with Atlas</SectionLabel>
            <h2 id="built-with-heading" className="bp-h2">
              One foundation.
              {" "}<br />
              Different products.
            </h2>
          </div>
          <p className="bp-lead bp-products__lead">
            Atlas has been used across knowledge products, developer
            infrastructure, and production applications without forcing them
            into the same product shape.
          </p>
        </header>

        <ProductReferenceGrid />
      </div>
    </section>
  )
}
