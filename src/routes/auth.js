const express = require("express");
const router = express.Router();

const authController = require("../apps/controllers/AuthenticationController");

// router.use('/:slug', siteController.show);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
