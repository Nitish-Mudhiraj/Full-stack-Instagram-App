const mongoose = require("mongoose")


function connecttoDB(){
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("databse is connected")
    })
}

module.exports = connecttoDB