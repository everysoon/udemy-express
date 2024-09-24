const express = require("express");
const reviewControlelr = require("../controllers/review-controller");
const router = express.Router({ mergeParams: true });

router.route("/").get("/");
