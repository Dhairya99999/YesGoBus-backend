const mongoose = require("mongoose");

const subAdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/, "Invalid email id"],
    },
    firstName: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [30, "Full name should be less than 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [30, "Full name should be less than 30 characters"],
    },
    userAddresses: {
      _id: false,
      city: { type: String },
      country: { type: String },
      address: { type: String },
      postalCode: { type: String },
    },
    mobileNumber: {
      type: Number,
      required: [true, "mobile number is required"],
      unique: true,
    },
    gander: { type: String },
    dateOfBarth: { type: String },
    profileImage: { type: String },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", subAdminSchema);
