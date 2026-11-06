import { ContractStepIcon } from "@/components/marketing/contract-illustrations"

const STEPS = [
  {
    id: "openapi" as const,
    label: "OpenAPI",
    sublabel: "Source contract",
    metadata: "openapi/openapi.json",
  },
  {
    id: "generated-client" as const,
    label: "Generated client",
    sublabel: "SDK + TypeScript",
    metadata: "lib/api/contracts",
  },
  {
    id: "feature-module" as const,
    label: "Feature module",
    sublabel: "Domain boundary",
    metadata: "features/users",
  },
  {
    id: "product-ui" as const,
    label: "Product UI",
    sublabel: "React interface",
    metadata: "apps/web",
    active: true,
  },
]

const VERIFY_GATES = ["Typecheck", "Tests", "Production build"]

export function ContractPathDiagram() {
  return (
    <figure
      className="atlas-contract-path"
      aria-labelledby="contract-diagram-title contract-diagram-desc"
    >
      <figcaption className="sr-only">
        <span id="contract-diagram-title">
          Contract to product path in Atlas
        </span>
        <span id="contract-diagram-desc">
          OpenAPI contract flows through generated client and typed feature
          module to product UI, supported by the Atlas foundation and verified by
          typecheck, tests, and production build.
        </span>
      </figcaption>

      <div className="atlas-contract-path__rail atlas-contract-path__rail--verify">
        <ul className="atlas-contract-path__gates">
          {VERIFY_GATES.map((gate) => (
            <li key={gate}>{gate}</li>
          ))}
        </ul>
      </div>

      <div className="atlas-contract-path__track">
        <ol className="atlas-contract-path__steps">
          {STEPS.map((step, index) => (
            <li
              key={step.id}
              className="atlas-contract-path__step"
              data-active={step.active || undefined}
            >
              <div className="atlas-contract-path__step-copy">
                <div className="atlas-contract-path__step-heading">
                  <ContractStepIcon id={step.id} />
                  <p className="atlas-contract-path__step-label">{step.label}</p>
                </div>
                <p className="atlas-contract-path__step-sublabel">
                  {step.sublabel}
                </p>
                <p className="atlas-contract-path__step-metadata">
                  {step.metadata}
                </p>
              </div>
              {index < STEPS.length - 1 ? (
                <span
                  className="atlas-contract-path__connector"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 12"
                    className="atlas-contract-path__arrow"
                  >
                    <path d="M0 6h18M14 2l6 4-6 4" />
                  </svg>
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="atlas-contract-path__rail atlas-contract-path__rail--foundation">
        <span>Atlas foundation</span>
      </div>
    </figure>
  )
}
