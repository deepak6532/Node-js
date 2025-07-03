const course  =  require("../Model/course")

const secretKey ="abcdefghijkl"


exports.addcourse  = async(req,res) =>{

     const empid  =  req.employeeDetail._id
    const cid =  req.employeeDetail.client_id

    const {name}  = req.body

    const data  ={
        name,client_id:cid,emp_id:empid
    }

    const result =  new course(data)
    await result.save()

    return res.status(202).send({message:"course added success ",result})
}


//  get course

exports.getcourse = async(req,res) =>{

    const uid =  req.employeeDetail
    
    const result =  await course.find({client_id:uid.client_id}).populate("emp_id").populate("client_id")

    console.log("Employee name to create this course ,",result[0].emp_id.name)

    return res.status(202).send({message:"All Course ",result})

    
}