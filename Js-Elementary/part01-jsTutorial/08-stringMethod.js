console.log("08-stringMethod.js");

//chuỗi trong js được bọc bởi "" và ''
let str = "ahihi";

//1. length //prop của string trả ra độ dài
console.log(str.length); //5

//2. indexOf(str) //tìm vị trí đầu tiên của chuỗi hoặc char trong chuỗi
console.log(str.indexOf("h")); //1A
console.log(str.indexOf("ih")); //2
console.log(str.indexOf("s")); //-1 (không có)

//tách chuỗi
//1.slice(start,end) : trả ra chuỗi con từ start đến end -1
let x = "Xin chào PiedTeam, mình là Điệp";
let result = x.slice(9, 17); //PiedTeam

console.log(result);
console.log(x);
//String là immutable: object có method không làm thay đổi object mà chỉ
//trả ra 1 object mới (bản sao) để xử lí

//cắt ngược
result = x.slice(-22, -14); //PiedTeam
console.log(result);

// cắt bằng 1 para thuận
result = x.slice(9); //PiedTeam, mình là Điệp
console.log(result);

// cắt bằng 1 para ngược
result = x.slice(-12); //mình là Điệp
console.log(result);

//3.substring(start, end): cũng cắt từ start đến end - 1
//giống slice nhưng không có chiều âm

//4.substr(start, length): cắt từ start 1 chuỗi có độ dài length
result = x.substr(9, 8);
console.log(result);

//II- các method phổ biến
//1. replace: (thay thế object)
let str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
console.log(str1.replace("nhiều", "ít")); //chỉ thay được 1 chữ nhiều đầu tiên

console.log(str1.replaceAll("nhiều", "ít"));

//replace + regex
console.log(str1.replace(/nhiều/gi, "ít"));

//2. chuyển đổi hoa thường
// .toUpperCase()   .toLowerCase()

//3. concat() nối chuỗi
str1 = "xin chào";
str2 = "PiedTeam";
str3 = str1.concat(" ", "mừng bạn đến với", " ", str2);

str3 = str1 + " " + "mừng bạn đến với" + " " + str2;

console.log(str3); //xin chào mừng bạn đến với PiedTeam

//4. trim() xóa khoảng cách thừa của 2 bên
str1 = "    xin     chào        các         bạn     ";
console.log(str1.trim()); //xin     chào        các         bạn

//cách 1: dùng replace + regex
str1 = "    xin     chào        các         bạn     ";
str1 = str1.replace(/\s+/g, " ").trim(); //"xin chào các bạn"
console.log(str1);

//cách 2: sinh tồn nơi công sở
str1 = "    xin     chào        các         bạn     ";
str1 = str1
  .split(" ") //băm ra bằng các dấu cách, ta được một mảng
  .filter((item) => item != "") //lọc bằng filer khác rỗng
  .join(" "); //join lại bằng dấu cách

console.log(str1);

// cách để tìm một trang web nhanh hơn
// join lại chuỗi title với dấu "-"

//5. so sánh chuỗi == | ===

//6. charAt(index): trả ra ký tự ở index trong chuỗi
x = "Lê Mười Điệp";
console.log(x.charAt(3)); //M
console.log(x[3]); //M
x[3] = "L";
console.log(x); //Lê Mười Điệp
//vì string là immutable
