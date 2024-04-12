console.log("03-async-await.js");
//ngày xưa người ta dùng callBack để xử lí bất đồng bộ
//nhưng dễ bị callBack hell

//ES6: ngta dùng Promise
//ES7: Async-await dùng để kết hợp với Promise
//?giúp cho việc sử dụng Promise dễ dàng, gần gũi hơn

//*Async là một hàm return Promise
//!Normally: Make a Promise, use when call it (include by a function)
function handle() {
  return Promise((resolve, reject) => {
    resolve(console.log("ahihi"));
  });
}
//?Vì ta biết nó luôn onFullfilled nên chỉ cần một para là resolve
function handle1() {
  return Promise((resolve) => {
    resolve(console.log("ahihi"));
  });
}
//!viết ngắn hơn nữa
function handle2() {
  return Promise.resolve(console.log("ahihi"));
}
//!vãi!!!!!!!!!!!!!!!!
async function handle3() {
  return "ahihi";
}

//! đặt async trước function sẽ trả về một Promise (tùy status)

//*------------------------------------------------/
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

let getData = async () => {
  //! không cần phải .then .catch dài dòng
  //*ai muốn đợi thêm await

  let profile = await getProfile();
  let article = await getArticle();
  console.log(profile, article);

  //return trong này biến thành một Promise nữa
  //!return(profile,article);
  //sử dụng để .then tiếp =))))
};
// getData(); //5s quá lâu

//! tôi muốn chạy 3s thôi thì sao?
let getData1 = async () => {
  //dùng distructuring để nhét vào cái mảng
  //Promise.all đợi tất cả các lời hứa => khi chạy xong mới xử lí
  let [profile, article] = await Promise.all([getProfile(), getArticle()]);
  console.log(profile, article);
};
getData1();

//! XỬ LÍ LỖI
let getStudents = async () => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Lỗi kinh hoàng");
    }, 3000);
  });
};

//! nếu ta xử lí lỗi bằng Promise thì sẽ .then .catch để bắt
// getStudents()
//   .then((value) => {
//     console.log("danh sách sinh viên là: " + value);
//   })
//   .catch((error) => {
//     console.log("Server bị lỗi là " + error);
//   });

//! nếu ta xử lí lỗi trong async await thì ntn????
//*await sẽ không đứng một mình mà phải cần trong async
// let handle4 = async () => {
//   let students = await getStudents();
//   console.log(students);
// };
// handle4();

//!fix bằng try-catch thông thường
// let handle4 = async () => {
//   try {
//     let students = await getStudents();
//     console.log(students);
//   } catch (error) {
//     console.log(error);
//   }
// };
// handle4();

//! async-await có vấn đề đặt tên rắc rối =)))))))))
//* Async-await + IIFE
(async () => {
  try {
    let students = await getStudents();
    console.log(students);
  } catch (error) {
    console.log(error);
  }
})();

//!đừng bao giờ dùng async với toán tử đồng bộ
let x = 0;
let handle5 = async () => {
  x += 1;
  console.log(x); //1
  return 5; //promise.resolve(5)
};

let handle6 = async () => {
  //   x += await handle5();
  //!js tự hiểu += về = nên sẽ gán ngược về

  let tmp = await handle5(); //muốn chơi như vậy ta cần phải hứng giá trị chứ không tác động trực tiếp như trên
  x += tmp;

  console.log(x);
};
handle6();
