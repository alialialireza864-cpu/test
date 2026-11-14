const mongoose = require('mongoose')
require("../config/db")
const userModel = mongoose.model("users", {
  name:{
    type:String,
    required:true,
    minLength:3,
    maxLength:15
  },
  userName:{
    type:String,
    required:true,
    minLength:3,
  },
  age:{
    type:Number,
    min:18,
    required:false

  },
  crime:{
    type:Number,
    default:0,
    required:false
  },
  role:{
    type:String,
    default:"USER",
    required:false
  }

})
module.exports = userModel