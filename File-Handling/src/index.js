import * as formidable from "formidable";
import fs from "fs";

const filePath = "./employees.xlsx";

const readStream = fs.createReadStream(filePath);

const form = new formidable.IncomingForm();

form.on("file", (name, file) => {
  // Log the file size
  console.log(`File size: ${file.size} bytes`);
});

// Parse the ReadStream to trigger the 'file' event
form.parse(readStream, (err, fields, files) => {
  if (err) {
    console.error("Error parsing form:", err);
    return;
  }
});

// console.log("Hello World");
