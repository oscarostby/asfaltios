const mongoose = require('mongoose');

const mongodb_uri = process.env.MONGODB_URI;

const DB = () => {
    mongoose.connect(mongodb_uri)
        .then(console.log('mongo conect'))
        .catch(err => console.log(err))
        .finally(console.log('DB connection process done'))
};


module.exports = DB;