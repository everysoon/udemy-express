const express = require('express');
const router = express.Router();
const fs = require('fs');
const catchAsync = require('../util/catch-async');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

const __checkBody = (req, res, next, value) => {
  const { name, price } = req.params;
  if (!name || !price) {
    return res.status(404).json({
      status: 'fail',
      msg: 'not found',
    });
  }
  next();
};
const __checkId = (req, res, next, value) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id == id * 1);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      requestTime: req.requestTime,
      msg: 'not found id',
    });
  }
  console.log('check Id');
  next();
};
router.param('id', __checkId);
// route setting
router.route('/').get(
  catchAsync((req, res) => {
    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      data: tours,
    });
  }),
);
router.route('/:id').get(
  catchAsync((req, res) => {
    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      data: tour,
    });
  }),
);
router.route('/').post(
  __checkBody,
  catchAsync((req, res) => {
    console.log(req.body);
    res.send('Done');
  }),
);
router.route('/').patch(
  catchAsync((req, res) => {
    console.log(req.body);
    res.send('Done');
  }),
);
router.route('/').delete(
  catchAsync((req, res) => {
    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      data: null,
    });
  }),
);
module.exports = router;
