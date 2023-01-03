const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mysql=require("mysql2");
const cors=require("cors");

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"jwtAuth"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet='select * from crud_contact';
    db.query(sqlGet,(error,result)=>{
        res.send(result)
    })
})

app.get("/hi",(req,res)=>{
    // const sqlInsert="insert into crud_contact(name,email,contact) values('john','john@gmail.com',7416575952)";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("Hello Chinnu"); 
    // });
});

app.listen(6010,()=>{
    console.log("Server is running on port 6000");
})