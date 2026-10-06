const Joi = require('joi')

const priceSchema = Joi.object({
    type : Joi.string().trim().required(),
    movieId : Joi.number().integer().required(),
    price : Joi.number().integer().required()
})

module.exports = priceSchema;