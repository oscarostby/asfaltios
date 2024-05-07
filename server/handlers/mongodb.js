const mongoose = require('mongoose');

const DB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log('mongo conect'))
        .catch(err => console.log(err))
        .finally(console.log('DB connection process done'))
};


module.exports = DB;

//not in use // !!!
