const XLSX = require("xlsx");

const filePath = "./Products Blank Cell Dreame.en.xlsx";

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

let data = XLSX.utils.sheet_to_json(sheet, {
  header: 0,
  blankrows: true,
});

const firstColumn = data.map((row) => row["id"]);

// data = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: true });
// const secondColumn = data.map((row) => row[0]);

console.log(firstColumn);
// console.log(secondColumn);

console.log(data);
