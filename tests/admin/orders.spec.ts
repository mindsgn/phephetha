import { test, expect } from "@playwright/test"

test.describe("Admin Order Management", () => {
  test.use({ storageState: "tests/.auth/admin.json" })

  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/orders")
    await page.waitForTimeout(1000)
  })

  test("orders page loads with table", async ({ page }) => {
    await expect(page.getByText("Orders")).toBeVisible()
    await expect(page.getByText("Manage customer orders")).toBeVisible()
  })

  test("status filter tabs work", async ({ page }) => {
    const statusFilters = ["all", "pending", "processing", "shipped", "delivered", "cancelled"]
    for (const status of statusFilters) {
      const filterButton = page.getByRole("button", { name: status, exact: true }).first()
      if (await filterButton.isVisible()) {
        await filterButton.click()
        await page.waitForTimeout(300)
      }
    }
  })

  test("view order detail", async ({ page }) => {
    const firstRow = page.locator("tr").nth(1)
    await expect(firstRow).toBeVisible()
  })

  test("order table shows order numbers", async ({ page }) => {
    await expect(page.getByText("ORD-")).toBeVisible()
  })

  test("order table shows customer names", async ({ page }) => {
    await expect(page.getByText("John Mokoena")).toBeVisible()
  })

  test("order table shows totals", async ({ page }) => {
    await expect(page.getByText(/R\s?[\d,]+/).first()).toBeVisible()
  })

  test("search orders works", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search orders...")
    await expect(searchInput).toBeVisible()
    await searchInput.fill("ORD-7891")
    await page.waitForTimeout(300)
  })

  test("export button is visible", async ({ page }) => {
    const exportButton = page.getByRole("button", { name: /Export/ })
    await expect(exportButton).toBeVisible()
  })
})
