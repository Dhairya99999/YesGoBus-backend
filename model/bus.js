const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
     bus_id:{
        type:String
     },
     seat:[Object]
    }
  );
  
  module.exports = mongoose.model("Bus", busSchema);