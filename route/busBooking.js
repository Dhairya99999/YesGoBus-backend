const express = require("express");
const router = express.Router();


const busBookingController = require("../controllers/busBooking.js")
const middleware = require("../middleware/authenticateUser");


router.get("/searchCity/:searchParam", busBookingController.searchCityController);
router.post("/searchBus", busBookingController.searchBusController);
router.post("/getSeatLayout", busBookingController.getSeatLayoutController);
router.get("/getFilters", busBookingController.getBusFiltersController);
router.post("/getBusDetails", busBookingController.getBusDetailsController);

router.use(middleware.authenticateToken);

//Zuelpay API routes
router.get("/getCityList",middleware.authenticateToken, busBookingController.getCityListController);

router.post("/blockSeat",middleware.authenticateToken, busBookingController.blockSeatController);
router.get("/bookSeat/:ticketKey",middleware.authenticateToken, busBookingController.bookSeatController);
router.post("/cancelTicket", middleware.authenticateToken, busBookingController.cancelTicketController);



//booking routes
router.post("/bookBus", middleware.authenticateToken, busBookingController.bookBusController);
router.patch("/updateBooking/:bookingId", middleware.authenticateToken, busBookingController.updateBookingsController);
router.get("/getBookingById/:bookingId", middleware.authenticateToken, busBookingController.getBookingByIdController);
router.get("/getAllBookings/:userId", middleware.authenticateToken, busBookingController.getAllBookingsController);

//message and email
router.post("/sendBookingConfirmationMessage", middleware.authenticateToken, busBookingController.sendBookingConfirmationMessage);
router.post("/sendCancelTicketMessage", middleware.authenticateToken, busBookingController.sendCancelTicketMessage);
router.post("/sendBookingConfirmationEmail", middleware.authenticateToken, busBookingController.sendBookingConfirmationEmail);
router.post("/sendCancelTicketEmail", middleware.authenticateToken, busBookingController.sendCancelTicketEmail);

module.exports = router;