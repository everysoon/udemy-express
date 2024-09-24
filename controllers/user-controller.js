const pool = require("../lib/dbPool");
const bcrypt = require("bcryptjs");
const userQuery = require("../db/query/users-query");
const catchAsync = require("../util/catch-async");
const AppError = require("../util/error");
const { createToken } = require("../controllers/auth-controller");
const updatePassword = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(`change hashPassword : ${hashPassword}`);
  const [result] = await pool.query(userQuery.updatePassword(), [hashPassword, id]);
  const token = createToken(id, password);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result,
    token
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const [result] = await pool.query(userQuery.getAllUsers());

  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result
  });
});

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(userQuery.getUser(), [id]);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result
  });
});
const createUser = catchAsync(async (req, res) => {
  const bodies = req.body || {};
  const salt = bcrypt.genSaltSync(10);
  bodies.pwd = bcrypt.hashSync(bodies.pwd, salt);
  // const params = [bodies.name, bodies.email, bodies.role, bodies.active, bodies.photo, hashPassword];
  const [result] = await pool.query(userQuery.createUser(), bodies);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result.insertId
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(userQuery.deleteUser(), [id]);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bodies = req.body || {};

  const params = [bodies.name, bodies.email, id];
  const [result] = await pool.query(userQuery.updateUser(), params);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result
  });
});
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updatePassword
};
