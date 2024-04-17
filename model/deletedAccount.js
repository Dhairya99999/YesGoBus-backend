const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
    userName: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeletedAccount", accountSchema);
