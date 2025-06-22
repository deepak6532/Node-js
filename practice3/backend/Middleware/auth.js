const user =  require("../Model/user")
const jwt = require("jsonwebtoken")
const secretKey = "asdfghjklzxcvbnm"

module.exports =  async(req,res,next) =>{

    const btoken  = req.headers.authorization

    if(!btoken)
    {
        return res.status(404).send({message:"Bearer token not provide "})
    }

    const token =  btoken.split(" ")[1]

    if(!token)
    {
        return re.status(404).send({message:"token not provide"})
    }

    const decode =  jwt.verify(token,secretKey)

    if(!decode)
    {
        return res.status(404).send({message:"token not verify"})
    }

    const email =  decode.email

    const userDetail =  await user.findOne({email})

    if(!userDetail)
    {
        return res.status(404).send({message:"user dertail not found"})
    }

    req.userDetail = userDetail

    next()
}
