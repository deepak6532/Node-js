const employee =  require("../Model/employee")

const bcrypt =  require("bcrypt")

const jwt = require("jsonwebtoken")

const secretKey ="abcdefghijkl"


exports.employeesignup  =async(req,res) =>{


    const uid =  req.clientDetail._id

    const {name,email,password,role} =  req.body
    
    const alreadyEmail =  await employee.findOne({email})

    if(alreadyEmail)
    {
        return res.status(404).send({message:"user already exists"})
    }

    const salt   = bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(password,salt)


    const data ={
        name,email,password:hash,role,client_id:uid
    }

    const result = new employee(data)
    await result.save()

    return res.status(202).send({message:"employye singup success",result})

}

// employee login

exports.employeelogin =  async(req,res) =>{



     const {email,password} =  req.body
    
        const alreadyEmail =  await employee.findOne({email})
    
        if(!alreadyEmail)
        {
            return res.status(404).send({message:"employee not  exists"})
        }
    
        const dbpassword = alreadyEmail.password
    
        const match =  bcrypt.compare(password,dbpassword)
    
        if(!match)
        {
            return res.status(404).send({message:"incorrect password"})
        }
    
        const token = jwt.sign({ email }, secretKey, { expiresIn: '5h' })
    
    
        console.log(">>>token", token)
    
        if(!token)
        {
            return res.status(404).send({message:"token not generate"})
        }
    
    
        return res.status(202).send({message:" employee login successfully",token})

}




// get employee

exports.getemployee  = async(req,res) =>{

    const uid =  req.clientDetail._id
    console.log(">>>>>>>>req.client",req.employeeDetail)
    const data = await employee.find({client_id: uid });

    return res.status(202).send(data)
}
