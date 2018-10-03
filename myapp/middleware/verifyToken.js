const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.body.token || req.headers['x-access-token'] || req.query.token
    
    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({
                    status:false,
                    message: ' token is not match'
                })
            }else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        res.json({
            status: false,
            message:'no token'
        })
    }
}