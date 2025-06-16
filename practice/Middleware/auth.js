const jwt = require("jsonwebtoken")

const user = require("../Model/user")

const secretKey = "abcdefghijklmnopqr"

module.exports = async (req,res,next) =>{

    const btoken = req.headers.authorization

    if(!btoken)
    {
        return res.status(404).send({message:"bearer token not provide"})
    }

    const token =  btoken.split(" ")[1]

    if(!token)
    {
          return res.status(404).send({message:"invalid token"})

    }

    const decode = jwt.verify(token,secretKey)

    if(!decode)
    {
          return res.status(404).send({message:"Can't verify user  "})
    }

    const email = decode.email
    const userDetail =  await user.findOne({email})

    if(!userDetail)
    {
          return res.status(404).send({message:"user detail  not found"})
    }

    // client specific data
    req.userDetail = userDetail

    next()
}