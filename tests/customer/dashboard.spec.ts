import { test, expect } from "@playwright/test"

test.describe("Customer Dashboard", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/customer/dashboard")
    await expect(page).toHaveURL(/\/login/)
  })

  test.describe("authenticated", () => {
    test.use({ storageState: "tests/.auth/user.json" })

    test("dashboard loads with stats", async ({ page }) => {
      await page.goto("/customer/dashboard")
      await expect(page.getByText(/Welcome back/)).toBeVisible()
      await expect(page.getByText("Active Bookings")).toBeVisible()
      await expect(page.getByText("Total Orders")).toBeVisible()
      await expect(page.getByText("Wishlist Items")).toBeVisible()
      await expect(page.getByText("Loyalty Points")).toBeVisible()
    })

    test("sidebar navigation works", async ({ page }) => {
      await page.goto("/customer/dashboard")

      await page.getByRole("link", { name: "My Profile" }).click()
      await expect(page).toHaveURL(/\/customer\/profile/)

      await page.getByRole("link", { name: "My Vehicles" }).click()
      await expect(page).toHaveURL(/\/customer\/vehicles/)

      await page.getByRole("link", { name: "My Orders" }).click()
      await expect(page).toHaveURL(/\/customer\/orders/)
    })

    test("profile page loads", async ({ page }) => {
      await page.goto("/customer/profile")
      await expect(page.locator("main")).toBeVisible()
    })

    test("vehicles page loads", async ({ page }) => {
      await page.goto("/customer/vehicles")
      await expect(page.locator("main")).toBeVisible()
    })

    test("orders page loads", async ({ page }) => {
      await page.goto("/customer/orders")
      await expect(page.locator("main")).toBeVisible()
    })

    test("recent orders table renders", async ({ page }) => {
      await page.goto("/customer/dashboard")
      await expect(page.getByText("Recent Orders")).toBeVisible()
      await expect(page.getByText("ORD-")).toBeVisible()
    })

    test("upcoming bookings section renders", async ({ page }) => {
      await page.goto("/customer/dashboard")
      await expect(page.getByText("Upcoming Bookings")).toBeVisible()
    })

    test("quick actions are visible", async ({ page }) => {
      await page.goto("/customer/dashboard")
      await expect(page.getByText("Quick Actions")).toBeVisible()
      await expect(page.getByRole("link", { name: /Book Service/ })).toBeVisible()
    })
  })
})
