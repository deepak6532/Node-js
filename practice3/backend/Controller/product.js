const product = require("../Model/product")

exports.addproduct = async(req,res)=>{


    const {name,price} = req.body

    const uid =  req.userDetail._id

    const data ={
        name,price,user_id:uid
    }

    const result =  new product(data)
    await result.save()
    return res.status(202).send({message:"product added",result})
}


// getproduct

exports.getproduct = async(req,res)=>{

    const role =  req.userDetail.role

    if(role === "admin")
    {
        const data =  await product.find().populate("user_id")
        return res.status(202).send({data})
    }
    if(role ==="client")
    {
        const data  = await  product.find().limit(3).populate("user_id")
        return res.status(202).send(data)
    }
    if(role ==="user" )
    {
        const data  = await product.find({user_id:req.userDetail._id}).populate("user_id")
        return res.status(202).send(data)
    }
}