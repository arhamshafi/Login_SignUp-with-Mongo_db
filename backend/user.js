

const mongoose = require('mongoose')



let user = new mongoose.Schema({
    username:String,
    email: String,
    password: String,
})  

module.exports = mongoose.model(  'user' , user )