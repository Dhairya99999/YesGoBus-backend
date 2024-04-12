const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");
const middleware = require("../middleware/authenticateUser");

router.post("/book_hotel",bookingController.make_booking);
router.post("/itinerary_plans",bookingController.get_Itinerary_plans )
module.exports = router;