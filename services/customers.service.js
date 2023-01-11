const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  async create(data) {
    const hashPassword = await bcrypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create(
      {
        ...data,
        user:{
          ...data.user,
          password: hashPassword
        },
      },
      { include: ['user'] }
    );
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find(query) {
    const options = {};
    const { limit, offset } = query;
    (options.limit = limit), (options.offset = offset);
    const rta = await models.Customer.findAll({
      ...options,
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
