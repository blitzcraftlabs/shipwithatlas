import { HomeSection } from "@/components/home/home-section";
import { INCLUDED_ITEMS, WORKSPACE_TREE } from "@/lib/marketing/content/home";

export function WorkspaceSection() {
  return (
    <HomeSection
      id="workspace"
      label="What you get"
      title="A workspace you own, with the plumbing done."
      intro={
        <>
          <p>
            <code>atlas init</code> writes 423 files into a new pnpm workspace. There is no Atlas
            runtime to install from npm. The app depends on Next.js, React, TanStack Query and the
            other libraries in <code>package.json</code>, and the shared UI lives in your repository
            as a workspace package.
          </p>
          <p>
            The difference is that the pieces already fit together. The API client injects auth
            tokens, retries transient failures, and tags each request with a correlation ID. Lint
            rules keep each layer where it belongs.
          </p>
        </>
      }
    >
      <div className="home-workspace">
        <figure className="home-file">
          <figcaption className="home-file__bar">Workspace layout</figcaption>
          <ul className="home-tree" aria-label="Top-level layout of a new Atlas workspace">
            {WORKSPACE_TREE.map((entry) => (
              <li key={entry.path} className="home-tree__row">
                <span className="home-tree__path">{entry.path}</span>
                {entry.note ? <span className="home-tree__note">{entry.note}</span> : null}
              </li>
            ))}
          </ul>
        </figure>

        <dl className="home-included">
          {INCLUDED_ITEMS.map((item) => (
            <div key={item.name} className="home-included__row">
              <dt className="home-included__name">{item.name}</dt>
              <dd className="home-included__detail">{item.detail}</dd>
              <dd className="home-included__path">
                <code>{item.path}</code>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </HomeSection>
  );
}
