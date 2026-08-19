const express = require("express")
const {createlike} = require("../controllers/likeController")
const {middileware} = require("../middilewares/middileware")
const {getpostlkies} = require("../controllers/likeController")
const { userlikespost} = require("../controllers/likeController")
const {unlike} = require("../controllers/likeController") 


const authlike = express.Router()


authlike.post("/like/:postId" ,middileware,createlike)
authlike.get("/likes/:postId" ,middileware,getpostlkies)
authlike.get("/likes" ,middileware, userlikespost)
authlike.post("/unlike/:postId",middileware,unlike)

module.exports = authlike