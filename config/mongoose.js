require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL_NODE)
}

module.exports = connectDB;