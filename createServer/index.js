var express = require("express");
require("dotenv").config();
var app = express();

let port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.listen(port);
