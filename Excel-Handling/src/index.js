const XLSX = require("xlsx");

const filePath = "./Products Dreame.vi.xlsx-1714318011958";

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

let data = XLSX.utils.sheet_to_json(sheet, {
  header: 0,
  blankrows: true,
});

function isExistColumn(column) {
  //check if the column is exist in the first row
  //hasOwnProperty(key)
  return Object.prototype.hasOwnProperty.call(data[0], column);
}

function printData(column) {
  if (isExistColumn(column)) {
    const firstColumn = data.map((row) => row[column]);
    console.log(firstColumn);
    console.log(data[0]);
    console.log(data[0].id);
    console.log(typeof data[0].id);
  } else {
    console.log("Column not found");
  }
  console.log(typeof firstColumn);
}

// printData("Stock Quantity");

console.log("data from excel file: ", data);
