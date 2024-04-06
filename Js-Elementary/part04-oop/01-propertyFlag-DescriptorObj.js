console.log("hello world!");

//propertyFlag : 4 lá cờ

// value: giá trị của props

// writable: true  -> value thay đổi được giá trị
//           false -> chỉ đọc

// enumerable: true thì có thể duyệt trong vòng lặp, false thì không (bị ẩn đi)

// configurable: true thì prop có thể cập nhật các lá cờ
//              false thì không cập nhật được enumerable
//                 writable thì chỉ được từ T -> F (không được F -> T)
//                 value sẽ dựa vào writable

// bất cứ property nào của obj đều sở hữu 4 lá cờ này (1 bộ cờ)
// PropertyDescriptor
let profile = {
  // trong js không nên sử dụng name vì trùng với window
  fname: "Điệp",
  age: 18,
};

//1. Object.getOwnPropertyDescriptor(obj, "propName");
console.log(Object.getOwnPropertyDescriptor(profile, "fname"));
//xem được bộ cờ của các thuộc tính bất kì

//2. Object.defineProperty(object, "propName", {});
// có 2 chức năng để sử dụng
// tạo thuộc tính mới kèm với bộ cờ | chỉnh sửa lại bộ cờ bất kỳ
// hàm định nghĩa bộ cờ của property nào đó trong object
//2.1 cập nhật lại bộ cờ của prop có sẵn: liệt kê cái nào thì cập nhật cái đó
Object.defineProperty(profile, "fname", {
  writable: false,
  enumerable: false, //đổi màu fname
});
profile.fname = "Tuấn"; //dòng này chạy nhưng không gì thay đổi
console.log(profile);

console.log(Object.getOwnPropertyDescriptor(profile, "fname"));

for (const key in profile) {
  console.log(key);
}
// chỉ duyệt được age, fname bị ẩn

// thằng nào được cập nhật thì chỉ tác động lên chính nó

//2.2 dùng để tạo props mới kèm bộ cờ

//liệt kê flag nào thì flag đó ảnh hưởng
//không liệt kê thì false

Object.defineProperty(profile, "job", {
  value: "yangho",
  writable: true,

  // enumerable: false,
  // configurable: false,
});
console.log(profile);
console.log(Object.getOwnPropertyDescriptor(profile, "job"));
// {value: 'yangho', writable: true, enumerable: false, configurable: false}

// nếu mà ta duyệt key thì profile chỉ duyệt được age
// còn job thì không hiển thị vì enumerable của job là false
for (const key in profile) {
  console.log(key);
}

// II - Non-configurable: không thể cấu hình
// configurable: false => nghĩa là không cho ta set giá trị của bộ cờ
// ngoại trừ writable: true -> false (value dựa vào đây)

// người ta thường dùng nó trong các giá trị đặc biệt như Math.PI

// vì trong các props trong obj không có ràng buộc được (const, final bla bla)
// nên mới phải cần đến các bộ cờ

// khi đã configurable: false thì không thể dùng defineProperty để set về true được

// configurable: false sẽ có những đặc điểm sau
// 1. không thể thay đổi configurable
// 2. không thể thay đổi enumerable
// 3. không thể thay đổi writable (từ F -> T) (nhưng T -> F thì được)
// 4. không thể thay đổi getter và setter (accessor property)

// Sử dụng defineProperty chỉ định nghĩa được 1 obj
// nếu muốn định nghĩa nhiều thì defineProperties

// Object.defineProperties(obj, {
//   key: {PropertyDescriptor},
//   ...
// })

Object.defineProperties(profile, {
  point: { value: 9, writable: true },
  student_id: { value: "SE111", writable: true },

  // enumerable: false,
  // configurable: false,
});

console.log(profile);
console.log(Object.getOwnPropertyDescriptors(profile));

// hàm getOwnPropertyDescriptors(profile) có chức năng y hệt
// {
//   key: {PropertyDescriptor},
//   key: {PropertyDescriptor},
//   key: {PropertyDescriptor},
// })

// cần clone object dùng spread ...
let objClone = { ...profile };
console.log(Object.getOwnPropertyDescriptors(objClone));
// nhưng mà ta chỉ được 1 thằng age do còn lại enumerable bị false
// không thể duyệt for để đọc được

// mà ta muốn ăn cắp hết thì phải làm sao
// clone thông qua bộ get mô tả
objClone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(profile)
);
console.log(Object.getOwnPropertyDescriptors(objClone));

// ---------------------------------------------------------------------------------------------
//          =======> Sealing an object globally - niêm phong toàn bộ 1 object <========
//      những thằng này rất ít dùng trong dự án nhưng cũng rất là nhanh tiện
// Object.preventExtensions(obj)
//      Ngăn cấm thêm thuộc tính mới vào object
//      muốn biết 1 object có đang preventExtensions không ta dùng Object.isExtensible(object)

// Object.seal(obj)
//      Ngăn cấm thêm mới/xóa thuộc tính object
//      set configurable : false cho tất cả các pro
//      muốn biết 1 object có đang seal không  ta dùng Object.isSealed(object)

// Object.freeze(obj)
//      Ngăn cấm thêm mới/xóa/thay đổi thuộc tính object
//      set configurable : false và writable: false cho tất cả các pro                           |
//      muốn biết 1 object có đang freeze không  ta dùng Object.isFrozen(object)                |
// ----------------------------------------------------------------------------------------------
// Trong object có 2 loại thuộc tính,
// value property và accessor property
let student = {
  firstName: "Lê", //value property
  lastName: "Điệp", //value property

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

// console.log(student.getfullname());
// thực chất là hàm nhưng mà sử dụng như một biến
// demo getter
console.log(student);
console.log(student.fullname);
// demo setter
student.fullname = "Trà Long";
console.log(student);

// lastName : value, writable, enumerable, configurable
// fullName : get  , set     , enumerable, configurable

// I - getter và setter thông minh
// ứng dụng accessor property
// vd: giả sử muốn cấm người dùng viết code cho giá trị fname bé hơn 4

student = {
  // _: private
  // _fname,

  get fname() {
    return this._fname;
  },

  set fname(newName) {
    if (newName.length < 4) {
      alert("Name is too short");
      // không làm gì hết, ngừng luôn
      return;
    }
    this._fname = newName;
  },
};
student.fname = "Hoàng";
console.log(student);
