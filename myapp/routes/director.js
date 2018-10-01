const express = require('express');
const router = express.Router();
    
//moduls 
const Director = require('../models/Director') 

router.post('/director',(req,res)=>{
    const {name,surname,bio,} = req.body

    const director = new Director({
        name : name,
        surname : surname,
        bio : bio
    })

    const promise = director.save()
    
    promise.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
    

})

module.exports = router;
