const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mysql = require("mysql2");
const secretKey = "secretKey";
const cors = require("cors");

app.use(cors());
app.use(express.json()); // middleware to parse JSON data

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "The end is near",
  });
});

app.post("/login", async (req, res) => {
  const user = {
    id: 1,
    email: "akash@edulab.in",
    username: "akash",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "5m" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verify, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send("Error");
        } else {
            res.json({
                message: "Nothing is permanent",
                authData
            })
        }
    })
});

function verify(req, res, next) {
  const bearerToken = req.headers["authorization"];
  if (typeof bearerToken !== "undefined") {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send("Token is not valid")
  }
}

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
