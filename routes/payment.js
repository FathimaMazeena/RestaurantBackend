const express = require('express');
const router = express.Router();
const Payment=require('../models/payment.model');


//view payments by admin
router.get('/payments', (req,res)=>{
    Payment.find({}).then(function(payments){
        res.send(payments);
    });

});

//TODO view my payments





//TODO update payment status by admin
router.put('/payments/:id', (req, res)=>{
    Payment.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Payment.findOne({_id:req.params.id}).then(function(payment){
            res.send(payment);
        });
        
    });
});



module.exports=router;