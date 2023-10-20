const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config(); //NPM INSTALL DOTENV

const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts");
app.use(bodyParser.json());
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Homepage!");
});

mongoose.connect(process.env.DB_CONNECTOR);

app.listen(3000, () => {
  console.log("App is running...");
});
