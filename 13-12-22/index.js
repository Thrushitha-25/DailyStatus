var express=require('express');
var mysql=require('mysql2');
var cors=require('cors');
var formidable=require('express-formidable');

var account=require('./modules/account')

var app=express();

app.use(cors())
app.use(formidable())

app.use('/api/account',account.router)

app.listen(4055,function(){
    console.log("Listening on 4055!")
})