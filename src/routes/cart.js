const express = require("express");
const router = express.Router();
const cartController = require("../apps/controllers/CartController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.get("/:user_id", cartController.show);

module.exports = router;