const destinationModel = require("../model/destination");
const packageModel = require("../model/packages");

exports.add_destination = async (req, res) => {
  try {
    const response = await destinationModel.create({
      destination: req.body.destination,
      image: req.body.image,
      rating: req.body.rating,
      duration: req.body.duration,
      startingPrice: req.body.startingPrice,
    });
    return res.status(201).send({
      status: true,
      data: { response },
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

exports.add_packages = async (req, res) => {
  try {
    const { name, image, price, duration, destination,destinationID } = req.body;

    const package = await packageModel.create({
      name,
      image,
      duration,
      witheFlitePrice: price,
      withoutFlitePrice: price * 0.8,
      destination,
      destinationID
    });
    return res.status(201).send({
      status: true,
      data: { package },
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
exports.get_packages = async (req, res) => {
  try {
    const destination = await destinationModel.find(
      {},
      {
        _id: 1,
        destination: 1,
        duration: 1,
        startingPrice: 1,
        image: 1,
        rating: 1,
      }
    );
    return res.status(201).send({
      status: true,
      data: { destination: destination },
      message: "destination fetch successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.popular_destinations = async (req, res) => {
  try {
    console.log(req.body.destination);
    const packages = await packageModel.find(
      { destination: req.body.destination },
      {
        _id: 1,
        name:1,
        image:1,
        duration:1,
        witheFlitePrice: 1,
        withoutFlitePrice: 1,
        destination:1,
        destinationID:1,
        totalDuration:1,
        hotelId:1
      }
    );
    return res.status(200).send({
      status: true,
      data: { packages },
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
