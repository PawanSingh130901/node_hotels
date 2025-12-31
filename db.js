const mongoose=require('mongoose');
require('dotenv').config();

//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//setup mongo db connection
mongoose.connect(mongoURL);
const db=mongoose.connection;

db.on('connected',() => {
    console.log('connected to mongoDB server');
});

db.on('error',(err) => {
    console.log('connected to mongoDB server',err);
});

db.on('disconnected',() => {
    console.log('disconnected to mongoDB server');
});

module.exports = db;