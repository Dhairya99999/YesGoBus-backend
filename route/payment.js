const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment")
const middleware = require("../middleware/authenticateUser");

router.post("/initiatePayment", paymentController.initiatePaymentController);
router.get("/checkPaymentStatus/:merchantTransactionId", paymentController.checkPaymentStatusController);

router.use(middleware.authenticateToken);

router.post("/refundPayment", paymentController.refundPaymentController);

module.exports = router;