const user =  require("../Model/user")


const bcrypt =  require("bcrypt")

const jwt = require("jsonwebtoken")

const secretKey ="abcdefghijkl"



exports.main =  async(req,res)=>{

    const {email,password,role} =  req.body

    const alreadyEmail =  await user.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"user already exists"})
    }

    const salt   = bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(password,salt)

    const data= {
        email,password:hash,role
    }


        const result = new user(data)
        // const user_id = result.data.user_id

        // const abc = {
        //     email,password:hash,role,user_id
        // }
        // await abc.save()

        
        await result.save()
        return res.status(202).send({message:"main user  added",result})
    

}

// main login


exports.mlogin =  async(req,res) =>{

    const {email,password,role} =  req.body

    const alreadyEmail =  await user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not  exists"})
    }

    const dbpassword = alreadyEmail.password

    const match =  bcrypt.compare(password,dbpassword)

    if(!match)
    {
        return res.status(404).send({message:"incorrect password"})
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '50h' })


    console.log(">>>token", token)

    if(!token)
    {
        return res.status(404).send({message:"token not generate"})
    }

    
    if(role === "superadmin")
    {

    return res.status(202).send({message:"login successfully",token})
    }

}

