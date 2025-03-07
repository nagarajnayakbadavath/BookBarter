require('dotenv').config();

const dbUrl=process.env.DATABASE_URL;

module.exports=dbUrl;