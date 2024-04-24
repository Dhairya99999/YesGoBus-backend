const bookingModel = require("../model/booking");
const supportModel = require("../model/customerSupport");
const hotelModel = require("../model/hotels");
const itineraryPlansModel = require("../model/itineraryPlans");
const cityModel = require("../model/cities");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const axios = require("axios");

exports.make_booking = async (req, res) => {
  try {
    function generateBookingId() {
      const companyName = "YESGBS";
      const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let idSuffix = "";
      for (let i = 0; i < 6; i++) {
        idSuffix += alphanumeric.charAt(
          Math.floor(Math.random() * alphanumeric.length)
        );
      }
      const bookingId = `${companyName}-${idSuffix}`;
      return bookingId;
    }

    const bookingId = generateBookingId();

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
      couponDiscount: 0,
      feesTexes: totalPackagePrice,
      totalBasicCost: totalPackagePrice,
      bookingId,
      status: [
        {
          bookingStatus: "Booked",
          statusTime: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        },
      ],
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
    const hotelData = {
      hotelName: hotel?.hotelName,
      rating: hotel?.rating,
      address: hotel?.address,
      image: hotel?.image,
      fullAddress: hotel?.fullAddress,
      destination: hotel?.destination,
      checkIn: itineraryData ? itineraryData?.checkIn : "",
      checkOut: itineraryData ? itineraryData?.checkOut : "",
    };

    return res.status(200).send({
      status: true,
      data: {
        hotel_data: {
          hotel: hotelData
            ? hotelData
            : {
                hotelName: "",
                rating: "",
                address: "",
                image: "",
                fullAddress: "",
                destination: "",
                checkIn: "",
                checkOut: "",
              },
          itinerary: itineraryData ? itineraryData.plans : [],
        },
      },
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

exports.edit_booking = async (req, res) => {
  try {
    const bookingData = await bookingModel.findOneAndUpdate(
      { _id: req.body.bookingId },
      {
        totalPackagePrice: req.body.totalPackagePrice,
        contactDetail: {
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          alternativeNumber: req.body.alternativeNumber,
        },
        gstDetails: {
          pincode: req.body.pincode,
          state: req.body.state,
          address: req.body.address,
        },
        guestDetails: JSON.parse(req.body.guestDetails),
        spancelRequest: req.body.spancelRequest,
      }
    );
    return res.status(200).send({
      status: true,
      data: { bookingData },
      message: "Booking updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.customer_sport = async (req, res) => {
  try {
    const bookingData = await bookingModel.findOne({
      bookingId: req.body.bookingId,
    });
    if (!bookingData) {
      return res
        .status(200)
        .send({ status: false, data: {}, message: "Invalid booking id" });
    }
    const sportData = await supportModel.create({
      bookingId: req.body.bookingId,
      userId: req.user,
    });

    return res.status(201).send({
      status: true,
      data: { sportData },
      message: "Query has been raised our team will connect you soon",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.get_customer_booking = async (req, res) => {
  try {
    const booking = await bookingModel
      .find(
        { userId: req.user },
        { _id: 1, packageId: 1, status: 1, bookingId: 1 }
      )
      .populate({
        path: "packageId",
      });
    const bookingData = booking.map((item) => {
      return {
        _id: item._id,
        name: item?.packageId?.name,
        destinationID: item?.packageId?.destinationID,
        destination: item?.packageId?.destination,
        image: item?.packageId?.image,
        duration: item?.packageId?.duration,
        witheFlitePrice: item?.packageId?.witheFlitePrice,
        withoutFlitePrice: item?.packageId?.withoutFlitePrice,
        totalDuration: item?.packageId?.totalDuration,
        hotelId: item?.packageId?.hotelId ? item?.packageId?.hotelId : "",
        bookingStatus: item?.status[item?.status?.length - 1]?.bookingStatus,
        statusTime: item?.status[item?.status?.length - 1]?.statusTime,
        bookingId: item?.bookingId,
      };
    });
    return res.status(200).send({
      status: true,
      data: { bookingData },
      message: "Booking Data fetch successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.get_booking = async (req, res) => {
  try {
    const booking = await bookingModel.findOne({
      bookingId: req.body.bookingId,
    });
    return res.status(200).send({
      status: true,
      data: { booking },
      message: "Booking Data fetch successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};
exports.get_bus_list = async (req, res) => {
  try {
    const capitalizeFirstLetter = (str) => {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };
    const sendRequest = async (url, method, data) => {
      try {
        const oauth = OAuth({
          consumer: {
            key: process.env.CUSTOMER_KEY,
            secret: process.env.CUSTOMER_SECRET,
          },
          signature_method: "HMAC-SHA1",
          hash_function(base_string, key) {
            return crypto
              .createHmac("sha1", key)
              .update(base_string)
              .digest("base64");
          },
        });

        const requestData = {
          url: url,
          method: method,
          data: data,
        };

        const headers = oauth.toHeader(oauth.authorize(requestData));

        const response = await axios({
          method: method,
          url: url,
          headers: headers,
          data: data,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        throw error.message;
      }
    };
    const searchBus = async (sourceId, destinationId, doj) => {
      const url = `http://api.seatseller.travel/availabletrips?source=${sourceId}&destination=${destinationId}&doj=${doj}`;
      return sendRequest(url, "GET", null);
    };
    const [sourceCity, destinationCity] = await Promise.all([
      cityModel.findOne({ name: capitalizeFirstLetter(req.body.sourceCity) }),
      cityModel.findOne({
        name: capitalizeFirstLetter(req.body.destinationCity),
      }),
    ]);
    const searchResponse = await searchBus(
      sourceCity.id,
      destinationCity.id,
      req.body.doj
    );
    return res.status(200).send(searchResponse);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};
