const express = require("express");
const router = express.Router();

const kycController = require("../controllers/verifykyc")
const middleware = require("../middleware/authenticateUser");

router.post("/aadhaar/generateOtp", kycController.aadhaarKycGenerateOtpController);
router.post("/aadhaar/verifyOtp", kycController.aadhaarKycVerifyOtpController);
router.post("/pan/verify", kycController.panVerificationController);
router.post("/bank/verify", kycController.bankAccountVerificationController);
router.post("/drivingLicense/verify", kycController.drivingLicenseVerificationController);

module.exports = router;