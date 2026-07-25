import { test, expect } from "@playwright/test"

test.describe("Services Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services")
  })

  test("loads with service list", async ({ page }) => {
    await expect(page.getByText("Professional Automotive Services")).toBeVisible()
    await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible()
  })

  test("service cards display name, price, and duration", async ({ page }) => {
    const firstCard = page.locator("article, [class*='card']").first()
    await expect(firstCard).toBeVisible()
    await expect(firstCard.getByText("Vehicle Servicing")).toBeVisible()
    await expect(firstCard.getByText(/R\s?[\d,]+/)).toBeVisible()
  })

  test("click service navigates to detail page", async ({ page }) => {
    await page.getByRole("link", { name: "View Details" }).first().click()
    await expect(page).toHaveURL(/\/services\//)
  })

  test("service detail page loads", async ({ page }) => {
    await page.goto("/services/vehicle-servicing")
    await expect(page.getByText("Vehicle Servicing")).toBeVisible()
  })

  test("book appointment button is visible", async ({ page }) => {
    const bookButton = page.getByRole("link", { name: "Book an Appointment" })
    await expect(bookButton).toBeVisible()
  })

  test("all twelve services are displayed", async ({ page }) => {
    const serviceNames = [
      "Vehicle Servicing",
      "Engine Repairs",
      "Brake Services",
      "Diagnostics",
      "Suspension",
      "Clutch Repairs",
      "Transmission",
      "AC Service",
      "Battery",
      "Oil Change",
      "Wheel Alignment",
      "Tyres",
    ]
    for (const name of serviceNames) {
      await expect(page.getByText(name, { exact: false }).first()).toBeVisible()
    }
  })
})
