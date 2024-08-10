const express = require('express');
const bcrypt = require('bcrypt');
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

//register new user
router.post('/register', async (req, res) => {
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

//user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ message: 'User does not exist!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        req.session.userId = user._id;
        return res.status(200).json({ message: 'You are authenticated' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


router.post('/logout' , (req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
