const express = require("express");
const postRouter = express.Router();
const {middileware} = require("../middilewares/middileware")
const {uploadpost} = require("../controllers/PostController")
const {getallposts} = require("../controllers/PostController")
const {getsinglepost} = require("../controllers/PostController")
const {deletepost} = require("../controllers/PostController")
const {getfeed} = require("../controllers/PostController")
const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})


postRouter.post("/upload",middileware,upload.single("Image"),uploadpost);
postRouter.get("/allposts" ,middileware,getallposts)
postRouter.get("/single/:postId" , middileware,getsinglepost)
postRouter.get("/delete/:postId" , middileware,deletepost)
postRouter.get("/get-feed" ,middileware,getfeed)






module.exports = postRouter