const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour-controller");
const authController = require("../controllers/auth-controller");
router.route("/top-5-cheap").get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
// route setting
router.route("/").get(tourController.getAllTours).post(authController.checkAuth, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(authController.checkAuth, tourController.updateTour)
  .delete(authController.checkAuth, tourController.deleteTour);
module.exports = router;
