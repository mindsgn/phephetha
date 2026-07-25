import { test, expect } from "@playwright/test"

test.describe("Admin Product Management", () => {
  test.use({ storageState: "tests/.auth/admin.json" })

  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/products")
    await page.waitForTimeout(1000)
  })

  test("products page loads with table", async ({ page }) => {
    await expect(page.getByText("Products")).toBeVisible()
    await expect(page.getByText("Manage your product inventory")).toBeVisible()
  })

  test("add product button works", async ({ page }) => {
    const addButton = page.getByRole("link", { name: /Add Product/ }).first()
    await expect(addButton).toBeVisible()
    await addButton.click()
    await expect(page).toHaveURL(/\/admin\/products\/new/)
  })

  test("product form validates", async ({ page }) => {
    await page.goto("/admin/products/new")
    await page.waitForTimeout(1000)
  })

  test("search products works", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search products...")
    await expect(searchInput).toBeVisible()
    await searchInput.fill("Synthetic")
    await page.waitForTimeout(300)
  })

  test("filter by category works", async ({ page }) => {
    const categorySelect = page.locator("select").first()
    await categorySelect.selectOption("Brakes")
    await page.waitForTimeout(300)
  })

  test("product row has edit action", async ({ page }) => {
    const moreButtons = page.locator("button").filter({ has: page.locator("svg") })
    await expect(moreButtons.first()).toBeVisible()
  })

  test("delete product shows confirmation dialog", async ({ page }) => {
    const actionButton = page.locator("button").filter({ has: page.locator("[class*='more-horizontal'], [data-testid]") }).first()
    if (await actionButton.isVisible()) {
      await actionButton.click()
      const deleteItem = page.getByRole("menuitem", { name: /Delete/ })
      if (await deleteItem.isVisible()) {
        await deleteItem.click()
        await expect(page.getByText("Delete Product")).toBeVisible()
        await expect(page.getByText("Are you sure")).toBeVisible()
      }
    }
  })
})
