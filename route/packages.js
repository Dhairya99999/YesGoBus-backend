const express = require("express");
const router = express.Router();

const packagesController = require("../controllers/packages");

router.get("/packages",packagesController.get_packages );
router.get("/get_destinations",packagesController.popular_destinations)

module.exports = router;