const express = require("express");
const router = express.Router();

const packagesController = require("../controllers/packages");

router.post("/add_destinations",packagesController.add_destination);
router.post("/add_packages",packagesController.add_packages);
router.get("/get_destinations",packagesController.get_packages );
router.post("/packages",packagesController.popular_destinations)

module.exports = router;
