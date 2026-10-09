const express = require('express')
const Movie = require('../models/movies.js')
const MoviePrices = require('../models/movieprices.js')
const Payment = require('../models/payments.js')

const booking = express.Router();

booking.post('/',async(req,res)=>{
    try{
        const{movieId , priceId} = req.body
        const customerId = req.user.id;
        const movie = await Movie.findByPk(movieId);
        if(!movie){
            return res.status(404).json({message:"Movie not found"});
        }
        const moviePrice = await MoviePrices.findByPk(priceId)
        if(!moviePrice){
            return res.status(404).json({message:'Movie Price not found'});
        }
        if(moviePrice.movieId !== Number(movieId)){
            return res.status(400).json({message:"This price does not belong to this movie"})
        }
        const bookedTickets = await Payment.count({
            where:{movieId : movieId, status : "completed"}
        });
        if(bookedTickets >= movie.capacity){
            return res.status(400).json({message:'Movie is already sold out'});
        }
        const payment = await Payment.create({
            customerId : customerId,
            movieId : movieId,
            priceId : priceId,
            amount: moviePrice.price,
            status : 'pending'
        });
        return res.status(201).json({message:'Ticket booked. Kindly proceed with payment.',
            booking:{
                paymentId : payment.id,
                movie : movie.name,
                ticketType : moviePrice.Type,
                price : moviePrice.price,
                status : payment.status
            }
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Failed to create booking'});
    }
})
module.exports=booking;