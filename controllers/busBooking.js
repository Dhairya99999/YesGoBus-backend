const serviceModel = require("../service/buBooking.service.js");
const { sendMessage, sendMail } = require("../utils/helper.js");

exports.getCityListController = async (req, res) => {
  try {
    const response = await getCityList();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting city list",
    });
  }
};

exports.searchBusController = async (req, res) => {
  try {
    console.log(req.body);
    const response = await serviceModel.searchBus(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while searching bus details",
    });
  }
};

exports.getSeatLayoutController = async (req, res) => {
  try {
    const response = await serviceModel.getSeatLayout(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting seat layout",
    });
  }
};

exports.blockSeatController = async (req, res) => {
  try {
    const response = await serviceModel.blockSeat(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while blocking seat",
    });
  }
};

exports.bookSeatController = async (req, res) => {
  try {
    const response = await serviceModel.bookSeat(req.params.ticketKey);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while booking seat",
    });
  }
};

exports.cancelTicketController = async (req, res) => {
  try {
    const response = await serviceModel.cancelTicket(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while cancelling ticket",
    });
  }
};

exports.getBusFiltersController = async (req, res) => {
  try {
    const response = await serviceModel.getBusFilters(req.query);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting filters",
    });
  }
};

exports.getBusDetailsController = async (req, res) => {
  try {
    const searchArgs = {
      sourceCity: req.body.sourceCity,
      destinationCity: req.body.destinationCity,
      doj: req.body.doj,
    };
    let filters = {};
    if (
      req.body.boardingPoints !== null &&
      req.body.boardingPoints?.length > 0
    ) {
      filters.boardingPoints = req.body.boardingPoints;
    }
    if (
      req.body.droppingPoints !== null &&
      req.body.droppingPoints?.length > 0
    ) {
      filters.droppingPoints = req.body.droppingPoints;
    }
    if (req.body.busPartners !== null && req.body.busPartners?.length > 0) {
      filters.busPartners = req.body.busPartners;
    }
    if (req.body.minPrice !== null && req.body.minPrice !== undefined) {
      filters.minPrice = req.body.minPrice;
    }
    if (req.body.maxPrice !== null && req.body.maxPrice !== undefined) {
      filters.maxPrice = req.body.maxPrice;
    }
    const response = await serviceModel.getBusDetails(searchArgs, filters);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting bus details with filters",
    });
  }
};

exports.bookBusController = async (req, res) => {
  try {
    const response = await serviceModel.bookBus(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while booking bus",
    });
  }
};

exports.searchCityController = async (req, res) => {
  try {
    const response = await serviceModel.searchCity(req.params.searchParam);
    res.status(response.status).send({
      status: true,
      cityList: response.data,
      message: "City details retrieved",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while searching city",
    });
  }
};

exports.updateBookingsController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const response = await serviceModel.updateBookings(bookingId, req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while updating booking details",
    });
  }
};

exports.getBookingByIdController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const response = await serviceModel.getBookingById(bookingId);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting booking details",
    });
  }
};

exports.getAllBookingsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await serviceModel.getAllBookings(userId);
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting booking details",
    });
  }
};

exports.sendBookingConfirmationMessage = async (req, res) => {
  try {
    const {
      fullName,
      opPNR,
      doj,
      sourceCity,
      destinationCity,
      seats,
      amount,
      pickUpLocation,
      to,
    } = req.body;
    const truncatedPickupLocation =
      pickUpLocation.length > 15
        ? pickUpLocation.substring(0, 15) + "..."
        : pickUpLocation;
    const message = `Dear ${fullName} Your PNR: ${opPNR} Journey: ${sourceCity} to  ${destinationCity} Seat: ${seats} Amount Rs.${amount} Date: ${doj} Contact: +91${to} Pickup: ${truncatedPickupLocation} Is Booked. Thank You, Shine Gobus`;
    const templateId = process.env.BOOKING_CONFIRMATION_TEMPLATE_ID;
    const response = await sendMessage(message, to, templateId);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while sending sms",
    });
  }
};

