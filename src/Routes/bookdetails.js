const express=require('express');
const bookRouter=express.Router();
const Book=require('../Schemas/books');
const auth=require('../MiddleWare/auth');

bookRouter.post("/addBook",auth,async(req,res)=>{
    try{
        const {bookTitle,bookAuthor,genre,description,status}=req.body;
        const myId=req.user._id;
        const newBook=new Book({
            bookTitle,
            bookAuthor,
            genre,
            description,
            status,
            myId,
        });
        await newBook.save();
        res.send("Book is added for swaping");
    }catch(err){
        res.status(404).send(err.message);
    }
});

bookRouter.get("/allBooks",auth,async(req,res)=>{
    try{
        const book=await Book.find({status:true})
        res.send(book);
    }catch(err){
        res.status(404).send(err.message);
    }
});


module.exports=bookRouter;