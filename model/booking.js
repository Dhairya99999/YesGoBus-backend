const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    fromPlace:{
        type:String,
        require:true,
    },
    toPlace:{
        type:String,
        require:true
    },
    durationFrom:{
        type:Date,
        require:true
    },
    durationTo:{
        
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", subAdminSchema);
