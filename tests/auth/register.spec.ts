import { test, expect } from "@playwright/test"

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register")
  })

  test("register page loads", async ({ page }) => {
    await expect(page.getByText("Create Account")).toBeVisible()
    await expect(page.getByText("Join Phephetha Auto")).toBeVisible()
    await expect(page.getByLabel("Full Name")).toBeVisible()
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible()
    await expect(page.getByLabel("Confirm Password")).toBeVisible()
  })

  test("empty form submission shows errors", async ({ page }) => {
    await page.getByRole("button", { name: "Create Account" }).click()
    await expect(page.getByLabel("Full Name")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute("required", "")
    await expect(page.getByLabel("Confirm Password")).toHaveAttribute("required", "")
  })

  test("invalid email shows error", async ({ page }) => {
    await page.getByLabel("Full Name").fill("John Doe")
    await page.getByLabel("Email").fill("not-an-email")
    await page.getByLabel("Password", { exact: true }).fill("Password123!")
    await page.getByLabel("Confirm Password").fill("Password123!")
    await page.getByRole("button", { name: "Create Account" }).click()
    await page.waitForTimeout(500)
  })

  test("password mismatch shows error", async ({ page }) => {
    await page.getByLabel("Full Name").fill("John Doe")
    await page.getByLabel("Email").fill("john@example.com")
    await page.getByLabel("Password", { exact: true }).fill("Password123!")
    await page.getByLabel("Confirm Password").fill("DifferentPass!")
    await page.getByRole("button", { name: "Create Account" }).click()
    await expect(page.getByText("Passwords do not match")).toBeVisible()
  })

  test("navigate to login from register", async ({ page }) => {
    await page.getByRole("link", { name: "Login" }).click()
    await expect(page).toHaveURL(/\/login/)
  })

  test("google sign up button is visible", async ({ page }) => {
    const googleButton = page.getByRole("button", { name: "Sign up with Google" })
    await expect(googleButton).toBeVisible()
  })

  test("terms checkbox is visible", async ({ page }) => {
    const termsCheckbox = page.getByLabel(/I agree to the/)
    await expect(termsCheckbox).toBeVisible()
  })
})
