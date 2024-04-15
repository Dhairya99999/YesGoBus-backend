const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");
const middleware = require("../middleware/authenticateUser");

router.post("/add_feedback", middleware.authenticateToken, feedbackController.add_feedback);
router.get("/get_feedback", feedbackController.get_feedback)

module.exports = router;