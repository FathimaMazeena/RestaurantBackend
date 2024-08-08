const express = require('express');
const router = express.Router();
const Cart=require('../models/cart.model');



//TODO view my cart by customer


//add products to the cart by the customer
router.post('/cart', async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding the item to the cart', error: error.message });
    }
});


//TODO update product quantity of cart items by customer
router.put('/cart/:id', (req, res)=>{
    Cart.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Cart.findOne({_id:req.params.id}).then(function(cart){
            res.send(cart);
        });
        
    });
});

//delete cart items by the customer
router.delete('/cart/:id', (req, res)=>{
    Cart.findByIdAndDelete({_id:req.params.id}).then(function(cart){
        res.send(cart);
    });
});


module.exports=router;