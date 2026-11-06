import { cn } from "@atlas/ui";

interface HomeSectionProps {
  id: string;
  /** Short monospace label above the heading. */
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Shared section frame: hairline rule, label, heading, intro, then content. */
export function HomeSection({ id, label, title, intro, children, className }: HomeSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={cn("home-section", className)} aria-labelledby={headingId}>
      <div className="home-container">
        <header className="home-section__header">
          <p className="home-label">{label}</p>
          <div className="home-section__heading-group">
            <h2 id={headingId} className="home-section__title">
              {title}
            </h2>
            {intro ? <div className="home-section__intro">{intro}</div> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
