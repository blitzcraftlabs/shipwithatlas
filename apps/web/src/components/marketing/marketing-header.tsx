"use client"

import { ArrowUpRight, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import {
  Button,
  buttonVariants,
  cn,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@atlas/ui"

import {
  HEADER_ACTIONS,
  HOME_PATH,
  NAV_LINKS,
  type NavLink,
  SITE_NAME,
} from "@/lib/marketing/constants"
import { BLUEPRINT_FONT_CLASS_NAME } from "@/lib/marketing/fonts"

function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("atlas-marketing__logo-mark", className)} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 3v14M3 10h14" />
        <rect x="7" y="7" width="6" height="6" />
      </svg>
    </span>
  )
}

/**
 * One link renderer for both the desktop header and the mobile menu, so the
 * two surfaces can never disagree about a destination or how it opens.
 */
function HeaderNavLink({
  link,
  className,
  pathname,
  onNavigate,
  children,
}: {
  link: NavLink
  className: string
  pathname: string
  onNavigate?: () => void
  children?: React.ReactNode
}) {
  const content = children ?? link.label

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  // Section anchors are never the "current page"; whole routes can be.
  const isCurrentPage = !link.sectionId && pathname === link.href

  return (
    <Link
      href={link.href}
      className={className}
      aria-current={isCurrentPage ? "page" : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  )
}

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname() ?? HOME_PATH
  const closeMenu = React.useCallback(() => setOpen(false), [])

  return (
    <header className="atlas-marketing__header">
      <div className="atlas-marketing__gutter flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-8 lg:gap-10">
          <Link
            href={HOME_PATH}
            className="atlas-marketing__logo"
            aria-current={pathname === HOME_PATH ? "page" : undefined}
          >
            <LogoMark />
            <span className="atlas-marketing__logo-word">{SITE_NAME}</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <HeaderNavLink
                key={link.href}
                link={link}
                pathname={pathname}
                className="atlas-marketing__nav-link px-3 py-2"
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Real links styled as buttons: a Base UI Button would announce them as buttons */}
          <a
            href={HEADER_ACTIONS.repository.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "atlas-header-btn atlas-header-btn--outline hidden sm:inline-flex"
            )}
          >
            {HEADER_ACTIONS.repository.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href={HEADER_ACTIONS.consulting.href}
            aria-current={
              pathname === HEADER_ACTIONS.consulting.href ? "page" : undefined
            }
            className={cn(
              buttonVariants(),
              "atlas-header-btn atlas-header-btn--primary hidden md:inline-flex"
            )}
          >
            {HEADER_ACTIONS.consulting.label}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="atlas-header-menu size-9 lg:hidden"
                />
              }
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={cn(
                "atlas-marketing bp-menu w-full max-w-xs gap-0",
                BLUEPRINT_FONT_CLASS_NAME
              )}
            >
              <SheetHeader className="bp-menu__header">
                <SheetTitle className="bp-menu__title">
                  <LogoMark />
                  {SITE_NAME}
                </SheetTitle>
              </SheetHeader>
              <nav className="bp-menu__nav" aria-label="Mobile">
                <p className="bp-menu__group-label" aria-hidden="true">
                  Navigate
                </p>
                <ul className="bp-menu__list">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <HeaderNavLink
                        link={link}
                        pathname={pathname}
                        className="bp-menu__link"
                        onNavigate={closeMenu}
                      >
                        {link.label}
                        {link.external ? (
                          <ArrowUpRight className="bp-menu__arrow" aria-hidden="true" />
                        ) : null}
                      </HeaderNavLink>
                    </li>
                  ))}
                </ul>
                <div className="bp-menu__actions">
                  <HeaderNavLink
                    link={HEADER_ACTIONS.repository}
                    pathname={pathname}
                    className="bp-button bp-button--outline bp-menu__action"
                    onNavigate={closeMenu}
                  >
                    {HEADER_ACTIONS.repository.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </HeaderNavLink>
                  <HeaderNavLink
                    link={HEADER_ACTIONS.consulting}
                    pathname={pathname}
                    className="bp-button bp-button--primary bp-menu__action"
                    onNavigate={closeMenu}
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
