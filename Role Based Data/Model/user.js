const mongoose = require("mongoose")


const userSchema =  mongoose.Schema({

   
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
    }
    
},{timstamps:true})


const user  = mongoose.model("user",userSchema)

module.exports = user