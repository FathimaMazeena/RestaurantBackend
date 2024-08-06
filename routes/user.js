const express = require('express');
const router = express.Router();
const User=require('../models/user.model');


/*router.post('/users' , (req,res)=>{

    //var user=new User(req.body);
    //user.save();
    User.create(req.body).then((user)=>{

        res.send(user);
    });

    // try{
    //     const user= await User.create(req.body);
    // res.status(200).json(user)
    // } catch(error){
    //     res.status(500).json({message:error.message});
    // }
    
    // User.create(req.body)
    // .then(user => res.status(201).send(user))
    // .catch(error => res.status(400).send({ message: 'Error creating user', error }));

    
});*/


router.post('/users', async (req, res) => {
    console.log('Received POST request with body:', req.body); // Debug log
    try {
        const user = await User.create(req.body);
        console.log('User created:', user); // Debug log
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error); // Debug log
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});



module.exports=router;
