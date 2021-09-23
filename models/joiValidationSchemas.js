const Joi = require('joi')
const campgroundSchema = Joi.object({
            campground: Joi.object({
                title: Joi.string().required(),
                price: Joi.number().required().min(0),
                images: [
                    {
                        url: Joi.string().required(),
                        filename: Joi.string().required()
                    }                  
                ],
                location: Joi.string().required(),
                description: Joi.string().required()
            }).required(),
            deleteImages:  Joi.array()
        })


module.exports = campgroundSchema;
