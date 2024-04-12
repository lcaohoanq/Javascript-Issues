//? promise là một lời hứa diễn ra trong tương lai: anh sẽ làm điều gì đó

//một (promise) lời hứa sẽ luôn có 3 trạng thái (pending, off, onrj)

//ví dụ: lời hứa: anh sẽ đi Vũng Tàu và mua cho em bánh bông lan trứng
//                muối vào tháng 10
//nếu anh thành công thì: 1 cái ôm
//nếu anh thất bại thì: 1 sự thất vọng

//TODO: pending: đang chờ kết quả

//ảnh có một chuyến côg tác vào đầu tháng 10 đi Vũng Tàu
//* onFullfilled: cái Promise sẽ trả ra resolve("1 nụ hôn");

//ảnh hứa xong trời đánh thánh vật, ảnh bệnh hết tháng 10
//! onReject: Promise sẽ trả ra 1 reject("1 sự thất vọng");

//*cú pháp
// new Promise((resolve, reject) => {});
// new Promise(function (resolve, reject) {});

//--------------------------------------------------------------------
//?Tạo bối cảnh: chúa
let wallet = 5000; //*may mắn
wallet = 1000; //!xui rủi

//*Anh trai đó hứa với cô gái: "Anh sẽ mua cho em chiếc cà ná 5000$"

// let p1 = new Promise((resolve, reject) => {
//   if (wallet >= 5000) {
//     resolve("1 nụ hôn");
//     //vào đây được thì Promise sẽ rơi vào trạng thái onFullfilled
//   } else {
//     reject("1 sự thất vọng");
//   }
// });

//! đôi khi cô gái sẽ kiểm chứng lời hứa -> cô ấy chỉ biết có lời hứa p1
// p1.then((value) => {
//   console.log("Nếu tôi ở đây là lời hứa đã thành công rồi");
//   console.log("ảnh sẽ có " + value);
// }).catch((error) => {
//   console.log("Nếu ở đây thì lời hứa thất bại");
//   console.log("nhận được " + error);
// });
//*không biết lời hứa thành công hay thất bại nên phải kiểm tra

//TODO: THỬ CHUYỂN MỘT ASYNC CALL BACK THÀNH MỘT CÁI PROMISE
/* let data;

//server mất 3s để lấy dữ liệu
setTimeout(() => {
  data = { name: "Điệp", age: 24 };
}, 3000);

console.log(data); */ //bị undefined do không đợi callBack

//dùng Promise để khắc phục
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Điệp", age: 24 });
  }, 3000);

  //!đang mô phỏng trường hợp luôn thành công
});

p2.then((value) => {
  data = value;
  console.log("data nè " + data); //tự động convert toString(), khi ta in ra một object
  console.log(data);
});

//!từ 0-3s là pending
//!lời hứa sẽ đợi cho đến khi biết được onFullfilled | onReject rồi thả vào then | catch (tương ứng)

//*---------------Promise are eager not lazy
//lúc tạo ra lời hứa thì nó đã chạy rồi
//trên thực tế thì chúng ta không muốn nó chạy liền như vậy
//cần gọi chạy thì mới chạy
//!Cách viết như trên không thích viết

//?Cách cùi:
let a = 1;
let p3 = new Promise((resolve, reject) => {
  a++; //*nó sẽ bị pending hoài luôn vì không biết là resolve | reject
});

//nhiều người nghĩ rằng nếu p3.then thì lời hứa mới được chạy
//khi đó a++ mới thực hiện

//!nhưng không lời hứa khi viết ra đã chạy luôn

console.log(a);

//?Cách 2: hơi cùi: dùng function
a = 1;
function ahihi() {
  let p3 = new Promise((resolve, reject) => {
    a++;
  });
  return p3;
}
//!lúc này ahihi sẽ trở thành một Promise, có khả năng .then | .catch
ahihi().then();

console.log(a);

//?Cách 3: arrow: p = () => new Promise((resolve,reject) => {});
a = 1;
p3 = () =>
  new Promise((resolve, reject) => {
    a++;
  });
//! hàm p3 trở thành một promise
p3().then();
console.log(a);

//TODO: --------------------------------------------------------------------
//1 promise chỉ có thể rơi vào 1 trong 3 trạng thái
//      (pending | onFulfilled | onReject)
//                  resolve        reject
// resolve => then và reject => catch: 2 thằng này khá giống return

