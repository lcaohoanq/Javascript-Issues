console.log("06-methodObject-this-HOF-bind");
//object: đối tượng
//tất cả những gì sờ được, đếm được đều là đối tượng
//các đối tượng(obj) có thể được miêu tả bằng properties(thuộc tính)
//     các đối tượng sẽ chứa các function
//     function mà nằm trong object thì nó là method(phương thức)
//     function mà nằm ở ngoài thì vẫn là function

let promotionBoy1 = {
  nickname: "Lê Mười Điệp", //properties
  age: 25,

  //hành động: method (function)

  //method ~ function

  //đây là một method được viết bằng fd -> mfd (method-functionDeclaration)
  sayHi() {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },

  sayHi1: function () {
    //mfe
    console.log("Ahihi quẹo lựa quẹo lựa");
  },

  sayHi2: () => {
    //mfa
    console.log("Ahihi quẹo lựa quẹo lựa");

    //nếu trong này có this thì sẽ ~~~~~~~~~
  },
};
//cách tạo method bằng fe/fd về mặt lí thuyết có sự khác nhau trên cơ sở kế thừa
//nhưng quá nhỏ, không đáng kể

//thường ngta viết method bằng mfd ... (dễ đọc hơn)

//function thì thường dùng fe(tránh hoisting) |fa(đạt hiệu quả rút gọn)(không chơi với this)

//ta có thể tạo thêm prop hay method sau khi đã tạo object

promotionBoy1.money = 1000; //tạo thêm prop sau khi đã khởi tạo object

//tạo thêm một hàm fe
promotionBoy1.chuiKhach = function () {
  console.log("under the hook, ko dc thi cook");
};
console.log(promotionBoy1);

//nâng cao 1 tí xíu
//xác định this trong method
//object > method > (chứa this)
let promotionBoy2 = {
  nickname: "lê Mười Điệp", //props

  //method
  showName() {
    console.log("Nickname nè " + this.nickname); //this là undefined vì mới tạo ra và không có ai gọi
  },
  showName1: function () {
    console.log("Nickname nè " + this.nickname); //this là undefined vì mới tạo ra và không có ai gọi
  },
  showName2: () => {
    console.log("Nickname nè " + this.nickname); //this là undefined vì mới tạo ra và không có ai gọi
  },
};
//giá trị của this chỉ được xác định khi runtime

// theo định nghĩa thông thường
//object nào gọi method chứa this thì this là thằng object đó (Java)

promotionBoy2.showName(); //mfd chứa this nên sẽ là object phía trước dấu chấm tức là promotionBoy2.nickname =)))))) đang gọi this
promotionBoy2.showName1(); //mfe không khác gì mfd
promotionBoy2.showName2(); //mfa thả this là window mà window.nickname -> undefined

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//nâng lên 1 tí

//xác định this trong function của method trong object
//object > method > function > this
console.log("Test Th2: this");

let promotionBoy5 = {
  nickname: "lê Mười Điệp", //props

  //method
  showName() {
    // console.log("Nickname nè " +this.nickname); //this là undefined vì mới tạo ra và không có ai gọi

    // nếu tạo thêm 1 function nữa gọi cái trên thì sao??????????????
    let arrow = () => {
      console.log("Nickname nè " + this.nickname);
    };
    arrow();
    // thả this
    //.....this......
  },
  //đổi thử fe
  showName2() {
    let expression = function () {
      console.log("Nickname nè " + this.nickname);
    };
    expression();
  },
};
promotionBoy5.showName();

// nếu như bình thường vừa mới vô this ở ngoài thì ta sẽ xác định được
//promotionBoy5 gọi method showName(mfd) giam this và xác định được this là object(promotionBoy5) gọi showName

//khổ nỗi this lồng vô function!!!!!!!!!!!!!!

//vậy nếu tạo thêm một fa (dòng 94) gọi chạy hàm luôn -> thì như thế nào????
//nó sẽ thả this ra(dù là use strict hoặc normal) -> thả như thế nào?
//thả từ từ đi bộ ra -> tìm cha nó (mày cứ đi thoải mái đi đừng quan tâm tao)
//trong quá trình thả nó sẽ bị showName bắt gặp -> nó bắt this lại
//showName là mfd nên nó xác định this là obj(promotionBoy5) gọi showName
//this là promotionBoy5

promotionBoy5.showName2();
//nếu arrow ---> fe thì sao ???
//xét 2 trường hợp:
//use strict: giam this lại -> this không tìm được cha nó, nên trả ra undefined mà (undefined.nickname -> lỗi)
// (không có thuộc tính.thuộc tính -> lỗi)

//normal: sút thẳng ra window thằng showName không bắt được (window.nickname -> undefined)

