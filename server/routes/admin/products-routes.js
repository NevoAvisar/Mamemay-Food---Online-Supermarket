const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const { validateProduct } = require("../../validations/product");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", validateProduct, addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;
