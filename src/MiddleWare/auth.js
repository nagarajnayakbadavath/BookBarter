const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwt_secret_key=process.env.JWT_SECRET_KEY;
const UserModel=require('../Schemas/user');


const bcrypt=require('bcrypt');

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.send("token is expired please login again");
        }
        const decodedobj=jwt.verify(token,jwt_secret_key);
        const {_id}=decodedobj;
        const user=await UserModel.findById(_id);
        if(!user){
            return res.send("user not found");
        }
        req.user=user;
        next();
    }catch(err){
        console.log("middleware");
        res.status(404).send(err.message);
    }
};

module.exports=userAuth;