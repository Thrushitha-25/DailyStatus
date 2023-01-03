
router.post('/api/registeration',(req,res)=>{
    
    let{email,password,password_repeat,username}=req.body
    //creating user object
    const user={
      email,
      password,
      username
    }

    if(!username){
      return res.status(400).send({
        msg: 'username should not be empty'
      });
    }

    //validate user and the information provided by them
    if (!email || !validator.validate(email)) {
      return res.status(400).send({
        msg: 'Please enter valid email id'
      });
    }

    // password min 6 chars
    if (!password || password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !password_repeat ||
      password != password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
  
  }


    db.query(`SELECT * FROM users WHERE email=?`,email,(err, result) => {
         
        if(err){
            return res.status(400).send({
                msg:err
            })
        }
       
        //check whether username already exist or not
        if (result.length!==0) {
          return res.status(409).send({
            msg: 'This email is already in use!'
          });
        } 
          // username is available
          bcrypt.hash(password, 8).then((hash)=> {
            //set the password to hash value
            user.password=hash

          }).then(()=>{
            db.query("INSERT INTO users SET ?",user,(err,result)=>{
              if(err){
                  return res.status(400).send({
                      msg:err
                  })
              }

            
                
               db.query('SELECT * FROM users WHERE email=?',email,(err,result)=>{
                if(err){
                  return res.status(400).send({
                      msg:err
                  })
                }
                 
                 return res.status(201)
                  .send({
                      userdata:user,
                      msg:"successfully registered"
                    })
               })
       
          })
          })        
  });
})