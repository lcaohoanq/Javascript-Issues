import express from "express";
const app = express(); //giống như http.createServer

const PORT = 4000;

//tạo route mặc định
//!localhost:4000/
app.get("/", (req, res) => {
  res.send("hello word, hoang");
});

//!localhost:4000/hi/Hung -> hi!!! Hung
app.get("/hi/:name", (req, res) => {
  res.send("hi!!!" + req.params.name);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy ở ${PORT}`);
});

//cài nodemon để nó hoạt động liên tục: npm i nodemon -D
//mode lại script bằng "start": "nodemon index.js"
//chạy bằng npm run start
