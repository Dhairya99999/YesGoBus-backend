import express from "express";
const router = express.Router();

import {
	createUserController,
	updateUserProfileController,
	getAllUsersController,
	getAllBookingsController,
	getAllPackagesController,
	createPackageController,
	getAllItineraryPlansController,
	createItineraryPlanController,
	updateItineraryPlanController,
	getAllHotelsController,
	getAllDestinationsController,
	getAllHotelAndDestinationsController,
	updateItineraryHotelAndPackageController,
	adminSigninController,
	sendOtpController,
	verifyOtpController,
	getAllAgentsController,
	createAgentController,
	updateAgentController,
	agentSigninController,
	agentSendOtpController,
	agentVerifyOtpController,
	getAgentsAllBookingsController,
	getRevenueController,
	getBusBookingRevenueController,
	getAllBusBookingsController,
} from "../controllers/admin.controller.js";

// http://localhost:8000/api/admin

router.post("/signIn", adminSigninController);
router.post("/sendOtp", sendOtpController);
router.post("/verifyOtp", verifyOtpController);

router.post("/user/createUser", createUserController);
router.patch("/user/updateProfile/:userId", updateUserProfileController);
// http://localhost:8000/api/admin/user/getAllUsers
router.get("/user/getAllUsers", getAllUsersController);

// For getting Bookings
// http://localhost:8000/api/admin/busBooking/getAllBookings
// for Bus Booking
router.get("/busBooking/getAllBookings", getAllBusBookingsController);
// http://localhost:8000/api/admin/bookings/getAllBookings
// for Packages Booking
router.get("/bookings/getAllBookings", getAllBookingsController);

router.get("/packages/getAllPackages", getAllPackagesController);
router.post("/packages/createPackage", createPackageController);

router.get(
	"/itineraryPlans/getAllItineraryPlans",
	getAllItineraryPlansController
);
router.post(
	"/itineraryPlans/createItineraryPlan",
	createItineraryPlanController
);
router.patch(
	"/itineraryPlans/updateItineraryPlan/:itineraryPlanId",
	updateItineraryPlanController
);

router.get("/hotels/getAllHotels", getAllHotelsController);

router.get("/destinations/getAllDestinations", getAllDestinationsController);

router.get(
	"/hotelAndDestination/getAllHotelsAndDestinations",
	getAllHotelAndDestinationsController
);
router.post(
	"/itineraryPlans/updateItineraryPlanHotelAndPackage",
	updateItineraryHotelAndPackageController
);

// Agents
// http://localhost:8000/api/admin/agents
router.post("/agents/signIn", agentSigninController);
router.post("/agents/sendOtp", agentSendOtpController);
router.post("/agents/verifyOtp", agentVerifyOtpController);
router.get("/agents/getAllBookings/:agentId", getAgentsAllBookingsController);

// http://localhost:8000/api/admin/agents/getAllAgents
router.get("/agents/getAllAgents", getAllAgentsController);
router.post("/agents/createAgent", createAgentController);
router.patch("/agents/updateAgent/:agentId", updateAgentController);

// Revenue
// http://localhost:8000/api/admin/revenue/getRevenue
// for tour and travels
router.get("/revenue/getRevenue", getRevenueController);
// for bus booking
router.get("/revenue/getRevenueForBus", getBusBookingRevenueController);

export default router;
