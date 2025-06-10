const user = require('../Model/user')



exports.create = async (req,res) =>{


    try{
        const data  =  req.body
        
        const abc=  new user(data)
        await abc.save()
        return res.status(202).send(abc)
    }
    catch(err)
    {
        return res.status(404).send({message:"Error "})
    }

}



exports.getall = async (req, res) => {
    try {
        const data = await user.find()
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(404).send("error getting")
    }
}





