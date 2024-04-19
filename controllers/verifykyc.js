const ApiService = require('../service/verifykyc.service.js');

exports.aadhaarKycGenerateOtpController = async (req, res) => {
    try {
      const { aadhaar_number } = req.body;
      const response = await ApiService.aadhaarKycGenerateOtp(aadhaar_number);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  
  exports.aadhaarKycVerifyOtpController = async (req, res) => {
    try {
      const { otp, client_id } = req.body;
      const response = await ApiService.aadhaarKycVerifyOtp(otp, client_id);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  
  exports.panVerificationController = async (req, res) => {
    try {
      const { panNumber, dob, fullName } = req.body;
      const response = await ApiService.panVerification(panNumber, dob, fullName);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  
  exports.bankAccountVerificationController = async (req, res) => {
    try {
      const { ifsc, account_number } = req.body;
      const response = await ApiService.bankAccountVerification(ifsc, account_number);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  
  exports.drivingLicenseVerificationController = async (req, res) => {
    try {
      const { id_number, dob } = req.body;
      const response = await ApiService.drivingLicenseVerification(id_number, dob);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  