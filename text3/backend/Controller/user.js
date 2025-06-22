const user  =  require("../Model/user")


const bcrypt  = require('bcrypt')
const jwt = require("jsonwebtoken")
// const nodemailer =  require("nodemailer")

const secretKey  = "asdfghjklmnbvcxz"



exports.signup =  async(req,res) =>{

    const {name,email,password,role} = req.body

    if(!(name && email && password && role))
    {
        return res.status(404).send({message:"all field are required"})
    }

    const alreadyEmail = await user.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"user already exists"})
    }

    let otp=""
    let length=  4
    for(let i=0;i<length;i++)
    {
        let random = Math.floor(Math.random()*10)
        otp +=random 
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    const data = {
        name ,email,password:hash,role,otp
    }

    const result = new user(data)
    await result.save()

    return res.status(202).send({message:"signup success",result})

}


// login api
exports.login = async (req, res) => {

    const { email, password, otp } = req.body

    const alreadyEmail = await user.findOne({ email })

    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists " })
    }

    const dpassword = alreadyEmail.password
    const dbotp = alreadyEmail.otp

    // jwt
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })


    console.log(">>>token", token)

    const match = await bcrypt.compare(password, dpassword)

    console.log(">>>>>>>match",match)

    if (!match) {
        return res.status(404).send({ message: "incorrect password" })
    }

    if (otp === dbotp) {

        console.log(">>>OTP >>>")
        return res.status(202).send({ message: "Login successfull",token})
    }
    else {

        return res.status(404).send({ message: "incorrect otp try again" })
    }


}
