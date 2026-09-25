const express = require('express')
const Cinema = require('../models/cinemas.js')

const cinema = express.Router();

cinema.post('/',async(req,res)=>{
    try{
        const{name , location} = req.body;
        if(!name?.trim() || !name?.trim()){
            return res.status(422).json({message:"Name and Location are required"});
        }
        const newCinema = await Cinema.create({
            name : name,
            location : location,
            createdBy : req.user.id
        });
        return res.status(201).json({
            message:"Cinema created successfully",
            cinema : newCinema
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({message : err.message});
    }
});
module.exports = cinema;