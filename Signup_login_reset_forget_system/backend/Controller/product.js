const product = require("../Model/product")



exports.addproduct = async (req,res) =>{

   
    const {name,price} = req.body

    const uid =  req.userDetail._id


    console.log(">>>>>>user_id>>>",uid)

    const abc = {
        name,
        price,
        user_id:uid
    }

    
    const result = new product(abc)

    await result.save()
    return res.status(202).send(result)

}

exports.getproduct = async (req,res)=>
{
    // console.log(">>>>>>>>>>>>>>>>>> req.userDetail>>>", req.userDetail._id);

    // const  data = await product.findOne({user_id : req.userDetail._id}).populate("user_id")

    const role = req.userDetail.role

    if(role ==="admin")
    {
        const data =  await product.find().populate("user_id")
        return res.status(202).send(data)
    }
    if(role === "client")
    {
        const data  = await product.find().limit(2)
        return res.status(202).send(data)
    }
    if(role === "user")
    {
        const data = await product.find({user_id : req.userDetail._id})
        return res.status(202).send(data)
    }

    // const  data = await product.find({user_id : req.userDetail._id}).populate("user_id")
    // console.log(".................data......",data)
    // return res.status(202).send(data)
}