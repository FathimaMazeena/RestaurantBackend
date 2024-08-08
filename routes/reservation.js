const express = require('express');
const router = express.Router();
const Reservation=require('../models/reservation.model');


//View reservations by admin
router.get('/reservations', (req,res)=>{
    Reservation.find({}).then(function(reservations){
        res.send(reservations);
    });

});

//TODO view resrvations by customer


//Make a reservation by customer
router.post('/reservations', async (req, res) => {
    
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error making reservation', error: error.message });
    }
});



//TODO update a reservation by the customer
router.put('/reservations/:id', (req, res)=>{
    Reservation.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Reservation.findOne({_id:req.params.id}).then(function(reservation){
            res.send(reservation);
        });
        
    });
});

//TODO cancel a reservation by the customer


module.exports=router;