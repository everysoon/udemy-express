const express = require("express");
const router = express.Router();
const userQuery = require("../db/query/users-query");
const catchAsync = require("../util/catch-async");
const pool = require("../lib/dbPool");
const bcrypt = require("bcryptjs");

router.route("/").get(
  catchAsync(async (req, res) => {
    const [result] = await pool.query(userQuery.getAllUsers());

    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result,
    });
  })
);
router.route("/:id").get(
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(userQuery.getUser(), [id]);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result,
    });
  })
);
router.route("/").post(
  catchAsync(async (req, res) => {
    const bodies = req.body || {};
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(bodies.password, salt);
    const params = [bodies.name, bodies.email, bodies.role, bodies.active, bodies.photo, hashPassword];
    const [result] = await pool.query(userQuery.createUser(), params);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result.insertId,
    });
  })
);

router.route("/:id").delete(
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(userQuery.deleteUser(), [id]);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result,
    });
  })
);
router.route("/:id").patch(
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const bodies = req.body || {};
    const params = [bodies.name, bodies.photo, id];
    const [result] = await pool.query(userQuery.updateUser(), params);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result,
    });
  })
);
module.exports = router;
