const express = require("express");
const Price = require('../models/movieprices.js')
const Movie = require('../models/movies.js')

const price = express.Router()

price.post('/',async(req,res)=>{
    try{
        const{type , movieId , price } = req.body

        const movie = await Movie.findByPk(movieId)
        if(!movie){
            return res.status(404).json({message:'Movie not found'})
        }
        const existingPrice = await Price.findOne({
        where:{
            type,
            movieId
        }
       });
       if (existingPrice){
        return res.status(409).json({message:"You have already created the price for this movie"})
       }
       const moviePrice = await Price.create({
        type, movieId , price
       });
       res.status(201).json({message:"Movie price created successfully",moviePrice})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Failed to create movie price"});
    }
});
module.exports = price;