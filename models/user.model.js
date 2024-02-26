// user.model.js
const mongoose = require('mongoose');
// Declare the Schema of the Mongo model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the model
const NewUser =mongoose.model('User', userSchema);
module.exports = NewUser;




// const hh = NewUser();



