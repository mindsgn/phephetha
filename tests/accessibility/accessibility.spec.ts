import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.describe("Accessibility Tests", () => {
  test("homepage passes accessibility checks", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test("services page passes accessibility checks", async ({ page }) => {
    await page.goto("/services")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test("products page passes accessibility checks", async ({ page }) => {
    await page.goto("/parts")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test("login page passes accessibility checks", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test("register page passes accessibility checks", async ({ page }) => {
    await page.goto("/register")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test("contact page passes accessibility checks", async ({ page }) => {
    await page.goto("/contact")
    await page.waitForLoadState("networkidle")

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
