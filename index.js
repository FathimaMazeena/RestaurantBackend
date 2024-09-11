const express = require ('express');
const mongoose = require ('mongoose');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const userRoutes = require ('./routes/user');
const serviceRoutes=require('./routes/service');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const reservationRoutes=require('./routes/reservation');
const offerRoutes=require('./routes/offer');
const menuRoutes=require('./routes/menu');
const locationRoutes=require('./routes/location');
const dishRoutes=require('./routes/dish');
const queryRoutes=require('./routes/query');
const cartRoutes = require('./routes/cart');

const bodyParser = require ('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

// //import Product from './models/product.model';
// const Product = require('./models/product.model');
// //import Category from './models/category.model';
// const Category = require('./models/category.model');

const connectToDatabase = require('./db'); // Import the database connection module
//set up express app
const app = express();

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:3000'],
    credentials: true
  }));


app.use(bodyParser.json());
app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));

// //connect to db
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("Connected to database");
//     app.listen(process.env.PORT, ()=>{
//         console.log("Server is running on port", process.env.PORT);
        
//     });
        
// })
// .catch((error)=>{
//     console.log("Connection failed!", error);
// });

//configure session store

connectToDatabase().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port', process.env.PORT);
    });
}).catch(error => {
    console.error('Server startup failed:', error);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions' }),
}));

// // Configure session for admin
// const adminSession = session({
//     name: 'admin.sid',
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }, // 2 hours
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGO_URI,
//         collectionName: 'admin-sessions' // Use a different collection for admin sessions
//     })
// });

// // Configure session for client
// const customerSession = session({
//     name: 'customer.sid',
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 2 }, // 2 hours
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGO_URI,
//         collectionName: 'customer-sessions' // Use a different collection for client sessions
//     })
// });

//image storage engine
const storage = multer.diskStorage({
    destination: './images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/images', express.static('/images'));
const upload = multer({storage: storage});

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

app.post("/upload-menu", upload.single('menu'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})


//middleware to authticate users
const isAuth=(req, res, next)=>{

    if(req.session.isAuth){
        next();
    }else{
        res.status(401).json({ message: 'You are not authenticated' });
    }

};

//middleware to authenticate admin
const isAdmin = (req, res, next) => {
    if (req.session.isAuth && req.session.userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

// const isCustomer = (req, res, next) => {
//     if (req.session.isAuth && req.session.userRole === 'customer') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Forbidden' });
//     }
// };


app.get('/', (req, res) => {
    //req.session.isAuth=true;
    //console.log(req.session);
    res.send('Session storage with MongoDB Atlas!');
});

//initialize routes
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', reservationRoutes);
app.use('/api', offerRoutes);
app.use('/api', menuRoutes);
app.use('/api', locationRoutes);
app.use('/api', dishRoutes);
app.use('/api',queryRoutes);
app.use('/api', cartRoutes);
//app.use('/admin', isAdmin, adminSession); // Apply admin session middleware to admin routes
//app.use('/customer', isCustomer, customerSession); // Apply client session middleware to client routes



// app.get('/', (req,res)=>{
// res.send({name:'mazeena'});
// });

module.exports = { isAuth, isAdmin};
module.exports = mongoose;


