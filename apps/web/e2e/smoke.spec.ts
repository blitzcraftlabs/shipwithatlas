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

  test("navigates to consulting page", async ({ page }) => {
    await page.goto("/consulting");
    await expect(
      page.getByRole("heading", { name: /Bring the Atlas approach/i })
    ).toBeVisible();
  });

  test("consulting page includes contact section", async ({ page }) => {
    await page.goto("/consulting");
    await expect(page.getByRole("link", { name: CONTACT_EMAIL })).toBeVisible();
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
