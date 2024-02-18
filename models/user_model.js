const mongoose = require('mongoose');


const userModel = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  source: String,
  verificationCode: {type: String},
  isVerified: {type: Boolean, default:false},
  passwordresetcode: String,
  creation_date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('Users', userModel);


module.exports = UserModel;