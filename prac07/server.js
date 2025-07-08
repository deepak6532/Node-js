const express =  require("express")

const mongoose  = require('mongoose')

const cors = require("cors")

const env =  require("dotenv")
env.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = 8082


const mongoURL = "mongodb://localhost:27017/prac07"

mongoose.connect(mongoURL)


const userRouter = require("./Router/user")

app.use("/user07",userRouter)


app.listen(port,() =>{
    console.log("server is running on this port",port)
})



