console.log("Xin chào các bạn");
// thuộc tính prototype của constructor function được sử dụng rộng rãi trong js
// mọi constructor function đều có sẵn

// ta sẽ tổng kết khái niệm như sau

// [[Prototype]]: là một thuộc tính ẩn của object
// đại diện cho prototype thực thể

// __proto__ là get và set của [[Prototype]]

let obj = {}; //một object rỗng
// obj = new Object();

console.log(obj);
console.log(obj.__proto__ == Object.prototype); //obj.__proto trả về class constructor (đi tìm cha của nó)
//Object là constructor chấm tới prototype là chấm tới cái constructor class

// obj không dùng chấm toString()

console.log(Object.prototype.__proto__); //Object.prototype là tìm tới cha của nó, cha nó là class Object (class constructor đúc ra các object) chấm tiếp __proto__ là tìm tới cha của thằng này là được null

console.log(obj.__proto__.__proto__); //null
// obj.__proto__ đi tìm cha nó (class constructor Object) -> tiếp tục tìm cha nữa -> hết

let arr = [1, 2, 3];
console.log(arr.__proto__ == Array.prototype); //true, Array.prototype
//ta được classArray (người tạo ra nó / cha nó)

console.log(Array.prototype.__proto__ == Object.prototype); //true
//tiền thân của Array.prototype là class Array -> tiền thân tiếp của nó (__proto__) là ta được class Object
//như vậy ta có thể hiểu rằng mảng là object
//(nó được tạo ra từ cha là Class (constructor) Array)
// ông nội là class (constructor) Object

console.log(arr.__proto__.__proto__ == Object.prototype); //true

console.log(arr.__proto__.__proto__.__proto__); //null
// chặng thứ 2 là max ping (class constructor object)
// lên nữa không được

console.log(arr.__proto__.__proto__ == Array.prototype.__proto__); //true

// nếu arr.toString() thì nó xài toString của Array hay Object?
console.log(arr.toString());
// nó xài của Array vì loại trừ, ta nếu nó xài của object nữa thì chấm sẽ bay lên null

//Number cũng là object luôn
let a = 5;
console.log(a.__proto__ == Number.prototype); //true
