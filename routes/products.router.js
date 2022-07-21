const express = require('express');
const router = express.Router();
const {createProductSchema, updateProductSchema, getProductSchema} = require("./../schemas/products.shema")

const ProductsService = require("../services/products.services");
const validatorHandler = require('../middlewares/validator.handler');
const service = new ProductsService

router.get('/', async (req, res, next) => {
  try {
    const {limit, offset} = req.query
    const products = await service.find(limit, offset)
    res.json(products);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', 
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.findOne(id)
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const response = await service.create(body)
  res.status(201).json(response);
});

router.patch('/:id', async (req, res) => {
  const {id} = req.params 
  const body = req.body;
  const response = await service.update(id, body)
  res.json(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id)
  res.status(200).json(response);
});

module.exports = router
