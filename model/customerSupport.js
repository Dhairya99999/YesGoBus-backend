const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const customerSupport = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
      trim: true,
    },
    bookingId: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", customerSupport);
