const Joi = require('joi');

const updateMoviePriceSchema = Joi.object({
    price: Joi.number().positive().required().messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be greater than zero',
            'any.required': 'Price is required',
            'number.empty': 'Price cannot be empty'
        })
});

module.exports = updateMoviePriceSchema;