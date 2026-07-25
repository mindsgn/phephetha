import { test, expect } from "@playwright/test"

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login")
  })

  test("login page loads", async ({ page }) => {
    await expect(page.getByText("Welcome Back")).toBeVisible()
    await expect(page.getByText("Sign in to your Phephetha Auto account")).toBeVisible()
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible()
  })

  test("empty form submission shows errors", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click()
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "")
    await expect(page.getByLabel("Password")).toHaveAttribute("required", "")
  })

  test("invalid credentials shows error", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com")
    await page.getByLabel("Password").fill("WrongPass1!")
    await page.getByRole("button", { name: "Sign In" }).click()
    await page.waitForTimeout(2000)
  })

  test("navigate to register from login", async ({ page }) => {
    await page.getByRole("link", { name: "Register" }).click()
    await expect(page).toHaveURL(/\/register/)
  })

  test("forgot password link works", async ({ page }) => {
    await page.getByRole("link", { name: "Forgot Password?" }).click()
    await expect(page).toHaveURL(/\/forgot-password/)
  })

  test("google sign in button is visible", async ({ page }) => {
    const googleButton = page.getByRole("button", { name: "Sign in with Google" })
    await expect(googleButton).toBeVisible()
  })

  test("remember me checkbox is visible", async ({ page }) => {
    const rememberCheckbox = page.getByLabel("Remember me")
    await expect(rememberCheckbox).toBeVisible()
  })

  test("password visibility toggle works", async ({ page }) => {
    const passwordInput = page.getByLabel("Password")
    await expect(passwordInput).toHaveAttribute("type", "password")

    const toggleButton = page.locator("button").filter({ has: page.locator("[class*='eye']") }).first()
    await toggleButton.click()
    await expect(passwordInput).toHaveAttribute("type", "text")
  })

  test("logo links to homepage", async ({ page }) => {
    await page.getByRole("link", { name: "PHEPHETHA" }).click()
    await expect(page).toHaveURL("/")
  })
})
