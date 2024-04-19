const express = require("express");
const router = express.Router();

const cabController = require("../controllers/cab");
const cabBookingController = require("../controllers/cabBooking")
const middleware = require("../middleware/authenticateUser");

router.use(middleware.authenticateToken);

router.get("/getCabDetails", cabController.getCabDetailsController);
router.post("/createCab", cabController.addCabDetailsController);
router.patch("/updateCab/:id", cabController.updateCabDetailsController);
router.get("/getCabDetailsByUser/:driverId", cabController.getCabDetailsByUserController);
router.patch("/inactiveCab/:id", cabController.inactiveCabController);
router.post("/create", cabBookingController.createCabBookingController);
router.get("/getCabBookingsByUser/:id", cabBookingController.getCabBookingsByUserController);
router.patch("/cancelCabBooking/:bookingId", cabBookingController.cancelCabBookingController);
router.patch("/completeBooking/:bookingId", cabBookingController.completeBookingController);

module.exports = router;