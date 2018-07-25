const mongoose = require('mongoose')  
const UserSchema = new mongoose.Schema({  
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
})
mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')