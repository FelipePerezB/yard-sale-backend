const express = require('express');
const { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema } = require('./../schemas/categories.schema');

const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new CategoriesService();

router.get('/', passport.authenticate('jwt', { session: false }), checkRoles('admin', 'customers'), validatorHandler(queryCategorySchema, 'query'), async (req, res, next) => {
  try {
    const response = await service.find(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', passport.authenticate('jwt', { session: false }), checkRoles('admin', 'customers'), validatorHandler(createCategorySchema, 'body'), async (req, res) => {
  const body = req.body;
  const response = await service.create(body);
  res.status(201).json(response);
});

router.put('/:id', validatorHandler(updateCategorySchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.patch('/:id', validatorHandler(updateCategorySchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.update(id, body);
  res.json(response);
});

router.delete('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.status(200).json(response);
});

module.exports = router;
