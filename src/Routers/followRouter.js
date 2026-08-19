const express = require("express")
const {creatingfollowers} = require("../controllers/followcontroller")
const {unfollow} = require("../controllers/followcontroller")


const {middileware} = require("../middilewares/middileware")



const authfollowers = express.Router()


authfollowers.post("/following/:followe",middileware,creatingfollowers)
authfollowers.post("/unfollow/:followe" ,middileware,unfollow)

module.exports = authfollowers