const {
    initiatePayment,
    checkPaymentStatus,
    refundPayment,
  } = require("../service/payment.service.js");
  
exports.initiatePaymentController = async (req, res) => {
    try {
      const response = await initiatePayment(req.body);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "An error occurred while initiating payment"
      })
    }
  };
  
exports.checkPaymentStatusController = async (req, res) => {
    try {
      const response = await checkPaymentStatus(req.params);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "An error occurred while checking payment status"
      })
    }
  };
  
exports.refundPaymentController = async (req, res) => {
    try {
      const response = await refundPayment(req.body);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "An error occurred while refunding payment"
      })
    }
  };