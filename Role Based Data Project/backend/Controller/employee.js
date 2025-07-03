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



     const {email,password,role} =  req.body
    
        const alreadyEmail =  await employee.findOne({email})
    
        if(!alreadyEmail)
        {
            return res.status(404).send({message:"employee not  exists"})
        }
    
        const dbpassword = alreadyEmail.password
        const dbrole =  alreadyEmail.role
    
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
    
        if(role === dbrole)
        {  
        return res.status(202).send({message:" employee login successfully",token,user:alreadyEmail})
        }
        else{
            return res.status(404).send({message:"role does not match "})
        }
}

// get employee

exports.getemployee  = async(req,res) =>{

    const uid =  req.employeeDetail
    console.log(">>>>>>>>>uid" ,uid)
    // const data = await employee.find({client_id:uid.super_id});
    const data = await employee.find();

    return res.status(202).send(data)
}

exports.getclientemp  = async(req,res) =>{

    const {id} =  req.params
    // const uid =  req.employeeDetail
    // console.log(">>>>>>>>>uid" ,uid)

    console.log(">>>>>>id_employee",id)
   
    const data = await employee.find({client_id:id});

    console.log("<<<<data",data)

    return res.status(202).send(data)
}



exports.allemployee =  async(req,res) =>{
    
    const uid = req.employeeDetail
    console.log("........uid",uid.client_id)

    const data = await employee.find({client_id:uid.client_id})
    return res.status(202).send(data)
}


// alll employee
exports.allemp =  async(req,res) =>{
    
    const uid = req.employeeDetail.emp_id
    // console.log("........uid",uid._id)

    console.log(req.employeeDetail.name)


    const data = await employee.find({}).populate("client_id")
    return res.status(202).send(data)
}


