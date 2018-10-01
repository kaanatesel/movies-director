const express = require('express');
const router = express.Router();

//moduls 
const Director = require('../models/Director')

router.post('/director', (req, res) => {
    const { name, surname, bio, } = req.body

    const director = new Director({
        name: name,
        surname: surname,
        bio: bio
    })

    const promise = director.save()

    promise.then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })


})

router.get('/directorMovies', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
                
            }
          
        },
        { $project:{
            id: '$_id._id',
            name: '$_id.name',
            surname: '$_id.surname',
            bio: '$_id.bio',
            movies:'$moviesx'
        }}
    ])
    promise.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports = router;
