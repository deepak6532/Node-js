const user =  require("../Model/user")

const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

const secretKey = "abcdefghijklmnopqr"


exports.signup =  async (req,res) =>{

    const {name,email,password}  = req.body

    if(!(name && email && password))
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

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    const data =
    {
        name,email,password:hash,otp
    }
    const abc =  new user(data)
    await abc.save(data)

    return res.status(202).send({message:"singup success",data})

}

// login

exports.login = async (req,res) =>{

    const {email,password,otp}  = req.body

    const alreadyEmail  = await user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not exists"})
    }

    const dbpassword =  alreadyEmail.password
    const dbotp = alreadyEmail.otp

    // const salt = bcrypt.genSaltSync(10)
    // const hash = bcrypt.hashSync(dbpassword,salt)

    const match =await  bcrypt.compare(password,dbpassword)


    if(!match)
    {
        return res.status(404).send({message:"password incorrect "})
    }

    const token =  jwt.sign({email},secretKey)


  
    if(otp === dbotp)
    {
        return res.status(202).send({message:"Login success",token})
    }
    else
    {
        return res.status(404).send({message:"otp incorrect try again!"})
    }
}


// reset


exports.reset =  async(req,res)=>{

    const {email,OldPassword,NewPassword} = req.body

    const alreadyEmail =  await user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not exists"})
    }

    const dbpassword = alreadyEmail.password
    const id = alreadyEmail._id



    const match = await bcrypt.compare(OldPassword,dbpassword)

    if(!match)
    {
        return res.status(404).send({message:"Old Password does not match "})
    }

    const salt =  bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(NewPassword,salt)
    const data = {
        password:hash
    }

    const result = await user.findByIdAndUpdate(id,data,{new:true})
    
    console.log(">>>>>>>>>>result>>",result)
    return res.status(202).send({message:"Reset password successfully ",result })

}

// forgot


exports.forgot  = async(req,res)=>{

    const {email,NewPassword,otp} = req.body

    const alreadyEmail =  await user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"User not found"})
    }

    const dbotp  =  alreadyEmail.otp
    const id = alreadyEmail._id

    if(otp === dbotp)
    {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(NewPassword,salt)

        const data ={
            password:hash
        }

        const result =  await user.findByIdAndUpdate(id,data,{new:true})

        return res.status(202).send({message:"forgot successfully",result})
    }
    else
    {
        return res.status(404).send({message:"otp incorrect!"})
    }


}



// update

exports.update = async (req,res) =>{

    // const data = req.body
    const id = req.body._id
    const userData = await user.findById(id)

    const password =  userData.password

     const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const data ={
            password:hash
        }

    const result = await user.findByIdAndUpdate(id,data,{new:true})
    return res.status(404).send({message:"update succesfull ",result})
}

// delete record


exports.delete = async (req,res) =>{

    const id = req.body._id
    const result = await user.findByIdAndDelete(id)
    return res.status(202).send({message:"Delete Successfully!"}) 
}