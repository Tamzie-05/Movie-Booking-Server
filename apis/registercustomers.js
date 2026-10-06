const express = require('express')
const {hashPassword} = require('../util/passwords.js')

const Customer = require('../models/customers.js')

const customer = express.Router()

customer.post('/',async(req,res)=>{
    try{
        const{name,phone,email,password}=req.body;
        const hashedPassword = await hashPassword(password)
        const existingCustomer = await Customer.findOne({
            where:{email : email}
        }) ;
        if(existingCustomer){
            return res.status(409).json({message:"Customer with this email is already registered"})
        }
        const newCustomer = await Customer.create({
            name : name,
            email : email,
            phone : phone,
            password : hashedPassword
        });
        if(newCustomer){
            return res.status(201).json({message:"Customer created successfully"})
        }
        if(!newCustomer){
            return res.json({message:"Something went wrong. Please try again"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
});
module.exports = customer;