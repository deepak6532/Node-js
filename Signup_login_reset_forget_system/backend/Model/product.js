const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

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
        ref: 'user'                             //user.js m database name "user"
    },
    photo:{
        type:String,
        require:false
    }

}) 


module.exports = mongoose.model("product",ProductSchema)