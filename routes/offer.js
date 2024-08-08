const express = require('express');
const router = express.Router();
const Offer=require('../models/offer.model');


//view all offers by user
router.get('/offers', (req,res)=>{
    Offer.find({}).then(function(offerss){
        res.send(offers);
    });

});




//add new offer by admin
router.post('/offers', async (req, res) => {
    try {
        const offer = await Offer.create(req.body);
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error adding offer', error: error.message });
    }
});


//TODO update offer (extend, change discount inactivate ) by admin
router.put('/offers/:id', (req, res)=>{
    Offer.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Offer.findOne({_id:req.params.id}).then(function(offer){
            res.send(offer);
        });
        
    });
});

//delete offer by admin
router.delete('/offers/:id', (req, res)=>{
    Offer.findByIdAndDelete({_id:req.params.id}).then(function(offer){
        res.send(offer);
    });
});




module.exports=router;