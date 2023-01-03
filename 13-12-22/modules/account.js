var express=require('express');
var router=express.Router();
var new1=require("./new");
var crypto=require('crypto');
const { resSend,resStatuses } = require('./new');

exports.router=router;

router.post("/signup",async function(req,res){

    var userdata=req.fields
    var errors=[]
    
    userdata.email=userdata.email?.toString()??''
    userdata.firstname=userdata.firstname?.toString()??''
    userdata.lastname=userdata.lastname?.toString()??''
    userdata.password=userdata.password?.toString()??''
    userdata.confirmpassword=userdata.confirmpassword?.toString()??''

    if(!new1.validateEmail(userdata.email)) errors.push("Bad Email Address")
    if(userdata.firstname.length===0)  errors.push("No First Name")
    if(userdata.lastname.length<2)  errors.push("No Last Name")
    if(userdata.password.length<8)  errors.push("Password Must Be At Least 8 Chars")
    if(userdata.password!==userdata.confirmpassword)  errors.push("Passwords Do Not Match")

    if(errors.length===0){

        var dbRsp=await new1.dbGetSingleValue("select count(*) as val from jwt where email=?",[userdata.email])
        
        console.log(dbRsp)
        
        if(dbRsp!==0){

            new1.resSend(res,null,new1.resStatuses.error,"User With Email Already Exists")
            
            con.end()

            return false
        }

        var salt=new1.uniqueStr(255)
        var hash=getHash(userdata.password,salt)
        var confcode=new1.uniqueStr(45)

        userdata.id=await new1.dbInsert("insert into jwt values (0,?,?,?,now(),1,?,?)",[
            userdata.email,
            userdata.firstname,
            userdata.lastname,
            hash,
            confcode
        ])

        await new1.dbInsert("insert into sorts values(0,?,?)",[userdata.id,salt])
        
        var token=await createToken(userdata.id)

        new1.resSend(res,{token})

        return false
    }

    new1.resSend(res,null,new1.resStatuses.error,errors)

})

router.post("/gettoken",async function(req,res){

    var userdata=req.fields
    userdata.email=userdata.email?? ''
    userdata.password=userdata.password?? ''

    if(!new1.validateEmail(userdata.email)){
        new1.resSend(res,{},new1.resStatuses.error,"Invalid Email")
        return false
    }

    if(userdata.password.length<8){
        new1.resSend(res,{},new1.resStatuses.error,"Must Supply A Password")
        return false
    }

    var userid=await new1.dbGetSingleValue("select id from jwt where status<2 and email=?",[userdata.email],0)
    
    if(userid===0){
        new1.resSend(res,{},new1.resStatuses.error,"Incorrect Email or Password")
        return false
    }

    var salt=await new1.dbGetSingleValue("select salt as val from sorts where userid=?",[userid],'')

    var hash=getHash(userdata.password,salt)

    var dbHash=await new1.dbGetSingleValue("select pwhash as val from jwt where id=?",[userid],'')

    if(hash===dbHash){
        var token=await createToken(userid)
        new1.resSend(res,{token})
        return false
    }

    new1.resSend(res,{},new1.resStatuses.error,"Incorrect Email Or Password")
    
})

router.post("/changename",async function(req,res){

    var userid=await checkToken(req,res)
    if(userid===0) return false

    var userdata=req.fields 
    userdata.firstname=userdata.firstname?.toString() ?? ''
    userdata.lastname=userdata.lastname?.toString() ?? ''

    var errors=[]

    if (userdata.firstname.length ===0) errors.push("No First Name")
    if (userdata.lastname.length<2) errors.push("No Last Name")

    if(errors.length===0){
        await new1.dbQuery("update jwt set firstname=?,lastname=? where id=?",[userdata.firstname,userdata.lastname,userid])

        new1.resSend(res)

        return false
    }

    new1.resSend(res,null,ddf.resStatuses.error,errors)

})


async function checkToken(req,res){

    var token=req.headers.token

    token=token ?? ''
    var userid=await getUserIdFromToken(token)

    if(userid===0){
        new1.resSend(res,{},new1.resStatuses.error,"Invalid Token")
        return 0
    }

    return userid

}

exports.checkToken=checkToken

async function getUserIdFromToken(token){
    
    var userid=await new1.dbGetSingleValue("select userid as val from tokens where token=?",[token],0)

    return userid
}

exports.getUserIdFromToken=getUserIdFromToken

function getHash(pwd,salt){
    var hashBuffer= crypto.pbkdf2Sync(pwd,salt,100000,255,'sha512')
    var hashString=Buffer.from(hashBuffer,'hex').toString('base64')
    return hashString.slice(-255)
}

async function createToken(userid){
    var token =new1.uniqueStr(255)

    await new1.dbInsert("insert into tokens values(0,?,?,now())",[userid,token])

    return token
}