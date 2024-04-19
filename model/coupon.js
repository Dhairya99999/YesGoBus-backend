const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema(
  {
    couponFor:{
      type:String
    },
    title:{
      type:String
    },
    couponDetail:{
      type:String
    },
    image:{
      type:String
    },
    couponCode: {
      type: String,
      unique: true,
    },
    discountValue:{
      type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", bookingSchema);
