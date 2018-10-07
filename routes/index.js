const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
//moduls
const User = require('../models/Users')






router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username: username,
      password: hash
    })

    const promise = user.save();
    promise.then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send(err)
    })
  });
});






router.post('/authentication',(req,res)=>{
  const { username,password} = req.body
   
  User.findOne({username},(err,user)=>{
    if(err)
      throw err
    if(!user){
      res.send({
        status:false,
        message:'authentication is failed , wrong username'
      })
    }else{
       bcrypt.compare(password,user.password).then((result)=>{
         if(!result){
           res.send('authentication is failed , check your password')
         }else{
          const payload = {
            username
          }

          const token = jwt.sign(payload , req.app.get('api_secret_key') , {
            expiresIn:720
          })

          res.json({
            status: true,
            token
          })
         }
       })
    }
  })
  
})

module.exports = router;
