const mongoose =  require("mongoose")



const employeeSchema  = new mongoose.Schema({

    name:{
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
    },
    role:{
        type:String,
        require:true
    },
    client_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"client"
    }
})

const employee =  mongoose.model("employee",employeeSchema)

module.exports = employee