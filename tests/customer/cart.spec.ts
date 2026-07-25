import { test, expect } from "@playwright/test"

test.describe("Cart Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cart")
  })

  test("empty cart shows empty state", async ({ page }) => {
    await expect(page.getByText("Your cart is empty")).toBeVisible()
    await expect(page.getByText("Looks like you haven't added any products yet")).toBeVisible()
  })

  test("add item from product page", async ({ page }) => {
    await page.goto("/parts/p1")
    const addButton = page.getByRole("button", { name: /add to cart/i })
    await addButton.click()
    await page.waitForTimeout(500)
  })

  test("cart page shows items after adding", async ({ page }) => {
    await page.goto("/parts/p1")
    await page.getByRole("button", { name: /add to cart/i }).click()
    await page.waitForTimeout(500)

    await page.goto("/cart")
    await expect(page.getByText("Shopping Cart")).toBeVisible()
  })

  test("continue shopping link is visible in empty cart", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Shop Now/i })).toBeVisible()
  })
})

test.describe("Cart - with items", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/parts/p1")
    await page.getByRole("button", { name: /add to cart/i }).click()
    await page.waitForTimeout(500)
    await page.goto("/parts/p2")
    await page.getByRole("button", { name: /add to cart/i }).click()
    await page.waitForTimeout(500)
    await page.goto("/cart")
  })

  test("cart page shows items", async ({ page }) => {
    await expect(page.getByText("Shopping Cart")).toBeVisible()
    await expect(page.getByText(/item/)).toBeVisible()
  })

  test("cart total is displayed", async ({ page }) => {
    await expect(page.getByText("Order Summary")).toBeVisible()
  })
})
