class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);

    this.statusCode = statusCode;
    this.status = name || statusCode < 500 ? "fail" : "error";
    // this.status = `${statusCode.startWith("4")} ? 'fail' : 'error'`;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
