"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Button ,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@atlas/ui"

import {
  CONSULTING_PATH,
  HEADER_PRIMARY_CTA_LABEL,
  NAV_LINKS,
  PLATFORM_REPO_URL,
  SITE_NAME,
} from "@/lib/marketing/constants"

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="atlas-marketing__header">
      <div className="atlas-marketing__gutter flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-8 lg:gap-10">
          <Link
            href="/"
            className="atlas-marketing__logo rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {SITE_NAME}
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-marketing__nav-link rounded-md px-3 py-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="atlas-marketing__nav-link rounded-md px-3 py-2"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={
              <a
                href={PLATFORM_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View repository
              </a>
            }
            variant="outline"
            className="atlas-btn-secondary hidden sm:inline-flex"
          />
          <Button
            nativeButton={false}
            render={<Link href={CONSULTING_PATH}>{HEADER_PRIMARY_CTA_LABEL}</Link>}
            className="atlas-btn-primary hidden md:inline-flex"
          />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="size-9 lg:hidden" />
              }
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md px-3 py-2.5 text-base"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <a
                  href={PLATFORM_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-md px-3 py-2.5 text-base"
                  onClick={() => setOpen(false)}
                >
                  View repository
                </a>
                <Link
                  href={CONSULTING_PATH}
                  className="mt-1 rounded-md px-3 py-2.5 text-base font-medium text-primary"
                  onClick={() => setOpen(false)}
                >
                  {HEADER_PRIMARY_CTA_LABEL}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
