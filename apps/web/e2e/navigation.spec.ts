import { expect, type Locator, type Page, test } from "@playwright/test";

import {
  CONSULTING_PATH,
  FOOTER_NAV_GROUPS,
  HEADER_ACTIONS,
  HOME_PATH,
  NAV_LINKS,
} from "../src/lib/marketing/constants";

/**
 * Public marketing navigation. Every expectation is driven by the shared
 * navigation config, so a broken or relative destination fails here the
 * moment it lands in `NAV_LINKS`, `HEADER_ACTIONS`, or the footer groups.
 * External destinations are checked separately in external-links.spec.ts.
 */

const MARKETING_PAGES = [HOME_PATH, CONSULTING_PATH] as const;
const SECTION_LINKS = NAV_LINKS.filter((link) => link.sectionId);
const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 375, height: 812 };

function mainNav(page: Page) {
  return page.getByRole("navigation", { name: "Main" });
}

function mobileMenu(page: Page) {
  return page.getByRole("dialog");
}

/** The section must sit just below the sticky header, not under it. */
async function expectSectionClearOfHeader(page: Page, sectionId: string) {
  await expect
    .poll(async () =>
      page.evaluate((id) => {
        const section = document.getElementById(id);
        const header = document.querySelector("header");
        if (!section || !header) return Number.NaN;
        return Math.round(
          section.getBoundingClientRect().top - header.getBoundingClientRect().bottom
        );
      }, sectionId)
    )
    .toBeGreaterThanOrEqual(0);

  const gap = await page.evaluate((id) => {
    const section = document.getElementById(id)!;
    const header = document.querySelector("header")!;
    return section.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
  }, sectionId);
  expect(gap).toBeLessThan(48);
}

async function openMobileMenu(page: Page): Promise<Locator> {
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = mobileMenu(page);
  await expect(menu).toBeVisible();
  return menu;
}

