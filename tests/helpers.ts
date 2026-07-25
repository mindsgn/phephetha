import { type Page, type expect as Expect } from "@playwright/test"

let testCounter = 0

export function generateTestId(): string {
  testCounter += 1
  return `test-${Date.now()}-${testCounter}`
}

export async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto("/login")
  await page.getByLabel("Email").fill(email)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { name: "Sign In" }).click()
  await page.waitForURL("**/customer/dashboard", { timeout: 15_000 })
}

export async function register(
  page: Page,
  name: string,
  email: string,
  password: string,
): Promise<void> {
  await page.goto("/register")
  await page.getByLabel("Full Name").fill(name)
  await page.getByLabel("Email").fill(email)
  await page.getByLabel("Password", { exact: true }).fill(password)
  await page.getByLabel("Confirm Password").fill(password)
  await page.getByRole("button", { name: "Create Account" }).click()
}

export async function addToCart(page: Page, productId: string): Promise<void> {
  await page.goto(`/parts/${productId}`)
  await page.getByRole("button", { name: /add to cart/i }).click()
}

export async function createBooking(
  page: Page,
  _serviceId: string,
  _date: string,
): Promise<void> {
  await page.goto("/services/booking")
}

export const TEST_USER = {
  email: "testuser@phephetha.co.za",
  password: "TestPass123!",
  name: "Test User",
}

export const TEST_ADMIN = {
  email: "admin@phephetha.co.za",
  password: "AdminPass123!",
  name: "Test Admin",
}
