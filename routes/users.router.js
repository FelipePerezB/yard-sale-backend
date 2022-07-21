const express = require('express');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/users.schema');

const UsersService = require('../services/users.services');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const response = await service.find(limit, offset);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res) => {
  const body = req.body;
  const response = await service.create(body);
  res.status(201).json(response);
});

router.put('/:id', validatorHandler(updateUserSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.patch('/:id', validatorHandler(updateUserSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.delete('/:id', validatorHandler(getUserSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.status(200).json(response);
});

module.exports = router;
