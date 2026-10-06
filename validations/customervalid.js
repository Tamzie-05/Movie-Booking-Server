const Joi = require('joi')
const customerSchema = Joi.object({
    name : Joi.string().trim().required(),
    phone : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
});
module.exports = customerSchema;