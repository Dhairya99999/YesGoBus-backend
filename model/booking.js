const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
      trim: true,
    },
    packageId: {
      type: ObjectId,
      require: true,
      ref: "Packages",
      trim: true,
    },
    fromPlace: {
      type: String,
      require: true,
    },
    toPlace: {
      type: String,
      require: true,
    },
    departureDate: {
      type: String,
      require: true,
    },
    returnDate: {
      type: String,
    },
    totalGuests: {
      type: String,
    },
    totalRoom: {
      type: Number,
    },
    witheFlight:{
      type:Boolean,
      default:false
    },
    guestsType: {
      type: String,
      enum: ["students", "college students", "corporate"],
    },
    totalPackagePrice: {
      type: Number,
    },
    contactDetail: {
      email: {
        type: String,
      },
      mobileNumber: {
        type: Number,
      },
      alternativeNumber: {
        type: Number,
      },
    },
    gstDetails: {
      pincode: {
        type: Number,
      },
      state: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    guestDetails: [Object],
    paymentDone: {
      type: Boolean,
      default: false,
    },
    paymentID: {
      type: String,
    },
    paymentTime: {
      type: Date,
    },
    couponDiscount:{
      type:Number
    },
    feesTexes:{
      type:Number
    },
    totalBasicCost:{
      type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
