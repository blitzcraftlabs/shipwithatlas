import { GitFork, Layers, ShieldCheck } from "lucide-react"

import { AtlasRouteMark } from "@/components/marketing/atlas-route-mark"
import { PRODUCT_PROPERTIES } from "@/lib/marketing/constants"

const PROPERTY_ICONS = {
  layers: Layers,
  "shield-check": ShieldCheck,
  "git-fork": GitFork,
} as const

export function PropertiesSection() {
  return (
    <section
      id="product"
      className="atlas-section atlas-section--surface"
      aria-labelledby="product-heading"
    >
      <div className="atlas-marketing__gutter">
        <h2 id="product-heading" className="sr-only">
          Atlas product properties
        </h2>
        <div className="atlas-properties">
          {PRODUCT_PROPERTIES.map((property) => {
            const Icon = PROPERTY_ICONS[property.icon]

            return (
              <article key={property.index} className="atlas-properties__item">
                <div className="atlas-properties__mark">
                  <div className="atlas-properties__route" aria-hidden="true">
                    <AtlasRouteMark size="md" />
                    <span className="atlas-properties__route-line" />
                    <span className="atlas-properties__route-node" />
                  </div>
                  <Icon
                    className="atlas-properties__icon"
                    strokeWidth={1.65}
                    aria-hidden="true"
                  />
                  <span className="atlas-properties__index">
                    {property.index}
                  </span>
                </div>
                <div className="atlas-properties__content">
                  <h3 className="atlas-properties__title">{property.title}</h3>
                  <p className="atlas-properties__body">
                    {property.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
