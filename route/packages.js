const express = require("express");
const router = express.Router();

const packagesController = require("../controllers/packages");
const middleware = require("../middleware/authenticateUser");

router.post("/add_destinations",packagesController.add_destination);
router.post("/add_packages",middleware.authenticateToken,packagesController.add_packages);
router.get("/get_destinations",packagesController.get_packages );
router.post("/packages",packagesController.popular_destinations);
router.post("/add_to_wishlist",middleware.authenticateToken,packagesController.add_to_wishlist)
router.get("/get_user_wishlist",middleware.authenticateToken,packagesController.get_user_wishlist)

module.exports = router;
