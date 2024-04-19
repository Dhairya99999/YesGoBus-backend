const mongoose = require("mongoose");

const { Schema } = mongoose;

const citySchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    latitude: {
      type: String
    },
    locationType: {
      type: String
    },
    longitude: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: String
    },
    stateId: {
      type: String
    }
  }
);

module.exports = mongoose.model("City", citySchema);
