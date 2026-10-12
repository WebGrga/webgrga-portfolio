import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeVisible()
  await page.getByRole('button', { name: /Race in/i }).click()
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeHidden({ timeout: 4000 })
})

test('hero, projects, quote, and final link are present', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Software with a pulse/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Frontend Director' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'BTC–Jev' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Problem Hunter' })).toHaveCount(1)
  await expect(page.getByRole('link', { name: /Open dashboard/i })).toHaveAttribute('href', 'https://lab.rokogrga.com/btc-jev')
  await expect(page.getByText(/Technical work gets our attention/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /Explore my GitHub/i })).toHaveAttribute('href', 'https://github.com/WebGrga')
  await expect(page.getByText(/Netlify ready/i)).toHaveCount(0)
})

test('theme control changes the complete page theme', async ({ page }) => {
  await page.getByRole('button', { name: /Open color controls/i }).click()
  await page.getByRole('button', { name: /Use Rosso accent/i }).click()
  await page.getByRole('button', { name: /Use light surface/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'ferrari')
  await expect(page.locator('html')).toHaveAttribute('data-surface', 'light')
  await expect
    .poll(() => page.locator('#root').evaluate((element) => getComputedStyle(element).backgroundColor))
    .toBe('rgba(0, 0, 0, 0)')
})

test('journey controls update the active story', async ({ page }) => {
  await page.getByRole('button', { name: /Open journey stop 5/i }).click()
  await expect(page.locator('.journey-stage canvas')).toBeVisible()
  await expect(page.getByRole('heading', { name: /The faster code becomes/i })).not.toBeVisible()
  await expect(page.getByRole('heading', { name: /framing the right problem/i })).not.toBeVisible()
  await expect(page.getByText(/The faster code becomes/i)).toBeVisible()
  const journeyLayout = await page.evaluate(() => {
    const stage = document.querySelector('.journey-stage')!.getBoundingClientRect()
    const track = document.querySelector('.journey-track')!.getBoundingClientRect()
    const copy = document.querySelector('.journey-copy')!.getBoundingClientRect()
    return { viewport: window.innerWidth, stage, track, copy }
  })
  if (journeyLayout.viewport > 760) {
    expect(journeyLayout.copy.top).toBeGreaterThanOrEqual(journeyLayout.stage.top)
    expect(journeyLayout.copy.bottom).toBeLessThanOrEqual(journeyLayout.stage.bottom)
    expect(journeyLayout.copy.left).toBeGreaterThan(journeyLayout.stage.left + journeyLayout.stage.width / 2)
  } else {
    expect(journeyLayout.copy.top).toBeGreaterThanOrEqual(journeyLayout.track.bottom - 1)
  }
})

test('driver intro replays from the header and returns on refresh', async ({ page }) => {
  await page.getByRole('button', { name: /Replay driver entrance/i }).click()
  const entrance = page.getByRole('dialog', { name: /Portfolio entrance/i })
  await expect(entrance).toBeVisible()
  await expect(entrance.getByRole('button')).toHaveCount(1)
  await expect(page.getByRole('button', { name: /Race in/i })).toBeVisible()
  await page.getByRole('button', { name: /Race in/i }).click()
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeHidden({ timeout: 4000 })
  await page.reload()
  await expect(page.getByRole('dialog', { name: /Portfolio entrance/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Race in/i })).toBeVisible()
})

test('header has breathing room and the ticker always covers the viewport', async ({ page }) => {
  const layout = await page.evaluate(() => {
    const header = document.querySelector('.site-header')!.getBoundingClientRect()
    const logo = document.querySelector('.logo')!.getBoundingClientRect()
    const actions = document.querySelector('.header-actions')!.getBoundingClientRect()
    const groupWidths = Array.from(document.querySelectorAll('.telemetry-group')).map((group) => group.getBoundingClientRect().width)
    return {
      leftGap: logo.left - header.left,
      rightGap: header.right - actions.right,
      viewport: window.innerWidth,
      groupWidths,
    }
  })
  expect(layout.leftGap).toBeGreaterThan(10)
  expect(layout.rightGap).toBeGreaterThan(10)
  expect(layout.groupWidths).toHaveLength(2)
  expect(layout.groupWidths.every((width) => width >= layout.viewport - 1)).toBe(true)
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
