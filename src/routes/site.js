const express = require("express");
const router = express.Router();

const siteController = require("../apps/controllers/SiteController");

// router.use('/:slug', siteController.show);
router.use("/", siteController.index);

module.exports = router;
