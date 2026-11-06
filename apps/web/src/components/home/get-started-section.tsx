import { ExternalLink } from "@/components/home/external-link";
import { HomeSection } from "@/components/home/home-section";
import { CodeCopyButton } from "@/components/marketing/code-copy-button";
import { CommandStrip } from "@/components/marketing/command-strip";
import {
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PLATFORM_REPO_URL,
  PREREQUISITES,
  QUICK_START_SCRIPT,
  QUICK_START_STEPS,
  QUICKSTART_DOCS_URL,
  REPOSITORY_DEV_SCRIPT,
} from "@/lib/marketing/constants";

const NEXT_COMMANDS = [
  {
    command: "pnpm dlx @blitzcraftlabs/atlas generate feature invoices --query",
    note: "add your first feature",
  },
  { command: "pnpm lint && pnpm typecheck && pnpm test", note: "the same checks CI runs" },
  { command: "pnpm dlx @blitzcraftlabs/atlas doctor", note: "confirm nothing has drifted" },
] as const;

export function GetStartedSection() {
  return (
    <HomeSection
      id="get-started"
      label="Get started"
      title="Install Atlas and run it locally."
      intro={
        <p>
          You need{" "}
          {PREREQUISITES.map((item, index) => (
            <span key={item.name}>
              {index > 0 ? " and " : null}
              {item.name} <code>{item.version}</code>
            </span>
          ))}
          . Four commands take you from an empty folder to the app on <code>localhost:3000</code>.
        </p>
      }
    >
      <div className="home-start">
        <div className="home-start__steps">
          <div className="home-start__steps-head">
            <span className="home-label">Quick start</span>
            <CodeCopyButton
              code={QUICK_START_SCRIPT}
              label="Copy all quick start commands"
              visibleLabel="Copy all"
              className="home-copy-button home-copy-button--labeled"
            />
          </div>
          <ol className="home-steps">
            {QUICK_START_STEPS.map((step) => (
              <li key={step.index} className="home-steps__item">
                <p className="home-steps__text">
                  <span className="home-steps__title">{step.title}.</span> {step.description}
                </p>
                {step.commands.map((command) => (
                  <CommandStrip
                    key={command}
                    command={command}
                    copyLabel={`Copy command: ${command}`}
                    className="home-step-strip"
                  />
                ))}
              </li>
            ))}
          </ol>
        </div>

        <div className="home-start__aside">
          <h3 className="home-start__subtitle">After that</h3>
          <ul className="home-next">
            {NEXT_COMMANDS.map((item) => (
              <li key={item.command}>
                <code className="home-next__command">{item.command}</code>
                <span className="home-next__note">{item.note}</span>
              </li>
            ))}
          </ul>

          <h3 className="home-start__subtitle">Links</h3>
          <ul className="home-start__links">
            <li>
              <ExternalLink href={QUICKSTART_DOCS_URL}>Quickstart guide</ExternalLink>
            </li>
            <li>
              <ExternalLink href={NPM_PACKAGE_URL}>{NPM_PACKAGE_NAME} on npm</ExternalLink>
            </li>
            <li>
              <ExternalLink href={PLATFORM_REPO_URL}>Source on GitHub</ExternalLink>
            </li>
          </ul>

          <details className="home-contrib">
            <summary>Working on Atlas itself?</summary>
            <p>
              Clone the platform repository instead. You don&apos;t need this to build an app with
              Atlas.
            </p>
            <div className="home-contrib__code">
              <pre>
                <code>{REPOSITORY_DEV_SCRIPT}</code>
              </pre>
              <CodeCopyButton
                code={REPOSITORY_DEV_SCRIPT}
                label="Copy repository development commands"
                className="home-copy-button home-contrib__copy"
              />
            </div>
          </details>
        </div>
      </div>
    </HomeSection>
  );
}
