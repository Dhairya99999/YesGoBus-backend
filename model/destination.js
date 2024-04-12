const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    destination: {
        type:String
    },
    image: {
        type:String,
    },
    rating:{
        type:String
    },
    duration: {
        type:String
    },
    startingPrice: {
        type:Number
    },
},
{ timestamps: true })

module.exports = mongoose.model("Destination", destinationSchema);