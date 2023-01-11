const express = require('express');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/products.shema');

const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new ProductsService();

router.get('/', validatorHandler(queryProductSchema, "query"), async (req, res, next) => {
  try {
    const response = await service.find(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const response = await service.create(body);
  res.status(201).json(response);
});

router.put('/:id', validatorHandler(updateProductSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.patch('/:id', validatorHandler(updateProductSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.status(200).json(response);
});

module.exports = router;
