const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"

    }
    
},{timestamps:true});

const product = mongoose.model("product",productSchema)

module.exports = product