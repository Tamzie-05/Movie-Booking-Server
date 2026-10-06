const express = require('express');
const jwt = require('jsonwebtoken');
const CinemaAdmin = require('../models/cinemadmin.js')
const {comparePassword} = require('../util/passwords')

const login = express.Router()

login.post('/',async(req,res)=>{
    try{
        const{email,password} = req.body;
        const cinemaAdmin = await CinemaAdmin.findOne({
            where:{email : email}
        });
        if(!cinemaAdmin){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const passwordMatch = await comparePassword(password,cinemaAdmin.password);
        if(!passwordMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
        if(cinemaAdmin.status !== 'active'){
            return res.status(403).json({message:"CinemaAdmin account is not active"})
        }
        const token = jwt.sign({
            id:cinemaAdmin.id,
            email:cinemaAdmin.email,
            status : cinemaAdmin.status,
         }, process.env.JWT_SECRET,{expiresIn:'1h'});

         const refreshToken = jwt.sign({
            id : cinemaAdmin.id,
            email : cinemaAdmin.email,
            status : cinemaAdmin.status
         }, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
         res.json({message:"CinemaAdmin logged in successfully", token, refreshToken});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
});
module.exports=login;