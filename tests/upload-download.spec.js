const ExcelJs = require('exceljs')
const path = require('path');
const { test, expect, page } = require('@playwright/test');

// using then (Promise)
// const filePath = path.join(__dirname, '../../temp/download.xlsx');
// const wb = new ExcelJs.Workbook();
// wb.xlsx.readFile(filePath).then(() => {
//     const ws = wb.getWorksheet('Sheet1');
//     ws.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         });
//     });
// })

// using async await
async function writeExcelTest(searchText, replaceText, change, file) {

    const filePath = path.join(file);
    const wb = new ExcelJs.Workbook();
    await wb.xlsx.readFile(filePath)
    const ws = wb.getWorksheet('Sheet1');
    const output = await readExcel(ws, searchText);

    const cell = ws.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    console.log(cell.value);
    await wb.xlsx.writeFile(filePath);
}

async function readExcel(ws, searchText) {
    let output = { row: -1, column: -1 };
    ws.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(`Found ${searchText} at row ${rowNumber}, column ${colNumber}`);
            }
        });
    });
    return output;
}

// writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, '../../temp/download.xlsx');


test('Upload download excel validation', async ({page}) => {

    const textSearch = 'Mango';
    const updateValue = '350';
    const filePath = path.join('C:/Users/dev/Downloads/download.xlsx');
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    (await downloadPromise).saveAs(filePath);
    writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    
});