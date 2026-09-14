import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('webgrga-intro-seen', 'true'))
  await page.goto('/')
})

test('hero, projects, quote, and final link are present', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Software with a pulse/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Frontend Director' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Momentum Lab' })).toHaveCount(1)
  await expect(page.getByText(/Technical work gets our attention/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /Explore my GitHub/i })).toHaveAttribute('href', 'https://github.com/WebGrga')
})

test('theme control changes the complete page theme', async ({ page }) => {
  await page.getByRole('button', { name: /Open color controls/i }).click()
  await page.getByRole('button', { name: /Use Electric accent/i }).click()
  await page.getByRole('button', { name: /Use light surface/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'cyan')
  await expect(page.locator('html')).toHaveAttribute('data-surface', 'light')
})

test('journey controls update the active story', async ({ page }) => {
  await page.getByRole('button', { name: /Open journey stop 5/i }).click()
  await expect(page.getByRole('heading', { name: /The faster code becomes/i })).not.toBeVisible()
  await expect(page.getByRole('heading', { name: /framing the right problem/i })).not.toBeVisible()
  await expect(page.getByText(/The faster code becomes/i)).toBeVisible()
})

test('first visit intro is optional and dismissible', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.removeItem('webgrga-intro-seen'))
  await page.reload()
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Start engine/i })).toBeVisible()
  await page.getByRole('button', { name: /Enter quietly/i }).click()
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeHidden({ timeout: 4000 })
})

test('initial viewport has no horizontal overflow and defers the 3D bundle', async ({ page }) => {
  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    pageWidth: document.documentElement.scrollWidth,
    journeyRequests: performance.getEntriesByType('resource').filter((entry) => entry.name.includes('JourneyScene')).length,
  }))
  expect(metrics.pageWidth).toBeLessThanOrEqual(metrics.viewport)
  expect(metrics.journeyRequests).toBe(0)
})
