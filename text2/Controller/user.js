const user =  require("../Model/user")

const bcrypt   = require("bcrypt")
const jwt = require("jsonwebtoken")

const secretKey =  "abcdefghijklmnopq"




exports.signup =  async(req,res) =>{

    const {name ,email,password,role} =  req.body

    if(!(name && email && password && role))
    {
        return res.status(404).send({message:"All field are required"})
    }

    const alreadyEmail  = await  user.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({mesage:"user already exists"})
    }

    let otp  = ""
    let length =  4
    for(let i= 0; i< length;i++)
    {
        let random = Math.floor(Math.random()*10)
        otp +=random
    }

    const salt =  bcrypt.genSaltSync(10)
    const hash  = bcrypt.hashSync(password,salt)

    const data =  {
        name,email,password:hash,otp,role
    }
    const result = new user(data)
    await result.save()
    return res.status(202).send({message:"signup success",result})

}


// Login

exports.login =  async(req,res) =>{

    const {email,password,otp} = req.body

     const alreadyEmail  = await  user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({mesage:"user not  exists"})
    }

    const dbpassword  =  alreadyEmail.password
    const dbotp =  alreadyEmail.otp

    

    const match  = await  bcrypt.compare(password,dbpassword)

    if(!match) {
        return res.status(404).send({message:"Incorrect password try again!"})
    }
    
    const token = jwt.sign({email},secretKey)


    if(otp === dbotp)
    {
        return res.status(202).send({message:"login successfully",token})
    }
    else
    {
        return res.status(404).send({message:"incorrect otp"})
    }
}