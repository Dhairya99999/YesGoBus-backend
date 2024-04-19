const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver")
const middleware = require("../middleware/authenticateUser");


router.post("/signup", driverController.signUpController);
router.post("/signin", driverController.signInController);

router.use(middleware.authenticateToken);

router.patch("/updateDriver/:driverId", driverController.updateDriverController);
router.get("/getDriverById/:driverId", driverController.getDriverByIdController);

module.exports = router;