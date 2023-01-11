const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(32);
const image = Joi.string();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const queryCategorySchema = Joi.object({
  limit,
  offset,
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema };
