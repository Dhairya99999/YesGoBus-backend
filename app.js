var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");

var dbCon = require("./lib/db");

const userRoute = require("./route/user");
const packagesRoute = require("./route/packages")
const bookingRoute = require("./route/booking")
const hotelRoute = require("./route/hotel")
const couponRouter = require("./route/coupon")
const feedbackRoute = require("./route/feedback")
const offerRoute = require("./route/offer")
//const agentRoute = require("./route/agents")
const busBookingRoute = require("./route/busBooking")
// const cabRoute = require("./route/cab")
// const paymentRoute = require("./route/payment")
//const kycRoute = require("./route/verifykyc")

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

if (app.get("env") === "development") {
  app.use(logger("dev"));
}


app.use("/user", userRoute);
app.use("/package", packagesRoute)
app.use("/booking", bookingRoute)
app.use("/hotel",hotelRoute)
app.use("/coupon",couponRouter)
app.use("/feedback",feedbackRoute)
app.use("/offers",offerRoute)
app.use("/busBooking",busBookingRoute)
// app.use("/cab", cabRoute)
// app.use("/payment", paymentRoute)
//app.use("/kyc", kycRoute)
//app.use("/agent",agentRoute)

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
