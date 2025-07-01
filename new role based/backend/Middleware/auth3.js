const jwt =  require("jsonwebtoken")

const employee = require("../Model/employee")

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

    const employeeDetail =  await employee.findOne({email})

    if(!employeeDetail)
    {
        return res.status(404).send({message:"employee detail not found"})
    }

    req.employeeDetail = employeeDetail


    next()

}