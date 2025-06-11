const jwt = require("jsonwebtoken")

module.exports = async(req,res,next)=>{
    console.log(">>req>>>",req.header.authorization);

    const bearerToken = req.header.authorization

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


    const decode  =  jwt.verify(token,secretkey)

    console.log(">>>>decode:",decode)
}
