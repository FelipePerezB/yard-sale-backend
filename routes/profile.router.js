const express = require('express');
const passport = require('passport');
const router = express.Router();

const OrderService = require('../services/order.service')
const service = new OrderService

router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const response = await service.findByUser(req.user.sub);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
router.post('/create-order', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const {body, user} = req
    const rta = await service.createByUser(body, user.sub);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router
