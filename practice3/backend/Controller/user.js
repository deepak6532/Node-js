const user=  require("../Model/user")


const bcrypt  = require("bcrypt")
const jwt  =  require("jsonwebtoken")
const nodemailer =  require("nodemailer")

const secretKey = "asdfghjklzxcvbnm"




exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  const alreadyEmail = await user.findOne({ email });

  if (alreadyEmail) {
    return res.status(404).send({ message: "User already exists" });
  }

  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const data = {
    name,
    email,
    password: hash,
    role,
    otp,
  };

  const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "deepakgupta9376@gmail.com",
      pass: "pjmp bzjy xqfu uoyi", // Consider using env variable
    },
  });

  const result = new user(data);
  await result.save();

  await Transporter.sendMail({
    from: "deepakgupta9376@gmail.com",
    to: email,
    subject: "Otp Alert",
    text: `DO NOT SHARE. OTP is: ${otp}`,
  });

  return res.status(202).send({ message: "Signup success", result }); // ✅ Fixed
};


// login api

exports.login = async(req,res)=>{


    const {email,password,otp} =  req.body

    const alreadyEmail = await user.findOne({email})

    if(!alreadyEmail)
    {
        return res.status(404).send({message:"user not found Signup First "})
    }

    const dbpassword =  alreadyEmail.password
    const dbotp  = alreadyEmail.otp

    const match = await bcrypt.compare(password,dbpassword)

    if(!match)
    {
        return res.status(404).send({message:"Incorrect password"})
    }

    const token = jwt.sign({email},secretKey,{expiresIn : '1h'})

    if(otp===dbotp)
    {
        return res.status(202).send({message:"Login successful",token})
    }
    else
    {
        return res.status(404).send({message:"incorrect otp"})
    }
}

