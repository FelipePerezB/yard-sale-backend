const UsersService = require('../../../services/users.service');

const service = new UsersService();

const getUser = (_, { id }) =>  service.findOne(id);

const getUsers = () => service.find();

const addUser = (_, { dto }) => service.create(dto);

const updateUser = (_, { id, dto }) =>  service.update(id, dto);

const deleteUser = (_, { id }) =>  service.delete(id);

module.exports = { getUser, getUsers, addUser, updateUser, deleteUser };
