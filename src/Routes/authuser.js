
const express=require('express');
const authRouter=express.Router();
const bcrypt=require('bcrypt');
const UserModel=require('../Schemas/user');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const jwt_secret_key=process.env.JWT_SECRET_KEY;
const auth=require('../MiddleWare/auth');


authRouter.get('/',(req,res)=>{
    try{
        res.send("Hello I am Nagaraju");
        console.log("Hello");
    }catch(err){
        console.log(err.message);
    }
});

authRouter.post("/user/register",async(req,res)=>{
    try{
        const {firstName,lastName,emailId,password,photourl}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        const newUser=new UserModel({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            photourl,
        });
        console.log(newUser);
        await newUser.save();
        res.send(newUser);
    }catch(err){
        res.status(404).send(err.message);
    }
});

authRouter.post("/user/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await UserModel.find({emailId});
        if(!user){
            return res.send("User not Exists");
        }
        //compare the password
        const isPasswordValid=await bcrypt.compare(password,user[0].password);   //argument should not change
        if(isPasswordValid){
            const token=jwt.sign({_id:user[0]._id},jwt_secret_key);
            res.cookie("token",token);
            res.send("User loggedIn successfully");
        }else{
            return res.send("password is not matching");
        }
    }catch(err){
        console.log("logout");
        res.status(404).send(err.message);
    }
});

authRouter.post("/user/logout",auth,async(req,res)=>{
    try{
        res.cookie("token","",{
            expires:new Date(Date.now()),
        });
        res.send("logged out rey");
    }catch(err){
        res.send(err.message);
    }
});

module.exports=authRouter;