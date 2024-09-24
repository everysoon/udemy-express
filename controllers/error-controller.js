const AppError = require("../util/error");
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};
const handleJsonWebTokenInvalidError = (err) => {
  return new AppError("Invalid token. Please log in again", 401);
};
const handleJsonWebTokenExpiredError = (err) => {
  return new AppError("expired token. Please log in again", 401);
};
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something very wrong!"
    });
  }
};
const handleCaseErrorDB = (err) => {
  const message = `invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value : ${value}. please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "dev") {
    sendDevError(err, res);
  }
  // if (process.env.NODE_ENV == "prod") {
  let error = { ...err };

  if (error.name === "CastError") error = handleCaseErrorDB(err);
  if (error.name === "ValidationError") error = handleDuplicateFieldsDB(err);
  if (error.name === "TokenExpiredError") error = handleJsonWebTokenExpiredError(err);
  if (error.name === "JsonWebTokenError") error = handleJsonWebTokenInvalidError(err);
  if (error.code === 11000) error = handleValidationErrorDB(err);
  sendDevError(error, res);
  // sendProdError(error, res);
  // }
};
