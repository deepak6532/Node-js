const express =  require("express")

const mongoose  = require('mongoose')

const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const port = 8082

const mongoURL = 'mongodb://localhost:27017/sample';

mongoose.connect(mongoURL)


const userRouter = require("./Router/user")

app.use("/us",userRouter)


app.listen(port,() =>{
    console.log("server is running on this port",port)
})



