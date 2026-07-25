import { test, expect } from "@playwright/test"

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact")
  })

  test("form renders all fields", async ({ page }) => {
    await expect(page.getByLabel("Full Name")).toBeVisible()
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Phone Number")).toBeVisible()
    await expect(page.getByLabel("Subject")).toBeVisible()
    await expect(page.getByLabel("Message")).toBeVisible()
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible()
  })

  test("submit empty form shows validation errors", async ({ page }) => {
    await page.getByRole("button", { name: "Send Message" }).click()
    await expect(page.getByLabel("Full Name")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Subject")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Message")).toHaveAttribute("required", "")
  })

  test("fill and submit form", async ({ page }) => {
    await page.getByLabel("Full Name").fill("John Doe")
    await page.getByLabel("Email").fill("john@example.com")
    await page.getByLabel("Phone Number").fill("+27 82 123 4567")
    await page.getByLabel("Subject").fill("Enquiry about brake service")
    await page.getByLabel("Message").fill("I would like to know more about your brake service pricing and availability.")
    await page.getByRole("button", { name: "Send Message" }).click()
    await expect(page.getByText("Message Sent Successfully!")).toBeVisible()
  })

  test("contact info displays phone, email, and address", async ({ page }) => {
    await expect(page.getByText("+27 12 345 6789")).toBeVisible()
    await expect(page.getByText("info@phephetha.co.za")).toBeVisible()
    await expect(page.getByText("123 Auto Street, Pretoria")).toBeVisible()
  })

  test("business hours table is visible", async ({ page }) => {
    await expect(page.getByText("Business Hours")).toBeVisible()
    await expect(page.getByText("Monday")).toBeVisible()
    await expect(page.getByText("7:00 AM – 5:30 PM").first()).toBeVisible()
  })
})
