const express = require("express");
const router = express.Router();
const orderController = require("../apps/controllers/OrderController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");

router.post("/create", verifyToken, orderController.store);
router.get("/getAllOrder", verifyTokenAndAdmin, orderController.index);
router.put("/confirmOrder/:id", verifyTokenAndAdmin, orderController.confirmOrder);
router.get("/getOrder", verifyToken, orderController.show);


module.exports = router;
