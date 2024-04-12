console.log("07-windowObject");

// windowObject(wo) là đại diện cho cửa sổ trình duyệt

// tất cả các global object, function, biến mà tạo bằng var đều được xem là method | props của wo

// let và const không phải

// ngay cả DOM(Document Object Model) cũng là của wo

console.log(window.innerHeight);
console.log(window.innerWidth);

setTimeout(() => {
  // window.open(url,target,size)
  window.open("https://gearvn.com/", "_blank", "width = 500, height = 500");
}, 3000);

// window.close();

//location
//href = protocol + hostname | pathname
console.log(location.href);
console.log(location.hostname); //domain
console.log(location.pathname);
console.log(location.protocol);

/* location.assign("url")
location = ("url") */

// history.back();
// history.forward();

//trình duyệt cung cấp 3 loại popup
alert("Ahihi con chó kia");
let result = confirm("Anh Điệp có đẹp trai ko?");
if (result) {
  alert("Ghét nhất bọn nói thật");
} else {
  alert("Đừng dối lòng nữa");
}

let result2 = prompt("Nhập tên của bạn đi", "Giá trị mặc định");
