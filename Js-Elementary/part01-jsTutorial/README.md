# 01 - Variable, Hoisting, Scope

## Variable

- `var, let, const`
- var appear at the most early stage of js
- let, const appear at ES6

## Var cause hoisting

> it's a feature, not a bug!!!!!

- default using `const`
- when need to change the value, use `let`

> should use let, const instead of var

```js
if(true){
  var toilet = "hello"
}
console.log(toilet) // hello

let a  = 10;

const add = (a, b) => return a + b;
```

# 02 - Data Type, Pass by Value, Pass by Reference

## Primitive Data Type

- number: 1, 2, 3
- string: "hello"
- boolean: true, false
- null: empty value but `know the type`
- undefined: empty value and `don't know the type`

```js
console.log(typeof null); //object

console.log(typeof undefined); //undefined
```

### == vs ===

- ==: compare the value
- ===: compare the value and type

```js
console.log(2 == "2"); //true
console.log(2 === "2"); //false
```

## Object Data Type

> key - value pair

- plain object:

```js
let student = { name: "Tùng", point: 10 };
```

### Array is also an object

- can contain any type of data

```js
let flowerList = ["Hoa", "Cúc", "Hồng", 10];
```

### Regex is also an object

```js
var regex1 = /SE\d{9}/;
console.log(typeof regex1); //object
```

## Function is also an object

```js
const handle1(a, b) => return a + b;

console.log(typeof handle1); //function
```

# 03-Loops

## for

- for: loop through the index of an array
- for in: loop through the `key` of an object
- for of: loop through the `value of an array`

### for in

```js
var student1 = { name: "Điệp", point: 10, major: "SE" };

for (const x in student1) {
  // x đại diện cho một cái key trong object
  console.log(x); //name, point, major
}
```

> set là một tập hợp cấm trùng, không có key

```js
var demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);

console.log(demoSet); // Set(3) {"Điệp", "Huệ", "Lan"}

for (const key in demoSet) {
  console.log(key); //không có gì
  //vì set không có key lấy đâu mà duyệt
}
```

### for of

> use iterator

```js
for (const value of student1) {
  console.log(value);
}
//lỗi;
```

- for of không chơi với object phẳng như ở trên
- for of chỉ chơi với array, set, map

```js
for (const value of demoSet) {
  console.log(value);
}
```

### forEach

- fore: for each: duyệt value + key

```js
demoSet.forEach((value) => {
  console.log(value); //Điệp, Huệ, Lan
});

["a", "b", "c"].forEach((value, key) => {
  //forEach là một method
  //nhận vào một hàm khác (callBackFunc)
  console.log(value, key);
});
```

# 04 - Object, this, HOF, bind

> object bị hoisting

- `mfd`: method function `declaration`
  - dễ đọc, dễ viết
- `mfe`: method function `expression`
  - ... tránh hoisting
- `mfa`: method function `arrow`
  - rút gọn, không chơi với this

```js
let promotionBoy1 = {
  nickname: "Lê Mười Điệp", //properties
  age: 25,

  sayHi() {
    //mfd
    console.log("Ahihi quẹo lựa quẹo lựa");
  },

  sayHi1: function () {
    //mfe
    console.log("Ahihi quẹo lựa quẹo lựa");
  },

  sayHi2: () => {
    //mfa
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
};
```

```js
let promotionBoy2 = {
  nickname: "lê Mười Điệp", //props

  //method
  showName() {
    console.log("Nickname nè " + this.nickname);
    //this là undefined vì mới tạo ra và không có ai gọi
  },
  showName1: function () {
    console.log("Nickname nè " + this.nickname);
    //this là undefined vì mới tạo ra và không có ai gọi
  },
  showName2: () => {
    console.log("Nickname nè " + this.nickname);
    //this là undefined vì mới tạo ra và không có ai gọi
  },
};
```

```js
promotionBoy2.showName(); //mfd chứa this nên sẽ là object phía trước dấu chấm tức là promotionBoy2.nickname =)))))) đang gọi this
promotionBoy2.showName1(); //mfe không khác gì mfd
promotionBoy2.showName2(); //mfa thả this là window mà window.nickname -> undefined
```

![alt text](distinction-this.png)

# HOF

1. callback: hàm nhận vào một hàm khác
2. closure: hàm trả về một hàm khác
3. currying: là cách biến đổi một hàm nhiều para thành các hàm liên tiếp có para

```js
let sumDemo = (a, b) => {
  return a + b;
};
console.log(sumDemo(2, 5)); // 7

//viết tắt hơn
sumDemo = (a, b) => a + b;

//HOF
sumDemo = (a) => {
  return (b) => {
    return a + b;
  };
};
//currying: biến đổi một hàm nhiều para một para
sumDemo = (a) => (b) => a + b;

console.log(sumDemo(2)(5));
```

- tại sao phải viết như vầy

  > phân thành 2 tầng, nhận vào giá trị đầu vào rồi sẽ tới một cái hàm nữa

- ví dụ setTimeOut cần phải nhận vào một cái hàm != cái hàm đang chạy .........

## 1. Callback

```js
function first() {
  // Simulate a code delay
  setTimeout(function () {
    console.log(1);
  }, 500);
}
function second() {
  console.log(2);
}
first();
second();
```

```js
first();
second();
// 2
// 1
```

Như các bạn thấy, mặc dù chúng ta gọi hàm first trước nhưng nó lại trả về kết quả sau hàm second.

