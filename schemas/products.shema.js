const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string().alphanum().min(3).max(32)
const price = Joi.number().positive().min(1).max(10000)

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema}


