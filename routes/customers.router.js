const express = require('express');

const CustomerService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema, queryCustomerSchema } = require('../schemas/customers.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', validatorHandler(queryCustomerSchema, 'query'), async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validatorHandler(getCustomerSchema, 'params'), validatorHandler(updateCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
});
router.put('/:id', validatorHandler(getCustomerSchema, 'params'), validatorHandler(updateCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
