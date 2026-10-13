const express = require('express');
const Cinema = require('../models/cinemas.js')
const SuperAdmin = require('../models/superadmins.js')
const CinemaAdmin = require('../models/cinemadmin.js')

const cinemas = express.Router()

cinemas.get('/',async(req,res)=>{
    try{
        if (req.user.role !== 'superadmin' && req.user.role !== 'cinemaAdmin') {
            return res.status(403).json({message:"You are not authorized to view cinemas"})
        }
        if (req.user.role === 'superadmin') {
        const cinemas = await Cinema.findAll();

        return res.status(200).json({
            message: 'All cinemas retrieved successfully',
            count: cinemas.length,
            data: cinemas
        });
    }
    const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id);

    if (!cinemaAdmin) {
        return res.status(404).json({message: 'Cinema admin not found'});
    }
    const cinema = await Cinema.findByPk(cinemaAdmin.cinemaId);

    if (!cinema) {
        return res.status(404).json({message: 'No cinema is assigned to this admin'});
    }
    return res.status(200).json({
        message: 'Assigned cinema retrieved successfully',
        data: cinema
    });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Error while retrieving cinemas"})
    }
});
module.exports = cinemas;