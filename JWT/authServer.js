import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();

const PORT = 5500;

app.use(express.json());

let refreshTokens = []; //contain all refresh tokens

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
});

// in there i don't set the expiration time for refresh token, i will create a new route to remove the rf when user logging out

app.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(200);
});

app.post("/login", (req, res) => {
  // Authentication

  // Authorization
  // {username: 'test'}
  const data = req.body;
  console.log(data);
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  // if crete refresh token success, save it to refreshTokens
  refreshTokens.push(refresh_token);

  res.json({ access_token, refresh_token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
