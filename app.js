const express = require("express");
const app = express();
const path = require("path");
const AppError = require("./util/error");

// const morgan = require('morgan');
// 1. middleware
// app.use(morgan('dev'));

app.use(express.json());
// static file setting
app.use(express.static(`${__dirname}/public`));
// custom my middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// 2. api route handle
// 3. router setting
app.use("/api/v1/tours", require("./route/tours"));
app.use("/api/v1/users", require("./route/users"));

// error handle - 마지막에 있어야함
app.all("*", (req, res, next) => {
  // res.status(400).json({
  //   status: 'fail',
  //   msg: `Can\'t find ${req.originalUrl} on this Server`,
  // });
  // const err = new Error(`Can\'t find ${req.originalUrl} on this Server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can\'t find ${req.originalUrl} on this Server`, 404));
});
// error handle middleware
app.use(require("./route/error"));
// 4. start server

module.exports = app;
