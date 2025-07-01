const mongoose =  require("mongoose")



const clientSchema  = new mongoose.Schema({

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
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    }
})

const client =  mongoose.model("client",clientSchema)

module.exports = client