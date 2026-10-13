const express = require('express')
const Ticket = require('../models/tickets.js')
const Movie = require('../models/movies.js')
const cancel = express.Router()

cancel.post('/:ticketId',async(req,res)=>{
    try{
        if(req.user.role !== 'customer'){
            return res.status(403).json({message:'Only customers can cancel tickets'});
        }
        const ticket = await Ticket.findOne({
            where:{
                id : req.params.ticketId,
                customerId : req.user.id
            },
            include:[{
                model:Movie,
                attributes:['id','name','cancellationDeadline']
            }]
        });
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"})
        }
        if(ticket.status === 'cancelled'){
            return res.status(400).json({message:"Ticket has already been cancelled"})
        }
        if(ticket.status === 'used'){
            return res.status(400).json({message:"A used ticket cannot be cancelled"});
        }
        const deadline = ticket.movie?.cancellationDeadline;
        if(!deadline){
            return res.status(400).json({message:"Cancellation deadline is not available"});
        }
        if(new Date()>= new Date(deadline)){
            return res.status(400).json({message:'The cancellation deadline has passed'});
        }
        await ticket.update({
            status:'cancelled'
        });
        return res.status(200).json({
            message:'Ticket cancelled successfully',
            ticketId : ticket.ticketId,
            status : ticket.status,
            movie : ticket.movie.name,
            cancellationDeadline : deadline
        }) 

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Error cancelling ticket"})
    }
});
module.exports = cancel