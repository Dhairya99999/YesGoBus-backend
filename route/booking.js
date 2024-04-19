const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");
const middleware = require("../middleware/authenticateUser");

router.post("/book_hotel",middleware.authenticateToken,bookingController.make_booking);
router.post("/add_itinerary_plans",bookingController.add_itinerary_plans)
router.post("/itinerary_plans",bookingController.get_Itinerary_plans )
router.post("/update_booking",middleware.authenticateToken,bookingController.edit_booking)
router.post("/add_booking_query",middleware.authenticateToken,bookingController.customer_sport)
router.get("/get_user_booking", middleware.authenticateToken, bookingController.get_customer_booking)
router.get("/get_booking",  middleware.authenticateToken, bookingController.get_booking)
//router.post("/get_bus_list",bookingController.get_bus_list)

module.exports = router;