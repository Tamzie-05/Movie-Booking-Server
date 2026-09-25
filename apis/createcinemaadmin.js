const express = require('express')
const cinemadmin = require('../models/cinemadmin.js')
const {hashPassword}= require('../util/passwords')

const cinemaAdmin = express.Router();

cinemaAdmin.post('/',async(req,res)=>{
    try{
        const{name,email,password,phone,cinemaId} = req.body;
        if(!name?.trim() || !email?.trim() || !password?.trim() || !phone?.trim() || !cinemaId){
            return res.status(422).json({message:"All fields are required"});
        }
        const existingAdmin = await cinemadmin.findOne({
            where:{email : email}
        });
        if(existingAdmin){
            return res.status(409).json({message:"A CinemaAdmin with this email already exists"});
        }
        const hashedPassword = await hashPassword(password)

        const newCinemaAdmin = await cinemadmin.create({
            name : name,
            email : email,
            password : hashedPassword,
            phone : phone,
            createdBy : req.user.id,
            cinemaId : cinemaId,
            status : 'active'
        });
        return res.status(201).json({message:"CinemaAdmin created successfully",
            cinemaAdmin:{
                id : newCinemaAdmin.id,
                name : newCinemaAdmin.name,
                email : newCinemaAdmin.email,
                password : newCinemaAdmin.password,
                cinemaId : newCinemaAdmin.cinemaId,
                status : newCinemaAdmin.status
            }
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({message : err.message});
    }
});

module.exports = cinemaAdmin;

