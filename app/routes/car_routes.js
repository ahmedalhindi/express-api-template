// import express
const express = require('express')
// import router into express
const router = express.Router()
// import car model
const Car = require('../models/car')


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
router.get('/cars/:id',(req,res,next)=>{
    carId = req.params.id
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

// DESTROY
// DELETE  /cars/:id
router.delete('/cars/:id',(req, res, next)=>{
    const carId = req.params.id
    Car.findByIdAndRemove(carId)
    .then(()=>{
        res.sendStatus(204)
    })
    .catch(next)
})
module.exports = router
