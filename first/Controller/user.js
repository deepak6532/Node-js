const user = require('../Model/user')

const bcrypt = require("bcrypt")
const moment = require('moment')

const jwt   = require("jsonwebtoken")

const secreatKey = "abcdefghijklmnopqrstuvwxyz"

// exports.createUser = async(req,res)=>{
//     console.log("Show data",req.body);

//     try{
//     const {name,email,phone,password} = req.body;
//     const data =  req.body
//     const abc =  new user(data)
//     await abc.save()
//     return res.status(201).send(req.body)
//     }
//     catch(error)
//     {
//         res.status(500).send({error : error.message})
//     }

// }



exports.createUser = async (req, res) => {


    try {
        const { name, email, phone, password } = req.body;
        if (!(name && email && phone && password)) {
            return res.status(400).send({ error: "All fields are required" });
        }

        const alreadyEmail = await user.findOne({ email });
        const alreadyPhone = await user.findOne({ phone });


        console.log(">>>>>>>>>>>> already emmail", alreadyEmail);

        if (alreadyEmail && alreadyPhone) {
            return res.status(400).send({ message: "User already exists with this email and phone number" });
        }


        let otp = ""
        let length = 6
        for (let i = 0; i < length; i++) {
            const random = Math.floor(Math.random() * 10);
            otp += random;
        }
        console.log(otp);


        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
         const time = moment().format()               // save time
        const data = {
            name, email, phone, password: hash, otp,time
        }

        const abc = new user(data)
        await abc.save()
        return res.status(201).send(abc)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

}

// login api

exports.login = async (req, res) => {
    const { email, password, otp } = req.body
    const alreadyEmail = await user.findOne({ email })

    if (!alreadyEmail) {
        return res.status(404).send({ message: "please signup first " })

    }
    // console.log(">>>>>>>>>>>alreadyEmail",alreadyEmail)
    const dbpassword = alreadyEmail.password

    // jwt 
    const token = jwt.sign({email},secreatKey)

    console.log(">>>>Token",token)

    const match = await bcrypt.compare(password, dbpassword)

    // console.log(">.......match",match);
    // console.log(">.......!match",!match);

    if (!match) {
        return res.status(404).send({ message: "incorrect password " })

    }
    if (otp !== alreadyEmail.otp) {
        return res.status(404).send({ message: "incorrect otp Try agin!" })
    }
    else {
        return res.status(202).send({ message: "Login successfull" ,token})
    }
}


// reset password

exports.reset = async (req, res) => {

    const { email, oldPassword, newPassword } = req.body

    const alreadyEmail = await user.findOne({ email })
    const dbpassword = alreadyEmail.password
    const id = alreadyEmail._id

    if (!alreadyEmail) {
        return res.send(404).send({ message: "user not exists" })

    }

    const match = bcrypt.compare(oldPassword, dbpassword)

    if (!match) {
        return res.status(404).send({ message: "password not match" })
    }
    else {
       const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        const data = {
            password: hash
        }


        const abc = await user.findByIdAndUpdate(id, data, { new: true })
        
        return res.status(202).send({ messsage: "update password", abc })



    }
}

// forgot password
exports.forgot = async(req,res) =>{

    const {email ,newPassword}   = req.body

    const alreadyEmail  = await user.findOne({email})
    const id = alreadyEmail._id

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not exists"})
    }
    else
    {
        const salt = bcrypt.genSaltSync(10)
        const hash  = bcrypt.hashSync(newPassword,salt)
        const data = {
            password: hash
            
        }
         const abc = await user.findByIdAndUpdate(id, data, { new: true })
        return res.status(202).send({ messsage: " password changed", abc })


    }


}










// get all data
exports.getall = async (req, res) => {
    try {
        const data = await user.find()
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send("error getting")
    }
}

// create api to get data from database using id 

exports.getone = async (req, res) => {
    try {

        const { id } = req.params
        const data = await user.findById(id)

        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send("error getting")

    }
}

// get query

exports.getquery = async (req, res) => {
    try {
        // const {id} = req.query
        // const data = await user.findById(id)

        const { id, email } = req.query
        const data = await user.findOne({ _id: id, email: email })
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}





// Dob 

// exports.getyear = async(req,res)=>{
    

//     const {Dob} = req.body

//     const year = moment(Dob, "YYYYMMDD").fromNow();
//     const month = moment().fromNow('');

    

//     console.log(">>>>>>>>",year)
//     console.log(">>>>>>>>month: ",month)


    
// }


// update data

exports.update =async(req,res) =>{
    
    const id = req.body._id
    const data = req.body

    const abc = await user.findByIdAndUpdate(id,data,{new:true})
    console.log(">>>>result",data)
    return res.status(202).send(abc)
}


// delete data

exports.delete = async(req,res) =>{
    const {id} =  req.query
    const data = await user.findByIdAndDelete(id)
    return res.status(202).send(data)

}