const mongoose = require('mongoose');

<<<<<<< Updated upstream
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);
=======
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> Stashed changes
