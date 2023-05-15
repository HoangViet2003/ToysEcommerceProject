const express = require("express");
const router = express.Router();
const productController = require("../apps/controllers/ProductController");
const verifyToken = require("../middlewares/verifyToken");

// router.use('/:slug', siteController.show);

module.exports = router;