test.describe("navigation config", () => {
  test("internal header destinations are route-aware", () => {
    for (const link of NAV_LINKS.filter((item) => !item.external)) {
      expect(link.href, `${link.label} must not be a bare fragment`).toMatch(/^\//);
    }
    for (const link of SECTION_LINKS) {
      expect(link.href).toBe(`${HOME_PATH}#${link.sectionId}`);
    }
  });
});

test.describe("desktop header", () => {
  test.use({ viewport: DESKTOP });

  for (const start of MARKETING_PAGES) {
    for (const link of SECTION_LINKS) {
      test(`${link.label} from ${start} reaches the homepage section`, async ({
        page,
      }) => {
        await page.goto(start);
        await mainNav(page).getByRole("link", { name: link.label, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/#${link.sectionId}$`));
        await expect(page.locator(`#${link.sectionId}`)).toBeInViewport();
        await expectSectionClearOfHeader(page, link.sectionId!);
      });
    }
  }

  test("desktop nav renders every configured destination", async ({ page }) => {
    await page.goto(CONSULTING_PATH);
    const links = mainNav(page).getByRole("link");
    await expect(links).toHaveCount(NAV_LINKS.length);
    for (const [index, link] of NAV_LINKS.entries()) {
      await expect(links.nth(index)).toHaveAttribute("href", link.href);
    }
  });

  test("logo returns to the homepage from consulting", async ({ page }) => {
    await page.goto(CONSULTING_PATH);
    await page.getByRole("banner").getByRole("link", { name: "Atlas", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "The frontend decisions"
    );
  });

  test("homepage to consulting and back keeps history", async ({ page }) => {
    await page.goto(HOME_PATH);
    await page
      .getByRole("banner")
      .getByRole("link", { name: HEADER_ACTIONS.consulting.label })
      .click();
    await expect(page).toHaveURL(new RegExp(`${CONSULTING_PATH}$`));
    await expect(
      page.getByRole("banner").getByRole("link", { name: HEADER_ACTIONS.consulting.label })
    ).toHaveAttribute("aria-current", "page");

    await mainNav(page).getByRole("link", { name: SECTION_LINKS[3]!.label }).click();
    await expect(page).toHaveURL(new RegExp(`/#${SECTION_LINKS[3]!.sectionId}$`));

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`${CONSULTING_PATH}$`));
    await page.goForward();
    await expect(page).toHaveURL(new RegExp(`/#${SECTION_LINKS[3]!.sectionId}$`));
  });

  test("consulting links back to the homepage", async ({ page }) => {
    await page.goto(CONSULTING_PATH);
    await page.getByRole("main").getByRole("link", { name: "See Atlas" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: MOBILE });

  test("lists the same destinations as the desktop header", async ({ page }) => {
    await page.goto(HOME_PATH);
    const menu = await openMobileMenu(page);
    const nav = menu.getByRole("navigation", { name: "Mobile" });
    const expected = [
      ...NAV_LINKS.map((link) => link.href),
      HEADER_ACTIONS.repository.href,
      HEADER_ACTIONS.consulting.href,
    ];
    const hrefs = await nav
      .getByRole("link")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(hrefs).toEqual(expected);
  });

  test("traps focus, closes on Escape, and restores focus", async ({ page }) => {
    await page.goto(CONSULTING_PATH);
    const trigger = page.getByRole("button", { name: "Open menu" });
    const menu = await openMobileMenu(page);
    await expect
      .poll(() =>
        page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))
      )
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  for (const start of MARKETING_PAGES) {
    test(`selecting a section from ${start} closes the menu and scrolls`, async ({
      page,
    }) => {
      const link = SECTION_LINKS[2]!;
      await page.goto(start);
      const menu = await openMobileMenu(page);
      await menu.getByRole("link", { name: link.label, exact: true }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(new RegExp(`/#${link.sectionId}$`));
      await expect(page.locator(`#${link.sectionId}`)).toBeInViewport();
      await expectSectionClearOfHeader(page, link.sectionId!);
    });
  }

  test("menu links keep a touch-friendly height at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(HOME_PATH);
    const menu = await openMobileMenu(page);
    const heights = await menu
      .getByRole("link")
      .evaluateAll((links) => links.map((link) => link.getBoundingClientRect().height));
    for (const height of heights) expect(height).toBeGreaterThanOrEqual(44);
  });
});

test.describe("footer", () => {
  const internalFooterLinks = FOOTER_NAV_GROUPS.flatMap((group) =>
    group.links.filter((link) => link.internal)
  );

  for (const link of internalFooterLinks) {
    test(`footer ${link.label} navigates from the homepage`, async ({ page }) => {
      await page.goto(HOME_PATH);
      await page
        .getByRole("contentinfo")
        .getByRole("link", { name: link.label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${link.href}$`));
    });
  }

  test("footer logo returns to the homepage", async ({ page }) => {
    await page.goto(CONSULTING_PATH);
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Atlas", exact: true })
      .click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("internal link audit", () => {
  for (const start of MARKETING_PAGES) {
    test(`every internal link and anchor on ${start} resolves`, async ({
      page,
      request,
    }) => {
      await page.goto(start);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((links) => [
          ...new Set(links.map((link) => link.getAttribute("href") ?? "")),
        ]);

      const internal = hrefs.filter((href) => href.startsWith("/") || href.startsWith("#"));
      expect(internal.length).toBeGreaterThan(0);

      const idsByPath = new Map<string, Set<string>>();
      const idsOn = async (path: string) => {
        if (!idsByPath.has(path)) {
          const probe = await page.context().newPage();
          await probe.goto(path);
          const ids = await probe
            .locator("[id]")
            .evaluateAll((nodes) => nodes.map((node) => node.id));
          idsByPath.set(path, new Set(ids));
          await probe.close();
        }
        return idsByPath.get(path)!;
      };

      for (const href of internal) {
        const [rawPath, hash] = href.split("#");
        // A bare fragment only counts when its target is on this page
        const path = rawPath || start;

        const response = await request.get(path);
        expect(response.status(), `${href} on ${start}`).toBe(200);

        if (hash) {
          expect((await idsOn(path)).has(hash), `#${hash} missing on ${path}`).toBe(true);
        }
      }
    });

    test(`external links on ${start} open safely`, async ({ page }) => {
      await page.goto(start);
      const unsafe = await page
        .locator('a[target="_blank"]')
        .evaluateAll((links) =>
          links
            .filter((link) => !/\bnoopener\b/.test(link.getAttribute("rel") ?? ""))
            .map((link) => link.getAttribute("href"))
        );
      expect(unsafe).toEqual([]);

      const mailto = await page
        .locator('a[href^="mailto:"]')
        .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
      expect(mailto).toEqual(["mailto:hello@thedanielmark.com"]);
    });
  }
});
