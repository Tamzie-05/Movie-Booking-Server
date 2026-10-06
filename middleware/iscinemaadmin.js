const CinemaAdmin = require('../models/cinemadmin.js');

async function isCinemaAdmin(req, res, next) {
    try {
        const cinemaAdmin = await CinemaAdmin.findByPk(req.user.id);

        if (!cinemaAdmin) {
            return res.status(404).json({
                message: "CinemaAdmin not found"
            });
        }

        if (cinemaAdmin.status !== "active") {
            return res.status(403).json({
                message: "Only active CinemaAdmins can perform this action"
            });
        }

        next();

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = isCinemaAdmin