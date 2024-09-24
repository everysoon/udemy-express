const { promisify } = require("util");
const pool = require("../lib/dbPool");
const userQuery = require("../db/query/users-query");
const catchAsync = require("../util/catch-async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../util/error");
const checkAuth = catchAsync(async (req, res, next) => {
  // 1. get token and check exist
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new AppError("not exist token, check header"));
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("jwt error", 401, err.name));
  }
  // 2. verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded.password);
  // 3. check if user still exists
  const [result] = await pool.query(userQuery.getUser(), [decoded.id]);
  if (result.length == 0) {
    return next(new AppError("not found user", 401));
  }
  // 4. check if user changed password after the token was issued
  if (!result[0].active) {
    return next(new AppError("already deleted user", 401));
  }
  const isConfirm = await passwordCompare(decoded.password, result[0].pwd);
  if (!isConfirm) {
    return next(new AppError("changed user password, login again please", 401));
  }
  // everything ok -> next!
  req.user = result[0]; // 다음으로 user정보 넘겨줌
  next();
});
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1. check if email and password exist
  if (!email || !password) {
    return next(new AppError("Invalid parameter, check please email or password", 400));
  }
  // 2. check if user exist && password is correct
  // const params = [email, password];
  const [result] = await pool.query(userQuery.login(), [email]);
  if (result.length == 0) {
    return next(new AppError("not found user", 404));
  }
  const isConfirm = await passwordCompare(password, result[0].pwd);
  if (!isConfirm) {
    return next(new AppError("Invalid password", 401));
  }
  // 3. if everything ok, send token to client
  const token = createToken(result[0].id, password);
  res.status(200).json({
    status: "success",
    token
  });
});
const passwordCompare = async (password, user_password) => {
  return await bcrypt.compare(password, user_password);
};
const createToken = (id, password) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const token = jwt.sign({ id, password }, secretKey, {
    expiresIn
  });
  return token;
};
const signUp = catchAsync(async (req, res) => {
  const bodies = req.body || {};
  const salt = bcrypt.genSaltSync(10);
  // const salt = "saltKey";
  const hashPassword = bcrypt.hashSync(bodies.password, salt);

  const params = [bodies.name, bodies.email, bodies.active, bodies.photo, hashPassword];

  const [result] = await pool.query(userQuery.createUser(), params);
  const token = createToken(result.insertId, bodies.password);

  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    token,
    data: result.insertId
  });
});
module.exports = {
  signUp,
  login,
  checkAuth,
  createToken
};
