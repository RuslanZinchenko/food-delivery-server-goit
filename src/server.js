const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const shortid = require("shortid");
const PORT = process.env.PORT || 3000;
const menu = require(path.join(__dirname, "./db/products/all-products.json"));

app.get("/products", (req, res) => {
  res.send(menu);
});

app.post("/signup", (req, res) => {
  const newUser = {
    id: shortid.generate(),
    username: req.body.username,
    telephone: req.body.telephone,
    password: req.body.password,
    email: req.body.email
  };
  if (!fs.existsSync("./db/users")) {
    fs.mkdirSync("./db/users");
  }
  fs.writeFile(
    `./db/users/${req.body.username}.json`,
    JSON.stringify(newUser),
    err => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  res.send(newUser);
});

app.use(function(req, res, next) {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("error");
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
