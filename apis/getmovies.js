const express = require('express')
const Movie = require('../models/movies.js');
const cinemas = require('../models/cinemas.js');
const moviePrices = require('../models/movieprices.js');

const movies = express.Router();

movies.get('/',async(_req,res)=>{
    try{
        const allMovies = await Movie.findAll({
            attributes:['name','date','capacity'],
            include:[
                {model : cinemas, attributes:['name']},
                {model : moviePrices, attributes:['type','price']}
            ]
        });
        const formattedMovies = allMovies.map(movie => {
        const movieData = movie.toJSON();

        movieData.date = movieData.date.toISOString().split('T')[0];
        return movieData;
        });
        return res.status(200).json({message:"Movies retrieved successfully",
                                      movies : formattedMovies});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed to retrieve movies"});
    }
});
module.exports = movies;