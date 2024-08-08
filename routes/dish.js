const express = require('express');
const router = express.Router();
const Dish=require('../models/dish.model');


//view all dishs
router.get('/dishes', (req,res)=>{
    Dish.find({}).then(function(dishes){
        res.send(dishes);
    });

});


//Add a new dish by admin
router.post('/dishes', async (req, res) => {
    try {
        const dish = await Dish.create(req.body);
        res.status(201).json(dish);
    } catch (error) {
        res.status(500).json({ message: 'Error adding dish', error: error.message });
    }
});


//update dish details by admin
router.put('/dishes/:id', (req, res)=>{
    Dish.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Dish.findOne({_id:req.params.id}).then(function(dish){
            res.send(dish);
        });
        
    });
});

//Delete dish by admin
router.delete('/dishes/:id', (req, res)=>{
    Dish.findByIdAndDelete({_id:req.params.id}).then(function(dish){
        res.send(dish);
    });
});

module.exports=router;