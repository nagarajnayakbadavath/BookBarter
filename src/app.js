const express=require('express')
require('dotenv').config();
const mongoose=require('mongoose');
const dbUrl=require('./Config/connectiondb');
//create app
const app=express();
app.use(express.json());    //it will allows json data we entry from postman 
const cookieParser=require('cookie-parser');
app.use(cookieParser());
//make a port
const port=process.env.PORT;
const cors=require('cors');
app.use(cors());
app.use(
    cors({
      origin: "http://localhost:8082", 
      credentials: true,
    })
  );
const authRouter=require('./Routes/authuser');
const bookRouter=require('./Routes/bookdetails');
app.use("/",authRouter);
app.use("/",bookRouter);

app.listen(port,()=>{
    console.log(`app is listening on port num ${port}`);
    mongoose.connect(dbUrl).then(()=>console.log("DataBase is connected")).catch(()=>console.log("Database isfailed to connect"));
});
