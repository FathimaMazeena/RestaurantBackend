const express = require('express');
const router = express.Router();
const Location=require('../models/location.model');

router.get('/locations', (req,res)=>{
    Location.find({}).then(function(locations){
        res.send(locations);
    });

});
//Add new menu by the admin
router.post('/locations', async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Error adding location', error: error.message });
    }
});
//update menu by admin (active status and other information)
router.put('/locations/:id', (req, res)=>{
    Location.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Location.findOne({_id:req.params.id}).then(function(location){
            res.send(location);
        });
        
    });
});
//delete menu by admin
router.delete('/locations/:id', (req, res)=>{
    Location.findByIdAndDelete({_id:req.params.id}).then(function(location){
        res.send(location);
    });
});


module.exports=router;