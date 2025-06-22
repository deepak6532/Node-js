const mongoose = require("mongoose")


const userSchema =  mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        requie:true
    },
    otp:{
        type:String,
        require:true
    }
},{timstamps:true})


const user  = mongoose.model("user",userSchema)

module.exports = user