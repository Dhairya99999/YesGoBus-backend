const bookingModel = require("../model/booking");
const ItineraryPlansController = require("../model/itineraryPlans")

exports.make_booking = async (req, res) => {
  try {
    const {
      fromPlace,
      toPlace,
      departureDate,
      returnDate,
      totalGuests,
      totalRoom,
      guestsType,
      totalPackagePrice,
      email,
      mobileNumber,
      alternativeNumber,
      pincode,
      state,
      address,
      guestDetails,
    } = req.body;
    const bookingData = await bookingModel.create({
      userId: req.user,
      fromPlace,
      toPlace,
      departureDate:new Date(departureDate),
      returnDate:new Date(returnDate),
      totalGuests,
      totalRoom,
      totalPackagePrice,
      guestsType,
      contactDetail: {
        email,
        mobileNumber,
        alternativeNumber,
      },
      gstDetails: { pincode, state, address },
      guestDetails,
    });
    return res
      .status(201)
      .send({
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


exports.get_Itinerary_plans = async (req,res)=>{
    try{
        return res.status(200).send({
            status: true,
            data: { itineraryData:[] },
            message: "Booking done successfully",
          });
    }catch(err){
        return res.status(500).send({
            status: false,
            data: { errorMessage: err.message },
            message: "server error",
          });
    }
}