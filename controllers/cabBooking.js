const {
	createCabBooking,
	getCabBookingsByUser,
	cancelCabBooking,
	getAllCabBookingByUser,
	completeBooking
} = require('../service/carBooking.service.js');

exports.createCabBookingController = async (req, res) => {
	try {
		const result = await createCabBooking(req.body);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while creating a cab booking" });
	}
};

exports.getCabBookingsByUserController = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await getCabBookingsByUser(id);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while fetching cab bookings" });
	}
};

exports.cancelCabBookingController = async (req, res) => {
	try {
		const { bookingId } = req.params;
		const result = await cancelCabBooking(bookingId);
		res.status(result.status).json({ message: result.message, data: result.data });
	} catch (err) {
		res.status(500).json({ message: "An error occurred while canceling the booking" });
	}
};


exports.getAllCabBookingByUserController = async (req, res) => {
	try {
		const driverId = new mongoose.Types.ObjectId(req.params.driverId);
		const result = await getAllCabBookingByUser(driverId);
		res.status(result.status).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while processing your request.",
		});
	}
}

exports.completeBookingController = async (req, res) => {
  try {
    const {bookingId} = req.params;
    const result = await completeBooking(bookingId);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
