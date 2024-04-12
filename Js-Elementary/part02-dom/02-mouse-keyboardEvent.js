// liên kết nút add
let btnAdd = document.querySelector("#btn-add");

// một vài sự kiện chuột phổ biến, mouseover, mouseout, dblclick, click
btnAdd.addEventListener("click", (event) => {
  console.log(event);
  console.log(event.clientX, event.clientY); //tọa độ nơi sự kiện diễn ra so với góc trái trên cùng, tham chiếu là view
  console.log(event.offsetX, event.offsetY); //tham chiếu là element nơi diễn ra sự kiện (góc trái trên cùng element)

  //**** */
  console.log(event.target); //return element diễn ra sự kiện
  //khi nhấn vào sẽ biết mình nhấn vào cái gì, identify được thằng nào là real, fake -> mình muốn xóa hay thao tác lên nó

  // tiếp tục build
  let inputNode = document.querySelector("#name");
  let newItem = document.createElement("li");
  newItem.className = "card p-2 mb-3";
  newItem.innerHTML = `<p>${inputNode.value}</p>`;

  //nhét lại vào ul có id = list
  let list = document.querySelector("#list");
  list.appendChild(newItem); //nối list với newItem

  //nhét xong thì xóa đi
  inputNode.value = "";
});

// tại sao lại nhận 1 cái event
// event lưu thông tin bằng 1 sự kiện nhấn (thời gian, nút gì)

// sự kiện bàn phím (down-nhấn-up)
// bấm xuống -> keydown -> sự kiện nổ ra -> nhận tín hiệu, rồi keyup trở về

let inputNode = document.querySelector("#name");
inputNode.addEventListener("keydown", (event) => {
  console.log(inputNode.value); //trễ một nhịp
});

//keydown, keypress, keyup(không có độ trễ) (customize dễ hơn)

//input (tổng hợp của 3 hành trình ) -> tiện hơn

//change

//tiếp tục build tiếp nút add bấm vào tạo li

// tìm hiểu về cookie và localStorage
// cookie
// cho phép lưu trữ thông tin người dùng web
const date = new Date(2023, 11, 28).toString();
document.cookie = `username = diep; expries = ${date}; path=/;`; //template string
console.log(document.cookie);

// trên thực tế, không thao tác tay với cookie
// sử dụng thư viện
// js.cookie

// localStorage: vĩnh viễn
localStorage.setItem("name", "Hoàng cookie");

//localStorage chỉ lưu chuỗi hoặc json
const profile = {
  name: "Anh Điệp yangho",
  age: 24,
};
console.log(profile);
//nếu muốn đưa cục dữ liệu này lên server thì phải biến thành chuỗi
//không dùng toString được
//sử dụng json
let str = JSON.stringify(profile);
console.log(str);
localStorage.setItem("profile", str);

// lấy về như thế nào?
let data = localStorage.getItem("profile");
//lấy được một cái chuỗi json

// chuỗi json tiện hơn chuỗi thường
// ép về object được
data = JSON.parse(data);
console.log(data);

//* JSON là gì?

//! Ví dụ định nghĩa 1 chuỗi JSON lưu trữ thông tin cá nhân như sau:
// {
// "username" : "kimoanh",
// "email" : "kimoan@gmail.com",
// "website" : "json.org",
// "title" : "Tìm hiểu về JSON"
// }

//* JSON là viết tắt của JavaScript Object Notation
// JSON là định dạng trao đổi dữ liệu văn bản dung lượng nhẹ
// JSON là ngôn ngữ độc lập
// JSON được "tự mô tả" và dễ hiểu

// 2 method phổ biến JSON.parse() và JSON.stringify()
// parse     : gom lại
// stringify : chuỗi

// STRING:
// chuỗi JSON -> parse     -> object {...}
// object     -> stringify -> chuỗi JSON {...}

// ARRAY
// chuỗi JSON -> parse     -> mảng []
// mảng []    -> stringify -> chuỗi JSON []

//!Tóm lại: stringify biến object(mảng) thành chuỗi JSON
//!         parse     biến chuỗi JSON   thành object
