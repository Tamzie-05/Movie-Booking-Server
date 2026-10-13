
const express = require('express');
const Sales = require('../models/sales');
const Movie = require('../models/movies');
const CinemaAdmin = require('../models/cinemadmin');
const sales = express.Router();

// GET all sales permitted for the logged-in admin
sales.get('/:cinemaId/:movieId', async (req, res) => {
    try {
        const role = req.user.role;
        let sales;

        if (role === 'superadmin') {
            // Superadmin can view all sales
            sales = await Sales.findAll({
                order: [['bookedAt', 'DESC']]
            });

        } else if (role === 'cinemaAdmin') {
            // Cinema admin can view sales for their own cinema
            const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id);

            if (!cinemaAdmin) {
                return res.status(404).json({message: 'Cinema admin not found'});
            }
            sales = await Sales.findAll({
                attributes:['paymentId','ticketId','customerId','movieId','amount','status','bookedAt'],
                include: [{
                    model: Movie,
                    where: {
                        cinemaId: cinemaAdmin.cinemaId
                    },
                    attributes: []
                }],
                order: [['bookedAt', 'DESC']]
            });
        } else {
            return res.status(403).json({
                message: 'Access denied. Admins only.'
            });
        }
        return res.status(200).json({
            message: 'Sales retrieved successfully',
            count: sales.length,
            sales: sales
        });
    } catch (error) {
        console.error('Error retrieving sales:', error);
        return res.status(500).json({message: 'Failed to retrieve sales'});
    }
});

module.exports = sales;
