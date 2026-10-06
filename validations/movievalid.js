const Joi = require('joi')

const movieSchema = Joi.object({
    name : Joi.string().trim().required(),
    date : Joi.date().required(),
    maxCancellationDays : Joi.number().integer().min(0).max(2).required(),
    capacity : Joi.number().integer().min(1).max(200).required() 
});
module.exports = movieSchema;