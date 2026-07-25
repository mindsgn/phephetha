import { test as setup } from "@playwright/test"
import { TEST_USER, TEST_ADMIN } from "./helpers"

const authFile = "tests/.auth/user.json"
const adminAuthFile = "tests/.auth/admin.json"

setup("authenticate customer", async ({ page }) => {
  await page.goto("/login")
  await page.getByLabel("Email").fill(TEST_USER.email)
  await page.getByLabel("Password").fill(TEST_USER.password)
  await page.getByRole("button", { name: "Sign In" }).click()

  await page.waitForURL("**/customer/dashboard", { timeout: 15_000 }).catch(() => {})
  await page.context().storageState({ path: authFile })
})

setup("authenticate admin", async ({ page }) => {
  await page.goto("/login")
  await page.getByLabel("Email").fill(TEST_ADMIN.email)
  await page.getByLabel("Password").fill(TEST_ADMIN.password)
  await page.getByRole("button", { name: "Sign In" }).click()

  await page.waitForURL("**/admin/dashboard", { timeout: 15_000 }).catch(() => {})
  await page.context().storageState({ path: adminAuthFile })
})
