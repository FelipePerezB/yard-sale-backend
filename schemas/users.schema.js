const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const name = Joi.string().min(3).max(32);
const password = Joi.string();
const role = Joi.string();
const avatar = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  name: name.required(),
  password: password.required(),
  role: role.required(),
  avatar: avatar.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  name: name,
  password: password,
  role: role,
  avatar: avatar,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
