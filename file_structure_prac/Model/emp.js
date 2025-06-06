const mongoose  = require("mongoose")

const employeeSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
    
})

const emp = mongoose.model("emp",employeeSchema)


module.exports = emp;