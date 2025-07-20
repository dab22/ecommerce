const router = require("express").Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProductByName, blackListProduct, removeFromBlacklist } = require("../controllers/productControllers");
const {verifyToken} = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");
const { verify } = require("jsonwebtoken");

router.post("/create-product", upload.array("images",4), verifyToken, createProduct);
router.put("/update-product/:id", verifyToken, updateProduct);
router.delete("/delete-product/:id", verifyToken, deleteProduct);
router.get("/get-products", getProducts);
router.get("/get-product-by-name/:name", getProductByName);
router.put("/blacklist-product/:id", verifyToken, blackListProduct);
router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);

module.exports = router;