const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    discount :{
        type:String,
        require:true
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    },
    photo:{
        type:String,
        require:false
    }
})

const product = mongoose.model("product",productSchema)

module.exports  = product