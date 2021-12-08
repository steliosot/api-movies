const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const Movie = require('../models/Movie');

// Insert data to my MongoDB

router.post('/', async (req,res) =>{
    // req.body -> Json data from user
    //console.log(req.body);

    const movie = new Movie({
        title:req.body.title,
        description:req.body.description,
        rating:req.body.rating
    });

    try{
        const saveMovie = await movie.save();
        res.send(saveMovie);
    }catch(err){
        res.send({message:err});
    }
});

// Extract all the data from MongoGB

router.get('/', async (req,res) =>{
    try{
        // The first 10 records
        const movies = await Movie.find().limit(10);
        res.send(movies);
    }catch(err){
        res.send({message:err});
    }
    
});

// Extract a specific movie

router.get('/:movieId', async(req,res) => {
    try{
        //console.log(req.params.movieId);
        const movieById = await Movie.findById(req.params.movieId);
        res.send(movieById);
    }catch(err){
        res.send({message:err});
    }
});

// Delete a movie from MongoDB

router.delete('/:movieId', async(req,res) =>{
    try{
        const deleteMovie = await Movie.deleteOne({_id:req.params.movieId});
        res.send(deleteMovie)
    }catch(err){
        res.send({message:err});
    }
});

// Update a movie in MongoDB

router.patch('/:movieId', async(req,res) => {
    try{
        const updateMovie = await Movie.updateOne(
            {_id:req.params.movieId},
            {$set: 
                {title:req.body.title, description:req.body.description, rating:req.body.rating}
            });
        res.send(updateMovie)
    }catch(err){
        res.send({message:err})
    }
})


module.exports = router;