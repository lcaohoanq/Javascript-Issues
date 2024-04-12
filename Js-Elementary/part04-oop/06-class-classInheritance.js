console.log("Hello");

// class là cái khuôn
// bên trong class có constructor function (phễu), thuộc tính và method
// class sẽ dùng constructor để tạo ra đối tượng

class User {
  constructor(fulName) {
    [this.firstName, this.lastName] = fulName.split(" ");
  }
  show() {
    console.log(
      `firstName của tui là : ${this.firstName} và lastName của tui là : ${this.lastName}`
    );
  }
}

// anh muốn tạo ra 1 user tên là Điệp bằng class user
let diep = new User("Lê Điệp");
// diep{
//     firstName = "Lê",
//     lastName = "Điệp",
//     [[Prototype]] : class user{
//         constructor,
//         show()
//     }
// }

// hàm show thuộc về class user

console.log(diep);

console.log(diep.__proto__ == User.prototype); //diep là một obj đúc từ, class User (class constructor)

console.log(typeof User); //function | chính là constructor function

console.log(User.prototype.constructor == User); //true
//chính nó luôn

// class còn gọi với 1 cái tên nữa là "syntactic sugar"
// ý chỉ sự thay đổi cú pháp, thay đổi về mặt syntax cho dễ tiếp cận

// bởi vì trước đó người ta không cần class

function Student(fulName) {
  [this.firstName, this.lastName] = fulName.split(" ");
  //   this.show = function () {
  //     console.log(
  //       `firstName của tui là : ${this.firstName} và lastName của tui là : ${this.lastName}`
  //     );
  //   };

  // thằng show không nằm trong cấp [[Prototype]]
}
Student.prototype.show = function () {
  console.log(
    `firstName của tui là : ${this.firstName} và lastName của tui là : ${this.lastName}`
  );
};
// đưa thằng show vô trong cấp [[Prototype]]

let tuan = new Student("Phạm Tuấn");
console.log(tuan);

// điểm khác nhau giữa obj tạo từ class và obj tạo từ constructor function
// 1. constructor function không cần dùng chữ new (có hoặc không)
// điểm mạnh của việc sử dụng hàm là ứng dụng khả năng callback, currying, hof
let hung = Student("Hung Khung");

// 2. về hình ảnh
console.log(User); //class
console.log(Student); //f

// 3. Code trong class luôn use strict, không hoisting
// class mà ta tạo ở trên là class declaration
// ngoài ra ta còn có class expression (bỏ nguyên class vô một biến)

let User1 = class Ahihi {
  constructor(fulName) {
    [this.firstName, this.lastName] = fulName.split(" ");
  }
  show() {
    console.log(
      `firstName của tui là : ${this.firstName} và lastName của tui là : ${this.lastName}`
    );
  }
};
// Ahihi là tên gọi ở nhà của User1

/* Biểu diễn */
// hàm tạo ra class
function makeClass() {
  class Ahihi {
    constructor(fulName) {
      [this.firstName, this.lastName] = fulName.split(" ");
    }
    show() {
      console.log(
        `firstName của tui là : ${this.firstName} và lastName của tui là : ${this.lastName}`
      );
    }
  }
  return Ahihi;
}
let user3 = makeClass();

// **Compute Name []
// tên mà có công thức
// tăng cường về bảo mật cho các id class
class User5 {
  firstName = "Nguyễn";
  showName() {
    console.log("hello");
  }
}
let hue = new User5();
hue.showName();

// cảnh giác với this trong class
class Button {
  constructor(value) {
    this.value = value;
  }
  click() {
    console.log("giá trị là " + this.value);
  }
}

let btn = new Button("Ahihi");
// btn{
//   value: "ahihi",
//   [[Prototype]]: Button.prototype => class Button(constructor, click)
// }
// btn.click();

//điều gì sẽ xảy ra nếu như xài hàm click trong callback
// setTimeout(btn.click, 3000); ////undefined
// viết như này có nghĩa là btn đưa click cho setTimeout -> và btn mất luôn
// click chứa this bị undefined
// không tìm được this
setTimeout(() => {
  btn.click();
}, 3000);

// cách 2: bind
class Button1 {
  constructor(value) {
    this.value = value;
    this.click = this.click.bind(this);
  }
  click() {
    console.log("giá trị là " + this.value);
  }
}

// btn{
//   value: "ahihi",
//   click
//   [[Prototype]]: Button.prototype => class Button(constructor, click)
// }
// btn.click();

btn = new Button1("Ahuhu");
setTimeout(btn.click, 3000);

// cách 3: dùng fa
class Button3 {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log("giá trị là " + this.value);
  };
}

// btn{
//   value: "ahihi",
//   click
//   [[Prototype]]: Button.prototype => class Button(constructor, click)
// }
// btn.click();

btn = new Button3("Ahuhu");
setTimeout(btn.click, 3000);

//II - Class inheritance: kế thừa thông qua Class
// ngày trước js không có class ta kế thừa bằng prototype của constructor và
// kế thừa nguyên mẫu __proto__ ([[Prototype]])

// về sau khi cập nhật thêm Class thì ta có thể kế thừa thông qua từ khóa "extends"
// extends là mở rộng, ám chỉ sự liên quan giữa 2 class với nhau
// class này là phiên bản mở rộng của class kia và vô tình trùng với ý nghĩa của từ inheritance

// 'syntactic sugar' : cú pháp kẹo đường
// ám chỉ việc viết kế thừa trở nên dễ dàng như ăn kẹo

