const express = require("express");
require("dotenv").config();
const app = express();
const mydata = {
  name: "Ashis",
  age: 23,
  profile: "Front End Developer",
};
app.get("/", (req, res) => {
  res.send("Hello EveryOne!");
});

app.get("/user", (req, res) => {
  res.send("Hello Ashish!");
});

app.get("/mydata", (req, res) => {
  res.json(mydata);
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
