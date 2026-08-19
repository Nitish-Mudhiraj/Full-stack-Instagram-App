const express = require("express")
const {Register} = require("../controllers/userController")
const {Login} = require("../controllers/userController")
const {getme} = require("../controllers/userController")
const {middileware} = require("../middilewares/middileware")

const userRouter = express.Router()

userRouter.post("/register" , Register)
userRouter.post("/login", Login)
userRouter.get("/get-me" ,middileware,getme)

module.exports = userRouter