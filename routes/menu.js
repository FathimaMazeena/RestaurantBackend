const express = require('express');
const router = express.Router();
const Menu=require('../models/menu.model');


//view all menus
router.get('/menus', (req,res)=>{
    Menu.find({}).then(function(menus){
        res.send(menus);
    });

});



//Add new menu by the admin
router.post('/menus', async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu', error: error.message });
    }
});


//update menu by admin (active status and other information)
router.put('/menus/:id', (req, res)=>{
    Menu.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Menu.findOne({_id:req.params.id}).then(function(menu){
            res.send(menu);
        });
        
    });
});

//delete menu by admin
router.delete('/menus/:id', (req, res)=>{
    Menu.findByIdAndDelete({_id:req.params.id}).then(function(menu){
        res.send(menu);
    });
});


module.exports=router;