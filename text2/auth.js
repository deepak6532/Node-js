const jwt = require("jsonwebtoken")
const user = require("../Model/user")
const secretKey =  "abcdefghijklmnopq"

module.exports = async (req, res, next) => {


    const btoken = req.headers.authorization

    if (!btoken) {
        return res.status(404).send({ message: 'token not provide' })
    }

    const token = btoken.split(" ")[1]

    if (!token) {
        return res.status(404).send({ message: "token not found" })
    }

    const decode =  jwt.verify(token,secretKey)

    if(!decode)
    {
        return res.status(404).send({message:"token not verified"})
    }

    const email = decode.email

    const userDetail =  await user.findOne({email})

    req.userDetail = userDetail

    next()

}