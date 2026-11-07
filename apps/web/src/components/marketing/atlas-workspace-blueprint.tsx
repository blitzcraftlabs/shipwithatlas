import { cn } from "@atlas/ui"

const FEATURES = [
  { path: "billing" },
  { path: "projects" },
  { path: "+ next", generated: true },
] as const

const SHARED_MODULES = ["@/lib/api", "@/lib/auth", "@/config", "@/lib/telemetry"] as const

const PACKAGES = [
  { name: "ui", note: "tokens · primitives" },
  { name: "config", note: "lint · ts · jest" },
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
 * Engineering-drawing view of the workspace `atlas init` generates. The
 * drawing follows drafting line weights: the application is the heavy object
 * line and focal point, supporting parts use fine lines, and annotations sit
 * in blue so the eye reads the structure before the labels. Pure HTML/CSS so
 * labels stay crisp and the layout reflows on small screens.
 */
export function AtlasWorkspaceBlueprint({ className }: AtlasWorkspaceBlueprintProps) {
  return (
    <figure className={cn("bp-sheet", className)}>
      <figcaption className="sr-only">
        Diagram of the workspace Atlas generates: a source-owned my-app
        repository whose apps/web application is split into thin routes,
        isolated feature modules, and shared modules for the API client, auth,
        config, and telemetry. Shared ui and config packages sit beside it,
        AGENTS.md gives developers and coding agents the same conventions, and
        every change passes doctor, lint, typecheck, test, and build.
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

          <div className="bp-wire">
            <span className="bp-wire__label">generates</span>
          </div>

          <div className="bp-zone">
            <span className="bp-zone__tab">my-app/ · source-owned</span>

            <div className="bp-zone__layout">
              <div className="bp-app">
                <div className="bp-app__head">
                  <code>apps/web</code>
                  <span>application</span>
                </div>

                <div className="bp-app__row bp-app__row--routes">
                  <span className="bp-app__key">app/</span>
                  <div className="bp-app__val">
                    <span className="bp-routes">thin route files</span>
                  </div>
                </div>

                <div className="bp-app__row bp-app__row--features">
                  <span className="bp-app__key">features/</span>
                  <div className="bp-app__val">
                    <ul className="bp-features">
                      {FEATURES.map((feature) => (
                        <li
                          key={feature.path}
                          className={cn(
                            "bp-feature",
                            "generated" in feature && "bp-feature--generated"
                          )}
                        >
                          {feature.path}
                        </li>
                      ))}
                    </ul>
                    <span className="bp-note">isolated · no cross-feature imports</span>
                  </div>
                </div>

                <div className="bp-app__row bp-app__row--shared">
                  <span className="bp-app__key">shared</span>
                  <div className="bp-app__val">
                    <ul className="bp-modules">
                      {SHARED_MODULES.map((module) => (
                        <li key={module} className="bp-module">
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bp-zone__side">
                <div className="bp-part">
                  <code className="bp-part__title">packages/</code>
                  <ul className="bp-part__list">
                    {PACKAGES.map((pkg) => (
                      <li key={pkg.name}>
                        <code>{pkg.name}</code>
                        <span>{pkg.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bp-part bp-part--agents">
                  <code className="bp-part__title">AGENTS.md</code>
                  <span className="bp-part__sub">shared conventions</span>
                  <ul className="bp-readers">
                    <li>developers</li>
                    <li>coding agents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bp-wire">
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
