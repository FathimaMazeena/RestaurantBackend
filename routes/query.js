const express = require('express');
const router = express.Router();
const Query=require('../models/query.model');

//view queries by admin and staff
router.get('/queries', (req,res)=>{
    Query.find({}).then(function(queries){
        res.send(queries);
    });

});

//TODO View queries by customer


//TODO Post query message by user
router.post('/queries', async (req, res) => {
    
    try {
        const query = await Query.create(req.body);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error sending query', error: error.message });
    }
});

//TODO post query message by admin and staff
router.post('/queries', async (req, res) => {
    
    try {
        const query = await Query.create(req.body);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ message: 'Error sending query', error: error.message });
    }
});

//TODOupdate query message by user
router.put('/queries/:id', (req, res)=>{
    Query.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Query.findOne({_id:req.params.id}).then(function(query){
            res.send(query);
        });
        
    });
});

//TODOupdate query message by admin and staff
router.put('/queries/:id', (req, res)=>{
    Query.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Query.findOne({_id:req.params.id}).then(function(query){
            res.send(query);
        });
        
    });
});






// router.delete('/services/:id', (req, res)=>{
//     Service.findByIdAndDelete({_id:req.params.id}).then(function(service){
//         res.send(service);
//     });
// });



module.exports=router;