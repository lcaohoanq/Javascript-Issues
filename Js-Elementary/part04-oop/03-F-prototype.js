// trong js người ta thích dùng function hơn class
// bên java nếu muốn tạo một object(bức tượng)
//              em phải thông qua Class (cái khuôn) -> constructor(phễu)

// bên js ta có constructor độc lập, tức là 1 function dùng để tạo obj
// mà không cần class bao bọc nó

// class Car {
//     function Car(name, price) {
//         this.name = name;
//         this.price = price;
//         this.showInfor() = "";
//     }
// }

// thay vì viết như trên ----------------------------------

function Car(name, price) {
  this.name = name;
  this.price = price;

  // bên trong hàm sẽ không có [[Prototype]]
  // mà chứa prototype

  //   prototype = class Car {
  //     constructor(name, price) {
  //       this.name = name;
  //       this.price = price;
  //     }
  //   };
}

let audi = new Car("Audi", "2 tỷ");
// audi{
//     name: "Audi",
//     price: "2 tỷ",
//     [[Prototype]]: prototype của Function car => class Car
// }

// nếu thằng object nào tạo bằng Car thì sẽ có [[Prototype]] ~~~

console.log(audi);

// tạo một object không đúc từ phễu
// bắt kế thừa tới phễu, phát sinh ra sự không chắc chắn về prototype (không xác định được)
let factory = {
  date: "2023",
};

Car.prototype = factory;

// Car.prototype = new Class Car()

let rollRoyce = new Car("rollRoyce", "1 tỷ 2");
// rollRoyce{
//     name: "rollRoyce",
//     price: "1 tỷ 2",
//     [[Prototype]]: factory{
//         date: "2023",
//     }
// }

// js không đảm bảo đúng constructor mà ta cần
// nếu như ta chủ động thay thế prototype của constructor

//Ôn bài trên
//F.prototype mặc định là thuộc tính của constructor function
//mỗi function đều có thuộc tính prototype,
//ngay cả khi chưa gán giá trị thì nó vẫn có sẵn

//prototype mặc định là 1 object chứa thuộc tính là constructor
//trỏ ngược lại function constructor đó

function Animal(name) {
  this.name = name;

  prototype = class Animal {
    constructor(name) {
      this.name = name;
      //   prototype = class Animal {
      //     ...
      //   }
    }
  };
}

console.log(Animal.prototype); //class Animal
console.log(Animal.prototype.constructor == Animal); //true

let dog = new Animal();
//dog là một object được đúc ra từ cái phễu/class Animal

// console.log(dog.prototype);
// dog là object nên sẽ không có prototype thường

// console.log(dog.[[Prototype]]); không được ghi kiểu này

console.log(dog.__proto__); //class Animal (cha nó)
// Tại sao lại ra class Animal?
// Vì nó là một obj được đúc từ cái phễu Animal

console.log(dog.__proto__.constructor); //f Animal

console.log(dog.constructor); //f Animal

// từ con dog có thể tạo ra được obj khác
let chihuahua = new dog.constructor();
console.log(chihuahua);
