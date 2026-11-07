import { GitFork, Layers, ShieldCheck } from "lucide-react"

import { PRODUCT_PROPERTIES } from "@/lib/marketing/constants"

const PROPERTY_ICONS = {
  layers: Layers,
  "shield-check": ShieldCheck,
  "git-fork": GitFork,
} as const

/**
 * Sheet 01, continued from the hero edge: the three foundation properties
 * as one specification table rather than a row of feature cards.
 */
export function PropertiesSection() {
  return (
    <section
      id="product"
      className="bp-section bp-section--paper bp-spec"
      aria-labelledby="product-heading"
    >
      <div className="atlas-marketing__gutter">
        <div className="bp-spec__frame">
          <div className="bp-spec__head">
            <h2 id="product-heading" className="bp-spec__title">
              Atlas product properties
            </h2>
            <span className="bp-spec__count" aria-hidden="true">
              {String(PRODUCT_PROPERTIES.length).padStart(2, "0")} properties
            </span>
          </div>

          <div className="bp-spec__grid">
            {PRODUCT_PROPERTIES.map((property) => {
              const Icon = PROPERTY_ICONS[property.icon]

              return (
                <article key={property.index} className="bp-spec__cell">
                  <div className="bp-spec__cell-head">
                    <span className="bp-spec__index" aria-hidden="true">
                      {property.index}
                    </span>
                    <span className="bp-spec__icon" aria-hidden="true">
                      <Icon strokeWidth={1.75} />
                    </span>
                  </div>
                  <h3 className="bp-spec__name">{property.title}</h3>
                  <p className="bp-spec__body">{property.description}</p>
                  <span className="bp-spec__ticks" aria-hidden="true" />
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
