const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

// test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });

test('Popup, hover and iframe validations', async ({ page }) => {

    const inputDisplay = page.locator('#displayed-text')
    const hideBtn = page.locator('#hide-textbox')
    const showBtn = page.locator('#show-textbox')
    const confirmBtn = page.locator('#confirmbtn')
    const mouseHoverBtn = page.locator('#mousehover')
    const iframePage = page.frameLocator('#courses-iframe')
    const allAccessLink = iframePage.locator('li a[href*="lifetime-access"]:visible')
    const joinTitle = iframePage.locator('.text h2')

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://www.google.com')
    await page.goBack()
    await page.goForward()
    await page.goBack()

    await expect(inputDisplay).toBeVisible()
    await hideBtn.click()
    await expect(inputDisplay).toBeHidden()
    await showBtn.click()
    await expect(inputDisplay).toBeVisible()

    page.on('dialog', dialog => dialog.accept())
    await confirmBtn.click()

    await mouseHoverBtn.hover()

    await allAccessLink.click()
    const textFromTitle = await joinTitle.textContent()
    console.log(textFromTitle.split(' ')[1])

})

test('Screenshot & Visual comparison', async ({ page }) => {
    const inputDisplay = page.locator('#displayed-text')
    const hideBtn = page.locator('#hide-textbox')

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(inputDisplay).toBeVisible()
    await inputDisplay.screenshot({ path: 'temp/screenshot1.png' });
    await hideBtn.click()
    await page.screenshot({ path: 'temp/screenshot2.png' });
    await expect(inputDisplay).toBeHidden()

});

test('Visual testing', async ({ page }) => {


    await page.goto('https://www.flightradar24.com/51.50,-0.12/6')
    expect(await page.screenshot()).toMatchSnapshot('landing.png')

});
