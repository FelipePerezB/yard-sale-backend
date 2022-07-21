const express = require('express');
const faker = require('faker');
const router = express.Router();

const UserServices = require("../services/users.services")

const service = new UserServices()

router.get('/', (req, res) => {
  const users = service.find()
  res.json(users);
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const users = service.findOne(id)
  res.status(200).json(users)
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params 
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.put('/:id', (req, res) => {
  const {id} = req.params 
  const body = req.body;
  res.status(200).json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params 
  res.status(200).json({
    message: 'deleted',
    data: users[id],
  });
  users = users.filter((user)=>user.id!=id)
});

module.exports = router;
