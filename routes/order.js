const express = require('express');
const router = express.Router();
const Order=require('../models/order.model');


//view all orders by admin
router.get('/orders', (req,res)=>{
    Order.find({}).then(function(orders){
        res.send(orders);
    });

});

//view my orders

//place an order by the customer
router.post('/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});


//update(cancel) order by customer
router.put('/orders/:id', (req, res)=>{
    Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Order.findOne({_id:req.params.id}).then(function(order){
            res.send(order);
        });
        
    });
});

//update order status by admin
router.put('/orders/:id', (req, res)=>{
    Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Order.findOne({_id:req.params.id}).then(function(order){
            res.send(order);
        });
        
    });
});

module.exports=router;