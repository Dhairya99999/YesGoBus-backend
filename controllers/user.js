const userModel = require("../model/user");
const deletedAccountModel = require("../model/deletedAccount");
const jwt = require("jsonwebtoken");

exports.user_signup = async (req, res) => {
  try {
    const { firstName, email, lastName, mobileNumber } = await req.body;
    console.log("hii");
    const reqUser = await userModel.findOne({
      mobileNumber: mobileNumber,
    });
    console.log(reqUser)
    if(email !== "" && !/\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/.test(email)){
     return res.status(200).send({status:false,data:{},message:"Invalid email id"})
    }
    if (reqUser) {
      return res
        .status(200)
        .send({ status: false, data: {}, message: "User already exists" });
    }
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      mobileNumber,
    });
    const payload = {
      userId: user._id,
      mobileNumber: req.body.mobileNumber,
    };

    const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return res.status(200).send({
      status: true,
      data: { token: generatedToken, user: user },
      message: "Signup Successfully",
    });
  } catch (err) {
    console.log(err.message)
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.user_login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (!user) {
      return res
        .status(200)
        .send({ status: false, data: {}, message: "user dose not exist" });
    }
    if (user) {
      const payload = {
        userId: user._id,
        mobileNumber: req.body.mobileNumber,
      };

      const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return res.status(200).send({
        status: true,
        data: { token: generatedToken, user: user },
        message: "User Login Successfully",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};

exports.delete_account = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user });
    if(!user) {
      return res.status(403).send({status:false,data:{},message:"You don't have access or account already deleted"})
    }
    const account = await deletedAccountModel.create({
      reason: req.body.reason,
      userName: `${user.firstName} ${user.lastName}`,
      contactNumber: user.mobileNumber,
    });
    if (account) {
      await userModel.deleteOne({ _id: req.user });
    }
    return res
      .status(200)
      .send({
        status: true,
        data: {},
        message: "Account deleted successfully",
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      data: { errorMessage: err.message },
      message: "server error",
    });
  }
};
