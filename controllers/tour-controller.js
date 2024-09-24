const pool = require("../lib/dbPool");
const bcrypt = require("bcryptjs");
const tourQuery = require("../db/query/tours-query");
const catchAsync = require("../util/catch-async");
const AppError = require("../util/error");
// const __checkBody = (req, res, next, value) => {
//   const { name, price } = req.params;
//   if (!name || !price) {
//     return res.status(404).json({
//       status: "fail",
//       msg: "not found",
//     });
//   }
//   next();
// };
// const __checkId = async (req, res, next, value) => {
//   const { id } = req.params;
//   const tour = await pool.query(tourQuery.getTour(), [id]);
//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       requestTime: req.requestTime,
//       msg: "not found id",
//     });
//   }
//   console.log("check Id");
//   next();
// };
// router.param("id", __checkId);

const getAllTours = catchAsync(async (req, res) => {
  const [result] = await pool.query(tourQuery.getAllTours());

  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result,
  });
});
const getTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(tourQuery.getTour(), [id]);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result,
  });
});
const createTour = catchAsync(async (req, res) => {
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
});
const updateTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(tourQuery.updateTour(), [id]);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: null,
  });
});
const deleteTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(tourQuery.deleteTour(), [id]);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: null,
  });
});
const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};
const getTourStats = async (req, res) => {
  // ratingsAverage > 4.5
  // select id,numTours(sum), numRatings - sum(ratingsQuantity)
  const [result] = await pool.query(tourQuery.getTourStats());
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result,
  });
};
const getMonthlyPlan = async (req, res) => {
  const { year } = req.params;
  const [result] = await pool.query(tourQuery.getMonthlyPlan(), [year]);
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: result,
  });
};
module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
