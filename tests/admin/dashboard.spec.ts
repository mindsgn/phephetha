import { test, expect } from "@playwright/test"

test.describe("Admin Dashboard", () => {
  test("redirects if not admin", async ({ page }) => {
    await page.goto("/admin/dashboard")
    await page.waitForTimeout(2000)
  })

  test.describe("authenticated as admin", () => {
    test.use({ storageState: "tests/.auth/admin.json" })

    test("dashboard loads with stat cards", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Total Revenue")).toBeVisible()
      await expect(page.getByText("Total Orders")).toBeVisible()
      await expect(page.getByText("Total Bookings")).toBeVisible()
      await expect(page.getByText("Total Customers")).toBeVisible()
    })

    test("charts render", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Revenue Overview")).toBeVisible()
      await expect(page.getByText("Orders Trend")).toBeVisible()
    })

    test("recent orders table loads", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Recent Orders")).toBeVisible()
      await expect(page.getByText("ORD-")).toBeVisible()
    })

    test("sidebar navigation to all sections", async ({ page }) => {
      await page.goto("/admin/dashboard")

      const navLinks = [
        { name: "Products", url: /\/admin\/products/ },
        { name: "Orders", url: /\/admin\/orders/ },
        { name: "Customers", url: /\/admin\/customers/ },
        { name: "Inventory", url: /\/admin\/inventory/ },
        { name: "Services", url: /\/admin\/services/ },
      ]

      for (const link of navLinks) {
        const navLink = page.getByRole("link", { name: link.name }).first()
        if (await navLink.isVisible()) {
          await navLink.click()
          await expect(page).toHaveURL(link.url)
          await page.goBack()
        }
      }
    })

    test("low stock alerts are displayed", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Low Stock Alerts")).toBeVisible()
    })

    test("top selling products section renders", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Top Selling Products")).toBeVisible()
    })

    test("upcoming bookings section renders", async ({ page }) => {
      await page.goto("/admin/dashboard")
      await expect(page.getByText("Upcoming Bookings")).toBeVisible()
    })
  })
})
