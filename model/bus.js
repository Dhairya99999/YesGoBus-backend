const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
     bus_id:{
        type:String
     },
     seats:[Object],
     totalFare:{
      type:Number
     }
    }
  );
  
  module.exports = mongoose.model("Bus", busSchema);