const product =  require("../Model/product")



exports.addproduct =  async(req,res)=>{

    // const data = req.body

    const {name ,price} = req.body

    const uid =   req.userDetail._id
    
    const data ={
        name,price ,user_id:uid
    }

    const result = new product(data)
    await result.save()

    return res.status(202).send({message:"Product addedd",result})
}




// get product  : show the data  in the basis of user role :-

    // if role :"admin" => show all data 
    // if  role:"client" => show starting 2 data 
    // if role :"user" = > show only  particuler user data insert 

    
exports.getproduct = async(req,res)=>{

    const role=   req.userDetail.role

    if(role ==="admin")
    {
        const data  = await product.find().populate("user_id")
        return res.status(202).send(data)
    }
    if(role ==="client")
    {
        const data = await product.find().limit(2).populate("user_id")    /// limit(2)=> show only starting 2 data ,  skip(2) => skip starting 2 data and then show the all data
         return res.status(202).send(data)
    }
    if(role ==="user") 
    {
        const data  =  await product.find({user_id:req.userDetail._id}).populate("user_id")

        return res.status(202).send(data)
    }
    

}







// getall

exports.getall =  async(req,res)=>{

    const data = await product.find().populate("user_id")
    return res.status(202).send(data)

}
