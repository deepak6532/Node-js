const jwt =  require("jsonwebtoken")

const client = require("../Model/client")



const secretKey ="abcdefghijkl"


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

   const clientDetail = await client.findOne({ email });

    if(!clientDetail)
    {
          return res.status(404).send({message:"client  not found"})

    }
   

    req.clientDetail =   clientDetail;


    next();

}