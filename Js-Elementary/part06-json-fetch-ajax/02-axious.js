//02-axios.js
//Axios: 1 http cilent dùng để gửi request lên server và nhận response về 1 thư viện tương tác với API như get, post put, delete

//Axious không có sẵn, phải cài đặt
const baseUrl1 = "https://6512cbd2b8c6ce52b3963937.mockapi.io";
// axios({
//   method: "get",
//   url: `${baseUrl1}/users`,
// })
//   .then((res) => {
//     if ([200, 201].includes(res.status)) {
//       // console.log(res);
//       //!xử lí thêm cho then
//       return res.data; //hoisting
//     } else {
//       throw new Error(res.statusText);
//     }
//   })
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//post
/* axios({
  method: "post",
  url: `${baseUrl1}/users`,
  //không gọi body, headers
  data: {
    name: "Hoàng Cao Lừu",
    yob: "2004",
  },
})
  .then((res) => {
    if ([200, 201].includes(res.status)) {
      // console.log(res);
      //!xử lí thêm cho then
      return res.data; //hoisting
    } else {
      throw new Error(res.statusText);
    }
  })
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  }); */

//!request method aliases
/* axios
  .post(`${baseUrl1}/users`,{
    //không gọi body, headers
    data: {
      name: "Hoàng Cao Lừu",
      yob: "2004",
    },
  })
  .then((res) => {
    if ([200, 201].includes(res.status)) {
      // console.log(res);
      //!xử lí thêm cho then
      return res.data; //hoisting
    } else {
      throw new Error(res.statusText);
    }
  })
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  }); */

//!instance
// const instance = axios.create({
//   baseUrl: baseUrl1,
//   //sau bao nhiêu s nếu servner không trả về gì, tự hủy request
//   timeout: 10000, //1000 = 1s
//   headers: { "Content-type": "application/json" },
// });

// instance
//   .post("users", {
//     name: "Aka Hùng xe đạp",
//     yob: 1996,
//   })
//   .then((res) => {
//     console.log(res);
//   });

//!class + instance + interceptor để cấu hình
class Http {
  constructor() {
    this.instance = axios.create({
      baseUrl: baseUrl1,
      //sau bao nhiêu s nếu servner không trả về gì, tự hủy request
      timeout: 10000, //1000 = 1s
      headers: { "Content-type": "application/json" },
    });

    //!cấu hình response trả về
    // Add a response interceptor
    this.instance.response.use(
      function (response) {
        return {
          data: response.data,
          status: response.status,
        };
      },
      function (response) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      }
    );
  }
}

let http = new Http().instance;
http
  .post("user", {
    name: "Điệp đẹp trai",
    yob: 1999,
  })
  .then((res) => {
    console.log(res);
  });
