const mongoose = require("mongoose");

const { Schema } = mongoose;

const bankSchema = new Schema(
  {
    id_number: {
      type: String,
      required: true
    },
    ifsc: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    }
  },
);

module.exports = mongoose.model("Bank", bankSchema);