//! resolve và reject không làm cho code dừng lại
//! resolve | reject ai đến trước thì sẽ quyết định promise ở trạng thái nào

//* resolve ném giá trị cho then dưới dạng value
//* reject ném giá trị cho catch dưới dạng error
console.log("Demo p4");
let p4 = new Promise((resolve, reject) => {
  resolve("ahihi"); //TODO: chạy, vì lần đầu đụng đã gặp resolve -> onFullfilled
  reject("Lỗi rồi nè"); //!vô dụng
  console.log("Xin chào mọi người"); //chạy luôn

  //!vì lời hứa không bị dừng lại
});

//nếu bình thường mình nhận vào một lời hứa, . cả then và catch
p4.then((value) => {
  //lời hứa luôn onFullfiled vào then
  //vì resolve nằm trước reject
  console.log("Thành công " + value);
}).catch((error) => {
  console.log("thất bại " + error);
});

//! cách viết khác
p4.then(
  (value) => {
    console.log("Thành công " + value);
  },
  (error) => {
    console.log("thất bại" + error);
  }
);

// *ta không xử lí lỗi ở từng chỗ, mà dồn lỗi về một catch duy nhất

//!1. Nếu return trong then|catch thì ta sẽ đưa lời hứa về onFulfilled
//chấm then | catch thì nó sẽ luôn vô onFulFilled

//ta tạo một lời hứa siêu thất bại

let p5 = new Promise((resolve, reject) => {
  reject("Lỗi chà bá");
});

// p5 = Promise.reject("Lỗi chà bá"); //viết tắt

p5.then((value) => {})
  .catch((error) => {
    console.log("P5 đã thất bại nên bị lỗi là " + error);
    return "Lê Hồ Điệp"; //! return Promise.resolve("Lê Hồ Điệp")

    //hành động này khiến cho cả cụm p5.then là onFullFiled
    //onFullFiled luôn luôn vào then
  })
  .then((value) => {
    console.log("lần này anh ấy đã có được " + value);
  });

// //!2. throw trong then | catch thì ta sẽ đưa lời hứa về onReject
// let p6 = new Promise((resolve, reject) => {
//   resolve("Vui ghê");
// });

//vì lời hứa là resolve -> onFulfilled -> bắt vào cái then
//then gặp throw nên sẽ biến thành onReject -> đẩy vào cái catch gần nhất -

// p6.then((value) => {
//   console.log("Value: ahihi " + value);
//   throw "ahahaha"; //đưa lời hứa về cái catch gần nhất
// })
//   .catch((error) => {
//     console.log("P5 đã thát bại nên bị lỗi là " + error);
//     return "Lê Hồ Điệp"; //! return Promise.resolve("Lê Hồ Điệp")
//   })
//   .then((value) => {
//     console.log("lần này anh ấy đã có được " + value);
//   })
//   .catch((error) => {
//     console.log("error nè " + error);
//   });

//?TÓM LẠI
//TODO: Nếu ta return trong then|catch -> Promise.onFullfilled -> tìm then gần nhất
//TODO: Nếu ta ctach trong then|catch -> Promise.onRejected -> tìm catch gần nhất

//! Dùng Promise để xử lí bất đồng bộ
//có 2 task cần làm
//task1: lấy profile từ server về (3s)
//task2: lấy article từ server về (2s)

//*getProfile: hàm mô phỏng lên DB lấy dữ liệu mất 3s
let getProfile = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Điệp đẹp trai", age: 22 });
    }, 3000);
  });

let getArticle = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Điệp đẹp trai", "Nhà giả kim", "Mèo dạy hải âu bay"]);
    }, 2000);
  });

//!TH1: nếu 2 tác vụ độc lập -> tổng 3s (chúng không đợi nhau)
// getProfile().then((value) => {
//   console.log(value);
// });

// getArticle().then((value) => {
//   console.log(value);
// });

//!TH2: nếu 2 tác vụ là cause-effect (chúng cần phải đợi nhau)

//? promise hell
// getProfile().then((value) => {
//   console.log(value);
//   getArticle().then((value) => {
//     console.log(value);
//   });
// });

getProfile()
  .then((value) => {
    console.log(value);
    //!không xác định được đây là trạng thái gì
    //đây chỉ là bước mồi để ta có thể biến getProfile()
    //thành một promise tiếp để xử lí thêm một nhịp
    return getArticle(); //!return một Promise làm mồi tiếp cho cái then
  })
  .then((value) => {
    console.log(value);
  });
