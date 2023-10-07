const express = require("express");

const authController = require("../controllers/auth.controller")

const router = express.Router();

router.post("/create/user", authController.createUser);
router.post("/login/user", authController.loginUser);
router.put("/update/password/:id", authController.resetPassword);

module.exports = router;