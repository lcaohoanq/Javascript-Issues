let myRe = /d(b+)d/g;
let str = "dbbd";
let myArray = myRe.exec("dbbd");

const str2 = new RegExp("d(b+)d", "g");

console.log(myRe.test(str));
console.log(str.match(myRe));

const str3 = "Hello world";
const regex = /world/;
const result = str3.split(""); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
result = str3.split(" "); // ["Hello", "world"]
result = str3.split(regex); // ["Hello ", ""]
console.log(result);
