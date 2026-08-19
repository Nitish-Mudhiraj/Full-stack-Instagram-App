const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
   

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"

    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const likemodel = mongoose.model("likes" , likeSchema)

module.exports = likemodel