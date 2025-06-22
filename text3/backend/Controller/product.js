const product = require("../Model/product")

const nodemailer = require('nodemailer')



exports.addproduct =  async(req,res) =>{

    const uid =  req.userDetail._id
    const email =  req.userDetail.email

    console.log(">>>>>>email",email)
    console.log(req.userDetail)

    const {name,price,discount} = req.body


    const data  ={
        name,price,discount,user_id:uid
    }


    const transporter =  nodemailer.createTransport({

        host:"smtp.gmail.com",
         auth: {
            user: "deepakgupta9376@gmail.com",
            pass: "pjmpbzjyxqfuuoyi",
        },

    })

    const result = new product(data)
    await result.save()


     const info = await transporter.sendMail({
            from: 'deepakgupta9376@gmail.com',
            to: email,
            subject: "Add product ",
            text: `${name} added`

    });


    return res.status(202).send({message:"Product added"})

}


// get product


exports.getproduct =  async(req,res) =>{

    const role = req.userDetail.role

    if(role ==="admin")
    {
        const data  = await product.find().populate("user_id")
        return res.status(202).send(data)
    }
    if(role ==="client")
    {
        const data  = await product.find().limit(3).populate("user_id")
        return res.status(202).send(data)
    }
     if(role === "user")
    {
        const data = await product.find({user_id : req.userDetail._id}).populate("user_id")
        return res.status(202).send(data)
    }

}


