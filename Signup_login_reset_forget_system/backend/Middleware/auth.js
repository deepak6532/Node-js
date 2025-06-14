const jwt = require("jsonwebtoken")
const user = require("../Model/user")
const secretKey = "abcdefghijklmnopqrstuvwxyz"

module.exports = async(req,res,next)=>{
    // console.log(">>req>>>",req.headers.authorization);

    const bearerToken = req.headers.authorization

    console.log("............",bearerToken)

    if(!bearerToken)
    {
        return res.status(404).send({message:"Token not provide"})
    }


    const token = bearerToken.split(" ")[1]

    console.log(">>>>>>token:",token)

    if(!token)
    {
        return res.status(404).send({message:"invalid token"})
    }


    const decode  =  jwt.verify(token,secretKey)

    console.log(">>>>decode:",decode)

    if(!decode)
    {
        return res.status(404).send({message:"user not found"})
    }

    const email = decode.email

    const userDetail = await user.findOne({email})

   
    if(!userDetail)
    {
        return res.status(204).send({message:"User detail not found"})
        
    }

      console.log(">>>>>>userDetail>>>",userDetail)

      next()

}
