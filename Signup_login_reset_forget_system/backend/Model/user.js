const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    phone:{
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
    otp:{
        type:String
    },
    time:{
        type:Date
   
    },
    // salary:{
    //     type:Number,
    //     require:true
    // }


},{timestamps:true})

const user = mongoose.model("user",userSchema)


module.exports = user;