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
const busBookingRoute = require("./route/busBooking")

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ['https://yesgobus-web-seat.onrender.com'];
  const origin = req.headers.origin;
  
  // Allow requests from any origin if the request does not include credentials
  if (!req.headers['authorization']) {
    res.header("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    // Allow requests from specified origins if the request includes credentials
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  
  // Check if this is a preflight request
  if (req.method === "OPTIONS") {
    // Respond with 200 OK and the appropriate headers
    res.status(200).end();
  } else {
    // Pass control to the next middleware function
    next();
  }
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
