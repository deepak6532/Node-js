const batch =  require("../Model/batch")

const secretKey ="abcdefghijkl"


exports.addbatch = async(req,res) =>{

    const empid =  req.employeeDetail._id
    const cid =  req.employeeDetail.client_id


    const {name,trainer} = req.body

    const data = {
        name,trainer,emp_id:empid,client_id:cid
    }

    const result = new batch(data)
    await result.save()

    return res.status(202).send({message:"Batch added ",result})
    
}


// /get batch

exports.getbatch =  async(req,res) =>{

    const empid =  req.employeeDetail
    // const data =  await batch.find({emp_id:empid._id}).populate("emp_id")            //only show batch particular user (ex if prachi add to show only prachi)
    const data =  await batch.find({client_id:empid.client_id}).populate("emp_id")
    return res.status(202).send({message:"All Batches",data})
}


