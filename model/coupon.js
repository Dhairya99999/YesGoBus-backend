const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema(
  {
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
