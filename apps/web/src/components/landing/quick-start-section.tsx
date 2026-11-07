import { ArrowUpRight, ChevronRight } from "lucide-react";

import { CodeCopyButton } from "@/components/marketing/code-copy-button";
import { CommandStrip } from "@/components/marketing/command-strip";
import { SectionLabel } from "@/components/marketing/section-label";
import {
  HOME_SECTION_IDS,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PREREQUISITES,
  QUICK_START_SCRIPT,
  QUICK_START_STEPS,
  QUICKSTART_DOCS_URL,
  REPOSITORY_DEV_SCRIPT,
} from "@/lib/marketing/constants";

export function QuickStartSection() {
  return (
    <section
      id={HOME_SECTION_IDS.getStarted}
      className="bp-section bp-section--white bp-start"
      aria-labelledby="get-started-heading"
    >
      <div className="atlas-marketing__gutter bp-start__layout">
        <div className="bp-start__intro">
          <SectionLabel index="02">Quick start</SectionLabel>
          <h2 id="get-started-heading" className="bp-h2">
            Install Atlas.
            {" "}<br />
            Start with the product.
          </h2>
          <p className="bp-lead">
            The Atlas CLI creates a complete Next.js workspace in a directory you own. Three steps
            from an empty folder to a running app.
          </p>

          <div className="bp-start__prereqs">
            <h3 className="bp-start__prereqs-title">Prerequisites</h3>
            <ul className="bp-start__prereqs-list">
              {PREREQUISITES.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <code>{item.version}</code>
                </li>
              ))}
            </ul>
          </div>

          <div className="bp-actions">
            <a
              href={NPM_PACKAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-button bp-button--primary"
            >
              View {NPM_PACKAGE_NAME} on npm
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={QUICKSTART_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-arrow-link"
            >
              Read the quickstart docs
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="bp-start__sheet">
          <div className="bp-start__sheet-head">
            <span className="bp-start__sheet-title">New Atlas project</span>
            <span className="bp-start__copy-all">
              <span className="bp-start__copy-all-label" aria-hidden="true">
                Copy all
              </span>
              <CodeCopyButton
                code={QUICK_START_SCRIPT}
                label="Copy all quick start commands"
                className="bp-copy"
              />
            </span>
          </div>

          <ol className="bp-start__steps">
            {QUICK_START_STEPS.map((step) => (
              <li key={step.index} className="bp-start__step">
                <span className="bp-start__step-index" aria-hidden="true">
                  {step.index}
                </span>
                <div className="bp-start__step-main">
                  <h3 className="bp-start__step-title">{step.title}</h3>
                  <p className="bp-start__step-body">{step.description}</p>
                  <div className="bp-start__commands">
                    {step.commands.map((command) => (
                      <CommandStrip
                        key={command}
                        command={command}
                        copyLabel={`Copy command: ${command}`}
                        className="bp-cmd"
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <details className="bp-start__contrib">
            <summary className="bp-start__contrib-summary">
              <ChevronRight className="bp-start__contrib-chevron" aria-hidden="true" />
              Contributing to Atlas itself? Clone the repository instead.
            </summary>
            <div className="bp-start__contrib-body">
              <p>
                These commands set up the Atlas source repository for platform development. You
                don&apos;t need them to build an app with Atlas.
              </p>
              <div className="bp-start__contrib-code">
                <pre>
                  <code>{REPOSITORY_DEV_SCRIPT}</code>
                </pre>
                <CodeCopyButton
                  code={REPOSITORY_DEV_SCRIPT}
                  label="Copy repository development commands"
                  className="bp-copy bp-copy--inverse"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
