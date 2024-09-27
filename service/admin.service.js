import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../modals/user.modal.js";
import bookingModel from "../modals/booking.modal.js";
import packageModel from "../modals/packages.modal.js";
import destinationModel from "../modals/destination.modal.js";
import hotelModel from "../modals/hotels.modal.js";
import itineraryPlansModel from "../modals/itineraryPlans.modal.js";
import { generateRandomNumber } from "../utils/generateRandomNumber.js";

export const createUser = async (userData) => {
	console.log(userData);
	try {
		const existingUser = await User.findOne({ email: userData.email });
		if (!existingUser) {
			const userId = generateRandomNumber(8);
			//const hashedPassword = bcrypt.hashSync(userData.password, 5);
			const newUser = new User({
				...userData,
				userId: userId,
				//password: hashedPassword,
			});
			await newUser.save();
			return {
				status: 200,
				message: "User created successfully",
			};
		} else {
			return {
				status: 409,
				message: "User already exists",
			};
		}
	} catch (err) {
		return {
			status: 500,
			message: err.message || "Internal server error",
		};
	}
};

export const updateUserProfile = async (userId, updatedData) => {
	try {
		if (typeof userId === "string") {
			userId = new mongoose.Types.ObjectId(userId);
		}
		const existingUser = await User.findByIdAndUpdate(userId, updatedData, {
			new: true,
		});

		if (!existingUser) {
			return {
				status: 404,
				message: "User not found",
			};
		}
		existingUser.password = undefined;
		return {
			status: 200,
			message: "Profile updated successfully",
			data: existingUser,
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message || "Internal server error",
		};
	}
};

export const getAllUsers = async () => {
	try {
		const users = await User.find();
		return {
			status: 200,
			data: users,
		};
	} catch (err) {
		return {
			status: 500,
			message: err.message || "Internal server error",
		};
	}
};

export const getAllBookings = async (req, res) => {
	try {
		const bookings = await bookingModel
			.find()
			.populate({ path: "userId" })
			.populate({ path: "packageId" });
		if (bookings) {
			return res.status(200).send({
				status: true,
				data: { bookings },
				message: "Booking Data fetch successfully",
			});
		} else {
			// handle the case where res is undefined
			console.error("Response object is undefined");
		}
	} catch (err) {
		console.error(err);
		if (res) {
			return res.status(500).send({
				status: false,
				data: { errorMessage: err.message },
				message: "Failed to fetch bookings data",
			});
		} else {
			// handle the case where res is undefined
			console.error("Response object is undefined");
		}
	}
};
// export const getAllBookings = async (req, res) => {
// 	try {
// 		const bookings = await bookingModel.find().populate({ path: "userId" });
// 		return res.status(200).send({
// 			status: true,
// 			data: { bookings },
// 			message: "Booking Data fetch successfully",
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).send({
// 			status: false,
// 			data: { errorMessage: err.message },
// 			message: "Failed to fetch bookings data",
// 		});
// 	}
// };

export const getAllPackages = async (req, res) => {
	try {
		const packages = await packageModel
			.find()
			.populate({ path: "destinationID" })
			.populate({ path: "hotelId" });
		return res.status(200).send({
			status: true,
			data: { packages: packages },
			message: "packages fetch successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const createPackage = async (req, res) => {
	try {
		const { name, price, duration, destinationID, totalDuration, image } =
			req.body;

		const destinationData = await destinationModel.findOne({
			_id: destinationID,
		});
		const packageData = await packageModel.create({
			name,
			image,
			duration,
			witheFlitePrice: price,
			withoutFlitePrice: price * 0.8,
			destination: destinationData.destination,
			destinationID,
			totalDuration,
		});
		return res.status(201).send({
			status: true,
			data: { packageData },
			message: "destination created successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const getAllItineraryPlans = async (req, res) => {
	try {
		const plans = await itineraryPlansModel
			.find()
			.populate({ path: "packageId" })
			.populate({ path: "hotelId" });
		return res.status(200).send({
			status: true,
			data: { plans },
			message: "itinerary plans fetch successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const createItineraryPlan = async (req, res) => {
	try {
		const {
			checkIn,
			checkOut,
			room_name,
			additional_info,
			end_of_day_info,
			packageId,
			hotelId,
		} = req.body;
		const itineraryData = await itineraryPlansModel.create({
			packageId,
			hotelId,
			checkIn,
			checkOut,
			room_name,
			additional_info,
			end_of_day_info,
		});
		return res.status(201).send({
			status: true,
			data: { itineraryData },
			message: "Itinerary Plans added successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const updateItineraryPlan = async (req, res) => {
	try {
		const { id } = req.params;
		const itineraryData = await itineraryPlansModel.findOneAndUpdate(
			{ _id: id },
			{ ...req.body },
			{ new: true }
		);
		return res.status(201).send({
			status: true,
			data: { itineraryData },
			message: "Itinerary Plans updated successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const getAllHotels = async (req, res) => {
	try {
		const hotels = await hotelModel.find();
		return res.status(200).send({
			status: true,
			data: { hotels },
			message: "Hotels fetch successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

export const getAllDestinations = async (req, res) => {
	try {
		const destinations = await destinationModel.find();
		return res.status(200).send({
			status: true,
			data: { destinations },
			message: "Destinations fetch successfully",
		});
	} catch (err) {
		return res.status(500).send({
			status: false,
			data: { errorMessage: err.message },
			message: "server error",
		});
	}
};

// export const get_Itinerary_plans = async (req, res) => {
// 	try {
// 		const [startDay, startMonth, startYear] = req.body.start_date.split("/");
// 		const [endDay, endMonth, endYear] = req.body.end_date.split("/");
// 		const start = new Date(`${startMonth}/${startDay}/${startYear}`);
// 		const end = new Date(`${endMonth}/${endDay}/${endYear}`);
// 		let count = 0;
// 		for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
// 			count++;
// 		}
// 		const hotel = await hotelModel.findOne(
// 			{ _id: req.body.hotelId },
// 			{
// 				hotelName: 1,
// 				rating: 1,
// 				address: 1,
// 				image: 1,
// 				fullAddress: 1,
// 				destination: 1,
// 			}
// 		);
// 		const itineraryData = await itineraryPlansModel.findOne({
// 			hotelId: req.body.hotelId,
// 		});
// 		const hotelData = {
// 			hotelName: hotel?.hotelName,
// 			rating: hotel?.rating,
// 			address: hotel?.address,
// 			image: hotel?.image,
// 			fullAddress: hotel?.fullAddress,
// 			destination: hotel?.destination,
// 			checkIn: itineraryData ? itineraryData?.checkIn : "",
// 			checkOut: itineraryData ? itineraryData?.checkOut : "",
// 		};

// 		return res.status(200).send({
// 			status: true,
// 			data: {
// 				hotel_data: {
// 					hotel: hotelData
// 						? hotelData
// 						: {
// 								hotelName: "",
// 								rating: "",
// 								address: "",
// 								image: "",
// 								fullAddress: "",
// 								destination: "",
// 								checkIn: "",
// 								checkOut: "",
// 						  },
// 					itinerary: itineraryData ? itineraryData.plans : [],
// 				},
// 			},
// 			message: "Booking done successfully",
// 		});
// 	} catch (err) {
// 		return res.status(500).send({
// 			status: false,
// 			data: { errorMessage: err.message },
// 			message: "server error",
// 		});
// 	}
// };
