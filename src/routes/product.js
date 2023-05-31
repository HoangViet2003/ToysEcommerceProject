const express = require("express");
const router = express.Router();
const productController = require("../apps/controllers/ProductController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");

// router.use('/:slug', siteController.show);
router.get("/allproduct", productController.index);
router.get("/search", productController.search);
router.post(
  "/create",
  verifyTokenAndAdmin,
  upload.array("images"),
  productController.store
);
router.put("/update/:id", verifyTokenAndAdmin, productController.update);
router.delete("/delete/:id", verifyTokenAndAdmin, productController.delete);
router.get("/:id", productController.show);


module.exports = router;
