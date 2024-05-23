# Authentication and Authorization

- Authentication (xác thực) là hành động xác thực, kiểm tra người dùng có phải là một người dùng hợp lệ trong hệ thống hay không

- Authorization (phân quyền) là hành động kiểm tra xem người dùng có quyền truy cập vào một tài nguyên hoặc một chức năng cụ thể

# JWT

- 3 phần:
  - Header: chứa thông tin về loại token và thuật toán mã hóa
  - Payload: chứa thông tin về người dùng
  - Signature: chữ ký số để xác thực token
- Sử dụng thuật toán mã hóa HS256
  ![alt text](image.png)

# Practice

- When perform a new login, the server will return a JWT token for the client

> POST http://localhost:5000/login

```json
{
  "username": "lcaohoanq"
}
```

```bash
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY0NzE1MzcsImV4cCI6MTcxNjQ3MTU2N30.hk7N9nUyEgE0xarJExpKA-_EctPP3Haas6TVjV0rE7I"
}
```

- After that use the token to access the books resource, with
  - Authorization: Bearer <token>

![alt text](image-1.png)

- After 30s the token will be expired, we will receive 403 Forbidden if continue to access the books resource

- Continue we separate to authServer.js which is use for process the login

- Now we create the refresh token to refresh the access token when it's expired
  - When the access token near expired, the client will send the refresh token to the server, the server will check the refresh token and return a new access token