exports.sendBookingConfirmationEmail = async (req, res) => {
  try {
    const {
      fullName,
      opPNR,
      doj,
      sourceCity,
      destinationCity,
      seats,
      amount,
      pickUpLocation,
      to,
    } = req.body;
    const message = `Dear ${fullName},
        Your PNR: ${opPNR}
        Journey: ${sourceCity} to  ${destinationCity}
        Seat: ${seats}
        Amount Rs.${amount}
        Date: ${doj}
        Email: ${to}
        Pickup: ${pickUpLocation} Is Booked.
        Thank You, Shine Gobus`;
    const subject = "Booking Confirmation";
    await sendMail(to, subject, message);

    //send mail to yesgobus
    const adminMailMessage = `New Bus Booking:
        Name: ${fullName},
        PNR: ${opPNR}
        Journey: ${sourceCity} to  ${destinationCity}
        Seat: ${seats}
        Amount Rs.${amount}
        Date: ${doj}
        Email: ${to}
        Pickup: ${pickUpLocation} Is Booked.
        Thank You, Shine Gobus`;
    const adminSubject = "New Bus Booking";
    await sendMail("yesgobus99@gmail.com", adminSubject, adminMailMessage);
    res.status(200).send({
      status: 200,
      message: "Email Sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while sending mail",
    });
  }
};

exports.sendCancelTicketMessage = async (req, res) => {
  try {
    const { fullName, opPNR, sourceCity, destinationCity, to } = req.body;
    const message = `Dear ${fullName} Your PNR: ${opPNR} Journey: ${sourceCity} to  ${destinationCity} is Cancelled. Thank You, Shine Gobus`;
    const templateId = process.env.BOOKING_CANCELLATION_TEMPLATE_ID;
    const response = await sendMessage(message, to, templateId);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while sending sms",
    });
  }
};

exports.sendCancelTicketEmail = async (req, res) => {
  try {
    const { fullName, opPNR, sourceCity, destinationCity, to } = req.body;
    const messageBody = `Dear ${fullName} 
        Your PNR: ${opPNR} 
        Journey: ${sourceCity} to  ${destinationCity} is Cancelled. 
        Thank You, Shine Gobus`;
    const subject = "Booking Cancelled";
    await sendMail(to, subject, messageBody);

    //send mail to yesgobus
    const adminMessageBody = `Name: ${fullName} 
        PNR: ${opPNR} 
        Journey: ${sourceCity} to  ${destinationCity} is Cancelled. 
        Thank You, Shine Gobus`;
    const adminSubject = "Booking Cancelled";
    await sendMail("yesgobus99@gmail.com", adminSubject, adminMessageBody);

    res.status(200).send({
      status: 200,
      message: "Email Sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while sending mail",
    });
  }
};

exports.getSrsSchedulesController = async (req, res) => {
  try {
    const { origin_id, destination_id, travel_date } = req.params;
    const response = await serviceModel.getSrsSchedules(
      origin_id,
      destination_id,
      travel_date
    );
    const data = response?.map((item) => {
      const [type] = item.bus_type
        ?.split(",")
        .filter((type) => type.includes("AC") || type.includes("Non-AC"));
      const price = item.show_fare_screen.split("/")[0];
      return {
        operatorName: item.operator_service_name,
        type,
        bus_type: item.bus_type,
        dep_time: item.dep_time,
        arr_time: item.arr_time,
        duration: `${item.duration.split(":")[0]}hr ${
          item.duration.split(":")[1]
        }mins`,
        available_seats: item.available_seats,
        total_seats: item.total_seats,
        price,
        ratings: 0,
        avg: 0,
      };
    });
    res
      .status(200)
      .send({ status: true, busData: data, message: "Bus fetch successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.get_shorted_bus = async (req, res) => {
  try {
    const { origin_id, destination_id, travel_date } = req.body;
    const response = await serviceModel.getSrsSchedules(
      origin_id,
      destination_id,
      travel_date
    );
    const data = response?.map((item) => {
      const [type] = item.bus_type
        ?.split(",")
        .filter((type) => type.includes("AC") || type.includes("Non-AC"));
      const price = item.show_fare_screen.split("/")[0];
      return {
        operatorName: item.operator_service_name,
        type,
        bus_type: item.bus_type,
        dep_time: item.dep_time,
        arr_time: item.arr_time,
        duration: `${item.duration.split(":")[0]}hr ${
          item.duration.split(":")[1]
        }mins`,
        available_seats: item.available_seats,
        total_seats: item.total_seats,
        price,
        ratings: 0,
        avg: 0,
      };
    });
    res
      .status(200)
      .send({ status: true, busData: data, message: "Bus fetch successfully" });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};
