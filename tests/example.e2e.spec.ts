import { type Page, expect, test } from '@playwright/test'

// Pick the new/fake "now" for you test pages.
const fakeNow = new Date('October 10 2022 13:01:02').valueOf()

// https://github.com/microsoft/playwright/issues/6347
// Update the Date accordingly in your test pages
const fakeDateTime = async (page: Page) => {
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await page.addInitScript(`{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${fakeNow});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from fakeNow
    const __DateNowOffset = ${fakeNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`)
}

const openPage = async (page: Page) => {
  await fakeDateTime(page)
  await page.goto('http://localhost:5173/')
}

const addDateFromDatePicker = async (page: Page, choosenDate: string) => {
  await page.locator('input[name="datepicker"]').click()
  await page.getByRole('option', { name: `Choose ${choosenDate}` }).click()
  await page.getByRole('button', { name: 'Add a new date' }).click()
}

test('adds one item into the history', async ({ page }) => {
  await openPage(page)
  await addDateFromDatePicker(page, 'Tuesday, October 18th, 2022')
  await expect(page.locator('.history-item > div')).toHaveText('From 18/10/2022 to 19/10/2022')
})
