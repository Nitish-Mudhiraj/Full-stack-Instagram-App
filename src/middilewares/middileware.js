const jwt = require("jsonwebtoken");


async function middileware(req,res,next){

   try{

     const token = req.cookies.token
   

     

    if(!token){
      return   res.status(400).json({
            message:"unauthorized user"
        })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json({
            message:"token invalid"
        })
    }

    req.user = decoded

    next()




   }catch(err){

    res.status(500).json({
        message:"internal server"
    })

   }

   
}


module.exports  = {
    middileware
}