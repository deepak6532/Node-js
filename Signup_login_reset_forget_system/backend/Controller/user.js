const user = require("../Model/user")
const bcrypt = require("bcrypt")

const moment =  require("moment")
const jwt =  require('jsonwebtoken')


const secretKey = "abcdefghijklmnopqrstuvwxyz"

exports.signup = async (req, res) => {

    const { name, phone, email, password ,salary} = req.body
    if (!(name && phone && email && password)) {
        return res.status(500).send("plese fill all field")
    }
    const alreadyEmail = await user.findOne({ email })

    if (alreadyEmail) {
        return res.status(400).send({ message: "Email already exists" });
    }
    let otp = ""
    let length = 4
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 10);
        otp += random;
    }
    // console.log(">>>>>>>>otp ",otp)


    const time = moment().format();


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    try {
        const data = { name, phone, email, password: hash, otp,time,salary }
        const abc = new user(data)
        await abc.save()
        return res.status(202).send({message:"Signup success"},abc)

    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

}




// login 

exports.login = async (req, res) => {

    const { email, password, otp } = req.body

    const alreadyEmail = await user.findOne({ email })

    const otpTime  = alreadyEmail.time

    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists " })
    }

    const dpassword = alreadyEmail.password
    const dbotp = alreadyEmail.otp
 
    // jwt
    const token = jwt.sign({email},secretKey,{ expiresIn: '1h' })

    
    console.log(">>>token",token)

    const match = await bcrypt.compare(password, dpassword)

    if (!match) {

       
        return res.status(404).send({ message: "incorrect password" })
    }
    if (otp === dbotp) {

      const current = moment();
        const validTime = current.diff(otpTime,"minutes")
        console.log(">>>>>>.res",validTime );
        if(validTime > 10)
        {
            return res.status(404).send({message:"Otp Expire"})
        }

        return res.status(202).send({ message: "Login successfull",token })


        
    }
    else {

         return res.status(404).send({ messsage: "incorrect otp try again" })
    }


}


  


// reset

exports.reset = async (req, res) => {

    const { email, oldPassword, newPassword } = req.body

    const alreadyEmail = await user.findOne({ email })

    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists" })

    }

    const dpassword = alreadyEmail.password
    const id = alreadyEmail._id

    const match = bcrypt.compare(oldPassword, dpassword)

    if (!match) {
        return res.status(404).send({ message: "old password does not match" })
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        const data = {
            password: hash
        }
        const abc = await user.findByIdAndUpdate(id, data, { new: true })

        return res.status(202).send({ message: "update successull", abc })
    }
}



// forgot password

// forgot password
exports.forgot = async(req,res) =>{

    const {email ,newPassword,otp}   = req.body

    const alreadyEmail  = await user.findOne({email})
    

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not exists"})
    }
    else if(otp === alreadyEmail.otp)
    {
        const id = alreadyEmail._id
        const salt = bcrypt.genSaltSync(10)
        const hash  = bcrypt.hashSync(newPassword,salt)
        const data = {
            password: hash
            
        }
        const abc = await user.findByIdAndUpdate(id, data, { new: true })
        return res.status(202).send({ message: "forgot password sucecessfull", abc })


    }
    else{
        return res.status(404).send({message:"plese chek you email and otptry again! "})
    }


}


// getall

exports.getuserdata  = async(req,res) =>{

    try{
        const data = await user.find()
    // console.log(data)
    return res.status(202).send(data)
    }
    catch(err){
        return res.status(404).send({message:"error not solve getall"})

    }
}



// salary

exports.salary = async (req,res)=>{

    const data = await user.find({ salary: { $gte: 100000 }})

    if(data.length===0)
    {
        return res.status(404).send({message :"no user found "})
    }


    {
        data.map((u)=>{
            return res.status(202).send(u.name)
        })
    }
    
    // return res.status(202).send({data})

}