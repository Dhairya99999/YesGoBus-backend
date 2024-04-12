const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    destinationID:{
        type: ObjectId,
        required: true,
        ref: 'Destination',
        trim: true
    },
    destination:{
        type:String
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Packages", destinationSchema);
