import { test, expect } from '@playwright/test'

test('root', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const title = page.locator('text=ぽめモール')
  await expect(title).toBeVisible()
})
