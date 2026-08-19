const followmodel = require("../models/fllowemodel")
const usermodel = require("../models/usermodel")

async function creatingfollowers(req,res){

    const userId = req.user.id
   
    const followe = req.params.followe

    if(!userId){
        return res.status(401).json({
            message:"unauthorized user"
        })
    }

    const targetuser = await usermodel.findById(followe)

    if(!targetuser){
        return res.status(401).json({
            message:"user not found"
        })
    }
     
    if(userId.toString() === targetuser._id.toString()){
       return res.status(400).json({
    message: "You can follow only once"
});
    }

    const alreadyfollowing = await followmodel.findOne({
       
        followers:userId,
         followee:targetuser._id,
    })

    if(alreadyfollowing){
        return res.status(400),json({
            message:"you can follow only once"
        })
    }

    const following = await followmodel.create({

       
        followers:userId,
         followee:targetuser._id,

    })

    res.status(200).json({
      message: `You followed ${targetuser.username} successfully`,
      following

    })





}

async function unfollow(req,res){

    const userId = req.user.id

    const followe = req.params.followe

    if(!userId){
        return res.status(404).json({
            message:"unauthrized user"
        })
    }

    const clientuser = await usermodel.findById(followe)

    if(!clientuser){
        return res.status(401).json({
            message:"user not found"
        })
    }

    if(userId.toString()===followe.toString()){
        return res.status(400).json({
            message:"user not found"
        })
    }




    const unfollowuser = await followmodel.findOneAndDelete({
        followers:userId,
        followee:followe
    })

    if(!unfollowuser){
        return res.status(400).json({
            message:"you are not following the user"
        })
    }

    res.status(200).json({
        message:"you sucessfully unfollowed him"
    })






}

module.exports = {
    creatingfollowers,
    unfollow

}