//tóm lại nếu tạo hàm trong method thì nên dùng FA -> thả this ra từ từ, dễ kiểm soát

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//nâng lên 1 tí
// nếu trong function gọi một function khác (callback) ntn?
//object > method > function(function | this)
let promotionBoy6 = {
  nickname: "lê Mười Điệp", //props

  //method
  showName() {
    // console.log("Nickname nè " +this.nickname); //this là undefined vì mới tạo ra và không có ai gọi

    // nếu tạo thêm 1 function nữa gọi cái trên thì sao??????????????
    let arrow = () => {
      console.log("Nickname nè " + this.nickname);
    };
    // setTimeout(arrow(), 3000); không được làm như này vì truyền vào một cái hàm chứ không phải cái hàm đang chạy arrow() != arrow

    //đợi 3s rồi chạy hàm arrow()
    setTimeout(arrow, 3000);
  },
  //đổi thử fe
  showName2() {
    let expression = function () {
      console.log("Nickname nè " + this.nickname);
    };
    setTimeout(expression, 3000);
  },
};
//đáp án giống y chang cái trên

//Hạ Nhiệt Một Tý xíu?
//Tại sao cần có this?
let promotionBoy3 = {
  nickname: "Lê Mười Điệp",

  showName() {
    //fd
    console.log("nickname " + this.nickname); //this lúc này là undefined

    // console.log("nickname" +promotionBoy3.nickname); //thắc mắc của anh điệp
  },
};
promotionBoy3.showName();
//
let promotionBoy4 = promotionBoy3;
promotionBoy3 = null;
// promotionBoy4.showName();
//gây ra lỗi vì nếu code như dòng 160 thì promotionBoy3 đang null mà gọi đến showName
// null.nickname -> lỗi

/////////////////////////////////////////////////////////////////////////////////////////////////////

//HOF
//1. callback: hàm nhận vào 1 hàm làm argument
//2. closure : hàm return về 1 hàm khác
//3. currying: là cách biến đổi 1 hàm nhiều para thành các hàm liên tiếp có parameter

//overview: nhìn tổng quan
//viết hàm nhận vào 2 số, trả ra tổng của 2 số đó

//tại sao lại xài arrow,
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

// tại sao phải viết như vầy
// phân thành 2 tầng, nhận vào giá trị đầu vào rồi sẽ tới một cái hàm nữa

// ví dụ setTimeOut cần phải nhận vào một cái hàm != cái hàm đang chạy .........

////////////////////////////////////////////////////////////////////////////////////////////

//1. callback: hàm nhận vào 1 hàm làm argument
const array1 = [1, 2, 3, 4, 5];
array1.forEach((val, key) => {
  //cơ chế hoạt động của forEach do có iterable -> sẽ nhận vào giá trị
  //iterator đưa giá trị cho phần in ra

  console.log(val, key);
});

//2. closure
//  2.1 lexical scoping: hàm con dùng biến của hàm cha
//  2.2 closure: 1 function return về 1 function

//  ứng dụng: tạo ra 1 hàm chuyên generate id(máy tạo key tự tăng)

const initIdentity = () => {
  let newId = 0;
  return () => {
    return ++newId;
  };
};

//cách dùng sai
console.log("Cách dùng sai");

console.log(initIdentity()); //tạo newId = 0 và trả ra hàm () => ++newId

// chạy bao nhiêu lần cũng được 1, đã đúng 1 phần

console.log(initIdentity()()); //1
console.log(initIdentity()()); //1
console.log(initIdentity()()); //1

//xài đúng
console.log("Xài đúng");

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

//////////////////////////////////////////////////////////////////////
// công dụng của việc phân ra nhiều lớp như vậy?????

// setInterval(initIdentity, 4000);
// nếu gọi thẳng như này thì callback sẽ không được vì callback cần nhận một hàm trong phần tham số

// setInterval(initIdentity(), 4000);
// tách lớp thành 2 phần, phần đầu tiên là sẽ trả ra một cái hàm =))))))))))
//đưa cho callback

//3. Currying: là cách biến đổi 1 hàm nhiều para thành các hàm liên tiếp có para

//ứng dụng:
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

// currying
//việc sử dụng currying sẽ khiến hàm nhìn rất khó chịu
//sử dụng hàm cũng theo cách khác
handle = (end) => (checkNumberFunc) => {
  let result = [];
  for (let i = 0; i <= end; i++) {
    if (checkNumberFunc(i)) result.push(i);
  }
  return result;
};
handle(10)((number) => number % 2 == 0);
//ứng dụng nhiều trong react js

//Call, Apply, Bind
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

//ứng dụng
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

//dateTime
// thời gian trong js là object | dựa vào milisecond
// được tính từ 1/1/1970 theo chuẩn utc
// có 4 cách khởi tạo
let a = new Date();
a = new Date(1691849563977);
a = new Date("2023-8-12");
a = new Date(2023, 7, 12, 21, 13, 0, 0); //year/month-1/day/hour/minute/second/milisec

console.log(a);

//recommend xài method này vừa tiện, ngắn, tương thích tốt
console.log(a.toISOString());

// getDate()        : lấy ngày trong tháng //16
// getDay()         : lấy ngày trong tuần (0: chủ nhật - 6:thứ 7);
// getFullYear()    : lấy năm
// getHours()       : lấy giờ 0-23
// getMilliseconds(): lấy mili giây (0-999)
// getMinutes()     : lấy về phút (0-59)
// getMonth()       : lấy về tháng (0 -11)
// getSeconds()     : lấy về giây (0-59)
// toISOString()    : lấy định dạng thời gian chuẩn
//dùng để bỏ vào DBI/ vì các ngôn ngữ trình duyệt khác
//đểu có thể chuyển từ ISO này về dạng bth được
