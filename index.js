const express = require ('express');
const mongoose = require ('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const userRoutes = require ('./routes/user');
const serviceRoutes=require('./routes/service');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const reservationRoutes=require('./routes/reservation');
const bodyParser = require ('body-parser');

//set up express app
const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to database");
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on port", process.env.PORT);
        
    });
        
})
.catch(()=>{
    console.log("Connection failed!", error);
});



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions' }),
}));

app.get('/', (req, res) => {
    req.session.isAuth=true;
    console.log(req.session);
    res.send('Session storage with MongoDB Atlas!');
});

app.use(bodyParser.json());

//initialize routes
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', reservationRoutes);

// app.get('/', (req,res)=>{
// res.send({name:'mazeena'});
// });


