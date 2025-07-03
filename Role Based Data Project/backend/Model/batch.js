const mongoose =  require("mongoose")

const batchSchema =  new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    trainer:{
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
    // ,
    // course_id:{
    //     type:mongoose.Schema.ObjectId,
    //     require:true,
    //     ref:"course"
    // }
},{timestamps:true,versionKey:false})


const batch =  mongoose.model("batch",batchSchema)

module.exports =  batch