const XLSX = require("xlsx");

const filePath = "./Products Dreame.en.xlsx";

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

let data = XLSX.utils.sheet_to_json(sheet, {
  header: 0,
  blankrows: true,
});

function isExistColumn(column) {
  //check if the column is exist in the first row
  return data[0].hasOwnProperty(column);
}

function printData(column) {
  if (isExistColumn(column)) {
    const firstColumn = data.map((row) => row[column]);

    // data = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: true });
    // const secondColumn = data.map((row) => row[0]);

    console.log(firstColumn);
    // console.log(secondColumn);

    console.log(data);
  } else {
    console.log("Column not found");
  }
}

printData("Manufacturer");
