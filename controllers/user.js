const userModel = require("../model/user");
const deletedAccountModel = require("../model/deletedAccount");
const jwt = require("jsonwebtoken");
const {
  signUp,
  signIn,
  googleSignUp,
  facebookSignUp,
  updateUserProfile,
} = require("../service/user.service.js");

exports.user_signup = async (req, res) => {
  try {
    const { firstName, email, lastName, mobileNumber } = await req.body;
    const reqUser = await userModel.findOne({
      mobileNumber: mobileNumber,
    });
    if(email !== "" && !/\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/.test(email.trim())){
      console.log(/\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/.test(email))
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
      //const  
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

exports.signUpController = async (req, res) => {
  try {
    const result = await signUp(req.body);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while registering a user" });
  }
};

exports.signInController = async (req, res) => {
  try {
    const { emailMobile, password } = req.body;

    const result = await signIn(emailMobile, password);
    if (result.status === 200) {
      res.cookie("token", result.token, {
        // httpOnly: true,
        maxAge: 3600000,
      });
    }

    res.status(result.status).json({
      message: result.message,
      data: result.data,
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

exports.googleSignInController = async (req, res) => {
  try {
    const { jwtToken } = req.body;
    const result = await googleSignUp(jwtToken);
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

exports.facebookSignInController = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await facebookSignUp({ name, email });
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

exports.updateUserProfileController = async (req, res) => {
  try {
    const { userId } = req.params
    const result = await updateUserProfile(userId, req.body);
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};