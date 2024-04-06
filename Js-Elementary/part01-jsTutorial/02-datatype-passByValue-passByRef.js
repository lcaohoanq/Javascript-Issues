console.log("Bài 2: Kiểu dữ liệu - tham trị - tham chiếu");

// I-1 primitive datatype: kiểu nguyên thủy
        // number  :   1, 12, 13.5
        // js không mạnh để xử lí số 

        // string  :   'ahihi', '10'

        // boolean :   true(1) | false(0) 
        // null    :   giá trị rỗng - biết kiểu dữ liệu
        // undefined : giá trị rỗng - không biết kiểu dữ liệu

        // Symbol (ES6): thường đặt tên biến, tăng bảo mật

// null và undefined khác gì nhau?

console.log(typeof null); //object
//null có kiểu dữ liệu là obj nhưng lại được xếp ở primitive?
// null là một obj nhưng không có gì hết, primitive

console.log(typeof undefined); //undefined 

            // có 2 cách so sánh
console.log(null == undefined); //true
console.log(null === undefined); //false

// ==  : so sánh giá trị (cả 2 đều rỗng)
// === : so sánh giá trị và kiểu 

console.log(2 == "2");  //true
console.log(2 === "2"); //false

            // undefined trong thuộc tính obj
let duy = {name: "Duy", height: 160}
console.log(duy.nguoiYeu); //undefined

// tất cả các obj đều hoisting
duy.money = 0;
console.log(duy);

            // undefined trong parameter của func
function handle1(a, b){
    return b
}
let c = handle1(2) //a = 2, b = undefined -> return b -> c = undefined
console.log(c);    //undefined

            //func mà không có return thì có nghĩa là return undefined

// null: biết dữ liệu nhưng không biết giá trị
let str = ""; //chuỗi rỗng
str = null;   //gọi là object chưa tồn tại != với obj rỗng {}

    // null và undefined không có thuộc tính
    // let object1 = null;
    // object1.name // chúng không phải là obj bình thường -> không chấm dc

// I - 2 object datatype: khác với primitive
// plain object: obj phẳng
let student = {name: "Tùng", point: 10}; //lồng vô nhiều lớp sẽ khác phẳng

            // key : value
            // property | entry

// Array: là cách khai báo nhiều biến cùng tên, cùng lúc, (có thể khác kiểu, vì không ràng buộc kiểu dữ liệu)
let flowerList = ["Hoa", "Cúc", "Hồng", 10]
// array là object

            // regular expression: regex là object
var regex1 = /SE\d{9}/
console.log(typeof regex1);

// function có type là function nhưng được xếp ở object
console.log(typeof handle1);
// từ thưở sơ khai js dùng function tạo ra obj khi chưa có class
// function tạo ra obj -> obj chứa function

                // NaN: Not a number
console.log(10 / "D"); //NaN
console.log(typeof NaN); //number
console.log(NaN == Number); //false

// Tất cả các cách khai báo primitive đuề có thể dùng constructor
// Wrapper class: class trai bao
var str1 = "ahihi"
console.log(str1); //ahihi
str1 = new String ("ahihi"); //tạo một obj mới trên vùng nhớ cũ
                            //pool
                            // wrapper chứa một chuỗi là string
console.log(str1 == "ahihi"); //true, auto-unboxing
console.log(str1 === "ahihi"); //false, một obj so với string
console.log(str1.valueOf() === "ahihi"); //true

                // dùng wrapper class để ép kiểu
let year = String(1999) //ép từ số thành chuỗi
year = Number(year); //ép chuỗi thành số

                            // TRUE - FALSE
console.log(Boolean(1999)); //true
console.log(Boolean(0)); //false
console.log(Boolean(-0)); //false
console.log(Boolean(-1)); //true

// 0, -0 luôn là false

console.log(Boolean("0")); //true
console.log(Boolean("")); //trong chuỗi luôn có dấu kết thúc chuỗi, \0
console.log(Boolean(" ")); //32 true

console.log(Boolean(null)); //false-> không có obj, không có vùng nhớ
console.log(Boolean({})); //true -> obj đã có vùng nhớ, không có nội dung
console.log(Boolean([])); //true -> mảng là obj -> có vùng nhớ, không nội dung

console.log(Boolean(10 / "D")); //false -> NaN

console.log(Boolean(false)); //false, đừng overthinking nha ku!!!!!

// Falsy: đối với js những gì không chứa giá trị đều là false
// null, undefined, 0, -0, false, NaN

// Truthy: những gì ngược lại của Falsy
// chuỗi khác rỗng, số khác 0 và -0, object|mảng đều true

            // pass by value: truyền tham trị
            //(mượn giá trị tham khảo, không chỉnh sửa)
//vd1: 
let a = 1;
b = a;
b = 2;
console.log(a,b); //a = 1, b = 2

//vd2:
let point = 4;
function updatePoint(pointCurrent){
    pointCurrent = 10;
}
updatePoint(point);
console.log(point); //4

            // pass by ref: truyền tham chiếu
var boyFriend1 = {name: "hot girl", owner: "H Cub"}
var boyFriend2 = boyFriend1; //con trỏ, 2 chàng trỏ một nàng
boyFriend2.owner = "87 Cub"; //boyFriend2 có quyền kiểm soát hoàn toàn 
console.log(boyFriend1); //hot girl 87 cub

                                // OPERATOR
// OPERATOR Toán tử
//trong js có 10 loại toán tử
/*
1  Assignment            gán
2  Comparison            so sánh ==  ===
3  Arithmetic            toán hạng
4  bitwise               bitwise
5  logical               logic && ||
6  String                chuỗi
7  Conditional(ternary)  ba ngôi
8  Comma                 phẩy
9  Unary                 một ngôi
10 Relational            Quan hệ
*/
//
    // Arithmetic Operator toán tử toán hạng
//  + | - | * | ** | / | % | variable++ | variable-- | ++variable | --variable |
//  không được n++ ++n --n n-- với n là số bất kỳ

    // Assignment Operator toán tử gán
//  = | += | -= | *= | **= | /= | %= |
//

// Comparison Operator toán tử so sánh
//  == bằng giá trị là được (không quan tâm kiểu)

    // logical

//logic AND(&&) OR(||) !(phủ định kết quả của cả mệnh đề condition)

//  AND(&&) luôn đi tìm mệnh đề false thấy false là dừng trả ra false
//                                    thấy 0 là dừng trả ra 0
//  OR(||) luôn đi tìm mệnh đề true thấy true là dừng trả ra true
//                                    thấy 1 là dừng trả ra 1
                                // OPERATOR
                                
console.log(2 == "2");  //true
console.log(2 !== "2"); //true
console.log(2 != "2");  //false

// toán tử 3 ngôi
var diep = "Đẹp trai"
var isDepTrai = diep == "đẹp trai" ? 1 : 0;
console.log(isDepTrai);

console.log("b" + "a" + + "a" + "a"); //baNaNa 

// nếu có một cụm toán tử giữa chuỗi và số
// ưu tiên dấu + (nối)
// chuỗi không có khả năng trừ -> tự nó suy ra là số
console.log(1 + 2); //3
console.log(1 + "2"); //12
console.log("1" + 2); //12
console.log("5" - 2); //3

// true - false
console.log(0 && 1); //0
console.log(0 || 0 || 4); //4
console.log(0); // chỉ là số 0

console.log(!0); //thấy dấu chấm ! mặc định true - false
console.log(""); //
console.log(!""); //true
console.log(!"" && 0 && 1); //0, vì AND tìm sai, thấy sai là in ra
