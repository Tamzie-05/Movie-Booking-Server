const express = require('express');
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/superadmin.js')
const {comparePassword} = require('../util/passwords')

const login = express.Router()

login.post('/',async(req,res)=>{
    try{
        const{email,password} = req.body;
        const superAdmin = await SuperAdmin.findOne({
            where:{email : email}
        });
        if(!superAdmin){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const passwordMatch = await comparePassword(password,superAdmin.password);
        if(!passwordMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
        if(superAdmin.status !== 'active'){
            return res.status(403).json({message:"SuperAdmin account is not active"})
        }
        const token = jwt.sign({
            id:superAdmin.id,
            email:superAdmin.email,
            role:superAdmin.role
         }, process.env.JWT_SECRET,{expiresIn:'1h'});

         const refreshToken = jwt.sign({
            id : superAdmin.id,
            email : superAdmin.email,
            role : superAdmin.role
         }, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
         res.json({message:"SuperAdmin logged in successfully", token, refreshToken});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
});
module.exports=login;