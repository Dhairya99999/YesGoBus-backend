const bookingModel = require("../model/booking");
const hotelModel = require("../model/hotels");
const itineraryPlansModel = require("../model/itineraryPlans");

exports.make_booking = async (req, res) => {
  try {
    console.log(new Date());
    const {
      packageId,
      fromPlace,
      toPlace,
      departureDate,
      returnDate,
      witheFlight,
      totalGuests,
      totalRoom,
      guestsType,
      totalPackagePrice,
    } = req.body;
    const bookingData = await bookingModel.create({
      userId: req.user,
      packageId,
      fromPlace,
      toPlace,
      departureDate,
      returnDate,
      witheFlight,
      totalGuests,
      totalRoom,
      guestsType,
      totalPackagePrice,
    });
    return res.status(201).send({
      status: true,
      data: { bookingData },
      message: "Booking done successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};
exports.add_itinerary_plans = async (req, res) => {
  try {
    const itineraryData = await itineraryPlansModel.create({
      hotelId: req.body.hotelId,
      plans: req.body.plans,
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
exports.get_Itinerary_plans = async (req, res) => {
  try {
    const [startDay, startMonth, startYear] = req.body.start_date.split("/");
    const [endDay, endMonth, endYear] = req.body.end_date.split("/");
    const start = new Date(`${startMonth}/${startDay}/${startYear}`);
    const end = new Date(`${endMonth}/${endDay}/${endYear}`);
    let count = 0;
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      count++;
    }
    const hotel = await hotelModel.findOne(
      { _id: req.body.hotelId },
      {
        hotelName: 1,
        rating: 1,
        address: 1,
        image: 1,
        fullAddress: 1,
        destination: 1,
      }
    );
    const itineraryData = await itineraryPlansModel.findOne({
      hotelId: req.body.hotelId,
    });
    return res.status(200).send({
      status: true,
      data: { hotel_data: { hotel, itinerary: itineraryData.plans } },
      message: "Booking done successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};
