const express = require("express");
const router = express.Router();
const cartController = require("../apps/controllers/CartController");
const { verifyTokenAndAdmin,verifyTokenAndAuthorization,verifyToken } = require("../middlewares/verifyToken");

router.get("/getCart",verifyToken, cartController.index);
router.post("/addToCart",verifyToken ,cartController.addToCart);
router.delete("/delete/:product_id", verifyToken,cartController.delete);
router.delete("/deleteAllProductFromCart", verifyToken,cartController.deleteAllProductFromCart);
router.put("/updateQuantity/:product_id", verifyToken,cartController.updateQuantity);
router.get("/:user_id", cartController.show);

module.exports = router;