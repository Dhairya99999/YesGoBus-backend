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

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return {
				status: 202,
				message: "User not found",
			};
		}
		// Compare password
		if (user.password !== password) {
			return {
				status: 201,
				message: "Invalid credentials",
			};
		}

		if (user.role !== "admin") {
			return {
				status: 201,
				message: "Unauthorized",
			};
		}

		const token = jwt.sign({ userId: user._id, email }, process.env.JWT_KEY, {
			expiresIn: "6h",
		});

		// Remove password from response
		const userData = {
			userId: user.userId,
			fullName: user.fullName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			address: user.address,
			gender: user.gender || "",
		};
		return {
			status: 200,
			message: "Successfully signed in",
			token: token,
			data: userData,
		};
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const sentOtp = async (req, res) => {
	try {
		const { mobile } = req.body;
		const user = await User.findOne({ mobile });
		if (!user) {
			return {
				status: 202,
				message: "User not found",
			};
		}

		if (user.role !== "admin") {
			return {
				status: 201,
				message: "Unauthorized",
			};
		}

		const response = await axios.post(
			"https://auth.otpless.app/auth/otp/v1/send",
			{
				phoneNumber: `91${mobileNumber}`,
				otpLength: 6,
				channel: "SMS",
				expiry: 600,
			},
			{
				headers: {
					clientId: process.env.CLIENT_ID,
					clientSecret: process.env.CLIENT_SECRET,
					"Content-Type": "application/json",
				},
			}
		);

		return {
			status: 200,
			data: response.data,
			message: "OTP sent successfully",
		};
	} catch (err) {
		throw err;
	}
};

export const verifyOtp = async (req, res) => {
	try {
		const { mobile, otp } = req.body;
		const user = await User.findOne({ mobile });
		if (!user) {
			return {
				status: 202,
				message: "User not found",
			};
		}

		if (user.role !== "admin") {
			return {
				status: 201,
				message: "Unauthorized",
			};
		}

		const response = await axios.post(
			"https://auth.otpless.app/auth/otp/v1/verify",
			{
				phoneNumber: `91${mobileNumber}`,
				otp: otp,
			},
			{
				headers: {
					clientId: process.env.CLIENT_ID,
					clientSecret: process.env.CLIENT_SECRET,
					"Content-Type": "application/json",
				},
			}
		);

		return {
			status: 200,
			data: response.data,
			message: "Signin successful, Otp verified",
		};
	} catch (err) {
		throw err;
	}
};

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
		return {
			status: true,
			data: { bookings },
			message: "Bookings fetch successfully",
		};
	} catch (err) {
		throw err;
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
		return {
			status: true,
			data: { packages: packages },
			message: "packages fetch successfully",
		};
	} catch (err) {
		throw err;
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
			.populate({ path: "packageId", populate: { path: "destinationID" } })
			.populate({ path: "hotelId" });
		return {
			status: true,
			data: { plans },
			message: "Itinerary plans fetch successfully",
		};
	} catch (err) {
		throw err;
	}
};

export const getAllHotelAndDestinations = async (req, res) => {
	try {
		const destinations = await destinationModel.find();
		const hotels = await hotelModel.find();
		return {
			status: true,
			data: { destinations, hotels },
			message: "Hotels and Destinations fetch successfully",
		};
	} catch (err) {
		throw err;
	}
};

export const createItineraryPlan = async (req, res) => {
	try {
		const {
			destination,
			checkIn,
			checkOut,
			room_name,
			additional_info,
			end_of_day_info,
			packageId,
			hotelId,
			plans,
		} = req.body;
		const itineraryData = await itineraryPlansModel.create({
			destination,
			packageId,
			hotelId,
			checkIn,
			checkOut,
			room_name,
			additional_info,
			end_of_day_info,
			plans,
		});
		return {
			status: true,
			data: { itineraryData },
			message: "Itinerary Plans added successfully",
		};
	} catch (err) {
		throw err;
	}
};

export const updateItineraryHotelAndPackage = async (req, res) => {
	try {
		const { Hotel, Package, Itinerary } = req.body.formData;

		// Update Hotel model
		const hotel = await hotelModel.findById(Hotel._id);
		if (!hotel) {
			throw new Error(`Hotel with id ${Hotel._id} not found`);
		}
		const hotelData = {
			hotelName: Hotel.hotelName,
			rating: Hotel.rating,
			address: Hotel.address,
			fullAddress: Hotel.fullAddress,
			destination: Hotel.destination,
		};
		const hotelResult = await hotelModel.findByIdAndUpdate(
			Hotel._id,
			hotelData,
			{ new: true }
		);
		console.log(hotelResult);
		// Update Package model
		const packages = await packageModel.findById(Package._id);
		if (!packages) {
			throw new Error(`Package with id ${Package._id} not found`);
		}

		const packageData = {
			hotelName: Package.hotelName,
			destinationId: Package.destinationId,
			destination: Package.destination,
			duration: Package.duration,
			totalDuration: Package.totalDuration,
			witheFlitePrice: Package.witheFlitePrice,
			withoutFlitePrice: Package.withoutFlitePrice,
			hotelId: Package.hotelId,
			tripBenifit: Package.tripBenifit,
			couponCode: Package.couponCode,
		};

		const packageResult = await packageModel.findByIdAndUpdate(
			Package._id,
			packageData,
			{ new: true }
		);
		console.log(packageResult);

		// Update Itinerary model
		const itinerary = await itineraryPlansModel.findById(Itinerary._id);
		if (!itinerary) {
			throw new Error(`Itinerary with id ${Itinerary._id} not found`);
		}
		const itineraryData = {
			destination: Itinerary.destination,
			checkIn: Itinerary.checkIn,
			checkOut: Itinerary.checkOut,
			room_name: Itinerary.room_name,
			additional_info: Itinerary.additional_info,
			end_of_day_info: Itinerary.end_of_day_info,
			packageId: Itinerary.packageId,
			hotelId: Itinerary.hotelId,
			plans: Itinerary.plans,
		};
		const itineraryResult = await itineraryPlansModel.findByIdAndUpdate(
			Itinerary._id,
			itineraryData,
			{ new: true }
		);
		console.log(itineraryResult);

		const result = { ...hotelResult, ...packageResult, ...itineraryResult };

		return {
			status: 200,
			data: { result },
			message: "Itinerary Plan updated successfully",
		};
	} catch (err) {
		throw err;
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
