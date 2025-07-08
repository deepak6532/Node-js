const user =  require("../Model/user")

const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

const secretKey = "abcdefghijklmnopqr"

const nodemailer =  require("nodemailer")


exports.signup =  async (req,res) =>{

    const {name,email,password}  = req.body

    if(!(name || email || password))
    {
        return res.status(404).send({message:"All filed are required"})
    }

    const alreadyEmail =  await user.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"USer already exists"})
    }

    let otp =""
    const length =4
    for(let i =0;i<length;i++)
    {
        let random = Math.floor(Math.random() *10)
        otp+=random
    }



    const transporter =  nodemailer.createTransport({
        host:"smtp.gmail.com",
        auth:{
            user:process.env.Email,
            pass:process.env.password
        }
    })



    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    const data =
    {
        name,email,password:hash,otp
    }
    const abc =  new user(data)
    await abc.save(data)

    const info = await transporter.sendMail({
        from:process.env.Email,
        to:"agrawaldeepak9731@gmail.com",
        subject:"Sing up success",
        text:  `signup success ${otp}`
        
    })

    return res.status(202).send({message:"signup success",data})

}