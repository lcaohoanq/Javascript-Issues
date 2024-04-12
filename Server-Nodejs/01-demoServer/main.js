//http là 1 module có sẵn nodejs
//http dùng để tạo server

import http from "http";
const PORT = 4000;

//localhost:4000

//tạo route mặc định
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(`{"name": "Điệp"}`);
});

server.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
