const product = require("../Model/product")

const image = require("../helper")


exports.addproduct = async (req, res) => {
    try {
        const uid = req.userDetail._id


        const { name, price, user_id } = req.body

        // console.log(">>>>>>req",req.body)

        const { photo } = req.files

        console.log("..........photo:", photo)

        const uploadImage = await image.uploadImage({ photo })

        console.log(">>>>>>>>>>uploadImage:-", uploadImage[0].url);

        const abc = {
            name,
            price,
            user_id: uid,
            photo: uploadImage[0].url
        }

        const result = new product(abc)

        await result.save()
        return res.status(202).send(result)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}




// role basd data find product with join product tabel and user table


exports.getproduct = async (req, res) => {
    // console.log(">>>>>>>>>>>>>>>>>> req.userDetail>>>", req.userDetail._id);

    // const  data = await product.findOne({user_id : req.userDetail._id}).populate("user_id")

    const role = req.userDetail.role

    if (role === "admin") {
        const data = await product.find().populate("user_id")
        return res.status(202).send(data)
    }
    if (role === "client") {
        const data = await product.find().limit(2)
        return res.status(202).send(data)
    }
    if (role === "user") {
        const data = await product.find({ user_id: req.userDetail._id })
        return res.status(202).send(data)
    }

    // const  data = await product.find({user_id : req.userDetail._id}).populate("user_id")
    // console.log(".................data......",data)
    // return res.status(202).send(data)
}