const product =  require("../Model/product")



exports.addproduct  =async(req,res)=>{

    const data = req.body

    const result = new product(data)
    await result.save()

    return res.status(202).send({message:"Product addedd",result})
}


// getproduct

exports.getproduct = async(req,res)=>{

    const data  =  await product.find({user_id:req.userDetail._id}).populate("user_id")


    // const data =  await product.find()
    return res.status(202).send(data)


}