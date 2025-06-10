const user = require('../Model/user')
const bcrypt = require("bcrypt")


exports.create = async(req,res) =>{

    const {name,age,phone,email,password} = req.body

    const alreadyPhone = await user.findOne({phone});

    if(alreadyPhone)
    {
        return res.status(404).send({message:"user already exists!"})
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    let otp=""
    const length = 4

    for(let i=0;i<length;i++)
    {
        const random= Math.floor(Math.random() *10)
        otp+=random
    }

    const data = {
      name,age,phone,email, password:hash,otp
    }

    const abc = await new user(data)
    await abc.save()
    return res.status(202).send({message:"Data send successfully"})

}


exports.getall = async(req,res)=>{

    const data = await user.find();
    return res.status(202).send(data)
}



exports.getid = async(req,res)=>{

    const {id} = req.params

    const data = await user.findById(id)

    return res.status(202).send(data)

}


// update

exports.update = async (req,res) =>{

  try {
        const id = req.body._id;
        const data = req.body;

        const result = await user.findByIdAndUpdate(id, data, { new: true });

        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(202).send(result);

        
    } catch (error) {
        return res.status(500).send({ message: "Error updating user", error });
    }
}



// delete data

exports.delete = async(req,res) =>{
    const {id} =  req.query
    const data = await user.findByIdAndDelete(id)
    return res.status(202).send(data)

}


// login api

exports.login = async (req,res) =>{

    const {phone,password,otp} = req.body

    const alreadyPhone = await user.findOne({phone})

    if(!alreadyPhone)
    {
        return res.status(404).send({message:"signup first"})
    }

    const dpassword = alreadyPhone.password
    const dotp = alreadyPhone.otp

    const match = await bcrypt.compare(password,dpassword)

    if(!match)
    {
        return res.status(404).send({message:"incorrect password"})
    }
    if(otp !== dotp)
    {
        return res.status(404).send({message:"incorrec otp try again!"})
    }
    else
    {
        return res.status(202).send({message:"Login succesfully"})
    }


}


// reset password

exports.reset = async (req,res)=>{

    const {phone,oldPassword,newPassword} = req.body

    const alreadyPhone = await user.findOne({phone})

    const dpassword = alreadyPhone.password
    const id  = alreadyPhone._id
    if(!alreadyPhone)
    {
        return res.status(404).send({message:"user not exists"})
    }

    const match = bcrypt.compare(oldPassword,dpassword)

    if(!match)
    {
        return res.status(404).send({message:"password does not match"})
    }
    else
    {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword,salt)

            const data ={
                password :hash
            }
        const result =await user.findByIdAndUpdate(id, data, { new: true })

        return res.status(202).send(result)


    }

}


// forgot

exports.forgot  =async (req,res)=>{

    const {phone,otp,newPassword} = req.body

    

    const alreadyPhone = await user.findOne({phone})

    if(!alreadyPhone)
    {
        return res.status(404).send({message:"user not exists"})
    }

   const  dbotp  = alreadyPhone.otp
   const id = alreadyPhone._id

    if(otp !== dbotp)
    {
        return res.status(404).send({message:"incorrect otp try again !"})
    }
    else
    {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword,salt)
        const data = {
            password:hash
        }

        let abc = await user.findByIdAndUpdate( id , data , {new:true})
        console.log(">>>.result",abc)

        return res.status(202).send({message:"forgot successful"})
    }
    

}