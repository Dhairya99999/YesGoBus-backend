const express = require("express");
const router = express.Router();

const subAdminController = require("../controllers/user");
const middleware = require("../middleware/authenticateUser");
router.post("/signup", subAdminController.user_signup);
// paAEjrFNY0dwvwOg balajiy798

module.exports = router;

