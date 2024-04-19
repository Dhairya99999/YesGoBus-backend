const {
    addCabDetails,
    updateCabDetails,
    getCabDetailsByUser,
    inactiveCab,
    getCabDetails,
  } = require("../service/cab.service.js");
  
exports.getCabDetailsController = async (req, res) => {
    try {
      const {
        cabModel,
        seatingCapacity,
        cabType,
        priceFrom,
        priceTo,
        fromLocation,
      } = req.query;
      let query = {};
  
      if (cabModel) {
        query.cabModel = cabModel;
      }
      if (seatingCapacity) {
        query.seatingCapacity = parseInt(seatingCapacity);
      }
      if (cabType) {
        query.cabType = cabType;
      }
      if (priceFrom && priceTo) {
        query.estimatedKmPrice = {
          $gte: parseFloat(priceFrom),
          $lte: parseFloat(priceTo),
        };
      } else if (priceFrom) {
        query.estimatedKmPrice = { $gte: parseFloat(priceFrom) };
      } else if (priceTo) {
        query.estimatedKmPrice = { $lte: parseFloat(priceTo) };
      }
      if (fromLocation) {
        query.location = fromLocation.toLowerCase();
      }
  
      const result = await getCabDetails(query);
  
      res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching cab details" });
    }
  };
  
exports.addCabDetailsController = async (req, res) => {
    try {
      const result = await addCabDetails(req.body);
      res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while adding cab details" });
    }
  };
  
exports.updateCabDetailsController = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await updateCabDetails(id, req.body);
      res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while updating cab details" });
    }
  };
  
exports.getCabDetailsByUserController = async (req, res) => {
    try {
      const { driverId } = req.params;
      const result = await getCabDetailsByUser(driverId);
      res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching cab details" });
    }
  };
  
exports.inactiveCabController = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await inactiveCab(id);
      res
        .status(result.status)
        .json({ message: result.message, data: result.data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while inactivating cab" });
    }
  };
  