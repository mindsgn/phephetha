import { test, expect } from "@playwright/test"

test.describe("Booking Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services/booking")
  })

  test("booking page loads", async ({ page }) => {
    await expect(page.getByText("Book a Service")).toBeVisible()
    await expect(page.getByText("Step 1 of 5")).toBeVisible()
  })

  test("step 1: service selection works", async ({ page }) => {
    await expect(page.getByText("Service", { exact: true }).first()).toBeVisible()
    const fullServiceOption = page.getByText("Full Service")
    await expect(fullServiceOption.first()).toBeVisible()
    await fullServiceOption.first().click()
    await page.waitForTimeout(300)

    await page.getByRole("button", { name: /Next/ }).click()
    await expect(page.getByText("Step 2 of 5")).toBeVisible()
  })

  test("step 2: date and time selection works", async ({ page }) => {
    await page.getByText("Full Service").first().click()
    await page.getByRole("button", { name: /Next/ }).click()
    await expect(page.getByText("Step 2 of 5")).toBeVisible()

    const nextButton = page.getByRole("button", { name: /Next/ })
    await expect(nextButton).toBeVisible()
  })

  test("step 3: vehicle selection works", async ({ page }) => {
    await page.getByText("Full Service").first().click()
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)

    const nextButton = page.getByRole("button", { name: /Next/ })
    await nextButton.click()
    await page.waitForTimeout(500)
  })

  test("step 4: additional info form works", async ({ page }) => {
    await page.getByText("Full Service").first().click()
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText("Additional Information")).toBeVisible()
    const textarea = page.getByPlaceholder(/Describe any specific/)
    await expect(textarea).toBeVisible()
    await textarea.fill("Please check the brakes as well")
  })

  test("step 5: review shows correct info", async ({ page }) => {
    await page.getByText("Full Service").first().click()
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /Next/ }).click()
    await page.waitForTimeout(500)

    await expect(page.getByText("Step 5 of 5")).toBeVisible()
  })

  test("back button returns to previous step", async ({ page }) => {
    await page.getByText("Full Service").first().click()
    await page.getByRole("button", { name: /Next/ }).click()
    await expect(page.getByText("Step 2 of 5")).toBeVisible()

    await page.getByRole("button", { name: /Back/ }).click()
    await expect(page.getByText("Step 1 of 5")).toBeVisible()
  })

  test("next button is disabled when no service selected", async ({ page }) => {
    const nextButton = page.getByRole("button", { name: /Next/ })
    await expect(nextButton).toBeDisabled()
  })
})
