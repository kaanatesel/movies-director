const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movies') 

/* GET movie listing. */
router.post('/', (req, res, next) => {
  const { title , category , country , imbd_score} = req.body;

  const movie = new Movie({
    title : title,
    category : category,
    country : country,
    imbd_score : imbd_score
  })

  // movie.save((err,data)=>{
  //   if (err)
  //     res.send(err)
  //   else 
  //     res.json(data)
  // })
  const promise = movie.save();

  promise.then((data)=>{
    res.json({status : 1})
  }).catch((err)=>{
    res.json(err)
  })

});

module.exports = router;
