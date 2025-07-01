const client =  require("../Model/client")

const bcrypt =  require("bcrypt")

const jwt = require("jsonwebtoken")

const secretKey ="abcdefghijkl"

// const auth  = require("../Middleware/auth")


exports.clientsignup = async(req,res) =>{

    const uid  = req.userDetail._id


    const {name,email,password} =  req.body

     const alreadyEmail =  await client.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"user already exists"})
    }

    const salt   = bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(password,salt)

    const data= {
       name,email,password:hash,user_id:uid
    }


        const result = new client(data)
        await result.save()
        return res.status(202).send({message:"client signup success ",result})
}



// client login


exports.clientlogin =  async(req,res)=>{

    
    const {email,password} =  req.body

    const alreadyEmail =  await client.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"client not  exists"})
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


    return res.status(202).send({message:" client login successfully",token})
    

}


// get clients

exports.getclient  = async(req,res) =>{

    const data = await client.find()

    return res.status(202).send(data)
}
