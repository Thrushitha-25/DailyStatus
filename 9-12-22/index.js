const express=require('express');
const path = require('path');
const mysql = require("mysql");
const db=require("./routes/db-config");
const app=express();
const dotenv = require("dotenv").config();
const cookie =require('cookie-parser');
const PORT=process.env.PORT || 5010;
app.use("/js",express.static(__dirname+"./public/js"));
app.use("/css",express.static(__dirname+"./public/css"));
app.set("view engine","ejs");
app.set("views","./views");
app.use(cookie());
app.use(express.json());
db.connect((err)=>{
    if(err) throw err;
    console.log("Database connected Successfully...");
})
app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth"));
app.listen(PORT);
