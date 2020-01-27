// import mongoose schema
const Schema = require('mongoose').Schema
const Model = require('mongoose').Model

// schema
const carSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    color: String,
    passanger: {
        type: String,
        required: true
    }
},{
    timestamps:true
})

// define models
const carModel = new Model("Car", carSchema)

module.exports={carModel}
