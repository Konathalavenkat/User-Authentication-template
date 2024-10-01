const mongoose = require('mongoose');
const {ConnectionURL} = require('../config/keys');

const ConnectMongoDb = async () => {
    try{
        await mongoose.connect(ConnectionURL);
        console.log('Connected to MongoDB');

    }
    catch(error){
        console.log('Error connecting to MongoDB:', error.message);
    }
}

module.exports = ConnectMongoDb;