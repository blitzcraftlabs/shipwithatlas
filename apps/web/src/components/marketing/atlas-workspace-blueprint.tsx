import { cn } from "@atlas/ui"

const FEATURES = [
  { path: "billing", note: "--query" },
  { path: "projects", note: "--form" },
  { path: "<next>", note: "generate", generated: true },
] as const

const LIB_MODULES = [
  { path: "@/lib/api", note: "typed client" },
  { path: "@/lib/auth", note: "SSR sessions" },
  { path: "@/config", note: "validated env" },
  { path: "@/lib/telemetry", note: "errors · vitals" },
] as const

const PACKAGES = [
  { name: "packages/ui", note: "tokens · primitives" },
  { name: "packages/config", note: "lint · ts · jest" },
] as const

const GATES = ["doctor", "lint", "typecheck", "test", "build"] as const

const TITLE_BLOCK = [
  { key: "Project", value: "my-app" },
  { key: "Generator", value: "@blitzcraftlabs/atlas", wide: true },
  { key: "Owner", value: "your team" },
  { key: "Sheet", value: "01 / 01" },
] as const

interface AtlasWorkspaceBlueprintProps {
  className?: string
}

/**
 * Engineering-drawing view of the workspace `atlas init` generates: route
 * layer, isolated feature modules, shared lib infrastructure, packages, the
 * AGENTS.md contract, and the verification gates. Pure HTML/CSS so labels stay
 * crisp and the layout reflows on small screens.
 */
export function AtlasWorkspaceBlueprint({ className }: AtlasWorkspaceBlueprintProps) {
  return (
    <figure className={cn("bp-sheet", className)}>
      <figcaption className="sr-only">
        Diagram of the workspace Atlas generates: a my-app repository with an
        apps/web application split into thin routes, isolated feature modules,
        and shared lib modules for the API client, auth, config, and
        observability. Shared UI and config packages sit beside it, AGENTS.md
        gives developers and coding agents the same conventions, and every
        change passes doctor, lint, typecheck, test, and build.
      </figcaption>

      <div className="bp-sheet__frame" aria-hidden="true">
        <span className="bp-sheet__reg bp-sheet__reg--tl" />
        <span className="bp-sheet__reg bp-sheet__reg--tr" />
        <span className="bp-sheet__reg bp-sheet__reg--bl" />
        <span className="bp-sheet__reg bp-sheet__reg--br" />

        <div className="bp-sheet__head">
          <span className="bp-sheet__head-title">workspace.schematic</span>
          <span className="bp-sheet__head-meta">fig. 01</span>
        </div>

        <div className="bp-sheet__body">
          <div className="bp-cmd">
            <span className="bp-cmd__prompt">$</span>
            <span>atlas init my-app</span>
          </div>

          <div className="bp-wire bp-wire--generate">
            <span className="bp-wire__label">generates</span>
          </div>

          <div className="bp-zone">
            <span className="bp-zone__tab">my-app/ · source-owned</span>

            <div className="bp-zone__layout">
              <div className="bp-block bp-block--app">
                <span className="bp-block__tab">apps/web</span>

                <div className="bp-layer bp-layer--routes">
                  <code>app/</code>
                  <span>routes stay thin</span>
                </div>

                <div className="bp-layer bp-layer--features">
                  <span className="bp-layer__label">features/</span>
                  <ul className="bp-features">
                    {FEATURES.map((feature) => (
                      <li
                        key={feature.path}
                        className={cn(
                          "bp-feature",
                          "generated" in feature && "bp-feature--generated"
                        )}
                      >
                        <code>{feature.path}</code>
                        <span>{feature.note}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="bp-callout bp-callout--walls">
                    no cross-feature imports
                  </span>
                </div>

                <div className="bp-layer bp-layer--lib">
                  <span className="bp-layer__label">shared infrastructure</span>
                  <ul className="bp-modules">
                    {LIB_MODULES.map((module) => (
                      <li key={module.path} className="bp-module">
                        <code>{module.path}</code>
                        <span>{module.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bp-zone__side">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.name} className="bp-block bp-block--pkg">
                    <code>{pkg.name}</code>
                    <span>{pkg.note}</span>
                  </div>
                ))}

                <div className="bp-block bp-block--agents">
                  <code className="bp-agents__file">AGENTS.md</code>
                  <span className="bp-agents__note">one set of conventions</span>
                  <span className="bp-agents__note bp-agents__note--path">
                    + docs/how-we-build/
                  </span>
                  <ul className="bp-agents__readers">
                    <li>
                      <span className="bp-agents__dot" />
                      developers
                    </li>
                    <li>
                      <span className="bp-agents__dot bp-agents__dot--agent" />
                      coding agents
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bp-wire bp-wire--verify">
            <span className="bp-wire__label">every change</span>
          </div>

          <ol className="bp-gates">
            {GATES.map((gate) => (
              <li key={gate} className="bp-gate">
                {gate}
              </li>
            ))}
            <li className="bp-gate bp-gate--ship">ship</li>
          </ol>
        </div>

        <dl className="bp-sheet__titleblock">
          {TITLE_BLOCK.map((cell) => (
            <div
              key={cell.key}
              className={cn(
                "bp-sheet__cell",
                "wide" in cell && "bp-sheet__cell--wide"
              )}
            >
              <dt>{cell.key}</dt>
              <dd>{cell.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  )
}
