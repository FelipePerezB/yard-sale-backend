const express = require('express');

const OrdersService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, updateOrderSchema, addItemSchema, queryOrderSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrdersService();

router.get('/', validatorHandler(queryOrderSchema, "query"), async (req, res, next) => {
  try {
    const response = await service.find(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
});

router.post('/add-item', validatorHandler(addItemSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.addItem(body));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validatorHandler(updateOrderSchema, 'body'), validatorHandler(updateOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
});
router.put('/:id', validatorHandler(updateOrderSchema, 'body'), validatorHandler(updateOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
