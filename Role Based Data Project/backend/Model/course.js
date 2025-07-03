const mongoose = require("mongoose")

const courseSchema =  new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    emp_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"employee"
    },
    client_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"client"
    }

},{timestamps:true})

const course  = mongoose.model("course",courseSchema)

module.exports =  course

