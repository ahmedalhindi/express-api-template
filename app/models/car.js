const mongoose = require('mongoose')

// schema
const carSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    color: String,
    passenger: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{
    timestamps:true
})

// define models
const Car = mongoose.model("Car", carSchema)

module.exports=Car
