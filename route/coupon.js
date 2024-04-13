const express = require("express");
const router = express.Router();

const couponController = require("../controllers/coupon");

router.post("/add_coupon",couponController.add_coupon);
router.post("/apply_coupon_code",couponController.apply_coupon_discount)

module.exports = router;