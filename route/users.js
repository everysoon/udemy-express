const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200);
});
router.route('/:id').get((req, res) => {
  res.status(200);
});
router.route('/').post((req, res) => {
  res.status(200);
});

router.route('/:id').delete((req, res) => {
  res.status(200);
});
router.route('/:id').patch((req, res) => {
  res.status(200);
});
module.exports = router;
