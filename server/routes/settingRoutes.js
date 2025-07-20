const { changeUsername, changePassword } = require("../controllers/settingControllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.put("/change-username", verifyToken, changeUsername);
router.put("/change-password", verifyToken, changePassword);
module.exports = router;