import { HomeSection } from "@/components/home/home-section";
import { Terminal } from "@/components/home/terminal";
import { CLI_COMMANDS, DOCTOR_TRANSCRIPT, GENERATE_TRANSCRIPT } from "@/lib/marketing/content/home";

export function CliSection() {
  return (
    <HomeSection
      id="cli"
      label="The CLI"
      title="A small CLI for the parts only Atlas knows about."
      intro={
        <p>
          There is no <code>atlas dev</code> or <code>atlas build</code>. pnpm, Next.js and Git
          already do those jobs well. The CLI scaffolds code that follows the conventions, checks
          the repository for drift, and plans upgrades between Atlas versions.
        </p>
      }
    >
      <div className="home-cli">
        <dl className="home-commands">
          {CLI_COMMANDS.map((item) => (
            <div key={item.command} className="home-commands__row">
              <dt>
                <code>{item.command}</code>
              </dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>

        <div className="home-cli__terminals">
          <Terminal
            transcript={GENERATE_TRANSCRIPT}
            label="Output of atlas generate feature invoices --query --mutation --dry-run"
          />
          <Terminal transcript={DOCTOR_TRANSCRIPT} label="Output of atlas doctor" />
        </div>
      </div>
    </HomeSection>
  );
}
