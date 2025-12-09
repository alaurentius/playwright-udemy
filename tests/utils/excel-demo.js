const ExcelJs = require('exceljs')
const path = require('path');

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

    const filePath = path.join(__dirname, file);
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

writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, '../../temp/download.xlsx');