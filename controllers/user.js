const userModel = require("../model/user");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const twilio = require("twilio");

exports.user_signup = async (req, res) => {
  try {
    const { firstName, email, lastName, mobileNumber } = await req.body;
    console.log("hii");
    const reqUser = await userModel.findOne({
      mobileNumber: mobileNumber,
    });

    if (reqUser) {
      return res.status(200).send({ error: "User already exists" });
    }
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      mobileNumber,
    });
    return res
      .status(201)
      .send({ status: true, message: "user register successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

exports.user_login = async (req, res) => {
  try {
    const user = await subAdminModel.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if(!user){
      return res.status(200).send({status:false,message:"user dose not exist"})
    }
    if (user) {
      const payload = {
        userId: response._id,
        mobileNumber: req.body.mobileNumber,
      };

      const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return res.status(200).send({ token: generatedToken });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
