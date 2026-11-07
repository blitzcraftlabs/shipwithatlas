import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import {
  FOOTER_NAV_GROUPS,
  FOOTER_TAGLINE,
  LICENSE_URL,
  type NavLink,
  PLATFORM_REPO_URL,
  SITE_NAME,
} from "@/lib/marketing/constants"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function FooterNavLink({ link }: { link: NavLink }) {
  if (link.internal) {
    return (
      <Link href={link.href} className="bp-footer__link">
        {link.label}
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="bp-footer__link"
    >
      {link.label}
      <ArrowUpRight className="bp-footer__link-arrow" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bp-footer">
      <div className="bp-footer__scale" aria-hidden="true" />
      <div className="atlas-marketing__gutter">
        <div className="bp-footer__main">
          <div className="bp-footer__brand">
            <Link href="/" className="bp-footer__logo">
              <span
                className="atlas-marketing__logo-mark bp-footer__logo-mark"
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v14M3 10h14" />
                  <rect x="7" y="7" width="6" height="6" />
                </svg>
              </span>
              {SITE_NAME}
            </Link>
            <p className="bp-footer__tagline">{FOOTER_TAGLINE}</p>
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-footer__repo"
            >
              <GitHubIcon className="bp-footer__repo-icon" />
              View repository
              <ArrowUpRight className="bp-footer__link-arrow" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="bp-footer__groups">
            {FOOTER_NAV_GROUPS.map((group) => (
              <nav
                key={group.title}
                className="bp-footer__group"
                aria-label={group.title}
              >
                <h3 className="bp-footer__group-heading">{group.title}</h3>
                <ul className="bp-footer__group-links">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="bp-footer__legal">
          <p>
            &copy; {currentYear} {SITE_NAME}
          </p>
          <p>
            Open source ·{" "}
            <a
              href={LICENSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-footer__legal-link"
            >
              Apache License 2.0
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
