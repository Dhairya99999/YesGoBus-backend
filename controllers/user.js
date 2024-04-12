const userModel = require("../model/user");
const jwt = require("jsonwebtoken");

exports.user_signup = async (req, res) => {
  try {
    const { firstName, email, lastName, mobileNumber } = await req.body;
    console.log("hii");
    const reqUser = await userModel.findOne({
      mobileNumber: mobileNumber,
    });

    if (reqUser) {
      return res.status(200).send({ status:false,data:{}, message: "User already exists" });
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
    return res.status(200).send({ status:true, data:{token: generatedToken, user:user}, message:"Signup Successfully" });
  } catch (err) {
    return res.status(500).send({status:false,data:{errorMessage:err.message},message:"server error"});
  }
};

exports.user_login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if(!user){
      return res.status(200).send({status:false,data:{},message:"user dose not exist"})
    }
    if (user) {
      const payload = {
        userId: user._id,
        mobileNumber: req.body.mobileNumber,
      };

      const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return res.status(200).send({ status:true, data:{token: generatedToken, userId:user._id}, message:"User Login Successfully" });
    }
  } catch (err) {
    return res.status(500).send({status:false,data:{errorMessage:err.message},message:"server error"});
  }
};
