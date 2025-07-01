const product =  require("../Model/product")
const employee = require("../Model/employee")

const secretKey ="abcdefghijkl"


exports.addproduct = async(req,res) =>{


    const empid  =  req.employeeDetail._id
    const cid =  req.employeeDetail.client_id
    // const cid =  req.employeeDetail._id

    console.log(">>>cid super_id",cid)
    
    const {name,category,price} =  req.body

    const data ={
        name,category,price,emp_id:empid  ,client_id:cid               // client_id:cid
    }


    const result =  new product(data)
    await result.save()

    // const data2 = {
    //     name,category,price,client_id:cid
    // }
    // const abc = new employee(data2)
    // await abc.save()


    return res.status(202).send({message:"product add ",result})
    
}





exports.getproduct =  async(req,res) =>{


    // const data = await product.find()

    // return res.status(202).send(data)
    const role = req.employeeDetail.role
    const email = req.employeeDetail.email

    const cid = req.employeeDetail.client_id

    console.log(">>>>>>>cid .......",cid)

    console.log(">>>>>>>email :--",email)
    if(role ==="admin")
    {
        const data  = await product.find().populate("emp_id")
        return res.status(202).send(data)
    }
    if(role ==="trainer")
    {
        const data  = await product.find({client_id:cid}).populate("emp_id")
        return res.status(202).send(data)
    }
     if(role ==="hr")
    {
        const data  = await product.find({emp_id : req.employeeDetail._id}).populate("emp_id")
        return res.status(202).send(data)
    }
     if(role === "student")
    {
        const data = await product.find({emp_id : req.employeeDetail._id}).populate("emp_id")
        return res.status(202).send(data)
    }

}


