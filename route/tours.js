const express = require("express");
const router = express.Router();
// const fs = require('fs');
const tourQuery = require("../db/query/tours-query");
const catchAsync = require("../util/catch-async");
const pool = require("../lib/dbPool");
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

const __checkBody = (req, res, next, value) => {
  const { name, price } = req.params;
  if (!name || !price) {
    return res.status(404).json({
      status: "fail",
      msg: "not found",
    });
  }
  next();
};
const __checkId = async (req, res, next, value) => {
  const { id } = req.params;
  const tour = await pool.query(tourQuery.getTour(), [id]);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      requestTime: req.requestTime,
      msg: "not found id",
    });
  }
  console.log("check Id");
  next();
};
router.param("id", __checkId);

// route setting
router.route("/").get(
  catchAsync(async (req, res) => {
    const [result] = await pool.query(tourQuery.getAllTours());

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
    const [result] = await pool.query(tourQuery.getTour(), [id]);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result,
    });
  })
);
router.route("/").post(
  __checkBody,
  catchAsync(async (req, res) => {
    const bodies = req.body || {};
    const params = [
      bodies.name,
      bodies.duration,
      bodies.maxGroupSize,
      bodies.difficulty,
      bodies.ratingsAverage,
      bodies.ratingQuantity,
      bodies.price,
      bodies.summary,
      bodies.description,
      bodies.imageCover,
      JSON.stringify(bodies.images),
      JSON.stringify(bodies.startDates),
    ];
    const [result] = await pool.query(tourQuery.createTour(), params);

    console.log(req.body);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: result.insertId,
    });
  })
);
router.route("/:id").patch(
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(tourQuery.updateTour(), [id]);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: null,
    });
  })
);
router.route("/:id").delete(
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(tourQuery.deleteTour(), [id]);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      data: null,
    });
  })
);
module.exports = router;
