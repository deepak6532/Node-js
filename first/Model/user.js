const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

     name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true, // Ensure email is unique
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
        require:true
    },
    time:{
        type:Date,
        require:true
        
    }

},
{ timestamps:true,versionKey:false}  
// timstamp is use to add the created time and updated time 
// and versionkey  is use to remove the v_0 in my data 
)

module.exports = mongoose.model("user",UserSchema);