class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }
  // method
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  }
  // method
  stop(speed) {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
}

let ani = new Animal("My Animal");

class Rabbit extends Animal {
  constructor(name) {
    super(name); //new Cha | new Animal
  }
  hide() {
    console.log(`${this.name} hides!!!`);
  }
  stop() {
    setTimeout(() => {
      super.stop();
    }, 1000);
  }
}

let yellowRabbit = new Rabbit("YellowRabbit");
yellowRabbit.hide();
yellowRabbit.run(9);

yellowRabbit.stop;
// ani.hide(); ////không chấm được hide (quy tắc bất hiếu)

// yellowRabbit{
//   name: "YellowRabbit",
//   speed: 6,
//   [[Prototype]]: Rabbit.prototype => class Rabbit
//   class Rabbit.__proto__ = Animal.prototype => class Animal
//   class Animal.__proto__ = Object.prototype => class Object
//   class Object.__proto__ = null
// }

console.log(yellowRabbit);

// thêm một hàm stop cho rabbitYellow
// override

//class field
class Animal2 {
  name = "isAnimal"; //*class field
  constructor() {
    // this.name;
    // this.age;
    // nếu không khai báo thì tự hoisting luôn

    console.log(this.name);
  }
}

class Rabbit2 extends Animal2 {
  name = "isRabbit"; //*class field
}

let ani2 = new Animal2(); //isAnimal
let rabbit2 = new Rabbit2();
// class field: đặc trưng của nó là không kế thừa, không vượt mặt
// chỉ overwrite

console.log(rabbit2);

console.clear();

// 8 - static-property-method
//static: tĩnh

//static: trong prop
class User9 {
  name = "Điệp";
  static name2 = "Lan";
}
let obj = new User9();
console.log(obj.name);

//static là xài chung, do cái khuôn/class nắm giữ
//khác với java
//đứng từ obj truy cập vào thuộc tính static

// console.log(obj.name2); ////lỗi

//nhưng js sẽ hiểu theo kiểu khác

console.log(User9.name2); //vì thuộc về khuôn nên đứng từ bộ khuôn truy cập vào

// ***
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  //tính đố kị
  static compare(ArticleA, ArticleB) {
    return ArticleA.date - ArticleB.date;
  }
  // việc viết như vậy thì sẽ làm cồng kềnh hàm, mọt obj đều phải gánh compare
  // FIX: thêm staitc nữa
}

//tạo mảng lưu một vài bài báo
let articleList = [
  new Article("Hoài Linh để quên 14 tỷ trong ngân hàng", new Date(2022, 2, 4)), //trong new Date tháng bị -- (giảm đi một)
  new Article("Jack bán áo có chữ ký Messi để từ thiện", new Date(2022, 0, 6)),
  new Article(
    "Người mua áo Messi từ thiện cho con Jack",
    new Date(2022, 8, 20)
  ),
];

//một tờ báo 2 thông tin thì không sắp xếp được
articleList.sort();

//sử dụng tính đố kị
articleList.sort(Article.compare); //vì compare là static thuộc về bộ khuôn, nên đứng từ khuôn truy cập
console.log(articleList);

//***Access modifier : đây là đại diện của tính đóng gói trong OOP ở js

//trong js chỉ chia ra 2 là Internal và External interface
// Internal interface - phương thức và thuộc tính chỉ có thể được truy cập bên trong các phương thức trong class, không phải từ bên ngoài.
// External interface - phương thức và thuộc tính có thể truy cập được từ ngoài và trong class.
// Trong Javascript, có 2 loại thuộc tính và phương thức:

// Public: có thể truy cập từ bất kỳ đâu. Nghĩa là external interface. Cho đến bây giờ thì chúng ta chỉ sử dụng thuộc tính public
// Private: có thể truy cập bên trong class. Nghĩa là internal interface
// Trong nhiều ngôn ngữ khác thì còn tồn tại trường "protected": chỉ có thể truy cập bên trong class và những class kế thừa.

// Trường Protected không được quy định trong Javascript ở cấp độ ngôn ngữ, những trong thực tế để cho tiện lợi thì chúng ta có thể giả lập để quy ước với nhau.

//ReadOnly(Accessor Property - chỉ có get mà không set)
//nếu khai báo get mà k có set, thì nó sẽ thành readOnly, không đổi giá trị đc
//nếu không có set/get thì nó tự tạo , sẽ gán bt
//các dev quy ước tên _ ở trước là private chỉ dùng trong class, nên truy cập bằng get/set
//không nên . tới
//việc quy ước này không đảm bảo được ngôn ngữ, chỉ là quy ước

class CoffeeMachine {
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

let cfm = new CoffeeMachine(100);
//obj này không truy cập được _power
//lớp ngoài là power nhưng giá trị thật sự là _power
cfm.power = 50; //không cập nhật được, không truy cập được
cfm._power = 50; //thoải mái cập nhật (nhưng mấy lập trình viên không cho)
console.log();

// ***
class CoffeeMachine1 {
  #power;
  constructor(power) {
    this.#power = power;
  }
  get power() {
    return this.#power;
  }
}
let cfm1 = new CoffeeMachine1(100);
console.log(cfm1.power); //100
// console.log(cfm1.#power);

// *** instancesof: hỏi 1 object có phải là thuộc về class hay function nào hay không
// mang1 instancesof Array => true | false
// typeof mang1 => chuỗi: "Array"
