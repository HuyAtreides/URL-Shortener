const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const homeRoute = require("./route/homeRoute");
const shortenerRoute = require("./route/shortenerRoute");
const totalClicksRoute = require("./route/trackTotalClicks");
const totalClicksCount = require("./route/totalClicksCount");

app.set("views", "./views");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/shortener", shortenerRoute);
app.use("/total-clicks", totalClicksRoute);
app.use("/check-total-clicks", totalClicksCount);
app.use("/", homeRoute);

module.exports = app;
