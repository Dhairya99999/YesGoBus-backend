const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offer");

router.post("/add_offer", offerController.add_offer);
router.get("/get_offers", offerController.get_offer)

module.exports = router;