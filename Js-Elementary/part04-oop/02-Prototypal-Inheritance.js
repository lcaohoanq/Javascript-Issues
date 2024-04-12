//Prototypal - Inheritance: kế thừa nguyên mẫu
//kế thừa không thông qua nguyên tác thông thường

// kế thừa 2 object với nhau

//con nuốt cha luôn =))))))

// [[Prototype]]
// trong object luôn có 1 thuộc tính ẩn tên là [[Prototype]]
// có rất nhiều cách để sử dụng nó
// một trong số những cách phố biến nhất là
// thông qua getter và setter (accessor property) tên là __proto__

let longEar = {
  ear: "long",
};
// longEar bản chất là let longEar = new Object({ear: long});
console.log(longEar);

let rabbitPink = {
  jumps: true,

  //cách viết gọn hơn
  //   __proto__: longEar,
};

// rabbitPink nhận longEar bằng cha

rabbitPink.__proto__ = longEar;
console.log(rabbitPink); //chứa thằng cha nó bên trong
console.log(rabbitPink.ear); //long

// ***[[Prototype]] khác với __proto__
// đây là bộ getter | setter của [[Prototype]]

let congido = {
  eats: true,
  walk() {
    console.log("Tui chạy bộ nè");
  },

  //   ảo vậy ta, nó chứa cả longEar và rabbitPink luôn!!!
  __proto__: rabbitPink,
};

console.log(congido);

// congido > rabbitPink > longEar
rabbitPink.height = 10; //hoisting
console.log(congido.height); //10
console.log(longEar.height); //undefined (quy tắc bất hiếu)

// con gì đó kế thừa rabbitPink nên sẽ có height, còn thằng cha longEar thì không

// từ congido cập nhật ear của longEar thành "short"
// nếu đứng từ bậc cháu mà cập nhật các bậc lớn, thì sẽ bị ảnh hưởng chồng chất
// js tránh hiện tượng đổ domino để tạo thêm một prop mới là "short"
congido.ear = "short";
console.log(congido.ear);
console.log(congido);

// nếu muốn cập nhật ông cố nội từ con luôn
// proto xuyên không

// congido.__proto__.__proto__.ear = "short";
// console.log(congido.ear);
// console.log(congido);

// lưu ý: với __proto__
// trước ES6(2015) không có cách chính thống nào để truy cập vào [[Prototype]]
// hầu hết các trình duyệt đều thêm 1 accessor property là __proto__

// __proto__ có phải là thuộc tính của [[Prototype]]? Không, chỉ là một accessor

// __proto__ tính đến năm 2023 vẫn đang được loại bỏ khỏi js vì không chính thống
// __proto__ sau này được thay bằng
//          Object.getPrototypeOf(obj)
//          Object.setPrototypeOf(obj1,obj2)

// viết ngầu ~~
congido.__proto__ = rabbitPink;
congido.__proto__.__proto__ = longEar;

// ví dụ nâng cao
let student = {
  firstName: "Lê", //value property
  lastName: "Điệp", //value property
  // một thuộc tính có thể tạo ra được từ 2 thuộc tính kia thì không nên dùng
  // fullName: "Lê Điệp",

  // getfullname() {
  //   return this.firstName + " " + this.lastName;
  // },

  get fullname() {
    return this.firstName + " " + this.lastName;
  }, //accessor property

  set fullname(newName) {
    [this.firstName, this.lastName] = newName.split(" ");
  }, //accessor property
};

let user = {
  isUser: true,
  __proto__: student,
  // user kế thừa student nên sẽ có các prop chung
  // firstName và lastName
};

user.fullname = "Khủng Long"; //phân thành Khủng và Long rồi xcvcxzvxz,nvxz
console.log(user);

// tạo ra một user mới luôn =)) chứa FirstName: Khủng, LastName: Long
