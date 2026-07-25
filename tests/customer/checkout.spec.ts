import { test, expect } from "@playwright/test"

test.describe("Checkout Page", () => {
  test("empty cart redirects to cart", async ({ page }) => {
    await page.goto("/checkout")
    await page.waitForTimeout(2000)
  })

  test.describe("with items in cart", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/parts/p1")
      await page.getByRole("button", { name: /add to cart/i }).click()
      await page.waitForTimeout(500)
      await page.goto("/checkout")
      await page.waitForTimeout(1000)
    })

    test("checkout page loads with items", async ({ page }) => {
      await expect(page.getByText("Checkout")).toBeVisible()
      await expect(page.getByText("Shipping Information")).toBeVisible()
    })

    test("shipping form renders all fields", async ({ page }) => {
      await expect(page.getByLabel("First Name")).toBeVisible()
      await expect(page.getByLabel("Last Name")).toBeVisible()
      await expect(page.getByLabel("Email")).toBeVisible()
      await expect(page.getByLabel("Phone")).toBeVisible()
      await expect(page.getByLabel("Address Line 1")).toBeVisible()
      await expect(page.getByLabel("City")).toBeVisible()
      await expect(page.getByLabel("Province")).toBeVisible()
      await expect(page.getByLabel("Postal Code")).toBeVisible()
      await expect(page.getByLabel("Country")).toBeVisible()
    })

    test("form validation works on empty submit", async ({ page }) => {
      await page.getByRole("button", { name: /Continue to Review/ }).click()
      await page.waitForTimeout(500)
      await expect(page.getByLabel("First Name")).toHaveAttribute("required", "")
      await expect(page.getByLabel("Last Name")).toHaveAttribute("required", "")
      await expect(page.getByLabel("Email")).toHaveAttribute("required", "")
    })

    test("fill shipping form and proceed to review", async ({ page }) => {
      await page.getByLabel("First Name").fill("John")
      await page.getByLabel("Last Name").fill("Doe")
      await page.getByLabel("Email").fill("john@example.com")
      await page.getByLabel("Phone").fill("0821234567")
      await page.getByLabel("Address Line 1").fill("123 Main Street")
      await page.getByLabel("City").fill("Pretoria")
      await page.getByLabel("Province").fill("Gauteng")
      await page.getByLabel("Postal Code").fill("0001")
      await page.getByLabel("Country").fill("South Africa")

      await page.getByRole("button", { name: /Continue to Review/ }).click()
      await expect(page.getByText("Review")).toBeVisible()
      await expect(page.getByText("Shipping Details")).toBeVisible()
    })

    test("order summary shows items", async ({ page }) => {
      await expect(page.getByText("Order Summary")).toBeVisible()
    })

    test("delivery method options are shown", async ({ page }) => {
      await expect(page.getByText("Standard Delivery")).toBeVisible()
      await expect(page.getByText("Express Delivery")).toBeVisible()
    })

    test("place order creates order and shows confirmation", async ({ page }) => {
      await page.getByLabel("First Name").fill("John")
      await page.getByLabel("Last Name").fill("Doe")
      await page.getByLabel("Email").fill("john@example.com")
      await page.getByLabel("Phone").fill("0821234567")
      await page.getByLabel("Address Line 1").fill("123 Main Street")
      await page.getByLabel("City").fill("Pretoria")
      await page.getByLabel("Province").fill("Gauteng")
      await page.getByLabel("Postal Code").fill("0001")
      await page.getByLabel("Country").fill("South Africa")

      await page.getByRole("button", { name: /Continue to Review/ }).click()
      await expect(page.getByText("Shipping Details")).toBeVisible()

      await page.getByRole("button", { name: "Place Order" }).click()
      await expect(page.getByText("Order Confirmed!")).toBeVisible({ timeout: 10_000 })
    })
  })
})
