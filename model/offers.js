const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const offerSchema = new mongoose.Schema(
  {
    destinationId: {
      type: ObjectId,
      required: true,
      ref: "Destination",
      trim: true,
    },
    destination: {
      type: String,
    },
    image:{
        type:String
    },
    offerFor:{
        type:String,
    },
    validTill:{
        type:String
    },
    offer:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
