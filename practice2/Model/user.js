
const mongoose  = require("mongoose")


const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    phone:{
        type:String,
        require:true,
        unique:true
    },
    otp:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

},{timestamps: true,versionKey:false})

const user = mongoose.model("user",userSchema)

module.exports = user