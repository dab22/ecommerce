const express = require("express");
const { addPincode, getPincode } = require("../controllers/pincodeControllers");
const router = express.Router();
const {verifyToken} = require ("../middlewares/verifyToken");

router.post("/add-pincodes", verifyToken, addPincode);
router.get("/get-pincode/:pincode", getPincode);

module.exports = router;