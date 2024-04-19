const express = require("express");
const router = express.Router();

const couponController = require("../controllers/coupon");
const middleware = require("../middleware/authenticateUser");

router.post("/add_coupon",couponController.add_coupon);
router.post("/apply_coupon_code",middleware.authenticateToken,couponController.apply_coupon_discount)
router.get("/get_coupon/:couponFor", couponController.get_coupon_code)

module.exports = router;