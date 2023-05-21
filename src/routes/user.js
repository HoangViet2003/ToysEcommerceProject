const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/UserController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

// router.use('/:slug', siteController.show);
router.delete("/:id", verifyTokenAndAdmin, userController.delete);

module.exports = router;
