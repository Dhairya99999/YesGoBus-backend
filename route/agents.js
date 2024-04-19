const express = require("express");
const router = express.Router();
const agentController= require("../controllers/agents.js");

router.post("/register", agentController.registerAgentController);
router.post("/login", agentController.loginAgentController);
router.get("/getAgentBookings/:agentId", agentController.getAgentBookingsController);
router.get("/getAllAgentBookings", agentController.getAllAgentBookingsController);
router.get("/getBalance", agentController.getBalanceAPIController);
router.patch("/approveAgent/:agentId", agentController.adminApproveAgentController);
router.delete("/rejectAgent/:agentId", agentController.adminRejecteAgentController);
router.get("/getAllPendingAgents", agentController.getAllPendingAgentsControllr);
router.get("/getAllBookings/:agentId", agentController.getAllBookingsController);
router.get("/getAllBookingRefunds/:agentId", agentController.getAllBookingRefundsController);
router.get("/getAgentPerformanceReport", agentController.getAgentPerformanceReportController);
router.get("/verifyAgentCode/:agentCode", agentController.verifyAgentCodeController);
router.get("/isAgent/:userId", agentController.isAgentController);
router.get("/agentStats/:agentId", agentController.getAgentStatsController);
router.patch("/updateAgent/:agentId", agentController.updateAgentController);
router.get("/getAgentTicketLimit/:agentId", agentController.getAgentRemainingTicketByDayController);
router.patch("/deactivateAgent/:agentId", agentController.adminInactivateAgentController);

module.exports = router;