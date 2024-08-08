const express = require('express');
const router = express.Router();
const Product=require('../models/product.model');

router.get('/products', (req,res)=>{
    Product.find({}).then(function(products){
        res.send(products);
    });

});

router.post('/products', async (req, res) => {
    
    try {
        const product = await Product.create(req.body);
        console.log('Service created:', product); 
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error); 
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

router.delete('/products/:id', (req, res)=>{
    Product.findByIdAndDelete({_id:req.params.id}).then(function(product){
        res.send(product);
    });
});

router.put('/products/:id', (req, res)=>{
    Product.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Product.findOne({_id:req.params.id}).then(function(product){
            res.send(product);
        });
        
    });
});

module.exports=router;