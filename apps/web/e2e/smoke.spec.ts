import { expect, test } from "@playwright/test";

const CONTACT_EMAIL = "hello@thedanielmark.com";

test.describe("Smoke Tests", () => {
  test("loads home page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Atlas", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /The frontend decisions/i })
    ).toBeVisible();
  });

  test("shows the Atlas install command and quick start", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("group", { name: "Create a new Atlas app" });
    await expect(
      hero.getByText("pnpm dlx @blitzcraftlabs/atlas init my-app")
    ).toBeVisible();
    await expect(
      hero.getByRole("button", { name: "Copy install command" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Install Atlas/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /@blitzcraftlabs\/atlas on npm/i }).first()
    ).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@blitzcraftlabs/atlas"
    );
  });

  test("leads the hero with the install command before secondary links", async ({
    page,
  }) => {
    await page.goto("/");
    const install = page.getByRole("group", { name: "Create a new Atlas app" });
    const secondary = page.getByRole("navigation", { name: "More ways to explore Atlas" });
    await expect(
      secondary.getByRole("link", { name: /Atlas on GitHub/i })
    ).toHaveAttribute("href", "https://github.com/blitzcraftlabs/atlas");
    await expect(
      secondary.getByRole("link", { name: /@blitzcraftlabs\/atlas on npm/i })
    ).toHaveAttribute("href", "https://www.npmjs.com/package/@blitzcraftlabs/atlas");
    await expect(
      secondary.getByRole("link", { name: /Atlas documentation/i })
    ).toHaveAttribute(
      "href",
      "https://github.com/blitzcraftlabs/atlas/tree/main/docs/public"
    );
    const installBox = await install.boundingBox();
    const secondaryBox = await secondary.boundingBox();
    expect(installBox && secondaryBox && installBox.y < secondaryBox.y).toBe(true);
  });

  test("keeps copy button states light when the OS switches to dark", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const button = page.getByRole("button", { name: "Copy install command" });
    const hoverBackground = async () => {
      await page.mouse.move(0, 0);
      await button.hover();
      await page.waitForTimeout(250);
      return button.evaluate((el) => getComputedStyle(el).backgroundColor);
    };

    const light = await hoverBackground();
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    expect(await hoverBackground()).toBe(light);
  });

  test("navigates to consulting page", async ({ page }) => {
    await page.goto("/consulting");
    await expect(
      page.getByRole("heading", { name: /Bring the Atlas approach/i })
    ).toBeVisible();
  });

  test("consulting page includes contact section", async ({ page }) => {
    await page.goto("/consulting");
    const contact = page.getByRole("region", { name: "Talk about your frontend" });
    await expect(contact.getByRole("link", { name: CONTACT_EMAIL })).toBeVisible();
    await expect(
      contact.getByRole("link", { name: "Talk about your frontend" })
    ).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  test("examples route is not shipped", async ({ page }) => {
    const response = await page.goto("/examples");
    expect(response?.status()).toBe(404);
  });

  test("does not expose reference product routes", async ({ page }) => {
    const response = await page.goto("/reference");
    expect(response?.status()).toBe(404);
  });
});
