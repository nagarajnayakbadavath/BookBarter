const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    bookTitle:{
        type:String,
        required:true,
        unique:true,
    },
    bookAuthor:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:20,
        maxlength:200,
    },
    status:{
        type:Boolean,
        required:true,
    },
    images:{
        type:String,
    },
    myId:{
        type:String,
    }
},{timestamps:true});


module.exports=mongoose.model('Book',bookSchema);