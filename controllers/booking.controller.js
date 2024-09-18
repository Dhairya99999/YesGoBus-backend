import bookingModel from "../modals/booking.modal.js";
import supportModel from "../modals/customerSupport.modal.js";
import hotelModel from "../modals/hotels.modal.js";
//import userModel from "../model/user"
import itineraryPlansModel from "../modals/itineraryPlans.modal.js";
import axios from "axios";

export const make_booking = async (req, res) => {
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
      message: "server error 1",
    });
  }
};
export const add_itinerary_plans = async (req, res) => {
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
      message: "server error 2",
    });
  }
};
export const get_Itinerary_plans = async (req, res) => {
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
      message: "server error 3",
    });
  }
};

export const edit_booking = async (req, res) => {
  try {
    let bookingData; // Use 'let' here to allow reassignment

    if (req.body.paymentStatus) {
      bookingData = await bookingModel.findOneAndUpdate(
        { bookingId: req.body.bookingId },
        { paymentStatus: req.body.paymentStatus },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        data: { bookingData },
        message: "Booking updated successfully",
      });
    }

    bookingData = await bookingModel.findOneAndUpdate(
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
      },
      { new: true }
    );

    // Create order
    const url = 'https://sandbox.cashfree.com/pg/orders';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.SANDBOX_CASHFREE_CLIENT_ID,
      'x-client-secret': process.env.SANDBOX_CASHFREE_SECRET_KEY,
    };

    const orderData = {
      customer_details: {
        customer_id: bookingData.userId,
        customer_phone: req.body.mobileNumber,
        customer_email: req.body.email,
        customer_name: bookingData.guestDetails.fullName,
      },
      order_currency: "INR",
      order_amount: req.body.totalPackagePrice,
    };

    const response = await axios.post(url, orderData, { headers });
    const { order_id, payment_session_id } = response.data;

    // Update bookingData with the orderId
    bookingData = await bookingModel.findOneAndUpdate(
      { _id: req.body.bookingId },
      { orderId: order_id }, 
      { new: true }
    );

    // Return bookingData along with orderId and sessionId
    return res.status(200).send({
      status: true,
      data: {
        bookingData,
        order_id,
        payment_session_id,
      },
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "Server error",
    });
  }
};

export const customer_sport = async (req, res) => {
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
      message: "server error 4",
    });
  }
};

export const get_customer_booking = async (req, res) => {
  try {
    const booking = await bookingModel
      .find(
        { userId: req.user,
			    paymentStatus: "SUCCESS"
         },
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
      message: "server error 5",
    });
  }
};

export const get_booking = async (req, res) => {
  try {
    console.log(req.body.bookingId)
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
      message: "server error 6",
    });
  }
};

export const update_booking_payment = async(req,res)=>{
  try {
    console.log(req.body.bookingId)
    const booking = await bookingModel.findOneAndUpdate({bookingId:req.body.bookingId},{
      merchantTransactionId: req.body.merchantTransactionId,
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
      message: "server error 7",
    });
  }
}
