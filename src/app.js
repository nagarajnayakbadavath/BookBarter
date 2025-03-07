const express=require('express')
require('dotenv').config();
const mongoose=require('mongoose');
const dbUrl=require('./Config/connectiondb');
//create app
const app=express()
//make a port
const port=process.env.PORT;

app.get(`http://localhost:${port}/`,(req,res)=>{
    try{
        res.send("Hello I am Nagaraju");
        console.log("Hello");
    }catch(err){
        console.log(err.message);
    }
});

app.listen(port,()=>{
    console.log(`app is listening on port num ${port}`);
    mongoose.connect(dbUrl).then(()=>console.log("DataBase is connected")).catch(()=>console.log("Database isfailed to connect"));
});
