const express = require('express')
const Movie = require('../models/movies.js')
const MoviePrices = require('../models/movieprices.js')

const price = express.Router();

price.get('/:movieId',async(req,res)=>{
    try{
        const {movieId} = req.params;
        const movie = await Movie.findByPk(movieId);
        if(!movie){
            return res.status(404).json({message:"Movie not found"})
        }
        const moviePrices = await MoviePrices.findAll({
            where:{movieId : movieId},attributes:['type','price']
        });
        return res.status(200).json({message:"Movie Prices retrieved successfully",
            movie : movie.name,
            price : moviePrices
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed to retrieve movie prices"})
    }
});
module.exports = price;