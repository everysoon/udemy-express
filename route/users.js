const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
router.post("/signup", authController.signUp);
router.get("/login", authController.login);
router.patch("/:id/password", authController.checkAuth, userController.updatePassword);
router.route("/").get(userController.getAllUsers).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.checkAuth, userController.updateUser)
  .delete(authController.checkAuth, userController.deleteUser);
module.exports = router;
