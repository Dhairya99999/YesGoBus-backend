import express from "express";

import { getBookingController, getAllBookingsController } from "../controllers/bookingHistory.controller.js";

import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

// router.use(authenticateUser);

router.get("/getBookingHistory/:userId", getBookingController);
router.get("/getAllBookings", getAllBookingsController);

export default router;
