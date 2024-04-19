const {
    registerAgent,
    loginAgent,
    getAgentBookings,
    getAllAgentsBookings,
    getBalanceAPI,
    adminApproveAgent,
    adminRejectAgent,
    getAllPendingAgents,
    getAllBookings,
    getAllBookingRefund,
    getAgentPerformanceReport,
    verifyAgentCode,
    isAgent,
    getAgentStats,
    updateAgent,
    getAgentRemainingTicketByDay,
    adminInactivateAgent,
  } = require('../service/agents.service.js');
  
 exports.registerAgentController = async (req, res) => {
    try {
      const result = await registerAgent(req.body);
      res.status(result.status).json({ message: result.message, data: result.data });
    } catch (err) {
      res.status(500).json({ message: "An error occurred while registering an agent" });
    }
  };
  
 exports.loginAgentController = async (req, res) => {
    try {
      const { emailMobile, password } = req.body;
      const result = await loginAgent(emailMobile, password);
  
      if (result.status === 200) {
        res.cookie("token", result.token, {
          maxAge: 3600000,
        });
      }
  
      res.status(result.status).json(result);
    } catch (err) {
      res.status(500).json({ message: "An error occurred while logging in" });
    }
  };
  
  
 exports.getAgentBookingsController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await getAgentBookings(agentId, req.query);
      res.status(result.status).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting bookings" });
    }
  };
  
 exports.getAllAgentBookingsController = async (req, res) => {
    try {
      const result = await getAllAgentsBookings();
      res.status(result.status).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting bookings" });
    }
  };
  
  
 exports.getBalanceAPIController = async (req, res) => {
    try {
      const result = await getBalanceAPI();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting balance" });
    }
  };
  
 exports.adminApproveAgentController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await adminApproveAgent(agentId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error approving agent" });
    }
  };
  
  
 exports.adminRejecteAgentController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await adminRejectAgent(agentId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error rejecting agent" });
    }
  };
  
 exports.getAllPendingAgentsControllr = async (req, res) => {
    try {
      const result = await getAllPendingAgents();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting pending agent data" });
    }
  };
  
 exports.getAllBookingsController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await getAllBookings(agentId, req.query);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting all bookings" });
    }
  };
  
 exports.getAllBookingRefundsController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await getAllBookingRefund(agentId, req.query);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting all booking refunds" });
    }
  };
  
 exports.getAgentPerformanceReportController = async (req, res) => {
    try {
      const result = await getAgentPerformanceReport(req.query);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting all agents performance report" });
    }
  };
  
 exports.verifyAgentCodeController = async (req, res) => {
    try {
      const { agentCode } = req.params;
      const result = await verifyAgentCode(agentCode);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting all agents performance report" });
    }
  };
  
 exports.isAgentController = async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await isAgent(userId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error checking is agent" });
    }
  };
  
 exports.getAgentStatsController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await getAgentStats(agentId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting agent stats" });
    }
  };
  
 exports.updateAgentController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await updateAgent(agentId, req.body);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error updating agent" });
    }
  };
  
  
 exports.getAgentRemainingTicketByDayController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await getAgentRemainingTicketByDay(agentId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error getting limit" });
    }
  };
  
 exports.adminInactivateAgentController = async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await adminInactivateAgent(agentId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json({ message: "Error deactivate agent" });
    }
  };