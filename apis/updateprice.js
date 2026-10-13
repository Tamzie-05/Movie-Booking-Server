const express =require('express')
const Price = require('../models/movieprices.js')
const Movie = require('../models/movies.js')
const CinemaAdmin = require('../models/cinemadmin.js')

const update = express.Router()

update.patch('/:priceId',async(req,res)=>{
    try{
        const priceId = req.params
        const {price} = req.body;
        if(req.user.role !== 'superadmin' && req.user.role !== 'cinemaAdmin'){
            return res.status(403).json({message:"Only Superadmins and CinemaAdmins are allowed to update prices"})
        }
        const moviePrice = await Price.findByPk(req.params.priceId);
        if(!moviePrice){
            return res.status(404).json({message:"Ticket price not found"})
        }
        const movie = await Movie.findByPk(moviePrice.movieId);
        if(!movie){
            return res.status(404).json({message:"Movie not found"})
        }
        if(req.user.role === 'cinemaAdmin'){
            const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id)
            if(!cinemaAdmin){
                return res.status(404).json({message:'CinemaAdmin not found'})
            }
            if(cinemaAdmin.cinemaId !== movie.cinemaId){
                return res.status(403).json({message:'You can only update prices for movies in your cinema'})
            }
        }
        await moviePrice.update({
            price : price
        });
        return res.status(200).json({
            message:'Price updated successfully',
            data:{
                id : moviePrice.id,
                movieId : moviePrice.movieId,
                type : moviePrice.type,
                price : moviePrice.price
            }
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Error occurred while updating ticket price "})
    }
});
module.exports = update