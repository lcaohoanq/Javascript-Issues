//01-json-ajax-fetch.js

//*---------------------------------Theory------------------------------------
//*json: javascript object notation
//*      là một chuiỗi được viết dưới dạng js object
//dùng để lưu trữ và trao đổi dữ liệu

//*lưu được: string, number, boolean, array, object, null
//!không lưu được func/method

//để dễ dàng sử dụng ở các ngôn ngữ khác nhau
//có 2 thao tác chính là JSON.parse và JSON.stringify
//!Tóm lại: stringify biến object(mảng) thành chuỗi JSON
//!         parse     biến chuỗi JSON   thành object
//*---------------------------------------------------------------------------

const obj1 = {
  name: "Điệp đẹp trai",
  age: 24,
  status: "Hay giận dỗi",
  sayHi() {
    console.log("Hello");
  },
};

//!json sẽ không lưu hàm/method
//ý đồ lưu trữ
//chỉ cầm các prop và đem các prop đổ vào một class để đúc
//tự động có các hàm và method
//không cần lưu chúng cho mỗi obj -> cồng kềnh

let myJson = JSON.stringify(obj1);
console.log(obj1); //{name: 'Điệp đẹp trai', age: '24', status: 'Hay giận dỗi', sayHi: ƒ}
console.log(myJson); //{"name":"Điệp đẹp trai","age":24,"status":"Hay giận dỗi"}

//*---------------------------------syntax------------------------------------
//? với các object thì data là cặp name: value
//? các data được ngăn cách bởi các dấu , (comma)
//? {} dùng để mô tả object
//? [] dùng để mô tả array
//? json dùng dấu "" để phân biệt với dấu '' ở ngoài cùng của String
//? trường name phải bọc trong dấu nháy kép
//? value của json phải là 1 trong các dạng sau
//! lưu được: string, number, boolean, array, object, null
//* number không nằm trong dấu nháy đôi
//? không lưu trữ hàm hay method
//*---------------------------------------------------------------------------

//TODO -------------------------- đoán thử đáp án ----------------------------
let arr = ["Cam", 22, "ổi", "xoài"];
console.log(JSON.stringify(arr)); //["Cam", 22, "ổi", "xoài"]
let a = 1;
console.log(JSON.stringify(a)); //'1'
let str = "ahihi";
console.log(JSON.stringify(str)); //'"ahihi"'
let bool = true;
console.log(JSON.stringify(bool)); //'true'

//!-----------------AJAX: asynchronous Javascript And XML-------------------
//*đây không phải ngôn ngữ lập trình (rất nhiều người nhầm lẫn)
// AJAX là sự kết hợp của 3 công nghệ
//1. HTML      : hiển thị dữ liệu
//2. CSS       : trang trí cho HTML
//3. Javascript: xử lý logic

//?-------------------------XMLHttpRequest và DOM---------------------------
// XMLHttpRequest: object có sẵn của trình duyệt
// dùng để gửi và nhận data từ web server
//* server là (người tử tế, không reject, trả ra response(gói hàng)) mình phải tự mở

//!Cái tên Ajax bị lầm là ứng dụng Ajax sẽ sử dụng XML

//*AJAX giúp chúng ta đọc dữ liệu từ server trả về
//      gửi dữ liệu đến server ở chế độ ngầm
//      cập nhật trang web mà không cần reload lại trang
//      là nền tảng của React, Angular, Vue

//!------------FecthAPI: cung cấp cho mình khả năng gửi/nhận request thông qua trình duyệt--------------
//*Fecth dùng công nghệ Promise => tiện lợi và dễ dàng xử lý bất đồng bộ
//ta sẽ tiến hành tạo thao tác lấy dữ liệu từ server về bằng fetch

const baseUrl = "https://6512cbd2b8c6ce52b3963937.mockapi.io";

//*gửi 1 request lên server và yêu cầu server hứa sẽ trả dữ liệu cho mình
//đường dẫn ở trên có thêm /users
/* fetch(`${baseUrl}/users`)
  .then((response) => {
    //!gói hàng này bị đóng lại, dựa vào các thông tin để xác thực
    //!ok: true, status: 200
    if (response.ok) {
      // console.log(response);

      //TODO: cách làm lỗi
      // let data = response.json();
      // console.log(data);
      //!pending

      //TODO: lồng then vào then -> promise hell
      // response.json().then(data =>{
      //     console.log(data);
      // })

      //*chốt
      return response.json();
      //dẫn đến thằng onFullfilled gần nhất -> bay vô then gần nhất
    } else {
      //TODO: ta tận dụng statusText để throw lỗi
      throw new Error(response.statusText);
    }
  })
  .then((data) => {
    console.log(data);
    // (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  })
  .catch((error) => {
    console.log(error);
  }); */

//!fetch nhận về response của server sẽ không unbox gói hàng mà để tự chúng ta handle
//bằng .then .catch

//fetch dùng để thay thế cho XMLHttpRequest
//gửi request lên server
//trong request có gì?
//*method: get(lấy), post(thêm), put, delete, patch
//khi mà post thì sẽ truyền dữ liệu lên server, 2 cách
//!${baseUrl}/users/?username=Diep&passwork=toibigay
//*không truyền bằng cách này cho các thông tin nhạy cảm

//!body:{"name": "Điệp", "yob":24} server không hiểu mình gửi gì
//!sử dụng thêm headers: lưu token, những thông tin tài nguyên

//TODO: ---------------------------demo thêm 1 user : method : POST
fetch(`${baseUrl}/users`, {
  method: "POST",
  //!để cho server hiểu
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ name: "Em Điệp Đệ Quy", yob: 2004 }),
  //? Tại sao obj không có id?
  //* Vì id tự tăng nó sẽ tự update theo id hiện tại
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

//Sử dụng postman để kiểm tra bộ API có ngon không trước khi mình sử dụng
//thay vì mình code fetch thì mới thấy dữ liệu
