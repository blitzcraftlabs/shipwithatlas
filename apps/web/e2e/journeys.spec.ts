import { expect, test } from "@playwright/test";

test.describe("Critical web journeys", () => {
  test("mobile navigation opens and links to consulting", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Work with me" }).click();
    await expect(page).toHaveURL(/\/consulting/);
    await expect(
      page.getByRole("heading", { name: /Bring the Atlas approach/i })
    ).toBeVisible();
  });

  test("desktop header reaches consulting via primary CTA", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.getByRole("banner").getByText("Work with me").click();
    await expect(page).toHaveURL(/\/consulting/);
  });

  test("primary hero CTA is reachable", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Explore the reference app" })
    ).toBeVisible();
  });
});
