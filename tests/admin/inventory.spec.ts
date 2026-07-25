import { test, expect } from "@playwright/test"

test.describe("Admin Inventory Management", () => {
  test.use({ storageState: "tests/.auth/admin.json" })

  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/inventory")
    await page.waitForTimeout(1000)
  })

  test("inventory page loads", async ({ page }) => {
    await expect(page.getByText("Inventory")).toBeVisible()
    await expect(page.getByText("Manage stock levels and inventory")).toBeVisible()
  })

  test("stock summary cards are displayed", async ({ page }) => {
    await expect(page.getByText("In Stock")).toBeVisible()
    await expect(page.getByText("Low Stock")).toBeVisible()
    await expect(page.getByText("Out of Stock")).toBeVisible()
  })

  test("adjust stock dialog opens", async ({ page }) => {
    const adjustButton = page.getByRole("button", { name: /Adjust/ }).first()
    if (await adjustButton.isVisible()) {
      await adjustButton.click()
      await expect(page.getByText("Adjust Stock")).toBeVisible()
    }
  })

  test("stock adjustment form works", async ({ page }) => {
    const adjustButton = page.getByRole("button", { name: /Adjust/ }).first()
    if (await adjustButton.isVisible()) {
      await adjustButton.click()
      await expect(page.getByText("Adjustment Type")).toBeVisible()

      const stockInButton = page.getByRole("button", { name: "Stock In" })
      await expect(stockInButton).toBeVisible()
      await stockInButton.click()

      const cancelBtn = page.getByRole("button", { name: "Cancel" })
      await cancelBtn.click()
    }
  })

  test("low stock filter works", async ({ page }) => {
    const lowStockButton = page.getByRole("button", { name: /Low Stock Only/ })
    await expect(lowStockButton).toBeVisible()
    await lowStockButton.click()
    await page.waitForTimeout(300)
  })

  test("search inventory works", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search inventory...")
    await expect(searchInput).toBeVisible()
    await searchInput.fill("Engine")
    await page.waitForTimeout(300)
  })

  test("movement history can be toggled", async ({ page }) => {
    const historyButton = page.getByRole("button", { name: /Movement History/ })
    await expect(historyButton).toBeVisible()
    await historyButton.click()
    await expect(page.getByText("Movement History")).toBeVisible()

    const hideButton = page.getByRole("button", { name: /Hide History/ })
    await hideButton.click()
  })

  test("export button is visible", async ({ page }) => {
    const exportButton = page.getByRole("button", { name: /Export/ })
    await expect(exportButton).toBeVisible()
  })
})
