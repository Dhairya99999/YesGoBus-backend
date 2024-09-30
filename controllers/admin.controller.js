import axios from "axios";

import {
	createUser,
	updateUserProfile,
	getAllUsers,
	getAllBookings,
	getAllPackages,
	createPackage,
	getAllItineraryPlans,
	createItineraryPlan,
	updateItineraryPlan,
	getAllHotels,
	getAllDestinations,
	getAllHotelAndDestinations,
	updateItineraryHotelAndPackage,
} from "../service/admin.service.js";

export const createUserController = async (req, res) => {
	try {
		const result = await createUser(req.body);
		res
			.status(result.status)
			.json({ message: result.message, data: result.data });
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while registering a user" });
	}
};

export const updateUserProfileController = async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await updateUserProfile(userId, req.body);
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while updating user profile" });
	}
};

export const getAllUsersController = async (req, res) => {
	try {
		const result = await getAllUsers();
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while getting all users" });
	}
};

export const getAllBookingsController = async (req, res) => {
	try {
		const result = await getAllBookings(req, res);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while getting all bookings",
		});
	}
};

export const getAllPackagesController = async (req, res) => {
	try {
		const result = await getAllPackages();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while getting all packages",
		});
	}
};

export const createPackageController = async (req, res) => {
	try {
		const result = await createPackage(req.body);
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while creating a package" });
	}
};

export const getAllItineraryPlansController = async (req, res) => {
	try {
		const result = await getAllItineraryPlans(req, res);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while getting all Itinerary Plans",
		});
	}
};

export const getAllHotelAndDestinationsController = async (req, res) => {
	try {
		const result = await getAllHotelAndDestinations(req, res);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while getting all hotels and destinations",
		});
	}
};
export const createItineraryPlanController = async (req, res) => {
	try {
		console.log(req.body);
		const result = await createItineraryPlan(req, res);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while creating itinerary plan",
		});
	}
};

export const updateItineraryPlanController = async (req, res) => {
	try {
		const result = await updateItineraryPlan(req.body);
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while updating itinerary plan" });
	}
};

export const getAllHotelsController = async (req, res) => {
	try {
		const result = await getAllHotels();
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while getting all hotels" });
	}
};

export const getAllDestinationsController = async (req, res) => {
	try {
		const result = await getAllDestinations();
		res.status(result.status).send(result);
	} catch (err) {
		res
			.status(500)
			.json({ message: "An error occurred while getting all destinations" });
	}
};

export const updateItineraryHotelAndPackageController = async (req, res) => {
	try {
		const result = await updateItineraryHotelAndPackage(req, res);
		res.status(200).json(result);
	} catch (err) {
		res;
		res.status(500).json({
			status: false,
			data: { errorMessage: err.message },
			message: "An error occurred while Updating itinerary plan",
		});
	}
};
