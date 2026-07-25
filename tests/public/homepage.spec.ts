import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Phephetha Auto Centre/)
  })

  test("navigation links are visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "PHEPHETHA" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Parts Store" })).toBeVisible()
    await expect(page.getByRole("link", { name: "About" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible()
  })

  test("hero section renders", async ({ page }) => {
    const hero = page.locator("section").first()
    await expect(hero).toBeVisible()
  })

  test("services section renders", async ({ page }) => {
    await expect(page.getByText("Our Services")).toBeVisible()
  })

  test("featured products section renders", async ({ page }) => {
    await expect(page.getByText("Featured Products")).toBeVisible()
  })

  test("footer renders with contact info", async ({ page }) => {
    const footer = page.locator("footer")
    await expect(footer).toBeVisible()
    await expect(footer.getByText(/phephetha/i)).toBeVisible()
  })

  test("navigation to services page works", async ({ page }) => {
    await page.getByRole("link", { name: "Services" }).first().click()
    await expect(page).toHaveURL(/\/services/)
    await expect(page.getByText("Professional Automotive Services")).toBeVisible()
  })

  test("navigation to parts page works", async ({ page }) => {
    await page.getByRole("link", { name: "Parts Store" }).first().click()
    await expect(page).toHaveURL(/\/parts/)
    await expect(page.getByText("Shop Auto Parts")).toBeVisible()
  })

  test("mobile menu toggle works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const menuButton = page.getByRole("button", { name: "Menu" })
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(page.getByText("PHEPHETHA")).toBeVisible()
  })
})
