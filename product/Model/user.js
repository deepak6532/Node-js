const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    pid:{
        type:String,
        require:true
        
    },
    name:{
        type:String,
        require:true
    },
    category:{
        type: String,
        require:true
    },
    price:{
        type:String,
        require:true
    }

})



module.exports =  mongoose.model("user",userSchema)