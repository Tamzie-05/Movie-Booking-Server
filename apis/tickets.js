const express = require('express')
const Ticket = require("../models/tickets.js");
const Movie = require('../models/movies.js')
const CinemaAdmin = require('../models/cinemadmin.js');

const ticket = express.Router()

ticket.get('/:cinemaId/:movieId',async(req,res)=>{
    try{
        let tickets;
        const role = req.user.role;
        if(role === 'superadmin'){
            tickets = await Ticket.findAll({
                include:[{
                    model:Movie,attributes:['name','cinemaId']
                }],
                order:[['createdAt','DESC']]
            });
        }else if(role === 'cinemaAdmin'){
            const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id);
            if(!cinemaAdmin){
                return res.status(404).json({message:"CinemaAdmin not found"});
            }
        tickets = await Ticket.findAll({
            include :[{
                model:Movie,
                where:{
                    cinemaId : cinemaAdmin.cinemaId
                },
                attributes:['name','cinemaId']
            }],
            order:[['createdAt','DESC']]
        });
        }else if(role === 'customer'){
            tickets = await Ticket.findAll({
                where: {
                    customerId: req.user.id
                },
                include: [{
                    model: Movie,
                    attributes: ['name', 'cinemaId']
                }],
                order: [['createdAt', 'DESC']]
            });
        }
        else {
            return res.status(403).json({
                message: 'Access denied'
            });
        }
        return res.status(200).json({
            message: 'Tickets retrieved successfully',
            count: tickets.length,
            tickets
        });
    }catch(err){
        console.error('Error retrieving tickets:', err);

        return res.status(500).json({
            message: 'Error retrieving tickets'
        });
    }
});
module.exports=ticket