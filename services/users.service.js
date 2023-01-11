const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const { models } = require('../libs/sequelize');

class UserService {
  async create(data) {
    const hashPassword = await bcrypt.hash(data.password,10)
    const newUser = await models.User.create({
      ...data,
      password:hashPassword
    });
    delete newUser.dataValues.password
    return newUser;
  }

  async find(query) {
    const options = {}
    const { limit, offset } = query;
    (options.limit = limit), (options.offset = offset);
    const rta = await models.User.findAll({
      ...options,
      include: ['customer'],
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: {email}
    })
    return rta
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