Không phải là Javascript không thực hiện theo thứ tự mà ta mong muốn, vấn đề là Javascript sẽ không đợi function first thực hiện xong mà sẽ thực hiện luôn function second. Để đảm bảo Js thực hiện đúng thứ tự ta định sẵn, ta cần sử dụng đến khái niệm callback function. Callback là cách đảm bảo code sẽ không hoạt động trước khi các code khác hoàn thành việc thực thi.

## 2. Closure

- lexical scope: hàm con có thể truy cập vào biến của hàm cha
- closure: 1 hàm trả về 1 hàm khác

```js
//  ứng dụng: tạo ra 1 hàm chuyên generate id(máy tạo key tự tăng)

const initIdentity = () => {
  let newId = 0;
  return () => {
    return ++newId;
  };
};
```

```js
//cách dùng sai
console.log(initIdentity()); //tạo newId = 0 và trả ra hàm () => ++newId

// chạy bao nhiêu lần cũng được 1, đã đúng 1 phần

console.log(initIdentity()()); //1
console.log(initIdentity()()); //1
console.log(initIdentity()()); //1

//xài đúng
let demoClosure = initIdentity(); //newId = 0 và trả ra hàm () => ++newId
//biến này đã lưu một hàm đang có tham số đầu, nó chỉ chạy phần sau (phần tự tăng)
//thay vì cách trên thì nó sẽ luôn yêu cầu tham số đầu + tham số sau
// mình sẽ hứng một biến là kết quả đầu tiên trả ra của initIdentity,
// và lấy biến đó thêm ngoặc tham số
// xem như là một cái hàm (chạy lúc sau)

//bị reset khi gọi
console.log(demoClosure()); //1
console.log(demoClosure()); //2
console.log(demoClosure()); //3
```

```js
setInterval(initIdentity, 4000);
```

- nếu gọi thẳng như này thì callback sẽ không được vì callback cần nhận 1 hàm trong tham số

```js
setInterval(initIdentity(), 4000);
//tách lớp thành 2 phần, phần đầu tiên là sẽ trả ra một cái hàm =))))))))))
```

## 3. Currying

- là cách biến đổi 1 hàm nhiều para thành các hàm liên tiếp có para

```js
//viết 1 hàm có thể xử lí 3 bài toán sau????????????//
//tìm các số từ 0 -> 10 là số lẻ
//tìm các số từ 0 -> 20 là số chẵn
//tìm các số từ 0 -> 30 là số chia 3 dư 2

let handle = (end, checkNumberFunc) => {
  let result = [];
  for (let i = 0; i <= end; i++) {
    if (checkNumberFunc(i)) result.push(i);
  }
  return result;
};
//handle(10, (number) => return number % 2 == 0);

console.log(handle(10, (number) => number % 2 == 0));
console.log(handle(20, (number) => number % 2 == 1));
console.log(handle(30, (number) => number % 3 == 2));
//check số nguyên tố
handle(30, (number) => {
  //////////////////////////////////////
});
```

- cách viết này không tối ưu, không gọn, không dễ đọc
- việc sử dụng currying sẽ khiến hàm nhìn rất khó chịu

```js
handle = (end) => (checkNumberFunc) => {
  let result = [];
  for (let i = 0; i <= end; i++) {
    if (checkNumberFunc(i)) result.push(i);
  }
  return result;
};
handle(10)((number) => number % 2 == 0);
```

## 4. Call, Apply, Bind

```js
const people = {
  print(age, location) {
    console.log(this.fullname + " " + age + " " + location);
  },
};
people.print(10, "TP HCM"); //undefined 10 TP HCM
//this là people
//people.fullname = undefined

//ta có thể bẻ đường dẫn của this như sau
const diep = { fullname: "Lê Mười Điệp" };

//call(obj, ...parameter cũ)
people.print.call(diep, 10, "TP HCM"); //Lê Mười Điệp 10 TP HCM

//apply(obj, [...parameter cũ]) //bỏ vào mảng
people.print.call(diep, [10, "TP HCM"]); //Lê Mười Điệp 10 TP HCM

//bind(obj, ...para cũ)() => closures -------> đẻ ra một hàm khác
//this là chữ diep
people.print.bind(diep, 10, "TP HCM")(); //Lê Mười Điệp 10 TP HCM

//bind(obj)(...parameter cũ) => currying
//print cũ (this là people)

//tạo một print mới hứng print cũ với this là diep
people.print = people.print.bind(diep);
people.print(10, "TP HCM");
```

- ứng dụng

```js
let promotionBoy7 = {
  nickname: "lê Mười Điệp", //props

  //method
  showName2() {
    let expression = function () {
      console.log("Nickname nè " + this.nickname);
    }.bind(this);

    // fe sẽ giam this -> cần bind(this) đưa this vô ngược lại ->>>> vcl

    // cách sửa tốt hơn -> đổi fe thành fa -----------------------------

    setTimeout(expression, 3000);
  },
};
```

## 5. DateTime

- thời gian trong js là object | dựa vào milisecond
- được tính từ 1/1/1970 theo chuẩn utc
- có 4 cách khởi tạo

```js
let a = new Date();
a = new Date(1691849563977);
a = new Date("2023-8-12");
a = new Date(2023, 7, 12, 21, 13, 0, 0); //year/month-1/day/hour/minute/second/milisec
```

> recommend xài method này vừa tiện, ngắn, tương thích tốt

```js
console.log(a.toISOString()); //2023-08-12T14:13:00.000Z
```