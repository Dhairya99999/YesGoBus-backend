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
} from "../controllers/admin.controller.js";

// http://localhost:8000/api/admin
router.post("/user/createUser", createUserController);
router.patch("/user/updateProfile/:userId", updateUserProfileController);
router.get("/user/getAllUsers", getAllUsersController);

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
router.post("/itineraryPlans/updateItineraryPlanHotelAndPackage", updateItineraryHotelAndPackageController);

export default router;
