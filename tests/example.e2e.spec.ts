import { type Page, expect, test } from '@playwright/test'

const openPage = async (page: Page) => {
  await page.goto('http://localhost:5173/')
}

const addDateFromDatePicker = async (page: Page, choosenDate: string) => {
  await page.locator('input[name="datepicker"]').click()
  await page.getByRole('option', { name: `Choose ${choosenDate}` }).click();
  await page.getByRole('button', { name: 'Add a new date' }).click();
}

test('adds one item into the history', async ({ page }) => {
  await openPage(page)
  await addDateFromDatePicker(page, 'Tuesday, October 18th, 2022')
  await expect(page.locator('.history-item > div')).toHaveText('18/10/2022')
})
