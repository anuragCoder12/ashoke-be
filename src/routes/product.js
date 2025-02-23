const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  getFeaturedProducts,
  getSingleProduct
} = require("../controllers/product");
const baseUpload = require("../middleware/fileUpload");
router.post(
  "/create",
  baseUpload.fields([
    { name: "image", maxCount: 1 },
    
  ]),
  createProduct
);
router.put(
  "/:id",
  baseUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  editProduct
);
router.get("/featured", getFeaturedProducts);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
