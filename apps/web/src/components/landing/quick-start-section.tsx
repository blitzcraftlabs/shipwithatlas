import { ArrowUpRight } from "lucide-react";

import { Button } from "@atlas/ui";

import { CodeCopyButton } from "@/components/marketing/code-copy-button";
import { CommandStrip } from "@/components/marketing/command-strip";
import { SectionEyebrow } from "@/components/marketing/section-eyebrow";
import {
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
    <section id="get-started" className="atlas-section" aria-labelledby="get-started-heading">
      <div className="atlas-marketing__gutter atlas-quick-start">
        <div className="atlas-quick-start__intro">
          <SectionEyebrow>Quick start</SectionEyebrow>
          <h2 id="get-started-heading" className="atlas-section__title">
            Install Atlas.
            <br />
            Start with the product.
          </h2>
          <p className="atlas-section__body">
            The Atlas CLI creates a complete Next.js workspace in a directory you own. Three steps
            from an empty folder to a running app.
          </p>

          <div className="atlas-quick-start__prereqs">
            <h3 className="atlas-quick-start__prereqs-title">Prerequisites</h3>
            <ul className="atlas-quick-start__prereqs-list">
              {PREREQUISITES.map((item) => (
                <li key={item.name}>
                  {item.name} <code>{item.version}</code>
                </li>
              ))}
            </ul>
          </div>

          <div className="atlas-quick-start__actions">
            <Button
              nativeButton={false}
              render={
                <a href={NPM_PACKAGE_URL} target="_blank" rel="noopener noreferrer">
                  View {NPM_PACKAGE_NAME} on npm
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              }
              size="lg"
              className="atlas-btn-primary"
            />
            <Button
              nativeButton={false}
              render={
                <a href={QUICKSTART_DOCS_URL} target="_blank" rel="noopener noreferrer">
                  Read the quickstart docs
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              }
              variant="outline"
              size="lg"
              className="atlas-btn-secondary"
            />
          </div>
        </div>

        <div className="atlas-quick-start__panel">
          <div className="atlas-quick-start__panel-head">
            <span className="atlas-quick-start__panel-title">New Atlas project</span>
            <CodeCopyButton
              code={QUICK_START_SCRIPT}
              label="Copy all quick start commands"
              className="atlas-quick-start__copy-all"
            />
          </div>
          <ol className="atlas-quick-start__steps">
            {QUICK_START_STEPS.map((step) => (
              <li key={step.index} className="atlas-quick-start__step">
                <div className="atlas-quick-start__step-head">
                  <span className="atlas-quick-start__step-index" aria-hidden="true">
                    {step.index}
                  </span>
                  <h3 className="atlas-quick-start__step-title">{step.title}</h3>
                </div>
                <p className="atlas-quick-start__step-body">{step.description}</p>
                {step.commands.map((command) => (
                  <CommandStrip
                    key={command}
                    command={command}
                    copyLabel={`Copy command: ${command}`}
                    className="atlas-quick-start__command"
                  />
                ))}
              </li>
            ))}
          </ol>

          <details className="atlas-quick-start__contrib">
            <summary className="atlas-quick-start__contrib-summary">
              Contributing to Atlas itself? Clone the repository instead.
            </summary>
            <p className="atlas-quick-start__contrib-body">
              These commands set up the Atlas source repository for platform development. You
              don&apos;t need them to build an app with Atlas.
            </p>
            <div className="atlas-quick-start__contrib-code">
              <pre>
                <code>{REPOSITORY_DEV_SCRIPT}</code>
              </pre>
              <CodeCopyButton
                code={REPOSITORY_DEV_SCRIPT}
                label="Copy repository development commands"
                className="atlas-quick-start__contrib-copy"
              />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
