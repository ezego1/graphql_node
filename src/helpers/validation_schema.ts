import Joi from 'joi'

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(6).required()
})

const organizationSchema = Joi.object({
    organization: Joi.string().required(),
    address: Joi.string().required(),
    marketValue: Joi.string().required(),
    ceo: Joi.string().required(),
    country: Joi.string().required()
})

export {authSchema, organizationSchema}