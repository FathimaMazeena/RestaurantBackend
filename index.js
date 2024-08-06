const express = require ('express');
const mongoose = require ('mongoose');
const userRoutes = require ('./routes/user');
const serviceRoutes=require('./routes/service');
const bodyParser = require ('body-parser');

//set up express app
const app = express();

app.use(bodyParser.json());

//initialize routes
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);

// app.get('/', (req,res)=>{
// res.send({name:'mazeena'});
// });

mongoose.connect("mongodb+srv://fathimamazeenamycloudcubicle:SZYJLZSnWKEDGwUy@cluster0.peyi7i6.mongodb.net/divine-dining-restaurant?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to database");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
        
    });
        
})
.catch(()=>{
    console.log("Connection failed!");
});
