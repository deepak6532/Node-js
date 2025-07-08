const user = require("../Model/user")
const bcrypt = require("bcrypt")

const moment = require("moment")
const jwt = require('jsonwebtoken')

const nodemailer = require("nodemailer")

const cron = require("node-cron")

const secretKey = "abcdefghijklmnopqrstuvwxyz"

exports.signup = async (req, res) => {

    const { name, phone, email, password, role } = req.body
    if (!(name && phone && email && password)) {
        return res.status(500).send("plese fill all field")
    }
    const alreadyEmail = await user.findOne({ email })

    if (alreadyEmail) {
        return res.status(400).send({ message: "Email already exists" });
    }
    let otp = ""
    let length = 4
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 10);
        otp += random;
    }
    // console.log(">>>>>>>>otp ",otp)


    const time = moment().format();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

// nodemailer function 1
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
           user:process.env.Email,
           pass:process.env.Password
        },
    });


    try {
        const data = { name, phone, email, password: hash, otp, time, role }
        const abc = new user(data)
        await abc.save()

        // nodemailer function 2 send mail
        const info = await transporter.sendMail({
            from: process.env.Email,
            to: "agrawaldeepak9731@gmail.com",
            subject: "otp alert",
            text: `your otp is ${otp}`

        });

        console.log("Message sent:", info.messageId);

        return res.status(202).send({ message: "Signup success" }, abc)

    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

}




// login 

exports.login = async (req, res) => {

    const { email, password, otp } = req.body

    const alreadyEmail = await user.findOne({ email })

    const otpTime = alreadyEmail.time

    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists " })
    }

    const dpassword = alreadyEmail.password
    const dbotp = alreadyEmail.otp

    // jwt
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })


    console.log(">>>token", token)

    const match = await bcrypt.compare(password, dpassword)

    if (!match) {


        return res.status(404).send({ message: "incorrect password" })
    }
    if (otp === dbotp) {

        // const current = moment();
        // const validTime = current.diff(otpTime,"minutes") 
        // console.log(">>>>>>.res",validTime );
        // if(validTime > 10)
        // {
        //     return res.status(404).send({message:"Otp Expire"})
        // }

        return res.status(202).send({ message: "Login successfull", token })



    }
    else {

        return res.status(404).send({ message: "incorrect otp try again" })
    }


}





// reset

exports.reset = async (req, res) => {

    const { email, oldPassword, newPassword } = req.body

    const alreadyEmail = await user.findOne({ email })

    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists" })

    }

    const dpassword = alreadyEmail.password
    const id = alreadyEmail._id

    const match = bcrypt.compare(oldPassword, dpassword)

    if (!match) {
        return res.status(404).send({ message: "old password does not match" })
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        const data = {
            password: hash
        }
        const abc = await user.findByIdAndUpdate(id, data, { new: true })

        return res.status(202).send({ message: "update successull", abc })
    }
}



// forgot password

// forgot password
exports.forgot = async (req, res) => {

    const { email, newPassword, otp } = req.body

    const alreadyEmail = await user.findOne({ email })


    if (!alreadyEmail) {
        return res.status(404).send({ message: "user not exists" })
    }
    else if (otp === alreadyEmail.otp) {
        const id = alreadyEmail._id
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        const data = {
            password: hash

        }
        const abc = await user.findByIdAndUpdate(id, data, { new: true })
        return res.status(202).send({ message: "forgot password sucecessfull", abc })


    }
    else {
        return res.status(404).send({ message: "plese chek you email and otp try again! " })
    }


}


// getall

exports.getuserdata = async (req, res) => {

    console.log(">>>>>>userDetail", req.userDetail)
    // const Id = req.userDetail._id 
    // const email = req.userDetail.email
    // show only login user data 

    try {
        const data = await user.find()
        // const data = await user.findOne({ email })
        // console.log(data)
        return res.status(202).send(data)
    }
    catch (err) {
        return res.status(404).send({ message: "error not solve getall" })

    }
}



// salary

exports.salary = async (req, res) => {

    const data = await user.find({ salary: { $gte: 100000 } })

    if (data.length === 0) {
        return res.status(404).send({ message: "no user found " })
    }


    {
        data.map((u) => {
            return res.status(202).send(u.name)
        })
    }

    // return res.status(202).send({data})

}


// cron  runn every minute ki 2 second pr 



// cron.schedule('2 * * * * *',async()=>{


//     let otp=""
//     let length = 6
//     for(let i=0;i<length;i++)
//     {
//         let random = Math.floor(Math.random()*10)
//         otp+=random
//     }
//       const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         auth: {
//             user: "deepakgupta9376@gmail.com",
//             pass: "pjmpbzjyxqfuuoyi",
//         },
//     });

//      const info = await transporter.sendMail({
//             from: 'deepakgupta9376@gmail.com',
//             to: "agrawaldeepak9731@gmail.com,deepakgupta.bca22@poddarinstitute.org",
//             subject: "otp alert",
//             text: `your otp is ${otp}`
            

//         });

//             console.log("send mail success")



// })


// send name and email in my email(error)

// cron.schedule('*/1 * * * * *',async(req,res)=>{

//     const data =  await user.find()

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         auth: {
//             user: "deepakgupta9376@gmail.com",
//             pass: "pjmpbzjyxqfuuoyi",
//         },
//     });
//     for(d of data)
//     {
//         const name=  d.name
//         const email = d.email
    
//      const info =await  transporter.sendMail({
//             from: 'deepakgupta9376@gmail.com',
//             to: "agrawaldeepak9731@gmail.com",
//             subject: "send data",
//               html: `
//                     <table>
//                         <tr>
//                             <td>Name:</td>
//                             <td>${name}</td>
//                         </tr>
//                         <tr>
//                             <td>Email:</td>
//                             <td>${email}</td>
//                         </tr>
//                     </table>`

//      })
//         console.log("send data success")
//     }

//         // console.log("send data success")



// })