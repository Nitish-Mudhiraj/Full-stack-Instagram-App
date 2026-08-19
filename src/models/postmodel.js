const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    Image:{
        type:String,
        required:[true]
    },
    caption:{
        type:String,
        require:[true ,"caption is required"]
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const postmodel = mongoose.model("posts" , postSchema)

module.exports = postmodel