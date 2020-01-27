// import express
const express = require('express')
// import router into express
const router = express.Router()
// import car model
const Car = require('../models/car')

// Index
// Get /cars
router.get('/cars',(req,res)=>{
    Car.find({})
    .then(cars=>{
        res.sendStatus(200).json({cars:cars})
    })
    .catch(next)
})
