const express = require("express")
const userrouter = require("./Routers/userRouter")
const postRouter = require("../src/Routers/postRouter")
const cookieParser = require("cookie-parser")
const authlike = require("../src/Routers/likeRouter")
const authfollower = require("../src/Routers/followRouter")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static("./public"))


app.use("/user/details" , userrouter)
app.use("/user/posts" ,postRouter)
app.use("/user/liker" ,authlike)
app.use("/user/follow" , authfollower)

console.log(__dirname)

app.use("*name" ,(req,res)=>{

  
    res.sendFile(path.join(__dirname,"..", "public", "assets", "index.html"));


})


module.exports = app