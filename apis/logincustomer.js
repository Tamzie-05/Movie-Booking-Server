require('dotenv').config()
const express = require('express')
const Customer = require('../models/customers.js')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('../util/passwords')

const login = express.Router()

login.post('/',async(req,res)=>{
    try{
        const{email , password}= req.body
        const customer = await Customer.findOne({
            where:{
                email : email,
            }
        });
        if(!customer){
            return res.status().json({message:"Invalid email or password"})
        }
        const passwordMatch = await comparePassword(password,customer.password)
        if(!passwordMatch){
            return res.status().json({message:"Invalid email or password"})
        }
        const token = jwt.sign({
            id:customer.id,
            email:customer.email},process.env.JWT_SECRET,{expiresIn:'1h'});
        const refreshToken = jwt.sign({
            id:customer.id,
            email:customer.email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
            res.json({message:"Customer logged in successfully",token,refreshToken})    
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
});
module.exports=login;