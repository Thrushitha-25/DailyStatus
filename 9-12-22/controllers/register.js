const db=require("../routes/db-config");
const bcrypt=require("bcrypt");

const register=async(req,res)=>{
    const {email,password:Npassword}=req.body
    if(!email || !Npassword) return res.json({status:"error",error:"Please Enter your email and password"});
    else{
        console.log(email);
        db.query('SELECT email FROM Users WHERE email=?',{email},async(err,result)=>{
            if(err) throw err;
            if(result[0]) return res.json({status:"error",error:"Email has already been registered"})
            else{
                const password=bcrypt.hash(Npassword,8);
                console.log(password);
                db.query('INSERT INYO Users SET ?',{email:email,password:password},(error,results)=>{
                    if(error) throw error;
                    return res.json({status:"success",success:"User has been registered"})
                })
            }
        })
    }
}
module.exports=register;