const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movies')

router.get('/getallMovies', (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.get('/getallMovies/top3', (req, res) => {
  const promise = Movie.find({}).limit(3).sort({ imbd_score:-1});
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.get('/:movieID', (req, res, next) => {
  // res.send(req.params)
  const promise = Movie.findById(req.params.movieID);
  promise.then((movie) => {

    res.json(movie)

  }).catch((err) => {
    res.json(err)
  })
})

router.put('/:movieID', (req, res) => {
  const promise = Movie.findByIdAndUpdate(req.params.movieID,req.body,{new:true});
  promise.then((movie) => {

    res.json(movie)

  }).catch((err) => {
    res.json(err)
  })
})

router.delete('/:movieID', (req, res, next) => {
  // res.send(req.params)
  const promise = Movie.findByIdAndRemove(req.params.movieID);
  promise.then((movie) => {

    res.json(movie)

  }).catch((err) => {
    res.json(err)
  })
})

router.post('/', (req, res, next) => {
  const {director_id,title, category, country, imbd_score } = req.body;

  const movie = new Movie({
    director_id:director_id,
    title: title,
    category: category,
    country: country,
    imbd_score: imbd_score
  })

  const promise = movie.save();

  promise.then((data) => {
    res.json({ status: 1 })
  }).catch((err) => {
    res.json(err)
  })

});




module.exports = router;
