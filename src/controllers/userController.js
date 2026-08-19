const usermodel = require("../models/usermodel")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { decode } = require("querystring");


async function Register(req,res){

    const {username, email,password} = req.body

const useralreadyexits =   await usermodel.findOne({
    $or: [
        { username },
        { email }
    ]
});

   if(useralreadyexits){
        return res.status(400).json({
            message:"user already exits"
        })
   }

   const hashedpassword  =  crypto.createHash("md5").update(password).digest("hex")

   const user = await usermodel.create({
        username,
        email,
        password:hashedpassword
   })

   const token = jwt.sign({
        id:user._id
   },process.env.JWT_SECRET)

   res.cookie("token" , token)

   res.status(200).json({
    message:"user registerd sucessfully",
    user

   })




}


async function Login(req,res){

    const {username,email,password} = req.body

    const user = await usermodel.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

    const notupdatedpasword = crypto.createHash("md5").update(password).digest("hex")

    const updatedpassword = notupdatedpasword === user.password

    if(!updatedpassword){
        return res.status(401).json({
            message:'password incorrect'
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(200).json({
        mesage:"login sucessfull",
        user
    })




    
}

async function getme(req,res){

  const id = req.user.id

    const user = await usermodel.findById(id)

    res.status(200).json({
        message:"user fecthed sucessfully",
        user

    })


    

}

module.exports = {
    Register,
    Login,
    getme
}