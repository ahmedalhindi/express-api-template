// import express
const express = require('express')
// import router into express
const router = express.Router()
// import car model
const Car = require('../models/car')

// Index
// Get /cars
router.get('/cars',(req,res,next)=>{
    Car.find({})
    .then(cars=>{
        res.status(200).json({cars:cars})
    })
    .catch(next)
})

// Create
// POST /cars
router.post('/cars', (req,res,next)=>{
    const newCar = req.body.car
    Car.create(newCar)
    .then(car=>{
        res.status(201).json({car:car})
    })
    .catch(next)
})

// SHOW
// GET /cars/:id
router.get('/cars/:id',(req,res,next)=>{
    carId = req.params.id
    console.log(carId)
    Car.findById(carId)
    .then(car=>{
        res.status(200).json({car:car})
    })
    .catch(next)
})

// UPDATE
// PATCH /cars/:id
router.patch('/cars/:id',(req,res,next)=>{
    const carId = req.params.id
    const updatedCar = req.body.car
    Car.findByIdAndUpdate(carId, updatedCar)
    .then(()=>{
        res.sendStatus(204)
    })
    .catch(next)
})
module.exports = router
