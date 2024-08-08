const express = require('express');
const router = express.Router();
const Category=require('../models/category.model');

router.get('/categories', (req,res)=>{
    Category.find({}).then(function(categories){
        res.send(categories);
    });

});

router.post('/categories', async (req, res) => {
    
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
});

router.delete('/categories/:id', (req, res)=>{
    Category.findByIdAndDelete({_id:req.params.id}).then(function(category){
        res.send(category);
    });
});

router.put('/categories/:id', (req, res)=>{
    Category.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Category.findOne({_id:req.params.id}).then(function(category){
            res.send(category);
        });
        
    });
});

module.exports=router;