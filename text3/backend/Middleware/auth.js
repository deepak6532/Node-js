const jwt =  require("jsonwebtoken")
const user  =  require("../Model/user")

const secretKey  = "asdfghjklmnbvcxz"


module.exports = async (req,res,next)=>{

    const btoken = req.headers.authorization
    console.log("Authorization Header:", req.headers.authorization);


    if(!btoken)
    {
        return res.status(404).send({message:"BearerToken not found"})
    }

    const token =  btoken.split(" ")[1]

    if(!token)
    {
        return res.status(404).send({message:"token not found"})
    }

    const decode =  jwt.verify(token,secretKey)

    if(!decode)
    {
        return res.status(404).send({message:"token not verify"})
    }

    const email = decode.email

    const userDetail =  await user.findOne({email})

    if(!userDetail)
    {
        return res.status(404).send({message:"user detail not found"})
    }

    req.userDetail = userDetail

    next()

}