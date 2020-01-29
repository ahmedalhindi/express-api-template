// import express
const express = require('express')
// import router into express
const router = express.Router()
// import car model
const Car = require('../models/car')

// import custom errors
const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership


// import passport
const passport = require('passport')
// JWT
const requireToken = passport.authenticate('bearer', {session: false})


// Index
// Get /cars
router.get('/cars',requireToken,(req,res,next)=>{
    const ownerId = req.user._id
    Car.find({'owner': ownerId})
    .then(cars=>{
        res.status(200).json({cars:cars})
    })
    .catch(next)
})

// Create
// POST /cars
router.post('/cars', requireToken, (req,res,next)=>{
    const ownerId = req.user._id
    const newCar = req.body.car
    newCar.owner = ownerId
    Car.create(newCar)
    .then(car=>{
        res.status(201).json({car:car})
    })
    .catch(next)
})

// SHOW
// GET /cars/:id
router.get('/cars/:id',requireToken,(req,res,next)=>{
    carId = req.params.id
    Car.findById(carId)
    .then(car=>{
        requireOwnership(req, car)
        res.status(200).json({car:car})
    })
    .catch(next)
})

// UPDATE
// PUT -> Large data
// PATCH -> small data
// PATCH /cars/:id
router.patch('/cars/:id',requireToken, (req,res,next)=>{
    const carId = req.params.id
    const updatedCar = req.body.car
    Car.findById(carId)
    .then((car)=>{
        requireOwnership(req,car)
        return car.update(updatedCar)
    })
    .then(()=> res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE  /cars/:id
router.delete('/cars/:id',requireToken,(req, res, next)=>{
    const carId = req.params.id
    Car.findById(carId)
    .then((car)=>{
        requireOwnership(req,car)
        return car.remove()
    })
    .then(()=>res.sendStatus(204))
    .catch(next)
})
module.exports = router
