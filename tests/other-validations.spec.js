const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

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
