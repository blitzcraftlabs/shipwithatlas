import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import {
  FOOTER_NAV_GROUPS,
  FOOTER_TAGLINE,
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
      <Link href={link.href} className="atlas-footer__link">
        {link.label}
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="atlas-footer__link"
    >
      {link.label}
      <ArrowUpRight className="atlas-footer__link-arrow" aria-hidden="true" />
    </a>
  )
}

export function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="atlas-footer">
      <div className="atlas-marketing__gutter">
        <div className="atlas-footer__main">
          <div className="atlas-footer__brand">
            <Link href="/" className="atlas-footer__logo">
              {SITE_NAME}
            </Link>
            <p className="atlas-footer__tagline">{FOOTER_TAGLINE}</p>
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-footer__repo-link"
            >
              <GitHubIcon className="atlas-footer__repo-icon" />
              View repository
              <ArrowUpRight
                className="atlas-footer__repo-arrow"
                aria-hidden="true"
              />
            </a>
          </div>

          {FOOTER_NAV_GROUPS.map((group) => (
            <nav
              key={group.title}
              className="atlas-footer__group"
              aria-label={group.title}
            >
              <h3 className="atlas-footer__group-heading">{group.title}</h3>
              <ul className="atlas-footer__group-links">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="atlas-footer__legal">
          <p className="atlas-footer__legal-copy">
            &copy; {currentYear} {SITE_NAME}
          </p>
          <p className="atlas-footer__legal-meta">Open source · MIT licensed</p>
        </div>
      </div>
    </footer>
  )
}
