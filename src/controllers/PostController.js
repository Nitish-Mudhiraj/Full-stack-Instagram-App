const postmodel = require("../models/postmodel");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new Imagekit({
    privateKey: process.env.Image_Kit
});

async function uploadpost(req, res) {

    const userId = req.user.id;

    const caption = req.body.caption
   
   

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "insta_post"
    });

    

    const post = await postmodel.create({
        caption: req.body.caption,
        Image: file.url,
        user: userId
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });
}


async function getallposts(req,res){
    const userId = req.user.id

    const posts = await postmodel.find()

    res.status(200).json({
        message:"all posts fecthed",
        posts
    })

}


async function getsinglepost(req,res){
     const userId = req.user.id

     const postId = req.params.postId

     if(!postId){
        return res.status(200).json({
            message:"post not found"
        })
     }

     const post = await postmodel.findById(postId)


     res.status(200).json({
        message:"post fetched sucessfully",
        post
     })

}

async function deletepost(req,res){

    const userId = req.user.id

    const postId = req.params.postId

     if(!postId){
        return res.status(200).json({
            message:"post not found"
        })
     }

     const post = await postmodel.findByIdAndDelete(postId)

     res.status(200).json({
        message:"post is deleted sucessfully",
        post
     })

    

}
async function getfeed(req,res){

       const userId = req.user.id

       const feed = await postmodel.find({user:userId}).populate("user")

       res.status(200).json({
            message:"all posts are fetched",
            feed
       })



}
module.exports = {
    uploadpost,
    getallposts,
    getsinglepost,
    deletepost,
    getfeed
};