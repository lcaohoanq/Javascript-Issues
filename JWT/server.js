import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const books = [
  { id: 0, name: "Tony Buoi Sang", author: "Tony" },
  { id: 1, name: "ありがとうございます。", publisher: "JP Books" },
];

// middleware
const authenToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // 'Bearer token'
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.sendStatus(401); // Unauthorized

  // if have token, verify token by jwt verify
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403); // Forbidden
    next();
  });
};

app.get("/books", authenToken, (req, res) => {
  res.json({ status: "success", data: books });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
