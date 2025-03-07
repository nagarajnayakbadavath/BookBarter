const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:12,
    },
    lastName:{
        type:String,
        required:true,
        minlength:6,
        maxlength:12,
    },
    emailId:{
        type:String,
        required:true,
        minlength:11,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    photourl:{
        type:String,
        required:true,
    },
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);