const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

// router.use('/:slug', siteController.show);
router.delete("/:id", verifyToken.verifyTokenAndAdmin, userController.delete);

module.exports = router;
