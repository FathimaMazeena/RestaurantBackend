const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

async function connectToDatabase() {
    if (isConnected) {
        console.log('Database already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); 
    }
}

module.exports = connectToDatabase;
