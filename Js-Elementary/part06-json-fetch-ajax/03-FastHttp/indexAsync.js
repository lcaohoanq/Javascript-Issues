//class + fetch + promise
const baseUrl = "https://6512cbd2b8c6ce52b3963937.mockapi.io/users";
/* class FastHtpp {
  get(url) {
    //!xử lí thêm 1 tầng nữa để biến hàm này thành promise

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: null,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    });
  }

  post(url, body) {
    //!xử lí thêm 1 tầng nữa để biến hàm này thành promise

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    });
  }
} */

/* let http = new FastHtpp();
http.get(baseUrl).then((value) => {
  console.log(value);
}); */
//!nếu chấm then ta sẽ nhân được giá trị luôn

//!ta nhận thấy code lặp quá nhiều
class FastHtpp {
  async send(method, url, body) {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }

  get(url) {
    return this.send("GET", url, null);
  }

  post(url, body) {
    return this.send("POST", url, body);
  }

  put(url, body) {
    return this.send("PUT", url, body);
  }
  delete(url, body) {
    return this.send("DELETE", url, null);
  }
}

/* let http1 = new FastHtpp();
http1.get(baseUrl).then((value) => {
  console.log(value);
}); */

/* let http2 = new FastHtpp();
http2
  .post(baseUrl, {
    name: "Linh xe ôm",
    yob: 2001,
  })
  .then((value) => {
    console.log(value);
  }); */
//! ta nhận được linh xe ôm, vì server sẽ quăng cho t cái t vừa mới update
//có lúc cần thì sẽ xóa

//!PUT
/* let http3 = new FastHtpp();
http3
  .put(`${baseUrl}/2`, {
    name: "Hoàng cờ hó",
  })
  .then((value) => {
    console.log(value);
  }); */

//!DELETE: Hoàng Cao Lừu id = 8
let http4 = new FastHtpp();
(async () => {
  try {
    const value = await http4.delete(`${baseUrl}/7`);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
  //!ta chỉ có một lựa chọn xử lí ngoại lệ bằng try-catch
})();
