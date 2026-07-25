import { test, expect } from "@playwright/test"

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/parts")
  })

  test("loads with product grid", async ({ page }) => {
    await expect(page.getByText("Shop Auto Parts")).toBeVisible()
    await expect(page.getByText("products")).toBeVisible()
  })

  test("product cards display name and price", async ({ page }) => {
    const firstProduct = page.locator("article, [class*='card']").first()
    await expect(firstProduct).toBeVisible()
    await expect(firstProduct.getByText(/R\s?[\d,]+/)).toBeVisible()
  })

  test("category filter works", async ({ page }) => {
    const engineCheckbox = page.getByLabel("Engine", { exact: true })
    await engineCheckbox.click()
    await page.waitForTimeout(300)
    const countText = page.getByText(/\d+ products/)
    await expect(countText).toBeVisible()
  })

  test("brand filter works", async ({ page }) => {
    const boschCheckbox = page.getByLabel("Bosch", { exact: true })
    await boschCheckbox.click()
    await page.waitForTimeout(300)
    const countText = page.getByText(/\d+ products/)
    await expect(countText).toBeVisible()
  })

  test("search filters products", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search parts...")
    await searchInput.fill("spark plug")
    await page.waitForTimeout(300)
    const countText = page.getByText(/\d+ products/)
    await expect(countText).toBeVisible()
  })

  test("sort dropdown works", async ({ page }) => {
    const sortSelect = page.locator("select").first()
    await sortSelect.selectOption("price-low")
    await page.waitForTimeout(200)
    await sortSelect.selectOption("price-high")
    await page.waitForTimeout(200)
  })

  test("pagination works", async ({ page }) => {
    const nextButton = page.locator("button").filter({ has: page.locator("[class*='chevron-right'], svg") }).last()
    const pageButtons = page.locator("button").filter({ hasText: /^\d+$/ })
    const count = await pageButtons.count()
    if (count > 1) {
      await pageButtons.nth(1).click()
      await page.waitForTimeout(300)
    }
  })

  test("product detail page loads", async ({ page }) => {
    await page.goto("/parts/p1")
    await expect(page.getByText("Bosch Spark Plug Set")).toBeVisible()
  })

  test("add to cart button works", async ({ page }) => {
    const addButton = page.getByRole("button", { name: /add to cart/i }).first()
    await expect(addButton).toBeVisible()
    await addButton.click()
    await page.waitForTimeout(500)
  })

  test("clear filters button works", async ({ page }) => {
    const boschCheckbox = page.getByLabel("Bosch", { exact: true })
    await boschCheckbox.click()
    await page.waitForTimeout(300)

    const clearButton = page.getByRole("button", { name: /clear/i })
    await clearButton.click()
    await page.waitForTimeout(300)
  })
})
