const client =  require("../Model/client")

const employee =  require("../Model/employee")

const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey ="abcdefghijkl"

// const auth  = require("../Middleware/auth")


exports.clientsignup = async(req,res) =>{

    const uid  = req.employeeDetail

    console.log("userDetail",uid)


    const {name,email,password,role} =  req.body

     const alreadyEmail =  await client.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"user already exists"})
    }

    const salt   = bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(password,salt)

    const data= {
       name,email,password:hash,role,super_id:uid
    }


        const result = new client(data)
        const clientData  = await result.save()

        console.log(">>>>>>>>clientData ",clientData)

        const employeeData =  {

            name,email,password,role,client_id:clientData._id
        }
        const abc = new employee(employeeData)

        await abc.save()


        return res.status(202).send({message:"client signup success ",clientData,abc})
}



// client login


exports.clientlogin =  async(req,res)=>{

    
    const {email,password,role} =  req.body

    const alreadyEmail =  await client.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"client not  exists"})
    }

    const dbpassword = alreadyEmail.password
    // const dbrole =  alreadyEmail.role                   //new 

    const match =  bcrypt.compare(password,dbpassword)

    if(!match)
    {
        return res.status(404).send({message:"incorrect password"})
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '80h' })


    console.log(">>>token", token)

    if(!token)
    {
        return res.status(404).send({message:"token not generate"})
    }

   
    return res.status(202).send({message:" client login successfully",alreadyEmail,token})
    

}


// get clients

exports.getclient  = async(req,res) =>{


    const data = await client.find()

    return res.status(202).send(data)
}
