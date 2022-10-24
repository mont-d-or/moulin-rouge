import { test, expect, type Page } from '@playwright/test';

test('adds one item into the history', async ({ page }) => {
  openPage(page)

  addDateFromDatePicker(page, 'Tuesday, October 18th, 2022')

  const dateHistoryItem = page.getByText('18-10-2022')
  await expect(dateHistoryItem).toHaveClass('history-item')
})

const openPage = async (page: Page) => {
  await page.goto('http://localhost:5173/')
}

const addDateFromDatePicker = async (page: Page, choosenDate: string) => {
  await page.locator('input[name="datepicker"]').click()
  await page.getByRole('option', { name: 'Choose ' + choosenDate }).click()
  await page.getByRole('button', { name: 'Add' }).click()
}