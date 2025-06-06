const emp = require("../Model/emp");




exports.createemp = async (req, res) => {

    const { name, phone, email, password } = req.body
    if (!(name && phone && email && password)) {
        return res.status(500).send("plese fill all field")
    }
    const alreadyEmail = await emp.findOne({ email })

    if (alreadyEmail) {
        return res.status(400).send({ message: "Email already exists" });
    }
    try {
        const data = req.body
        const abc = new emp(data)
        await abc.save()
        return res.status(202).send(abc)


    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

}


// get all

exports.getemp = async (req, res) => {

    try {
        const data = await emp.find()
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send({ message: error.message })

    }
}

// get by id 
exports.getid = async (req, res) => {

    try {
        const { id } = req.params;
        const data = await emp.findById(id)
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }

}

// get by one (name)

exports.getone = async (req, res) => {
    try {
        const { name } = req.params
        const data = await emp.findOne({ name })
        return res.status(202).send(data)
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
    
}


// get by phone

exports.getphone = async(req,res)=>{

    try{
        const {phone} = req.params
        console.log(">>>>>>>>",req.params)
        const data = await emp.findOne({phone})
        return res.status(202).send(data)
    }
    catch(error)
    {
        return res.status(500).send({message:error.message})
    }
}       

// Dout : Data can not send both if the phone number is the same of employee



// get by query

exports.getquery = async(req,res) =>{
    try{
    const {id} = req.query
    const data = await emp.findById(id)
    return res.status(202).send(data)
    }
    catch(error)
    {
        return res.status(500).send({message:error.message})
    }
}

