console.log("Xin chào các bạn");

// Các phương thức của prototype,
// nếu object không có [[Prototype]] thì sẽ sẽ như thế nào

// Chúng ta đang code ở thời đại 2023, ai cũng biết __proto__ là gì
// xài như thế nào, nhưng hãy xem như nó đã bị loại bỏ,
// giờ mình dùng các method khác thay vì dùng trực tiếp

//Object.getPrototypeOf(obj);           //get __proto__ lấy được [[Prototype]]
//Object.setPrototypeOf(obj, newProto); //set __proto__ cập nhật [[Prototype]] bằng newProto

// Object.create(proto, {discriptors})
// tạo 1 object rỗng, có [[Prototype]] = proto đã truyền vào, các thuộc tính được tạo kèm bộ cờ mô tả

let animal = {
  eat: true,
  __proto__: Object.prototype,

  //kế thừa class Object
};
// trong animal ngoài eat ra còn có [[Prototype]]

console.log(animal.__proto__ == Object.prototype); //true

// vì animal được tạo từ constructor Object

// nên animal.[[Prototype]] sẽ = prototype của Object constructor
// mà Object.prototype == class Object

// prototypal Inheritance: kế thừa nguyên mẫu (2 object)

//----------------------------------------------
let rabbitYellow = {
  jumps: true,
  // ta muốn thỏ vàng kế thừa animal
  // cách 1
  __proto__: animal,
  // nhưng mà cách này vẫn dùng đến __proto__
};

//----------------------------------------------
// Cách 2
let rabbitYellow1 = {
  jumps: true,
};
// rabbitYellow1.__proto__ = animal; //như nhau
Object.setPrototypeOf(rabbitYellow1, animal);

//----------------------------------------------
// Cách 3
let rabbitYellow2 = {
  jumps: true,
};
rabbitYellow2 = Object.create(animal);
//hàm tạo ra object rỗng {} có [[Prototype]] == animal
//không có props, ta cần nạp vô lại
rabbitYellow2.jumps = true;
//-----------------------------------------------
//Cách 4
rabbitYellow3 = Object.create(animal, {
  jumps: {
    value: true,
    writable: false,
    enumerable: false,
    configurable: true,
  },
});
console.log("Đây là rabbitYellow3 nha");
console.log(Object.getOwnPropertyDescriptors(rabbitYellow3));
//                      giờ ta muốn clone rabbitYellow thì sao

console.log("c1 spread");
// ----------------c1: spread ..
// có vấn đề, không thể lấy ra những thằng có enum là false (for không duyệt được)
// không lấy ra được prototype
let objClone1 = { ...rabbitYellow3 };
console.log(objClone1);
console.log(Object.getOwnPropertyDescriptors(objClone1));

console.log("c2 define props");
// ----------------c2: defineProperties
let objClone2 = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(rabbitYellow3)
);
console.log(objClone2);
console.log(Object.getOwnPropertyDescriptors(objClone2));

console.log("c3 full");
// ----------------c3: clone full
// Object.create(newProto, {descriptors})
let objClone3 = Object.create({
  //   rabbitYellow3.__proto__,
  //ta muốn copy từ thằng cha của mày luôn
  //   Object.getPrototypeOf(rabbitYellow),
  //   Object.getOwnPropertyDescriptor(rabbitYellow3)
});
console.log(objClone3);

//              Very plain object _ Object siêu phẳng | Base
// [[Prototype]] là Object, Class, null nhưng không được là String

let obj = {};
let key = "name";
obj.name = "Giá trị bất kì";
// obj["name"] = "Giá trị bất kì";
// obj[key] = "Giá trị bất kì";

//nếu key = "__proto__"
// thì obj[key] = {}, obj rỗng
// =>>>>>>> __proto__ không chứa string

console.log(obj);

// Object siêu phẳng
obj = Object.create(null);

// tạo object có [[Prototype]] = null

console.log(obj);

//----------

obj = Object.create(null);
key = "__proto__";
obj[key] = animal;
//ở đây máy sẽ không hiểu í mình
// mình cần set obj kế thừa lại thằng animal để nó ăn được thuộc tính eat
// nhưng máy tính hiểu rằng mình muốn in ra cái object tên là __proto__
console.log(obj);

// set lại [[Prototype]] = Object

obj = Object.create(null);
Object.setPrototypeOf(obj, Object.prototype);
key = "__proto__";
obj[key] = animal;
console.log(obj);
