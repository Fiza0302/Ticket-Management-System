const joi = require('joi');

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        date: joi.date().iso().required(), 
        time: joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        duration:joi.number().required().min(0)
    }).required()
})