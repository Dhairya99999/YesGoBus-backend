const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (userData) => {
  try {
    console.log(userData);
    const existingUser = await User.findOne({
      mobileNumber: userData.mobileNumber,
    });
    console.log(existingUser);
    if (!existingUser) {
      //const hashedPassword = bcrypt.hashSync(userData.password, 5);
      const newUser = new User({
        ...userData,
        //password: hashedPassword,
      });
      await newUser.save();

      return {
        status: 200,
        message: "SignUp Successful",
        data: newUser,
      };
    } else {
      return {
        status: 409,
        message: "User already exists",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message || "Internal server error",
    };
  }
};

exports.signIn = async (emailMobile, password) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: emailMobile }, { phoneNumber: emailMobile }],
    });

    if (!existingUser) {
      return {
        status: 401,
        message: "User not found",
      };
    }
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password",
      };
    }
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_KEY);
    existingUser.password = undefined;
    return {
      status: 200,
      message: "Successfully signed in",
      data: existingUser,
      token: token,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message || "Internal server error",
    };
  }
};

exports.googleSignUp = async (jwtToken) => {
  try {
    const { email, name } = jwt.decode(jwtToken);
    const newUser = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          email: email,
          fullName: name,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

    return {
      status: 200,
      message: "Google SignIn successfull",
      data: newUser,
      token: token,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message || "Internal server error",
    };
  }
};

exports.facebookSignUp = async ({ name, email }) => {
  try {
    const newUser = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          email,
          fullName: name,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

    return {
      status: 200,
      message: "Facebook SignIn successfull",
      data: newUser,
      token: token,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message || "Internal server error",
    };
  }
};

exports.updateUserProfile = async (userId, updatedData) => {
  try {
    const existingUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }
    existingUser.password = undefined;
    return {
      status: 200,
      message: "Profile updated successfully",
      data: existingUser,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message || "Internal server error",
    };
  }
};
