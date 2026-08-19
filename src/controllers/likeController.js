const likemodel = require("../models/Likesmodel")
const postmodel = require("../models/postmodel")


async function createlike(req,res){

    const userId = req.user.id

    const postId = req.params.postId

    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    if(post.user.toString() === userId){
        return res.status(404).json({
            message:"you dont have acess to like your own photo"
        })
    }

   
    const likealreadyexits = await likemodel.findOne({
            post:postId,
            user:userId
    })

    if(likealreadyexits){
        return res.status(404).json({
            message:"you can only like once"
        })
    }

    const likedpost = await likemodel.create({

       
        post:postId,
        user:userId
        

    })


    res.status(200).json({
        message:"like created successfully",
        likedpost
    })



}

async function getpostlkies(req,res){

    const postId = req.params.postId

     const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const postlikes = await likemodel.find({
        post:postId
    })
  
    res.status(200).json({
        message:"the like on the post are fecthed",
        postlikes

    })


}

async function userlikespost(req, res) {
    try {
        const userId = req.user.id;

        const userlikedposts = await likemodel.find({
            user: userId
        }).populate("post");

        res.status(200).json({
            message: "User liked posts fetched successfully",
            totalLikedPosts: userlikedposts.length,
            userlikedposts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function unlike(req,res){

    const userId = req.user.id

    const postId = req.params.postId

    const clientid = await postmodel.findById(postId)

    if(!clientid){
        return res.status(401).json({
            message:"post not found"
        })
    }

    const like = await likemodel.findOne({
        user:userId,
        post:postId
    })

    if(!like){
        return res.status(400).json({
            message:"you didn't liked the post"
        })
    }

    await likemodel.findByIdAndDelete(like._id)

    res.status(200).json({
        message:"like deleted successfully"
    })

    
    

}


module.exports = {
    createlike,
    getpostlkies,
    userlikespost,
    unlike
}



