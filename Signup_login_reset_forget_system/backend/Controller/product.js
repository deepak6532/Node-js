const product = require("../Model/product")



exports.addproduct = async (req,res) =>{

    const data = req.body

    const abc = new product(data)

    await abc.save()
    return res.status(202).send(data)

}

exports.getproduct = async (req,res)=>
{
    console.log(">>>>>>>>>>>>>>>>>> req.userDetail>>>", req.userDetail._id);

    const  data = await product.findOne({user_id : req.userDetail._id}).populate("user_id")
    console.log(".................data......",data)
    return res.status(202).send(data)
}