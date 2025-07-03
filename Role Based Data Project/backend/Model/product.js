const mongoose = require("mongoose")


const productSchema =  mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    client_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"client"
    },
    emp_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"employee"
    }
    // ,
    // super_id:{
    //     type:mongoose.Schema.ObjectId,
    //     require:false,
    //     ref:"user"
    // }
   


},{timstamps:true})


const product  = mongoose.model("product",productSchema)

module.exports = product