// "use strict";

// console ám chỉ console trên devtools
console.log("Bài 1: variable-hoisting-scope");

                //khai báo biến: có 3 cách
// js không có kiểu dữ liệu

// var: xuất hiện từ những phiên bản ES đầu tiên của js
// 2015 - ES6

// js định nghĩa kiểu dữ liệu dựa trên giá trị 
var name1 = ("Hello xin chao cac ban")
console.log(name1);
name1 = "Tao la Hoang"; //re-assignment: gán lại giá trị
console.log(name1);

// nếu khai báo mà không gán giá trị thì sao?
var age //underfined: chưa xác định
console.log(age); 
age = 25
console.log(age); //số sẽ màu tím

                    // quy tắc đặt tên
// không bắt đầu bằng số
// đặt tên cammelCase

// underscore -> liên quan đến viêc kết nối với schema-db
var black_cat

// pascal case (UpperCammelCase)
// đại diện cho một class
var BlackCat = class Cat{
    owner;
}

// được phép dùng _ và $ ở đầu
// trong js không hỗ trợ nhiều OOP (chỉ có public - default)
// các dev thường quy ước với nhau 
        // _ : private
        // $ : protected

// hoisting với var
// hoisting: móc lên
// hoisting là tính năng, không phải bug

// với tư duy các ngô ngữ khác
// dòng 49 này sẽ bị lỗi vì chưa khai báo
console.log(msg); 
var msg = "hello"
console.log(msg); 

// js có nghĩ kiểu khác
// trên có hay không?
// dưới có thì móc ngược lên

var msg1
console.log(msg1);
msg1 = "hello"
console.log(msg1);

// chế độ code cẩu thả - nghiêm khắc
// NormalMode          || use strict mode -> "use strict"; trên đầu

// chưa tạo mà gán r đòi in
// nhưng js thì vẫn in ra bth
message = "notification"
console.log(message);

// prefer controll my code rather than computer

// let(ES6 - 2015) | const: hằng số
// let | const giống var nhưng mà không có hoisting
// console.log(msg2);
// let msg2 = "hello cac ban"
// console.log(msg2);

                // const: hằng số
// const a = 10;
// a++; 
// bị lỗi khi tác động lên hằng số

            //const với obj
const profile = {name: "Hoàng", height: 160}
profile.name = "hoàng lùn";

// profile = {name: "Hoàng", height: 160} sinh ra lỗi, khi tạo thêm một đối tượng mới, kêu profile trỏ tới (dù đã const)

console.log(profile);

                    //const với array
// mảng là obj, obj là con trỏ-lưu địa chỉ
const array1 = [1,2,3,4,5];
array1.push(6)

// array1 -> lưu địa chỉ còn obj thì quăng ra ngoài kia
// chỉnh sửa array tức là chỉnh sửa obj đó

array1 = [1,2,3,4,5,6] //lỗi

                    // SCOPE
// Scope: trong js có 3 loại scope
// Global Scope: toàn cục 
// Funtion Scope: trong hàm
// Block Scope: cục bộ

// var sẽ không bị can thiệp bởi block scope
if(true){
    var toilet = "vipPro"
}
console.log(toilet);

// bên trong nhà xây toilet thì bên ngoài không xài được
// nhưng mà var thì sẽ bị out-scope: chạy được

// thường sẽ xài const (ngon nhất) -> mặc định xài const, khi cần chỉnh sửa(thay đổi giá trị) sẽ chuyển sang let

// js là đơn luồng hay đa luồng
// nói riêng về js chỉ chạy đơn luồng
// embedded lên web thì sẽ chạy đa luồng
    // even loop
    // queue
    // call-stack

// 








