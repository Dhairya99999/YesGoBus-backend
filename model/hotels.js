const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const destinationSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
    },
    rating: {
      type: Number,
    },
    image:{
      type:String,

    },
    address: {
      type: String,
    },
    fullAddress: {
      type: String,
    },
    destination:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", destinationSchema);