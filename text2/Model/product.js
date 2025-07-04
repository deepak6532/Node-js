const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    user_id:{
        type: mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    }

})

module.exports =  mongoose.model("product",productSchema)