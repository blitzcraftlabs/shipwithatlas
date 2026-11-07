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

/**
 * The essential relationship first: four typed stages in one line, the
 * product UI as the only filled node. Verification spans the whole path
 * above it, and the Atlas foundation carries it below.
 */
export function ContractPathDiagram() {
  return (
    <figure
      className="bp-contract"
      aria-labelledby="contract-diagram-title"
      aria-describedby="contract-diagram-desc"
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

      <div className="bp-contract__verify">
        <span className="bp-contract__rail-label">Verified by</span>
        <ul className="bp-contract__gates">
          {VERIFY_GATES.map((gate) => (
            <li key={gate}>{gate}</li>
          ))}
        </ul>
      </div>

      <ol className="bp-contract__steps">
        {STEPS.map((step, index) => (
          <li
            key={step.id}
            className="bp-contract__step"
            data-active={step.active || undefined}
          >
            <div className="bp-contract__node">
              <div className="bp-contract__node-head">
                <span className="bp-contract__node-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="bp-contract__node-icon" aria-hidden="true">
                  <ContractStepIcon id={step.id} />
                </span>
              </div>
              <p className="bp-contract__node-label">{step.label}</p>
              <p className="bp-contract__node-sublabel">{step.sublabel}</p>
              <code className="bp-contract__node-path">{step.metadata}</code>
            </div>
            {index < STEPS.length - 1 ? (
              <span className="bp-contract__connector" aria-hidden="true">
                <svg viewBox="0 0 32 16" className="bp-contract__arrow">
                  <path d="M0 8h28M22 2l7 6-7 6" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="bp-contract__foundation">
        <span className="bp-contract__rail-label">Atlas foundation</span>
      </div>
    </figure>
  )
}
