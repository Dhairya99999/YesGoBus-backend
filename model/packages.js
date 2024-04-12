const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    duration: {
      type: Number,
    },
    witheFlitePrice: {
      type: Number,
    },
    withoutFlitePrice: {
      type: Number,
    },
    totalDuration: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Packages", destinationSchema);
