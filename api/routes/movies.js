const router = require('express').Router();
const Movie = require('../models/Movie');
const User = require('../models/Movie');
const verify = require("../verifyToken");


// CREATE

router.post("/", verify, async (req, res) => {
    if ( req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("You are not allowed to update a movie!");
    
    }
});


// UPDATE

router.put("/:id", verify, async (req, res) => {
    if ( req.user.isAdmin){

        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            {new: true} //return the updated movie
        ); 
            res.status(201).json(updatedMovie);

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("You are not allowed to update a movie!");
    
    }
});




// DELETE

router.delete("/:id", verify, async (req, res) => {
    if ( req.user.isAdmin){

        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(201).json("Movie has been deleted...");

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not allowed to delete a movie!");
    }
});

// GET

router.get("/find/:id", verify, async (req, res) => {
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(201).json(movie);
        }catch(err){
            res.status(500).json(err);
        }
});


// GET RANDOM MOVIE

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try{
        if(type === "series"){
            movie = await Movie.aggregate([
                { $match: {isSeries: true}},
                { $sample: {size: 1}},
            ]);
        }else{
            movie = await Movie.aggregate([
                { $match: {isSeries: false}},
                { $sample: {size: 1}},
            ]);
        }
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL

router.get("/", verify, async (req, res) => {
    if ( req.user.isAdmin){
        try{
            const movies = await Movie.find();
            res.status(201).json(movies.reverse()); //reverse the order of the movies
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not allowed to update a movie!");
    }
});

module.exports = router;