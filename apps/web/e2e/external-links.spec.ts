import { expect, test } from "@playwright/test";

import { CONSULTING_PATH, HOME_PATH } from "../src/lib/marketing/constants";

/**
 * External destination check. Third-party sites rate-limit and bot-block
 * automated clients, so this runs only when CHECK_EXTERNAL_LINKS=1 and
 * never as part of the default CI gate. 401/403/429 are reported as
 * inconclusive rather than broken; only 404/410 and 5xx fail.
 */
test.skip(!process.env.CHECK_EXTERNAL_LINKS, "Set CHECK_EXTERNAL_LINKS=1 to verify external links");

test("external marketing destinations resolve", async ({ page, request }) => {
  test.setTimeout(120_000);
  const hrefs = new Set<string>();
  for (const path of [HOME_PATH, CONSULTING_PATH]) {
    await page.goto(path);
    const pageHrefs = await page
      .locator('a[href^="http"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    pageHrefs.forEach((href) => hrefs.add(href));
  }

  const broken: string[] = [];
  const inconclusive: string[] = [];
  for (const href of hrefs) {
    const response = await request.get(href, { maxRedirects: 5, timeout: 20_000 });
    const status = response.status();
    if ([401, 403, 429].includes(status)) inconclusive.push(`${status} ${href}`);
    else if (status === 404 || status === 410 || status >= 500) broken.push(`${status} ${href}`);
  }

  for (const entry of inconclusive) {
    test.info().annotations.push({ type: "inconclusive (blocked automation)", description: entry });
  }
  expect(broken).toEqual([]);
});
