const express = require("express");
const router = express.Router();

const packagesController = require("../controllers/packages");

router.post("/add_destinations",packagesController.add_destination)
router.get("/get_destinations",packagesController.get_packages );
router.get("/packages",packagesController.popular_destinations)

module.exports = router;
