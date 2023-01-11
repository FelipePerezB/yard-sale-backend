const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  async create(data) {
    data.total = (data.total) ? data.total : 0
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(query) {
    const options = {};
    const { limit, offset } = query;
    (options.limit = limit), (options.offset = offset);

    const orders = await models.Order.findAll({
      ...options,
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return orders;
  }

  async createByUser(body, userId) {
    const orders = await this.create({
      customerId: userId,
    });
    return orders;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, { include: [{ association: 'customer', include: ['user'] }, 'items'] });
    if (!order) {
      throw boom.notFound('product not found');
    }
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async update(id, body) {
    const item = await this.findOne(id);
    const rta = await item.update(body);
    return rta;
  }

  async delete(id) {
    const rta = await this.findOne(id);
    await rta.destroy();
    return { id };
  }
}

module.exports = OrderService;
