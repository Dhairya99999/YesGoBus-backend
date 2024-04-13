const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotel");

router.post("/add_hotel",hotelController.add_hotel);
module.exports = router;