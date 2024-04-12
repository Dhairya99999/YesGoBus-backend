const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fromPlace: {
      type: String,
      require: true,
    },
    toPlace: {
      type: String,
      require: true,
    },
    durationFrom: {
      type: Date,
      require: true,
    },
    durationTo: {
      type: Date,
    },
    totalGuests: {
      type: String,
    },
    totalRoom: {
      type: Number,
    },
    guestsType: {
      type: String,
      enum: ["students", "college students", "corporate"],
    },
    totalPackagePrice:{
        type:Number
    },
    guestDetails: [
        {
            _id:false,
            fullName:{
                type:String
            },
            age:{
                type:String
            },
            gender:{
                type:String
            }
        }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
