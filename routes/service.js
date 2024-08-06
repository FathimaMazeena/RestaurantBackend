const express = require('express');
const router = express.Router();
const Service=require('../models/service.model');

router.get('/services', (req,res)=>{
    Service.find({}).then(function(services){
        res.send(services);
    });

});

router.post('/services', async (req, res) => {
    console.log('Received POST request with body:', req.body); // Debug log
    try {
        const service = await Service.create(req.body);
        console.log('Service created:', service); // Debug log
        res.status(201).json(service);
    } catch (error) {
        console.error('Error creating service:', error); // Debug log
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
});

router.delete('/services/:id', (req, res)=>{
    Service.findByIdAndDelete({_id:req.params.id}).then(function(service){
        res.send(service);
    });
});

router.put('/services/:id', (req, res)=>{
    Service.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Service.findOne({_id:req.params.id}).then(function(service){
            res.send(service);
        });
        
    });
});

module.exports=router;