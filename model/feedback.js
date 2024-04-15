const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
      trim: true,
    },
    rating: {
      type: Number,
    },
    feedback: {
      type: String,
    },
    feedbackDate:{
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);