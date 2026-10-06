const express = require('express')
const Movie = require('../models/movies.js')
const CinemaAdmin = require('../models/cinemadmin.js')

const movies = express.Router()

movies.post('/',async(req,res)=>{
    try{
        const{name,date,maxCancellationDays,capacity} = req.body
         const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id);
         if(!cinemaAdmin){
            return res.status(404).json({message:"CinemaAdmin not found"});
         }
         const cinemaId = cinemaAdmin.cinemaId;
        
        const movieDate = new Date(date);
        const cancellationDeadline = new Date(movieDate)

        cancellationDeadline.setDate(cancellationDeadline.getDate()- maxCancellationDays );

        if (new Date() > cancellationDeadline) {
             return res.status(400).json({message: "Cancellation period has expired"});
}

       const existingMovie = await Movie.findOne({
        where:{
            name,
            cinemaId
        }
       });
       if (existingMovie){
        return res.status(409).json({message:"You have already created this movie"})
       }
      

        const newMovie = await Movie.create({
            name : name,
            cinemaId : cinemaId,
            date : movieDate,
            maxCancellationDays : maxCancellationDays,
            cancellationDeadline : cancellationDeadline, 
            capacity : capacity,
            createdBy: cinemaAdmin.id
        });
        return res.status(201).json({
            message:"Movie created successfully",
            movies : newMovie
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err.message})
    }
});
module.exports = movies;

