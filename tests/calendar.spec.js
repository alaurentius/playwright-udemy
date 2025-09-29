const { test, expect } = require('@playwright/test');

test('Calendar validation', async ({ page }) => {

    const monthNumber = '6'
    const day = '15'
    const year = '2027'
    const expectedList = [monthNumber, day, year]
    const datePicker = page.locator('.react-date-picker__inputGroup')
    const navigationLabel = page.locator('.react-calendar__navigation__label')
    const monthLocator = page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber) - 1)
    const dayLocator = page.locator('//abbr[text()=' + day + ']')
    const inputsDatepicker = page.locator('.react-date-picker__inputGroup__input')

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await datePicker.click()
    await navigationLabel.click()
    await navigationLabel.click()
    await page.getByText(year).click()
    await monthLocator.click()
    await dayLocator.click()

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputsDatepicker.nth(i).inputValue()
        expect(value).toEqual(expectedList[i])
    }

})
